/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LessonUpdateRequest } from '../models/LessonUpdateRequest';
import type { LessonView } from '../models/LessonView';
import type { PaginatedLessonView } from '../models/PaginatedLessonView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LessonsService {
    /**
     * @returns LessonView OK
     * @throws ApiError
     */
    public static get5({
        id,
    }: {
        id: string,
    }): CancelablePromise<LessonView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lessons/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns LessonView OK
     * @throws ApiError
     */
    public static update17({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: LessonUpdateRequest,
    }): CancelablePromise<LessonView> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/lessons/{id}',
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
     * @returns PaginatedLessonView OK
     * @throws ApiError
     */
    public static list14({
        keyword,
        lessonGroupId,
        sortField,
        sortOrder,
        offset,
        size = 10,
    }: {
        keyword?: string,
        lessonGroupId?: string,
        sortField?: 'ID' | 'LESSON_NUMBER' | 'TITLE',
        sortOrder?: 'ASC' | 'DESC',
        offset?: number,
        size?: number,
    }): CancelablePromise<PaginatedLessonView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lessons',
            query: {
                'keyword': keyword,
                'lessonGroupId': lessonGroupId,
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
    public static count({
        keyword,
        lessonGroupId,
    }: {
        keyword?: string,
        lessonGroupId?: string,
    }): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lessons/count',
            query: {
                'keyword': keyword,
                'lessonGroupId': lessonGroupId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
