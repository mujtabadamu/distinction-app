/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DepartmentRequest } from '../models/DepartmentRequest';
import type { DepartmentUpdateRequest } from '../models/DepartmentUpdateRequest';
import type { DepartmentView } from '../models/DepartmentView';
import type { PaginatedDepartmentView } from '../models/PaginatedDepartmentView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DepartmentsService {
    /**
     * @returns PaginatedDepartmentView OK
     * @throws ApiError
     */
    public static list30({
        name,
        keyword,
        page,
        size = 10,
    }: {
        name?: string,
        keyword?: string,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedDepartmentView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/departments',
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
     * @returns DepartmentView OK
     * @throws ApiError
     */
    public static create19({
        requestBody,
    }: {
        requestBody: DepartmentRequest,
    }): CancelablePromise<DepartmentView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/departments',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns DepartmentView OK
     * @throws ApiError
     */
    public static retrieve7({
        id,
    }: {
        id: string,
    }): CancelablePromise<DepartmentView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/departments/{id}',
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
    public static delete18({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/departments/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns DepartmentView OK
     * @throws ApiError
     */
    public static update22({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: DepartmentUpdateRequest,
    }): CancelablePromise<DepartmentView> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/departments/{id}',
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
