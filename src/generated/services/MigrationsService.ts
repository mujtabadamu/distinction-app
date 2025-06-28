/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MigrationRequest } from '../models/MigrationRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MigrationsService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static copy({
        request,
    }: {
        request: MigrationRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/migrations',
            query: {
                'request': request,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
