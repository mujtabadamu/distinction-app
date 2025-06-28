import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Client,
  StompSubscription,
  IMessage,
  IFrame,
  StompHeaders,
} from '@stomp/stompjs';
import { getSocketClient, ReadyState } from 'utils/getSocketClient';
import { getEnvLogger } from 'utils/helpers';

export interface WebSocketSubscriptionHandler {
  topic: string;
  callback: (data: unknown, message: IMessage) => void;
}

export interface UseWebSocketConfig {
  subscriptions: WebSocketSubscriptionHandler[];
}

const devLogger = getEnvLogger();

/**
 * A custom React hook to manage a STOMP WebSocket connection and subscriptions.
 * It utilizes a singleton STOMP client and handles its connection lifecycle
 * and message routing based on provided configurations.
 *
 * @param config Configuration object including WebSocket subscriptions.
 * @returns An object containing the STOMP client, a sendMessage function,
 * the current connection ready state, and any encountered errors.
 */
const useWebSocket = (config: UseWebSocketConfig) => {
  const { subscriptions } = config;

  const [readyState, setReadyState] = useState<ReadyState>(
    ReadyState.UNINSTANTIATED
  );
  const [error, setError] = useState<Error | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const clientRef = useRef<Client | null>(null);
  const subscriptionsRef = useRef<StompSubscription[]>([]);
  const isMountedRef = useRef<boolean>(false);

  const changeReadyState = useCallback((newState: ReadyState) => {
    if (isMountedRef.current) {
      setReadyState(newState);
    }
  }, []);

  const handleSubscriptions = useCallback(() => {
    if (clientRef.current && clientRef.current.active && isMountedRef.current) {
      subscriptionsRef.current.forEach((sub) => sub.unsubscribe());
      subscriptionsRef.current = [];

      subscriptions.forEach((sub) => {
        const stompSubscription = clientRef.current?.subscribe(
          sub.topic,
          (message: IMessage) => {
            sub.callback(message.body, message);
          }
        );
        if (stompSubscription) {
          subscriptionsRef.current.push(stompSubscription);
          devLogger.log(`useWebSocket: Subscribed to topic: ${sub.topic}`);
        }
      });
    }
  }, [subscriptions]);

  const handleConnect = useCallback(() => {
    if (isMountedRef.current) {
      changeReadyState(ReadyState.OPEN);
      setIsConnected(true);
      setError(null);
      devLogger.log('useWebSocket: Client connected.');

      handleSubscriptions();
    }
  }, [changeReadyState, handleSubscriptions]);

  const handleClientError = useCallback((err: Error | IFrame | Event) => {
    if (isMountedRef.current) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : (err as IFrame).headers?.message ||
            (err as IFrame).body ||
            (err as Event).type ||
            'Unknown error';
      setError(new Error(`WebSocket Error: ${errorMessage}`));
      setReadyState(ReadyState.CLOSED);
      setIsConnected(false);
      console.error('useWebSocket: Client error:', err);
    }
  }, []);

  const handleClose = useCallback((event: CloseEvent) => {
    if (isMountedRef.current) {
      setReadyState(ReadyState.CLOSED);
      setIsConnected(false);
      if (event.code !== 1000 && !event.wasClean) {
        setError(
          new Error(
            `WebSocket closed unexpectedly: Code ${event.code}, Reason: ${event.reason}`
          )
        );
        console.error('useWebSocket: WebSocket closed unexpectedly:', event);
      } else {
        setError(null);
        devLogger.log('useWebSocket: WebSocket closed cleanly.');
      }
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;

    changeReadyState(ReadyState.CONNECTING);

    getSocketClient({
      onConnect: handleConnect,
      onError: handleClientError,
      onClose: handleClose,
    }).then((client) => {
      clientRef.current = client;
      handleSubscriptions();
    });

    return () => {
      isMountedRef.current = false;

      subscriptionsRef.current.forEach((sub) => {
        try {
          sub.unsubscribe();
          devLogger.log(`useWebSocket: Unsubscribed from topic: ${sub.id}`);
        } catch (e) {
          devLogger.warn(
            `useWebSocket: Failed to unsubscribe from a topic:`,
            e
          );
        }
      });
      subscriptionsRef.current = [];
      clientRef.current = null;
    };
  }, [handleSubscriptions]);

  const sendMessage = useCallback(
    (destination: string, body: string, headers?: StompHeaders) => {
      if (clientRef.current && clientRef.current.active) {
        clientRef.current.publish({ destination, body, headers });
        devLogger.log(`useWebSocket: Message sent to ${destination}`);
      } else {
        console.warn('useWebSocket: Client not connected, message not sent.', {
          destination,
          body,
          headers,
        });
        if (isMountedRef.current) {
          setError(
            new Error('Cannot send message: STOMP client is not active.')
          );
        }
      }
    },
    []
  );

  return {
    isConnected,
    readyState,
    client: clientRef.current,
    error,
    sendMessage,
  };
};

export default useWebSocket;
