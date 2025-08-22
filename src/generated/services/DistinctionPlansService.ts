/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlanRequest } from '../models/PlanRequest';
import type { PlanUpdateRequest } from '../models/PlanUpdateRequest';
import type { PlanView } from '../models/PlanView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DistinctionPlansService {
    /**
     * @returns PlanView OK
     * @throws ApiError
     */
    public static retrieve4({
        id,
    }: {
        id: string,
    }): CancelablePromise<PlanView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/plans/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PlanView OK
     * @throws ApiError
     */
    public static update8({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: PlanUpdateRequest,
    }): CancelablePromise<PlanView> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/plans/{id}',
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
    public static delete8({
        id,
    }: {
        id: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/plans/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PlanView OK
     * @throws ApiError
     */
    public static list13(): CancelablePromise<Array<PlanView>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/plans',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PlanView OK
     * @throws ApiError
     */
    public static create8({
        requestBody,
    }: {
        requestBody: PlanRequest,
    }): CancelablePromise<PlanView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/plans',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
