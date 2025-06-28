import axios, { AxiosError } from 'axios';
import urls from './config';
import {
  getLocalAccessToken,
  getLocalRefreshToken,
  logout,
  setLocalAccessToken,
} from './helpers';
import { store } from '../redux/store';
import { showSessionExpiryMessage } from 'redux/auth/reducer';
import { jwtDecode } from 'jwt-decode';

type RefreshToken = {
  refreshToken: string;
};

const { API_BASE_URL } = urls;

const httpClient = axios.create({
  baseURL: API_BASE_URL,
});

let isRefreshingToken = false;
let refreshTokenPromise: Promise<string | null> | null = null;

const requestQueue: Array<{
  request: () => Promise<any>;
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}> = [];

const refreshAccessToken = async (refreshToken: RefreshToken) => {
  try {
    const { data } = await httpClient.post(
      `/distinction/auth/refresh-token`,
      refreshToken
    );
    setLocalAccessToken(data.accessToken);
    return data;
  } catch (error) {
    // If refresh token request fails, trigger logout
    store.dispatch(showSessionExpiryMessage());
    logout();
    throw error;
  }
};

interface DecodedToken {
  exp: number;
}

export const checkAndRefreshToken = async () => {
  const token = await getLocalAccessToken();
  const refreshToken = await getLocalRefreshToken();
  if (!token) {
    throw new Error('No access token found');
  }

  const decodedToken = jwtDecode<DecodedToken>(token);
  const expirationTime = decodedToken.exp * 1000;

  if (expirationTime < Date.now()) {
    try {
      if (refreshToken) {
        const newTokenData = await refreshAccessToken({ refreshToken });
        await setLocalAccessToken(newTokenData.accessToken);
        return newTokenData.accessToken;
      }
    } catch (error) {
      console.error('Failed to refresh token:', error);
      store.dispatch(showSessionExpiryMessage());
      logout();
      throw error;
    }
  }

  return token;
};

export async function httpRequest<T>(request: () => Promise<T>): Promise<T> {
  try {
    const response = await request();
    return response;
  } catch (error) {
    if (
      (error as AxiosError)?.response?.status === 401 ||
      (error as AxiosError)?.status === 401
    ) {
      if (!isRefreshingToken) {
        isRefreshingToken = true;
        refreshTokenPromise = (async () => {
          const refreshToken = getLocalRefreshToken();
          if (!refreshToken) return;
          delete httpClient.defaults.headers.common.Authorization;
          const { accessToken } = await refreshAccessToken({ refreshToken });
          if (!accessToken) return;
          httpClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          return accessToken;
        })();

        try {
          await refreshTokenPromise;
          isRefreshingToken = false;
          refreshTokenPromise = null;
          processQueue(null);
          return request();
        } catch (refreshError) {
          isRefreshingToken = false;
          refreshTokenPromise = null;
          processQueue(refreshError);
          throw refreshError;
        }
      } else {
        // Queue the request until the token refresh completes
        return new Promise<T>((resolve, reject) => {
          requestQueue.push({ request, resolve, reject });
        });
      }
    } else {
      throw error;
    }
  }
}

function processQueue(error: any) {
  requestQueue.forEach(({ request, resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      // Retry the original request with the new token
      request().then(resolve).catch(reject);
    }
  });
  requestQueue.length = 0;
}

function timeoutPromise<T>(ms: number, promise: Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      const error: any = new Error(
        'We experienced a timeout, please try again.'
      );
      error.name = 'TimeoutError';
      error.response = {
        data: {
          message: 'We experienced a timeout, please try again.',
        },
        status: 409,
      };
      reject(error);
    }, ms);
    promise.then(
      (res) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err) => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  });
}

export async function apiWrapper<T>(request: () => Promise<T>) {
  const response = await timeoutPromise(100000, httpRequest(request));
  return response;
}

export default httpClient;
