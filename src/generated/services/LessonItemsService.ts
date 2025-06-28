/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LessonItemUpdateRequest } from '../models/LessonItemUpdateRequest';
import type { LessonItemView } from '../models/LessonItemView';
import type { PaginatedLessonItemView } from '../models/PaginatedLessonItemView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LessonItemsService {
    /**
     * @returns LessonItemView OK
     * @throws ApiError
     */
    public static get6({
        id,
    }: {
        id: string,
    }): CancelablePromise<LessonItemView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lesson-items/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns LessonItemView OK
     * @throws ApiError
     */
    public static update18({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: LessonItemUpdateRequest,
    }): CancelablePromise<LessonItemView> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/lesson-items/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedLessonItemView OK
     * @throws ApiError
     */
    public static list15({
        keyword,
        lessonId,
        lessonGroupId,
        courseId,
        type,
        sortField,
        sortOrder,
        offset,
        size = 10,
    }: {
        keyword?: string,
        lessonId?: string,
        lessonGroupId?: string,
        courseId?: string,
        type?: 'VIDEO' | 'ARTICLE' | 'QUIZ' | 'EXERCISE' | 'FLASHCARD',
        sortField?: 'ID' | 'ITEM_NUMBER' | 'TITLE',
        sortOrder?: 'ASC' | 'DESC',
        offset?: number,
        size?: number,
    }): CancelablePromise<PaginatedLessonItemView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lesson-items',
            query: {
                'keyword': keyword,
                'lessonId': lessonId,
                'lessonGroupId': lessonGroupId,
                'courseId': courseId,
                'type': type,
                'sortField': sortField,
                'sortOrder': sortOrder,
                'offset': offset,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns number OK
     * @throws ApiError
     */
    public static count1({
        keyword,
        lessonId,
        lessonGroupId,
        courseId,
        type,
    }: {
        keyword?: string,
        lessonId?: string,
        lessonGroupId?: string,
        courseId?: string,
        type?: 'VIDEO' | 'ARTICLE' | 'QUIZ' | 'EXERCISE' | 'FLASHCARD',
    }): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lesson-items/count',
            query: {
                'keyword': keyword,
                'lessonId': lessonId,
                'lessonGroupId': lessonGroupId,
                'courseId': courseId,
                'type': type,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
