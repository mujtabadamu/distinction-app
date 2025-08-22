/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FacultyRequest } from '../models/FacultyRequest';
import type { FacultyUpdateRequest } from '../models/FacultyUpdateRequest';
import type { FacultyView } from '../models/FacultyView';
import type { PaginatedFacultyView } from '../models/PaginatedFacultyView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FacultiesService {
    /**
     * @returns PaginatedFacultyView OK
     * @throws ApiError
     */
    public static list20({
        name,
        keyword,
        page,
        size = 10,
    }: {
        name?: string,
        keyword?: string,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedFacultyView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/faculties',
            query: {
                'name': name,
                'keyword': keyword,
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns FacultyView OK
     * @throws ApiError
     */
    public static create14({
        requestBody,
    }: {
        requestBody: FacultyRequest,
    }): CancelablePromise<FacultyView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/faculties',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns FacultyView OK
     * @throws ApiError
     */
    public static retrieve6({
        id,
    }: {
        id: string,
    }): CancelablePromise<FacultyView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/faculties/{id}',
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
    public static delete13({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/faculties/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns FacultyView OK
     * @throws ApiError
     */
    public static update20({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: FacultyUpdateRequest,
    }): CancelablePromise<FacultyView> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/faculties/{id}',
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
