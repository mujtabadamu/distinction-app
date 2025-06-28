/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InstitutionRequest } from '../models/InstitutionRequest';
import type { InstitutionUpdateRequest } from '../models/InstitutionUpdateRequest';
import type { InstitutionView } from '../models/InstitutionView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InstitutionsService {
    /**
     * @returns InstitutionView OK
     * @throws ApiError
     */
    public static create11({
        requestBody,
    }: {
        requestBody: InstitutionRequest,
    }): CancelablePromise<InstitutionView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/institutions',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns InstitutionView OK
     * @throws ApiError
     */
    public static retrieve5({
        id,
    }: {
        id: string,
    }): CancelablePromise<InstitutionView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/institutions/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns InstitutionView OK
     * @throws ApiError
     */
    public static upate({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: InstitutionUpdateRequest,
    }): CancelablePromise<InstitutionView> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/institutions/{id}',
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
