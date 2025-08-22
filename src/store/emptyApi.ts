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
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Get refresh token from Redux state
    const state = api.getState() as any;
    const refreshToken = state.authReducer?.refreshToken || '';

    if (refreshToken) {
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

      if (refreshResult.data) {
        // Store the new token in Redux state
        const newToken =
          (refreshResult.data as any)?.accessToken ||
          (refreshResult.data as any)?.token;
        if (newToken) {
          api.dispatch(updateAccessToken({ accessToken: newToken }));
        }

        // Update auth state if needed
        if (refreshResult.data && typeof refreshResult.data === 'object') {
          api.dispatch(setAuth({ user: refreshResult.data }));
        }

        // Retry the original request with the new token
        const retryResult = await baseQuery(args, api, extraOptions);
        return retryResult;
      } else {
        // Refresh failed, clear tokens and logout
        api.dispatch(logout());
      }
    } else {
      // No refresh token available, logout
      api.dispatch(logout());
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
    'CHATBOT',
    'REFERRAL',
  ],
});
