/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AutocompleteService {
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static list34({
        key,
        term,
        filter,
        limit = 5,
    }: {
        key: string,
        term?: string,
        filter?: string,
        limit?: number,
    }): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/autocomplete',
            query: {
                'key': key,
                'term': term,
                'filter': filter,
                'limit': limit,
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
    public static delete21({
        key,
        term,
        value,
    }: {
        key: string,
        term?: string,
        value?: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/autocomplete/{key}',
            path: {
                'key': key,
            },
            query: {
                'term': term,
                'value': value,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
