/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EnrolledLessonItemCreateRequest } from '../models/EnrolledLessonItemCreateRequest';
import type { EnrolledLessonItemUpdateRequest } from '../models/EnrolledLessonItemUpdateRequest';
import type { EnrolledLessonItemView } from '../models/EnrolledLessonItemView';
import type { PaginatedSimpleEnrolledLessonItemView } from '../models/PaginatedSimpleEnrolledLessonItemView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EnrolledLessonItemsService {
    /**
     * @returns PaginatedSimpleEnrolledLessonItemView OK
     * @throws ApiError
     */
    public static list23({
        keyword,
        enrolledCourseId,
        sortField,
        status,
        sortOrder,
        page,
        size = 10,
    }: {
        keyword?: string,
        enrolledCourseId?: string,
        sortField?: 'ID' | 'ITEM_TITLE' | 'ITEM_NUMBER' | 'START_DATE',
        status?: 'IN_PROGRESS' | 'COMPLETED',
        sortOrder?: 'ASC' | 'DESC',
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedSimpleEnrolledLessonItemView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/enrolled-lesson-items',
            query: {
                'keyword': keyword,
                'enrolledCourseId': enrolledCourseId,
                'sortField': sortField,
                'status': status,
                'sortOrder': sortOrder,
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns EnrolledLessonItemView OK
     * @throws ApiError
     */
    public static create17({
        requestBody,
    }: {
        requestBody: EnrolledLessonItemCreateRequest,
    }): CancelablePromise<EnrolledLessonItemView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/enrolled-lesson-items',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns EnrolledLessonItemView OK
     * @throws ApiError
     */
    public static get12({
        id,
    }: {
        id: string,
    }): CancelablePromise<EnrolledLessonItemView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/enrolled-lesson-items/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static delete16({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/enrolled-lesson-items/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns EnrolledLessonItemView OK
     * @throws ApiError
     */
    public static update21({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: EnrolledLessonItemUpdateRequest,
    }): CancelablePromise<EnrolledLessonItemView> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/enrolled-lesson-items/{id}',
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
}
