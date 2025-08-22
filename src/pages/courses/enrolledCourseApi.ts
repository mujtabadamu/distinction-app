import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiWrapper } from 'utils/http-client';
import { EnrolledCourseRequest, EnrolledCoursesService } from 'generated/index';
import {
  handleErrorWithoutNotify,
  parseAsRtkQueryError,
} from 'utils/errorHandlers';
import { ByIdParam } from 'utils/app-types';

export type EnrolledCourseSortField = 'ID' | 'COURSE_TITLE' | 'CREATED_AT';
export type EnrolledCourseStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
type SortDirection = 'ASC' | 'DESC';

export interface GetEnrolledCoursesParam {
  keyword?: string;
  courseId?: string;
  sortField?: EnrolledCourseSortField;
  status?: EnrolledCourseStatus;
  sortOrder?: SortDirection;
  page?: number;
  size?: number;
}

interface CreateEnrolledCourseBody {
  requestBody: Required<EnrolledCourseRequest>;
}

interface UpdateEnrolledCourseBody {
  id: string;
  requestBody: EnrolledCourseRequest;
}

export const ENROLLED_COURSE_TAG_TYPE = 'ENROLLED_COURSE';

export const enrolledCourseApi = createApi({
  reducerPath: 'enrolledCourseApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: [ENROLLED_COURSE_TAG_TYPE],
  endpoints: (builder) => ({
    getEnrolledCourses: builder.query({
      queryFn: async (data: GetEnrolledCoursesParam) => {
        try {
          const result = await apiWrapper(() =>
            EnrolledCoursesService.list24(data)
          );
          return { data: result };
        } catch (error) {
          return {
            error: parseAsRtkQueryError(handleErrorWithoutNotify(error)),
          };
        }
      },
      providesTags: [ENROLLED_COURSE_TAG_TYPE],
    }),

    getEnrolledCoursesMine: builder.query({
      queryFn: async (data: GetEnrolledCoursesParam) => {
        try {
          const result = await apiWrapper(() =>
            EnrolledCoursesService.listMine(data)
          );
          return { data: result };
        } catch (error) {
          return {
            error: parseAsRtkQueryError(handleErrorWithoutNotify(error)),
          };
        }
      },
      providesTags: [ENROLLED_COURSE_TAG_TYPE],
    }),

    getEnrolledCourseById: builder.query({
      queryFn: async (data: ByIdParam) => {
        try {
          const result = await apiWrapper(() =>
            EnrolledCoursesService.get13(data)
          );
          return { data: result };
        } catch (error) {
          return {
            error: parseAsRtkQueryError(handleErrorWithoutNotify(error)),
          };
        }
      },
      providesTags: [ENROLLED_COURSE_TAG_TYPE],
    }),

    createEnrolledCourse: builder.mutation({
      queryFn: async (data: CreateEnrolledCourseBody) => {
        try {
          const result = await apiWrapper(() =>
            EnrolledCoursesService.create18(data)
          );
          return { data: result };
        } catch (error) {
          return {
            error: parseAsRtkQueryError(handleErrorWithoutNotify(error)),
          };
        }
      },
      invalidatesTags: [ENROLLED_COURSE_TAG_TYPE],
    }),

    updateEnrolledCourse: builder.mutation({
      queryFn: async (data: UpdateEnrolledCourseBody) => {
        try {
          const result = await apiWrapper(() =>
            EnrolledCoursesService.update15(data)
          );
          return { data: result };
        } catch (error) {
          return {
            error: parseAsRtkQueryError(handleErrorWithoutNotify(error)),
          };
        }
      },
      invalidatesTags: [ENROLLED_COURSE_TAG_TYPE],
    }),

    deleteEnrolledCourse: builder.mutation({
      queryFn: async (data: ByIdParam) => {
        try {
          await apiWrapper(() => EnrolledCoursesService.delete17(data));
          return { data: undefined };
        } catch (error) {
          return {
            error: parseAsRtkQueryError(handleErrorWithoutNotify(error)),
          };
        }
      },
      invalidatesTags: [ENROLLED_COURSE_TAG_TYPE],
    }),
  }),
});

export const {
  useGetEnrolledCoursesQuery,
  useGetEnrolledCoursesMineQuery,
  useGetEnrolledCourseByIdQuery,
  useCreateEnrolledCourseMutation,
  useUpdateEnrolledCourseMutation,
  useDeleteEnrolledCourseMutation,
} = enrolledCourseApi;
