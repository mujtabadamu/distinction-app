/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiTokenRequest } from '../models/ApiTokenRequest';
import type { ApiTokenUpdateRequest } from '../models/ApiTokenUpdateRequest';
import type { ApiTokenView } from '../models/ApiTokenView';
import type { SimpleApiTokenView } from '../models/SimpleApiTokenView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ApiTokensService {
    /**
     * @returns SimpleApiTokenView OK
     * @throws ApiError
     */
    public static list35(): CancelablePromise<Array<SimpleApiTokenView>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api-tokens',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns ApiTokenView OK
     * @throws ApiError
     */
    public static create21({
        requestBody,
    }: {
        requestBody: ApiTokenRequest,
    }): CancelablePromise<ApiTokenView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api-tokens',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns ApiTokenView OK
     * @throws ApiError
     */
    public static get17({
        id,
    }: {
        id: string,
    }): CancelablePromise<ApiTokenView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api-tokens/{id}',
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
    public static delete22({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api-tokens/{id}',
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
    public static update24({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: ApiTokenUpdateRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api-tokens/{id}',
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
