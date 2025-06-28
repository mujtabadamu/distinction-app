/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedSubscriptionPackageView } from '../models/PaginatedSubscriptionPackageView';
import type { SubscriptionPackageAddonRequest } from '../models/SubscriptionPackageAddonRequest';
import type { SubscriptionPackageAddonView } from '../models/SubscriptionPackageAddonView';
import type { SubscriptionPackageRequest } from '../models/SubscriptionPackageRequest';
import type { SubscriptionPackageView } from '../models/SubscriptionPackageView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DistinctionSubscriptionPackagesService {
    /**
     * @returns SubscriptionPackageView OK
     * @throws ApiError
     */
    public static update1({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: SubscriptionPackageRequest,
    }): CancelablePromise<SubscriptionPackageView> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/subscription-packages/{id}',
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
     * @returns SubscriptionPackageAddonView OK
     * @throws ApiError
     */
    public static updateAddOn({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: SubscriptionPackageAddonRequest,
    }): CancelablePromise<SubscriptionPackageAddonView> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/subscription-packages/add-on/{id}',
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
     * @returns PaginatedSubscriptionPackageView OK
     * @throws ApiError
     */
    public static list1({
        page,
        size = 10,
    }: {
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedSubscriptionPackageView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/subscription-packages',
            query: {
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns SubscriptionPackageView OK
     * @throws ApiError
     */
    public static create1({
        requestBody,
    }: {
        requestBody: SubscriptionPackageRequest,
    }): CancelablePromise<SubscriptionPackageView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/subscription-packages',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns SubscriptionPackageAddonView OK
     * @throws ApiError
     */
    public static createAddOn({
        requestBody,
    }: {
        requestBody: SubscriptionPackageAddonRequest,
    }): CancelablePromise<SubscriptionPackageAddonView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/subscription-packages/add-on',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
