/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedTransactionSimpleView } from '../models/PaginatedTransactionSimpleView';
import type { TransactionSimpleView } from '../models/TransactionSimpleView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DistinctionTransactionsService {
    /**
     * @returns PaginatedTransactionSimpleView OK
     * @throws ApiError
     */
    public static list24({
        from,
        to,
        username,
        status,
        studentId,
        page,
        size = 10,
    }: {
        from?: string,
        to?: string,
        username?: string,
        status?: 'PENDING' | 'SUCCESS' | 'FAILED',
        studentId?: string,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedTransactionSimpleView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/distinction/transactions',
            query: {
                'from': from,
                'to': to,
                'username': username,
                'status': status,
                'studentId': studentId,
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns TransactionSimpleView OK
     * @throws ApiError
     */
    public static verify({
        transactionId,
        referenceId,
        platform,
    }: {
        transactionId?: string,
        referenceId?: string,
        platform?: 'TELCO' | 'PAYSTACK' | 'STRIPE' | 'MTN_NIGERIA',
    }): CancelablePromise<TransactionSimpleView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/distinction/transactions/verify',
            query: {
                'transactionId': transactionId,
                'referenceId': referenceId,
                'platform': platform,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
