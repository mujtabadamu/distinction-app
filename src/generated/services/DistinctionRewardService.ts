/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AirtimeRewardDTO } from '../models/AirtimeRewardDTO';
import type { AirtimeStatus } from '../models/AirtimeStatus';
import type { CashRewardDTO } from '../models/CashRewardDTO';
import type { PaginatedAirtimeRequestView } from '../models/PaginatedAirtimeRequestView';
import type { PaginatedAirtimeRewardView } from '../models/PaginatedAirtimeRewardView';
import type { PaginatedCashRewardView } from '../models/PaginatedCashRewardView';
import type { RetryRewardRequestDTO } from '../models/RetryRewardRequestDTO';
import type { RewardApprovalDTO } from '../models/RewardApprovalDTO';
import type { RewardRequestDTO } from '../models/RewardRequestDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DistinctionRewardService {
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static requestRewardRequest({
        requestBody,
    }: {
        requestBody: RetryRewardRequestDTO,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/rewards/retry-request',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns AirtimeRewardDTO OK
     * @throws ApiError
     */
    public static requestReward({
        requestBody,
    }: {
        requestBody: RewardRequestDTO,
    }): CancelablePromise<AirtimeRewardDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/rewards/request',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns CashRewardDTO OK
     * @throws ApiError
     */
    public static approveReward({
        referrerId,
        requestBody,
    }: {
        referrerId: string,
        requestBody: RewardApprovalDTO,
    }): CancelablePromise<CashRewardDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/rewards/approve/{referrerId}',
            path: {
                'referrerId': referrerId,
            },
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
    public static airtimeStatusCallback({
        requestBody,
    }: {
        requestBody: AirtimeStatus,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/rewards/airtime-status-callback',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns CashRewardDTO OK
     * @throws ApiError
     */
    public static getCashRewardsByStudentId({
        studentId,
    }: {
        studentId: string,
    }): CancelablePromise<Array<CashRewardDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rewards/student-cash-rewards/{studentId}',
            path: {
                'studentId': studentId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns AirtimeRewardDTO OK
     * @throws ApiError
     */
    public static getAirtimeRewardsByStudentId({
        studentId,
    }: {
        studentId: string,
    }): CancelablePromise<Array<AirtimeRewardDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rewards/student-airtime-rewards/{studentId}',
            path: {
                'studentId': studentId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedCashRewardView OK
     * @throws ApiError
     */
    public static getAllCashRewards({
        keyword,
        page,
        size = 10,
    }: {
        keyword?: string,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedCashRewardView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rewards/all-cash-rewards',
            query: {
                'keyword': keyword,
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedAirtimeRewardView OK
     * @throws ApiError
     */
    public static getAllAirtimeRewards({
        keyword,
        page,
        size = 10,
    }: {
        keyword?: string,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedAirtimeRewardView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rewards/all-airtime-rewards',
            query: {
                'keyword': keyword,
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedAirtimeRequestView OK
     * @throws ApiError
     */
    public static getAllAirtimeRequests({
        keyword,
        statusFilter,
        page,
        size = 10,
    }: {
        keyword?: string,
        statusFilter?: string,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedAirtimeRequestView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rewards/all-airtime-requests',
            query: {
                'keyword': keyword,
                'statusFilter': statusFilter,
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
