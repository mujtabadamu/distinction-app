/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EnrolledCourseRequest } from '../models/EnrolledCourseRequest';
import type { EnrolledCourseView } from '../models/EnrolledCourseView';
import type { PaginatedSimpleEnrolledCourseView } from '../models/PaginatedSimpleEnrolledCourseView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EnrolledCoursesService {
    /**
     * @returns EnrolledCourseView OK
     * @throws ApiError
     */
    public static get13({
        id,
    }: {
        id: string,
    }): CancelablePromise<EnrolledCourseView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/enrolled-courses/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns EnrolledCourseView OK
     * @throws ApiError
     */
    public static update15({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: EnrolledCourseRequest,
    }): CancelablePromise<EnrolledCourseView> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/enrolled-courses/{id}',
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
     * @returns any OK
     * @throws ApiError
     */
    public static delete17({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/enrolled-courses/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedSimpleEnrolledCourseView OK
     * @throws ApiError
     */
    public static list24({
        keyword,
        courseId,
        sortField,
        status,
        sortOrder,
        page,
        size = 10,
    }: {
        keyword?: string,
        courseId?: string,
        sortField?: 'ID' | 'COURSE_TITLE' | 'CREATED_AT',
        status?: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED',
        sortOrder?: 'ASC' | 'DESC',
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedSimpleEnrolledCourseView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/enrolled-courses',
            query: {
                'keyword': keyword,
                'courseId': courseId,
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
     * @returns EnrolledCourseView OK
     * @throws ApiError
     */
    public static create18({
        requestBody,
    }: {
        requestBody: EnrolledCourseRequest,
    }): CancelablePromise<EnrolledCourseView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/enrolled-courses',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedSimpleEnrolledCourseView OK
     * @throws ApiError
     */
    public static listMine({
        keyword,
        courseId,
        sortField,
        status,
        sortOrder,
        page,
        size = 10,
    }: {
        keyword?: string,
        courseId?: string,
        sortField?: 'ID' | 'COURSE_TITLE' | 'CREATED_AT',
        status?: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED',
        sortOrder?: 'ASC' | 'DESC',
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedSimpleEnrolledCourseView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/enrolled-courses/mine',
            query: {
                'keyword': keyword,
                'courseId': courseId,
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
}
