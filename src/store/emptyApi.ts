import {
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import urls from 'utils/config';
// import { logout, setAuth } from "@/modules/auth/authSlice";

export const baseQuery = fetchBaseQuery({
  baseUrl: urls.API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem('accessToken') || '';
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
    const refreshToken = localStorage.getItem('refreshToken') || '';

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: urls.API_BASE_URL + '/portal/auth/refresh-token',
          method: 'POST',
          body: {
            refreshToken: refreshToken,
          },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        await baseQuery(args, api, extraOptions);
        return result;
      } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
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
