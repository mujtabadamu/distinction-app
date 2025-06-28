/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CourseCreateRequest } from '../models/CourseCreateRequest';
import type { CourseGenerationRequestView } from '../models/CourseGenerationRequestView';
import type { CourseUpdateRequest } from '../models/CourseUpdateRequest';
import type { CourseView } from '../models/CourseView';
import type { PaginatedSimpleCourseView } from '../models/PaginatedSimpleCourseView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CoursesService {
    /**
     * @returns PaginatedSimpleCourseView OK
     * @throws ApiError
     */
    public static list32({
        keyword,
        subjectId,
        units,
        sortField,
        sortOrder,
        offset,
        size = 10,
    }: {
        keyword?: string,
        subjectId?: string,
        units?: number,
        sortField?: 'ID' | 'TITLE' | 'DATE_CREATED' | 'CURRICULUM' | 'COURSE_CODE' | 'SUBJECT',
        sortOrder?: 'ASC' | 'DESC',
        offset?: number,
        size?: number,
    }): CancelablePromise<PaginatedSimpleCourseView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/courses',
            query: {
                'keyword': keyword,
                'subjectId': subjectId,
                'units': units,
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
     * @returns CourseGenerationRequestView OK
     * @throws ApiError
     */
    public static generate({
        requestBody,
    }: {
        requestBody: CourseCreateRequest,
    }): CancelablePromise<CourseGenerationRequestView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/courses',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns CourseView OK
     * @throws ApiError
     */
    public static get15({
        id,
    }: {
        id: string,
    }): CancelablePromise<CourseView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/courses/{id}',
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
    public static delete20({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/courses/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns CourseView OK
     * @throws ApiError
     */
    public static update23({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: CourseUpdateRequest,
    }): CancelablePromise<CourseView> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/courses/{id}',
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
     * @returns CourseGenerationRequestView OK
     * @throws ApiError
     */
    public static regenerate({
        id,
    }: {
        id: string,
    }): CancelablePromise<CourseGenerationRequestView> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/courses/regenerate/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedSimpleCourseView OK
     * @throws ApiError
     */
    public static listMine1({
        keyword,
        subjectId,
        units,
        sortField,
        sortOrder,
        offset,
        size = 10,
    }: {
        keyword?: string,
        subjectId?: string,
        units?: number,
        sortField?: 'ID' | 'TITLE' | 'DATE_CREATED' | 'CURRICULUM' | 'COURSE_CODE' | 'SUBJECT',
        sortOrder?: 'ASC' | 'DESC',
        offset?: number,
        size?: number,
    }): CancelablePromise<PaginatedSimpleCourseView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/courses/mine',
            query: {
                'keyword': keyword,
                'subjectId': subjectId,
                'units': units,
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
    public static countMine({
        keyword,
        subjectId,
        units,
    }: {
        keyword?: string,
        subjectId?: string,
        units?: number,
    }): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/courses/mine/count',
            query: {
                'keyword': keyword,
                'subjectId': subjectId,
                'units': units,
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
    public static count3({
        keyword,
        subjectId,
        units,
    }: {
        keyword?: string,
        subjectId?: string,
        units?: number,
    }): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/courses/count',
            query: {
                'keyword': keyword,
                'subjectId': subjectId,
                'units': units,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
