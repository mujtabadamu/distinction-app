/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RateLimit } from '../models/RateLimit';
import type { UserRegistrationRequest } from '../models/UserRegistrationRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RateLimitControllerService {
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static registerUser({
        requestBody,
    }: {
        requestBody: UserRegistrationRequest,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/rate-limit/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static blockClient({
        clientIp,
    }: {
        clientIp: string,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/rate-limit/block',
            query: {
                'clientIp': clientIp,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns RateLimit OK
     * @throws ApiError
     */
    public static getRateLimitStatus({
        clientIp,
    }: {
        clientIp: string,
    }): CancelablePromise<RateLimit> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rate-limit/status',
            query: {
                'clientIp': clientIp,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns boolean OK
     * @throws ApiError
     */
    public static allowRequest({
        clientIp,
        email,
    }: {
        clientIp: string,
        email: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rate-limit/allow-request',
            query: {
                'clientIp': clientIp,
                'email': email,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
