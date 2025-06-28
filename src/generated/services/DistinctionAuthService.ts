/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DinstinctionRegistrationRequest } from '../models/DinstinctionRegistrationRequest';
import type { DistinctionLoginRequest } from '../models/DistinctionLoginRequest';
import type { DistinctionPasswordReset } from '../models/DistinctionPasswordReset';
import type { DistinctionPasswordResetRequest } from '../models/DistinctionPasswordResetRequest';
import type { DistinctionRegistrationResponse } from '../models/DistinctionRegistrationResponse';
import type { DistinctionResendVerification } from '../models/DistinctionResendVerification';
import type { DistinctionTokenLoginRequest } from '../models/DistinctionTokenLoginRequest';
import type { DistinctionUploadedUserRegistrationRequest } from '../models/DistinctionUploadedUserRegistrationRequest';
import type { DistinctionUploadedUserRegistrationResponse } from '../models/DistinctionUploadedUserRegistrationResponse';
import type { DistinctionUserConfirmRequest } from '../models/DistinctionUserConfirmRequest';
import type { LoginResponse } from '../models/LoginResponse';
import type { RefreshTokenRequest } from '../models/RefreshTokenRequest';
import type { RefreshTokenResponse } from '../models/RefreshTokenResponse';
import type { UploadedStudentView } from '../models/UploadedStudentView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DistinctionAuthService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static resendVerification({
        requestBody,
    }: {
        requestBody: DistinctionResendVerification,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/distinction/auth/verify/resend',
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
    public static confirm({
        requestBody,
    }: {
        requestBody: DistinctionUserConfirmRequest,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/distinction/auth/verify/confirm',
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
    public static tokenLogin({
        requestBody,
    }: {
        requestBody: DistinctionTokenLoginRequest,
    }): CancelablePromise<LoginResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/distinction/auth/token-login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns DistinctionRegistrationResponse OK
     * @throws ApiError
     */
    public static register1({
        requestBody,
    }: {
        requestBody: DinstinctionRegistrationRequest,
    }): CancelablePromise<DistinctionRegistrationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/distinction/auth/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns DistinctionUploadedUserRegistrationResponse OK
     * @throws ApiError
     */
    public static registerUploadedStudent({
        requestBody,
    }: {
        requestBody: DistinctionUploadedUserRegistrationRequest,
    }): CancelablePromise<DistinctionUploadedUserRegistrationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/distinction/auth/register-uploaded-student',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns RefreshTokenResponse OK
     * @throws ApiError
     */
    public static refreshToken1({
        requestBody,
    }: {
        requestBody: RefreshTokenRequest,
    }): CancelablePromise<RefreshTokenResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/distinction/auth/refresh-token',
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
    public static passwordReset1({
        requestBody,
    }: {
        requestBody: DistinctionPasswordReset,
    }): CancelablePromise<LoginResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/distinction/auth/password/reset',
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
    public static passwordResetRequest1({
        requestBody,
    }: {
        requestBody: DistinctionPasswordResetRequest,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/distinction/auth/password/reset-request',
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
    public static login2({
        requestBody,
    }: {
        requestBody: DistinctionLoginRequest,
    }): CancelablePromise<LoginResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/distinction/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns UploadedStudentView OK
     * @throws ApiError
     */
    public static getStudentReferralCode({
        matriculationNumber,
    }: {
        matriculationNumber: string,
    }): CancelablePromise<UploadedStudentView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/distinction/auth/validate-student',
            query: {
                'matriculationNumber': matriculationNumber,
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
    public static validateStudentEmail({
        email,
    }: {
        email: string,
    }): CancelablePromise<Record<string, boolean>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/distinction/auth/validate-email',
            query: {
                'email': email,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static googleLogin({
        platform,
        callbackUrl,
    }: {
        platform: 'DISTINCTION_NG' | 'DISTINCTION_APP' | 'SCHOOLS_DISTINCTION_APP' | 'DISTINCTION_ADMIN',
        callbackUrl: string,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/distinction/auth/google-authorize',
            query: {
                'platform': platform,
                'callbackUrl': callbackUrl,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
