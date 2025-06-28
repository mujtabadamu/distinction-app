/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DistinctionStatisticsService {
    /**
     * @returns number OK
     * @throws ApiError
     */
    public static list25({
        from,
        to,
        username,
        studentId,
    }: {
        from?: string,
        to?: string,
        username?: string,
        studentId?: string,
    }): CancelablePromise<Record<string, number>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/distinction/statistics/transactions',
            query: {
                'from': from,
                'to': to,
                'username': username,
                'studentId': studentId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
