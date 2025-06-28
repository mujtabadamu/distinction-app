/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedSubscriptionPackageView } from '../models/PaginatedSubscriptionPackageView';
import type { PlanView } from '../models/PlanView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DistinctionPortalPlansService {
    /**
     * @returns PaginatedSubscriptionPackageView OK
     * @throws ApiError
     */
    public static list28({
        institutionId,
        page,
        size = 10,
    }: {
        institutionId: string,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedSubscriptionPackageView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/distinction/portal/subscription-packages',
            query: {
                'institutionId': institutionId,
                'page': page,
                'size': size,
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
    public static list29({
        institutionId,
    }: {
        institutionId: string,
    }): CancelablePromise<Array<PlanView>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/distinction/portal/plans',
            query: {
                'institutionId': institutionId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
