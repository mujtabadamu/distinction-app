/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedSimplePaperView } from '../models/PaginatedSimplePaperView';
import type { PaperRequest } from '../models/PaperRequest';
import type { PaperView } from '../models/PaperView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PapersService {
    /**
     * @returns PaperView OK
     * @throws ApiError
     */
    public static get4({
        id,
    }: {
        id: string,
    }): CancelablePromise<PaperView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/papers/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaperView OK
     * @throws ApiError
     */
    public static update9({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: PaperRequest,
    }): CancelablePromise<PaperView> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/papers/{id}',
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
    public static delete9({
        id,
    }: {
        id: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/papers/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedSimplePaperView OK
     * @throws ApiError
     */
    public static list13({
        keyword,
        name,
        examId,
        examGroupId,
        year,
        subjectId,
        isActive,
        curriculum,
        page,
        size = 10,
    }: {
        keyword?: string,
        name?: string,
        examId?: string,
        examGroupId?: string,
        year?: number,
        subjectId?: string,
        isActive?: boolean,
        curriculum?: 'NUC' | 'NBTE' | 'NCCE' | 'OTHERS',
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedSimplePaperView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/papers',
            query: {
                'keyword': keyword,
                'name': name,
                'examId': examId,
                'examGroupId': examGroupId,
                'year': year,
                'subjectId': subjectId,
                'isActive': isActive,
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
     * @returns PaperView OK
     * @throws ApiError
     */
    public static create9({
        requestBody,
    }: {
        requestBody: PaperRequest,
    }): CancelablePromise<PaperView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/papers',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
