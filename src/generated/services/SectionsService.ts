/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedSimpleSectionView } from '../models/PaginatedSimpleSectionView';
import type { SectionRequest } from '../models/SectionRequest';
import type { SectionView } from '../models/SectionView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SectionsService {
    /**
     * @returns SectionView OK
     * @throws ApiError
     */
    public static get({
        id,
    }: {
        id: string,
    }): CancelablePromise<SectionView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/sections/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns SectionView OK
     * @throws ApiError
     */
    public static update3({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: SectionRequest,
    }): CancelablePromise<SectionView> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/sections/{id}',
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
    public static delete2({
        id,
    }: {
        id: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/sections/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedSimpleSectionView OK
     * @throws ApiError
     */
    public static list3({
        paperId,
        title,
        page,
        size = 10,
    }: {
        paperId: string,
        title?: string,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedSimpleSectionView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/sections',
            query: {
                'title': title,
                'paperId': paperId,
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns SectionView OK
     * @throws ApiError
     */
    public static create3({
        requestBody,
    }: {
        requestBody: SectionRequest,
    }): CancelablePromise<SectionView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/sections',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
