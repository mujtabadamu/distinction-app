import {
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { setAuth, logout, updateAccessToken } from 'pages/auth/authSlice';
import urls from 'utils/config';
// import { logout, setAuth } from "@/modules/auth/authSlice";

export const baseQuery = fetchBaseQuery({
  baseUrl: urls.API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // Get tokens from Redux state instead of localStorage
    const state = getState() as any;
    const token = state.authReducer?.accessToken || '';
    console.log('BaseQuery - Token from Redux:', token ? 'Present' : 'Missing');
    console.log('BaseQuery - URL:', urls.API_BASE_URL);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
      console.log('BaseQuery - Authorization header set');
    } else {
      console.log(
        'BaseQuery - No token available, skipping Authorization header'
      );
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  console.log('BaseQueryWithReauth - Starting request:', args);
  const result = await baseQuery(args, api, extraOptions);
  console.log('BaseQueryWithReauth - Initial result:', result);

  if (result.error && result.error.status === 401) {
    console.log(
      'BaseQueryWithReauth - 401 error detected, attempting token refresh'
    );

    // Get refresh token from Redux state
    const state = api.getState() as any;
    const refreshToken = state.authReducer?.refreshToken || '';
    console.log(
      'BaseQueryWithReauth - Refresh token available:',
      !!refreshToken
    );

    if (refreshToken) {
      console.log('BaseQueryWithReauth - Attempting token refresh...');
      const refreshResult = await baseQuery(
        {
          url: '/distinction/auth/refresh-token',
          method: 'POST',
          body: {
            refreshToken: refreshToken,
          },
        },
        api,
        extraOptions
      );
      console.log('BaseQueryWithReauth - Token refresh result:', refreshResult);

      if (refreshResult.data) {
        console.log(
          'BaseQueryWithReauth - Token refresh successful, storing new token'
        );
        // Store the new token in Redux state
        const newToken =
          (refreshResult.data as any)?.accessToken ||
          (refreshResult.data as any)?.token;
        if (newToken) {
          api.dispatch(updateAccessToken({ accessToken: newToken }));
          console.log('BaseQueryWithReauth - New token stored in Redux');
        }

        // Update auth state if needed
        if (refreshResult.data && typeof refreshResult.data === 'object') {
          api.dispatch(setAuth({ user: refreshResult.data }));
          console.log('BaseQueryWithReauth - Auth state updated');
        }

        // Retry the original request with the new token
        console.log('BaseQueryWithReauth - Retrying original request...');
        const retryResult = await baseQuery(args, api, extraOptions);
        console.log('BaseQueryWithReauth - Retry result:', retryResult);
        return retryResult;
      } else {
        console.log('BaseQueryWithReauth - Token refresh failed');
        // Refresh failed, clear tokens and logout
        api.dispatch(logout());
        console.error('Token refresh failed, user logged out');
      }
    } else {
      console.log('BaseQueryWithReauth - No refresh token available');
      // No refresh token available, logout
      api.dispatch(logout());
      console.error('No refresh token available, user logged out');
    }
  }

  return result;
};

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  refetchOnReconnect: true,
  //tags here below
  tagTypes: [
    'AUTH',
    'USER',
    'SESSION',
    'COURSE',
    'ENROLLMENT',
    'LESSON',
    'EXAM',
    'PAPER',
    'QUESTION',
    'PRACTICE',
    'QUIZ',
    'STUDENT',
    'STUDENT_PAPER',
    'STUDENT_PRACTICE',
    'SUBJECT',
    'TOPIC',
    'CONTENT',
    'STATISTICS',
    'ANALYTICS',
    'CREATE_EARN',
    'QUESTION_FLAG',
    'PROFILE',
    'PREFERENCE',
    'NOTIFICATION',
  ],
});
