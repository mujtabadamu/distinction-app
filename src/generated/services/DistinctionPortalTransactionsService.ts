/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedTransactionSimpleView } from '../models/PaginatedTransactionSimpleView';
import type { TransactionSimpleView } from '../models/TransactionSimpleView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DistinctionPortalTransactionsService {
    /**
     * @returns PaginatedTransactionSimpleView OK
     * @throws ApiError
     */
    public static list27({
        from,
        to,
        status,
        page,
        size = 10,
    }: {
        from?: string,
        to?: string,
        status?: 'PENDING' | 'SUCCESS' | 'FAILED',
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedTransactionSimpleView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/distinction/portal/transactions',
            query: {
                'from': from,
                'to': to,
                'status': status,
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
    public static verify1({
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
            url: '/distinction/portal/transactions/verify',
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
