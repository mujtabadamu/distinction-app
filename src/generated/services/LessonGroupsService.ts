/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LessonGroupUpdateRequest } from '../models/LessonGroupUpdateRequest';
import type { LessonGroupView } from '../models/LessonGroupView';
import type { PaginatedLessonGroupView } from '../models/PaginatedLessonGroupView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LessonGroupsService {
    /**
     * @returns LessonGroupView OK
     * @throws ApiError
     */
    public static get7({
        id,
    }: {
        id: string,
    }): CancelablePromise<LessonGroupView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lesson-groups/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns LessonGroupView OK
     * @throws ApiError
     */
    public static update19({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: LessonGroupUpdateRequest,
    }): CancelablePromise<LessonGroupView> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/lesson-groups/{id}',
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
     * @returns PaginatedLessonGroupView OK
     * @throws ApiError
     */
    public static list17({
        courseId,
        keyword,
        groupNumber,
        sortField,
        sortOrder,
        offset,
        size = 10,
    }: {
        courseId?: string,
        keyword?: string,
        groupNumber?: number,
        sortField?: 'ID' | 'NAME' | 'GROUP_NUMBER',
        sortOrder?: 'ASC' | 'DESC',
        offset?: number,
        size?: number,
    }): CancelablePromise<PaginatedLessonGroupView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lesson-groups',
            query: {
                'courseId': courseId,
                'keyword': keyword,
                'groupNumber': groupNumber,
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
    public static count2({
        courseId,
        keyword,
        groupNumber,
    }: {
        courseId?: string,
        keyword?: string,
        groupNumber?: number,
    }): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lesson-groups/count',
            query: {
                'courseId': courseId,
                'keyword': keyword,
                'groupNumber': groupNumber,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
