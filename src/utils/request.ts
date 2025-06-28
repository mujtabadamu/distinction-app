import axios, { ResponseType, AxiosError } from 'axios';
import urls from './config';
import {
  getLocalAccessToken,
  getLocalRefreshToken,
  getLocalUser,
  logout,
  setLocalAccessToken,
} from './helpers';
import { showSessionExpiryMessage } from 'redux/auth/reducer';
import { store } from '../redux/store';

export interface RequestOptions<T> {
  method?: 'get' | 'delete' | 'post' | 'put' | 'patch' | 'download';
  data?: T;
  url: string;
  responseType?: ResponseType;
  upload?: boolean;
  formData?: FormData;
  config?: { headers: { 'Content-Type': string; Authorization?: string } };
}

export interface RequestResult<R> {
  success: boolean;
  raw: R;
  statusCode?: number;
  message?: string;
}

// Request queue for handling 401 errors
const requestQueue: Array<{
  options: RequestOptions<any>;
  resolve: (value: RequestResult<any>) => void;
  reject: (reason?: any) => void;
}> = [];

let isRefreshingToken = false;
let refreshTokenPromise: Promise<RequestResult<any> | null> | null = null;

const fetch = <T>(options: RequestOptions<T>) => {
  const { method = 'get', data, url, responseType } = options;

  const authToken = getLocalAccessToken();
  authToken &&
    (axios.defaults.headers.common.Authorization = `Bearer ${authToken}`);

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: data,
        responseType,
      });
    case 'delete':
      return axios.delete(url, {
        data,
      });
    case 'post':
      switch (options.upload) {
        case true:
          return axios.post(url, options.formData, options.config);
        default:
          return axios.post(url, data);
      }
    case 'put':
      return axios.put(url, data);
    case 'patch':
      return axios.patch(url, data);
    case 'download':
      return axios.get(url, {
        params: data,
        responseType,
      });
    default:
      return axios(options);
  }
};

interface ResponseData {
  data: {
    code: number;
    error: string;
  };
  statusText: string;
}

function processQueue(error: any) {
  requestQueue.forEach(({ options, resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      // Retry the original request
      request(options).then(resolve).catch(reject);
    }
  });
  requestQueue.length = 0;
}

async function handleTokenRefresh<T>(
  refreshToken: string,
  options: RequestOptions<T>
): Promise<RequestResult<T>> {
  try {
    axios.defaults.headers.common.Authorization = '';
    const payload = { refreshToken };

    const resp = await axios.post(
      `${urls.API_BASE_URL}/distinction/auth/refresh-token`,
      payload
    );
    const refreshData = resp.data ? resp.data : {};
    setLocalAccessToken(refreshData.accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${refreshData.accessToken}`;

    processQueue(null);
    return request(options);
  } catch (refreshError) {
    store.dispatch(showSessionExpiryMessage());
    logout();
    return {
      success: false,
      statusCode: 401,
      message: 'Token refresh failed',
      raw: null as T,
    };
  }
}

export default function request<T>(
  options: RequestOptions<T>
): Promise<RequestResult<T>> {
  return fetch(options)
    .then((response) => {
      const { data, status } = response;
      return {
        success: true,
        raw: data as T,
        statusCode: status,
      };
    })
    .catch((err: AxiosError) => {
      const { response } = err;

      let msg;
      let statusCode;
      const data = response?.data;
      if (response && response instanceof Object) {
        const { data, statusText } = response as ResponseData;
        statusCode = response.status;

        msg = data.error || statusText;
        if (statusCode === 401) {
          const refreshToken = getLocalRefreshToken();
          const userDetails = getLocalUser();

          if (!userDetails?.id) {
            return {
              success: false,
              raw: data as T,
              statusCode,
              message: msg,
            };
          }

          // If not already refreshing token, start token refresh
          if (!isRefreshingToken) {
            isRefreshingToken = true;
            refreshTokenPromise = handleTokenRefresh(
              refreshToken as string,
              options
            )
              .then((result) => {
                isRefreshingToken = false;
                return result;
              })
              .catch(() => {
                isRefreshingToken = false;
                return null;
              });

            return refreshTokenPromise as Promise<RequestResult<T>>;
          } else {
            // Queue the request if token refresh is in progress
            return new Promise<RequestResult<T>>((resolve, reject) => {
              requestQueue.push({ options, resolve, reject });
            });
          }
        }
      } else {
        statusCode = 600;
        msg = 'Please check your internet connection.';
      }
      return { success: false, statusCode, message: msg, raw: data as T };
    });
}
