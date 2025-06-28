/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Client, StompHeaders, IFrame } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { getEnvLogger, getLocalAccessToken } from 'utils/helpers';

export enum ReadyState {
  UNINSTANTIATED = 0,
  CONNECTING = 1,
  OPEN = 2,
  CLOSING = 3,
  CLOSED = 4,
}

let _stompClient: Client | null = null;
let _stompClientPromise: Promise<Client> | null = null;

const devLogger = getEnvLogger();
const DEFAULT_BROKER_URL = 'https://api.saflearn.flexisafapps-dev.com/ws';

export interface SocketClientConfig {
  onConnect?: () => void;
  onError?: (error: Error | IFrame | Event) => void;
  onClose?: (event: CloseEvent) => void;
}

export function getSocketClient(config?: SocketClientConfig): Promise<Client> {
  if (_stompClientPromise) {
    return _stompClientPromise;
  }

  if (!_stompClient) {
    const initialConnectHeaders: StompHeaders = {
      Authorization: `Bearer ${getLocalAccessToken()}`,
    };

    _stompClient = new Client({
      webSocketFactory: () => new SockJS(DEFAULT_BROKER_URL),
      connectHeaders: initialConnectHeaders,
      reconnectDelay: 5000,
    });
  }

  _stompClientPromise = new Promise((resolve, reject) => {
    const originalOnConnect = _stompClient?.onConnect;
    const originalOnError = _stompClient?.onStompError;
    const originalOnWebSocketError = _stompClient?.onWebSocketError;

    _stompClient!.onConnect = (frame) => {
      devLogger.log('✅ STOMP Client Connected (via SockJS)');
      originalOnConnect?.(frame);
      config?.onConnect?.();
      resolve(_stompClient!);
    };

    _stompClient!.onStompError = (frame) => {
      console.error('❌ STOMP Error: ', frame.headers.message || frame.body);
      originalOnError?.(frame);
      config?.onError?.(frame);
      reject(new Error(frame.headers.message || frame.body || 'STOMP error'));
    };

    _stompClient!.onWebSocketError = (event) => {
      console.error('❌ WebSocket Error: ', event);
      originalOnWebSocketError?.(event);
      config?.onError?.(event);
      reject(new Error('WebSocket error: ' + event.type));
    };

    _stompClient!.onWebSocketClose = (event) => {
      devLogger.log('❌ WebSocket Closed: ', event);
      config?.onClose?.(event);
      if (_stompClientPromise && _stompClient!.state !== 2) {
        reject(new Error('WebSocket closed before STOMP connection.'));
      }
    };

    _stompClient!.onDisconnect = () => {
      devLogger.log('STOMP Client Disconnected.');
    };

    if (!_stompClient!.active) {
      _stompClient!.activate();
    } else {
      if (_stompClient!.state === 2) {
        resolve(_stompClient!);
      }
    }
  });

  return _stompClientPromise;
}

export const socketClientManager = {
  activate: async (brokerUrl: string = DEFAULT_BROKER_URL) => {
    try {
      const client = await getSocketClient();

      const token = getLocalAccessToken();
      if (!token) {
        console.error('Please provide a JWT token.');
        return;
      }

      if (client.brokerURL !== brokerUrl) {
        client.brokerURL = brokerUrl;
        // @ts-expect-error the type is correct
        client.webSocketFactory = () => new SockJS(brokerUrl);
        console.warn(
          `Broker URL changed to ${brokerUrl}. A client deactivation/activation may be required for this to take full effect.`
        );
      }

      client.connectHeaders = {
        Authorization: 'Bearer ' + token,
      };

      devLogger.log('STOMP client activated and connected (via Promise).');
      return client;
    } catch (error) {
      console.error('Failed to activate STOMP client:', error);
      throw error;
    }
  },

  deactivate: () => {
    if (_stompClient && _stompClient.active) {
      devLogger.log('Deactivating STOMP client...');
      _stompClient.deactivate().then(() => {
        devLogger.log('STOMP client deactivated.');
        _stompClientPromise = null;
        _stompClient = null;
      });
    } else {
      devLogger.log('STOMP client is not active.');
    }
  },

  getIsConnected: (): boolean => {
    return _stompClient ? _stompClient.active : false;
  },
};
