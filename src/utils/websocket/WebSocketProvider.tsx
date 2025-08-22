import React, { createContext, useContext, useEffect, useState } from 'react';
import noop from 'lodash';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { getLocalAccessToken } from 'utils/helpers';
import { WS_URL, RECONNECT_DELAY } from './websocket-utils';
import { checkAndRefreshToken } from 'utils/http-client';

const WebSocketContext = createContext<Client | null>(null);

export const useWebSocketClient = () => {
  const ctx = useContext(WebSocketContext);
  if (!ctx)
    throw new Error(
      'useWebSocketClient must be used within a WebSocketProvider'
    );
  return ctx;
};

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    const token = getLocalAccessToken();
    const stompClient = new Client({
      brokerURL: WS_URL,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnectDelay: RECONNECT_DELAY,
      heartbeatIncoming: 40000,
      heartbeatOutgoing: 40000,
      webSocketFactory: () => new SockJS(WS_URL),
      connectionTimeout: 10000,
      debug: process.env.NODE_ENV === 'development' ? console.log : noop,
    });

    // Set up connection event handlers
    stompClient.onConnect = () => {
      console.log('WebSocket client connected');
    };
    stompClient.beforeConnect = async () => {
      const token = await checkAndRefreshToken();
      stompClient.connectHeaders = { Authorization: `Bearer ${token}` };
    };
    stompClient.onStompError = (frame) => {
      console.error('WebSocket STOMP error:', frame);
    };

    stompClient.onDisconnect = () => {
      console.log('WebSocket client disconnected');
    };

    // Activate the client
    stompClient.activate();
    setClient(stompClient);

    return () => {
      console.log('Cleaning up WebSocket client');
      stompClient.deactivate();
      setClient(null);
    };
  }, []);

  return (
    <WebSocketContext.Provider value={client}>
      {children}
    </WebSocketContext.Provider>
  );
};
