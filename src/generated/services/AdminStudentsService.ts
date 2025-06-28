/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminUserView } from '../models/AdminUserView';
import type { PaginatedAdminUserView } from '../models/PaginatedAdminUserView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminStudentsService {
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static unblockStudent({
        studentId,
    }: {
        studentId: string,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/admin/manage-users/{studentId}/unblock',
            path: {
                'studentId': studentId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static blockStudent({
        studentId,
    }: {
        studentId: string,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/admin/manage-users/{studentId}/block',
            path: {
                'studentId': studentId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedAdminUserView OK
     * @throws ApiError
     */
    public static listUsers({
        keyword,
        schoolId,
        schoolType,
        page,
        size = 10,
    }: {
        keyword?: string,
        schoolId?: string,
        schoolType?: 'FEDERAL' | 'STATE' | 'PRIVATE',
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedAdminUserView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/manage-users',
            query: {
                'keyword': keyword,
                'schoolId': schoolId,
                'schoolType': schoolType,
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns AdminUserView OK
     * @throws ApiError
     */
    public static getUserById({
        studentId,
    }: {
        studentId: string,
    }): CancelablePromise<AdminUserView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/manage-users/{studentId}',
            path: {
                'studentId': studentId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
