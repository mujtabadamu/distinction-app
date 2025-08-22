import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiWrapper } from 'utils/http-client';
import { EnrolledLessonItemsService } from 'generated/services/EnrolledLessonItemsService';
import {
  handleErrorWithoutNotify,
  parseAsRtkQueryError,
} from 'utils/errorHandlers';
import type {
  EnrolledLessonItemCreateRequest,
  EnrolledLessonItemUpdateRequest,
  EnrolledLessonItemView,
  PaginatedSimpleEnrolledLessonItemView,
} from 'generated/index';
import { ByIdParam } from 'utils/app-types';

// ----- Types -----
export interface ListEnrolledLessonItemsParams {
  keyword?: string;
  enrolledCourseId?: string;
  sortField?: 'ID' | 'ITEM_TITLE' | 'ITEM_NUMBER' | 'START_DATE';
  status?: 'IN_PROGRESS' | 'COMPLETED';
  sortOrder?: 'ASC' | 'DESC';
  page?: number;
  size?: number;
}

export interface CreateEnrolledLessonItemBody {
  requestBody: EnrolledLessonItemCreateRequest;
}

export interface UpdateEnrolledLessonItemBody {
  id: string;
  requestBody: EnrolledLessonItemUpdateRequest;
}

export const ENROLLED_LESSON_ITEM_TAG_TYPE = 'ENROLLED_LESSON_ITEM';

// ---- API ----
export const enrolledLessonItemsApi = createApi({
  reducerPath: 'enrolledLessonItemsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: [ENROLLED_LESSON_ITEM_TAG_TYPE],
  endpoints: (builder) => ({
    listEnrolledLessonItems: builder.query<
      PaginatedSimpleEnrolledLessonItemView,
      ListEnrolledLessonItemsParams
    >({
      queryFn: async (params) => {
        try {
          const result = await apiWrapper(() =>
            EnrolledLessonItemsService.list23(params)
          );
          return { data: result };
        } catch (error) {
          return {
            error: parseAsRtkQueryError(handleErrorWithoutNotify(error)),
          };
        }
      },
      providesTags: [ENROLLED_LESSON_ITEM_TAG_TYPE],
    }),
    getEnrolledLessonItemById: builder.query<EnrolledLessonItemView, ByIdParam>(
      {
        queryFn: async ({ id }) => {
          try {
            const result = await apiWrapper(() =>
              EnrolledLessonItemsService.get12({ id })
            );
            return { data: result };
          } catch (error) {
            return {
              error: parseAsRtkQueryError(handleErrorWithoutNotify(error)),
            };
          }
        },
        providesTags: [ENROLLED_LESSON_ITEM_TAG_TYPE],
      }
    ),
    createEnrolledLessonItem: builder.mutation<
      EnrolledLessonItemView,
      CreateEnrolledLessonItemBody
    >({
      queryFn: async ({ requestBody }) => {
        try {
          const result = await apiWrapper(() =>
            EnrolledLessonItemsService.create17({ requestBody })
          );
          return { data: result };
        } catch (error) {
          return {
            error: parseAsRtkQueryError(handleErrorWithoutNotify(error)),
          };
        }
      },
    }),
    updateEnrolledLessonItem: builder.mutation<
      EnrolledLessonItemView,
      UpdateEnrolledLessonItemBody
    >({
      queryFn: async ({ id, requestBody }) => {
        try {
          const result = await apiWrapper(() =>
            EnrolledLessonItemsService.update21({ id, requestBody })
          );
          return { data: result };
        } catch (error) {
          return {
            error: parseAsRtkQueryError(handleErrorWithoutNotify(error)),
          };
        }
      },
    }),
    deleteEnrolledLessonItem: builder.mutation<any, ByIdParam>({
      queryFn: async ({ id }) => {
        try {
          await apiWrapper(() => EnrolledLessonItemsService.delete16({ id }));
          return { data: undefined };
        } catch (error) {
          return {
            error: parseAsRtkQueryError(handleErrorWithoutNotify(error)),
          };
        }
      },
      invalidatesTags: [ENROLLED_LESSON_ITEM_TAG_TYPE],
    }),
  }),
});

export const {
  useListEnrolledLessonItemsQuery,
  useGetEnrolledLessonItemByIdQuery,
  useCreateEnrolledLessonItemMutation,
  useUpdateEnrolledLessonItemMutation,
  useDeleteEnrolledLessonItemMutation,
} = enrolledLessonItemsApi;
