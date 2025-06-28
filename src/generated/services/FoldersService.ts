/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FolderRequest } from '../models/FolderRequest';
import type { FolderView } from '../models/FolderView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FoldersService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static update11({
        id,
        request,
    }: {
        id: string,
        request: FolderRequest,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/folders/{id}',
            path: {
                'id': id,
            },
            query: {
                'request': request,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns FolderView OK
     * @throws ApiError
     */
    public static get9(): CancelablePromise<Array<FolderView>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/folders',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns FolderView OK
     * @throws ApiError
     */
    public static create12({
        requestBody,
    }: {
        requestBody: FolderRequest,
    }): CancelablePromise<FolderView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/folders',
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
    public static delete11({
        id,
    }: {
        id: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/folders',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns FolderView OK
     * @throws ApiError
     */
    public static get10({
        id,
    }: {
        id: string,
    }): CancelablePromise<FolderView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/folders/id',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
