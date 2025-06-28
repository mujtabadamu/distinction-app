/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DistinctionPasswordReset } from '../models/DistinctionPasswordReset';
import type { DistinctionPasswordResetRequest } from '../models/DistinctionPasswordResetRequest';
import type { DistinctionResendVerification } from '../models/DistinctionResendVerification';
import type { DistinctionUserConfirmRequest } from '../models/DistinctionUserConfirmRequest';
import type { LoginResponse } from '../models/LoginResponse';
import type { PaginatedStaffView } from '../models/PaginatedStaffView';
import type { RegisterStaffDto } from '../models/RegisterStaffDto';
import type { StaffLoginRequest } from '../models/StaffLoginRequest';
import type { StaffLoginResponse } from '../models/StaffLoginResponse';
import type { StaffRegistrationRequest } from '../models/StaffRegistrationRequest';
import type { StaffUpdateRequest } from '../models/StaffUpdateRequest';
import type { StaffView } from '../models/StaffView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminStaffService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static resendVerification1({
        requestBody,
    }: {
        requestBody: DistinctionResendVerification,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/staff/verify/resend',
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
    public static confirm1({
        requestBody,
    }: {
        requestBody: DistinctionUserConfirmRequest,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/staff/verify/confirm',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns RegisterStaffDto OK
     * @throws ApiError
     */
    public static register2({
        requestBody,
    }: {
        requestBody: StaffRegistrationRequest,
    }): CancelablePromise<RegisterStaffDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/staff/register',
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
    public static passwordReset3({
        requestBody,
    }: {
        requestBody: DistinctionPasswordReset,
    }): CancelablePromise<LoginResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/staff/password/reset',
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
    public static passwordResetRequest3({
        requestBody,
    }: {
        requestBody: DistinctionPasswordResetRequest,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/staff/password/reset-request',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns StaffLoginResponse OK
     * @throws ApiError
     */
    public static login4({
        requestBody,
    }: {
        requestBody: StaffLoginRequest,
    }): CancelablePromise<StaffLoginResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/staff/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns StaffView OK
     * @throws ApiError
     */
    public static get18({
        id,
    }: {
        id: string,
    }): CancelablePromise<StaffView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/staff/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns StaffView OK
     * @throws ApiError
     */
    public static update25({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: StaffUpdateRequest,
    }): CancelablePromise<StaffView> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/admin/staff/{id}',
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
     * @returns PaginatedStaffView OK
     * @throws ApiError
     */
    public static list35({
        search,
        schoolId,
        role,
        offset,
        size = 10,
    }: {
        search?: string,
        schoolId?: string,
        role?: 'ADMIN' | 'SUPER_ADMIN',
        offset?: number,
        size?: number,
    }): CancelablePromise<PaginatedStaffView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/staff',
            query: {
                'search': search,
                'schoolId': schoolId,
                'role': role,
                'offset': offset,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
