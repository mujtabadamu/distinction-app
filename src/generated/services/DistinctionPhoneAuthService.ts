/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginResponse } from '../models/LoginResponse';
import type { PhoneLoginRequest } from '../models/PhoneLoginRequest';
import type { PhoneRegisterRequest } from '../models/PhoneRegisterRequest';
import type { UserInfo } from '../models/UserInfo';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DistinctionPhoneAuthService {
    /**
     * @returns UserInfo OK
     * @throws ApiError
     */
    public static register({
        requestBody,
    }: {
        requestBody: PhoneRegisterRequest,
    }): CancelablePromise<UserInfo> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/distinction/phone/auth/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns LoginResponse OK
     * @throws ApiError
     */
    public static login1({
        requestBody,
    }: {
        requestBody: PhoneLoginRequest,
    }): CancelablePromise<LoginResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/distinction/phone/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
