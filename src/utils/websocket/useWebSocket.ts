import noop from 'lodash/noop';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useWebSocketClient } from './WebSocketProvider';
import { errorNotifier } from 'utils/helpers';
import { RECONNECT_DELAY, MAX_RECONNECT_ATTEMPTS } from './websocket-utils';
import { checkAndRefreshToken } from 'utils/http-client';

export enum WebSocketReadyState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}

export interface WebSocketSubscription {
  topic: string;
  callback: (msg: any) => void;
}

export interface WebSocketReturn {
  client: any;
  sendMessage: (topic: string, message: any) => void;
  subscribe: (topic: string, callback: (msg: any) => void) => () => void;
  unsubscribe: (topic: string) => void;
  readyState: WebSocketReadyState;
  error: string | null;
  isConnected: boolean;
}

export function useWebSocket(): WebSocketReturn {
  const client = useWebSocketClient();
  const subscriptionRefs = useRef<Map<string, any>>(new Map());
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const isConnectingRef = useRef(false);

  const [readyState, setReadyState] = useState<WebSocketReadyState>(
    WebSocketReadyState.CLOSED
  );
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  // Clear all subscriptions
  const clearSubscriptions = useCallback(() => {
    subscriptionRefs.current.forEach((subRef) => {
      subRef.unsubscribe && subRef.unsubscribe();
    });
    subscriptionRefs.current.clear();
  }, []);

  // Subscribe to a topic
  const subscribe = useCallback(
    (topic: string, callback: (msg: any) => void) => {
      if (!client || !client.connected) {
        console.warn(`Cannot subscribe to ${topic}: WebSocket not connected`);
        return () => noop;
      }

      // Unsubscribe if already subscribed to this topic
      if (subscriptionRefs.current.has(topic)) {
        const existingSub = subscriptionRefs.current.get(topic);
        existingSub.unsubscribe && existingSub.unsubscribe();
      }

      const subRef = client.subscribe(topic, (message) => {
        callback(message.body);
      });

      subscriptionRefs.current.set(topic, subRef);

      // Return unsubscribe function
      return () => {
        if (subscriptionRefs.current.has(topic)) {
          const sub = subscriptionRefs.current.get(topic);
          sub.unsubscribe && sub.unsubscribe();
          subscriptionRefs.current.delete(topic);
        }
      };
    },
    [client]
  );

  // Unsubscribe from a topic
  const unsubscribe = useCallback((topic: string) => {
    if (subscriptionRefs.current.has(topic)) {
      const sub = subscriptionRefs.current.get(topic);
      sub.unsubscribe && sub.unsubscribe();
      subscriptionRefs.current.delete(topic);
    }
  }, []);

  // Attempt to reconnect
  const attemptReconnect = useCallback(async () => {
    if (
      !client ||
      isConnectingRef.current ||
      reconnectAttemptsRef.current >= MAX_RECONNECT_ATTEMPTS
    ) {
      // After max attempts, try to refresh token and reconnect
      if (reconnectAttemptsRef.current === MAX_RECONNECT_ATTEMPTS) {
        try {
          const accessToken = await checkAndRefreshToken();
          reconnectAttemptsRef.current = 0; // Reset attempts after refresh
          client.connectHeaders = {
            Authorization: `Bearer ${accessToken}`,
          };
          client.activate();
        } catch (err) {
          setError('Failed to refresh token after max reconnect attempts');
          return;
        }
      }
      return;
    }

    isConnectingRef.current = true;
    reconnectAttemptsRef.current += 1;

    setReadyState(WebSocketReadyState.CONNECTING);
    setIsConnected(false);
    setError(
      `Attempting to reconnect... (${reconnectAttemptsRef.current}/${MAX_RECONNECT_ATTEMPTS})`
    );

    try {
      client.activate();
    } catch (err) {
      console.error('Failed to activate WebSocket client:', err);
      setError('Failed to reconnect');
      isConnectingRef.current = false;
    }
  }, [client]);

  // Handle connection success
  const handleConnect = useCallback(() => {
    console.log('WebSocket connected successfully');
    setReadyState(WebSocketReadyState.OPEN);
    setIsConnected(true);
    setError(null);
    isConnectingRef.current = false;
    reconnectAttemptsRef.current = 0;
  }, []);

  // Handle connection errors
  const handleError = useCallback(
    (frame: any) => {
      const errorMsg =
        'WebSocket connection error: ' + (frame.headers.message || '');
      console.error('WebSocket error:', errorMsg);

      setError(errorMsg);
      setReadyState(WebSocketReadyState.CLOSED);
      setIsConnected(false);
      isConnectingRef.current = false;

      errorNotifier(errorMsg);

      // Attempt to reconnect if we haven't exceeded max attempts
      if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
        reconnectTimeoutRef.current = setTimeout(() => {
          attemptReconnect();
        }, RECONNECT_DELAY);
      }
    },
    [attemptReconnect]
  );

  // Handle disconnection
  const handleDisconnect = useCallback(() => {
    console.log('WebSocket disconnected');
    setReadyState(WebSocketReadyState.CLOSED);
    setIsConnected(false);
    isConnectingRef.current = false;
    clearSubscriptions();

    // Attempt to reconnect if we haven't exceeded max attempts
    if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
      reconnectTimeoutRef.current = setTimeout(() => {
        attemptReconnect();
      }, RECONNECT_DELAY);
    }
  }, [attemptReconnect, clearSubscriptions]);

  // Main effect to manage WebSocket connection
  useEffect(() => {
    if (!client) {
      setError('WebSocket client not available');
      setReadyState(WebSocketReadyState.CLOSED);
      setIsConnected(false);
      return;
    }

    // Set up event handlers
    client.onConnect = handleConnect;
    client.onStompError = handleError;
    client.onDisconnect = handleDisconnect;

    // Check current connection state
    if (client.connected) {
      handleConnect();
    } else {
      // Attempt to connect if not already connected
      attemptReconnect();
    }

    // Cleanup function
    return () => {
      // Clear reconnect timeout
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }

      // Clear subscriptions
      clearSubscriptions();

      // Reset connection state
      isConnectingRef.current = false;
      reconnectAttemptsRef.current = 0;
    };
  }, [
    client,
    handleConnect,
    handleError,
    handleDisconnect,
    attemptReconnect,
    clearSubscriptions,
  ]);

  // Send message function with reconnection attempt
  const sendMessage = useCallback(
    (topic: string, message: any) => {
      if (client && client.connected) {
        try {
          client.publish({
            destination: topic,
            body: JSON.stringify(message),
          });
        } catch (err) {
          console.error('Failed to send message:', err);
          setError('Failed to send message');
        }
      } else {
        setError('Cannot send message: WebSocket not connected');
        // Attempt to reconnect if not connected
        if (client && !isConnectingRef.current) {
          attemptReconnect();
        }
      }
    },
    [client, attemptReconnect]
  );

  return {
    client,
    sendMessage,
    subscribe,
    unsubscribe,
    readyState,
    error,
    isConnected,
  };
}
