import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiWrapper } from 'utils/http-client';
import {
  CoursesService,
  CourseUpdateRequest,
  CourseCreateRequest,
  CourseGenerationRequestService,
} from 'generated/index';
import { handleError, parseAsRtkQueryError } from 'utils/errorHandlers';
import { ByIdParam } from 'utils/app-types';

type SortField = 'ID' | 'TITLE' | 'SUBJECT';
type SortDirection = 'ASC' | 'DESC';
export interface GetCoursesParam {
  keyword?: string;
  subjectId?: string;
  units?: number;
  sortField?: SortField;
  sortOrder?: SortDirection;
  offset?: number;
  size?: number;
}

interface CreateGenerateBody {
  requestBody: CourseCreateRequest;
}

interface UpdateCourseBody {
  id: string;
  requestBody: CourseUpdateRequest;
}

interface CountCourseParam {
  keyword?: string;
  subjectId?: string;
  units?: number;
}
export const COURSE_TAG_TYPE = 'COURSE';

export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: [COURSE_TAG_TYPE],
  endpoints: (builder) => ({
    getCourses: builder.query({
      queryFn: async (data: GetCoursesParam) => {
        try {
          const result = await apiWrapper(() => CoursesService.list32(data));
          return { data: result };
        } catch (error) {
          return {
            error: parseAsRtkQueryError(handleError(error)),
          };
        }
      },
      providesTags: [COURSE_TAG_TYPE],
    }),

    getCoursesMine: builder.query({
      queryFn: async (data: GetCoursesParam) => {
        try {
          const result = await apiWrapper(() => CoursesService.listMine1(data));
          return { data: result };
        } catch (error) {
          return {
            error: parseAsRtkQueryError(handleError(error)),
          };
        }
      },
      providesTags: [COURSE_TAG_TYPE],
    }),
    getCourseById: builder.query({
      queryFn: async (data: ByIdParam) => {
        try {
          const result = await apiWrapper(() => CoursesService.get15(data));
          return { data: result };
        } catch (error) {
          return {
            error: parseAsRtkQueryError(handleError(error)),
          };
        }
      },
      providesTags: [COURSE_TAG_TYPE],
    }),
    getCourseGenerationRequestById: builder.query({
      queryFn: async (data: ByIdParam) => {
        try {
          const result = await apiWrapper(() =>
            CourseGenerationRequestService.get16(data)
          );
          return { data: result };
        } catch (error) {
          return {
            error: parseAsRtkQueryError(handleError(error)),
          };
        }
      },
      providesTags: [COURSE_TAG_TYPE],
    }),

    countCourses: builder.query({
      queryFn: async (data: CountCourseParam) => {
        try {
          const result = await apiWrapper(() => CoursesService.count3(data));
          return { data: result };
        } catch (error) {
          return {
            error: parseAsRtkQueryError(handleError(error)),
          };
        }
      },
      providesTags: [COURSE_TAG_TYPE],
    }),
    countCoursesMine: builder.query({
      queryFn: async (data: CountCourseParam) => {
        try {
          const result = await apiWrapper(() => CoursesService.countMine(data));
          return { data: result };
        } catch (error) {
          return {
            error: parseAsRtkQueryError(handleError(error)),
          };
        }
      },
      providesTags: [COURSE_TAG_TYPE],
    }),
    generateCourse: builder.mutation({
      queryFn: async (data: CreateGenerateBody) => {
        try {
          const result = await apiWrapper(() => CoursesService.generate(data));
          return { data: result };
        } catch (error) {
          return {
            error: parseAsRtkQueryError(handleError(error)),
          };
        }
      },
      invalidatesTags: [COURSE_TAG_TYPE],
    }),
    regenerateCourse: builder.mutation({
      queryFn: async (data: ByIdParam) => {
        try {
          const result = await apiWrapper(() =>
            CoursesService.regenerate(data)
          );
          return { data: result };
        } catch (error) {
          return {
            error: parseAsRtkQueryError(handleError(error)),
          };
        }
      },
      invalidatesTags: [COURSE_TAG_TYPE],
    }),
    updateCourse: builder.mutation({
      queryFn: async (data: UpdateCourseBody) => {
        try {
          const result = await apiWrapper(() => CoursesService.update23(data));
          return { data: result };
        } catch (error) {
          return {
            error: parseAsRtkQueryError(handleError(error)),
          };
        }
      },
      invalidatesTags: [COURSE_TAG_TYPE],
    }),
    deleteCourse: builder.mutation({
      queryFn: async (data: ByIdParam) => {
        try {
          await apiWrapper(() => CoursesService.delete20(data));
          return { data: undefined };
        } catch (error) {
          return {
            error: parseAsRtkQueryError(handleError(error)),
          };
        }
      },
      invalidatesTags: [COURSE_TAG_TYPE],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useGetCoursesMineQuery,
  useGetCourseGenerationRequestByIdQuery,
  useRegenerateCourseMutation,
  useUpdateCourseMutation,
  useGenerateCourseMutation,
  useDeleteCourseMutation,
} = courseApi;
