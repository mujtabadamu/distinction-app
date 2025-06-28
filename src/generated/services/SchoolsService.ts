/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedSimpleSchoolView } from '../models/PaginatedSimpleSchoolView';
import type { School } from '../models/School';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SchoolsService {
    /**
     * @returns School OK
     * @throws ApiError
     */
    public static getSchool({
        id,
    }: {
        id: string,
    }): CancelablePromise<School> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/schools/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns School OK
     * @throws ApiError
     */
    public static update4({
        id,
        name,
        abbr,
        state,
        type,
        formData,
    }: {
        id: string,
        name?: string,
        abbr?: string,
        state?: string,
        type?: 'FEDERAL' | 'STATE' | 'PRIVATE',
        formData?: {
            image?: Blob;
        },
    }): CancelablePromise<School> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/schools/{id}',
            path: {
                'id': id,
            },
            query: {
                'name': name,
                'abbr': abbr,
                'state': state,
                'type': type,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static delete3({
        id,
    }: {
        id: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/schools/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedSimpleSchoolView OK
     * @throws ApiError
     */
    public static list4({
        name,
        abbr,
        curriculum,
        page,
        size = 10,
    }: {
        name?: string,
        abbr?: string,
        curriculum?: 'NUC' | 'NBTE' | 'NCCE' | 'OTHERS',
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedSimpleSchoolView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/schools',
            query: {
                'name': name,
                'abbr': abbr,
                'curriculum': curriculum,
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns School OK
     * @throws ApiError
     */
    public static create4({
        name,
        abbr,
        state,
        type,
        formData,
    }: {
        name?: string,
        abbr?: string,
        state?: string,
        type?: 'FEDERAL' | 'STATE' | 'PRIVATE',
        formData?: {
            image?: Blob;
        },
    }): CancelablePromise<School> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/schools',
            query: {
                'name': name,
                'abbr': abbr,
                'state': state,
                'type': type,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
