import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiWrapper } from 'utils/http-client';
import { CourseGenerationRequestService } from 'generated/index';
import {
  handleErrorWithoutNotify,
  parseAsRtkQueryError,
} from 'utils/errorHandlers';
import { ByIdParam } from 'utils/app-types';

export const COURSE_GEN_REQUEST_TAG_TYPE = 'COURSE_GEN_REQUEST';

export const courseGenRequestApi = createApi({
  reducerPath: 'courseGenRequestApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: [COURSE_GEN_REQUEST_TAG_TYPE],
  endpoints: (builder) => ({
    getCourseGenerationRequestById: builder.query({
      queryFn: async (data: ByIdParam) => {
        try {
          const result = await apiWrapper(() =>
            CourseGenerationRequestService.get16(data)
          );
          return { data: result };
        } catch (error) {
          return {
            error: parseAsRtkQueryError(handleErrorWithoutNotify(error)),
          };
        }
      },
      providesTags: [COURSE_GEN_REQUEST_TAG_TYPE],
    }),
  }),
});

export const {
  useGetCourseGenerationRequestByIdQuery,
  useLazyGetCourseGenerationRequestByIdQuery,
} = courseGenRequestApi;
