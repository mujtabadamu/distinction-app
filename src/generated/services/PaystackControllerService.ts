/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PaystackControllerService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static webhook({
        xPaystackSignature,
        requestBody,
        xForwardedFor,
    }: {
        xPaystackSignature: string,
        requestBody: Record<string, any>,
        xForwardedFor?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/payment-gateways/paystack/webhook',
            headers: {
                'X-Forwarded-For': xForwardedFor,
                'x-paystack-signature': xPaystackSignature,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
