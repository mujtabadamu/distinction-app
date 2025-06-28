/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedSubscriptionHistoryView } from '../models/PaginatedSubscriptionHistoryView';
import type { SubscriptionRequest } from '../models/SubscriptionRequest';
import type { SubscriptionView } from '../models/SubscriptionView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DistinctionPortalSubscriptionsService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static subscribe({
        requestBody,
    }: {
        requestBody: SubscriptionRequest,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/distinction/portal/subscriptions/subscribe',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedSubscriptionHistoryView OK
     * @throws ApiError
     */
    public static list27({
        page,
        size = 10,
    }: {
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedSubscriptionHistoryView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/distinction/portal/subscriptions',
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
     * @returns SubscriptionView OK
     * @throws ApiError
     */
    public static status(): CancelablePromise<SubscriptionView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/distinction/portal/subscriptions/status',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static getPlanLimit({
        property,
    }: {
        property: 'FLASHCARD' | 'KEYPOINTS' | 'PRACTICE_QUESTIONS' | 'MONTHLY_QUIZATON' | 'LEADERBOARD' | 'QUIZATON_CERTIFICATE' | 'STUDY_PAL',
    }): CancelablePromise<Record<string, string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/distinction/portal/subscriptions/limit',
            query: {
                'property': property,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns SubscriptionView OK
     * @throws ApiError
     */
    public static getSubscription(): CancelablePromise<SubscriptionView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/distinction/portal/subscriptions/active',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns boolean OK
     * @throws ApiError
     */
    public static cancelSubscription(): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/distinction/portal/subscriptions/cancel',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
