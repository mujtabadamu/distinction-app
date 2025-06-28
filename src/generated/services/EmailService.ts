/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EmailDashboardData } from '../models/EmailDashboardData';
import type { EmailTrackingStats } from '../models/EmailTrackingStats';
import type { TopCampaignData } from '../models/TopCampaignData';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EmailService {
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static trackEmailOpen({
        messageId,
    }: {
        messageId: string,
    }): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-tracking/open/{messageId}/pixel.gif',
            path: {
                'messageId': messageId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static trackEmailClick({
        messageId,
        url,
    }: {
        messageId: string,
        url: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-tracking/click/{messageId}',
            path: {
                'messageId': messageId,
            },
            query: {
                'url': url,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns TopCampaignData OK
     * @throws ApiError
     */
    public static getTopCampaigns({
        limit = 10,
    }: {
        limit?: number,
    }): CancelablePromise<Array<TopCampaignData>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-analytics/top-campaigns',
            query: {
                'limit': limit,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns EmailTrackingStats OK
     * @throws ApiError
     */
    public static getUserEmailStats({
        userEmail,
    }: {
        userEmail: string,
    }): CancelablePromise<EmailTrackingStats> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-analytics/stats/{userEmail}',
            path: {
                'userEmail': userEmail,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns EmailDashboardData OK
     * @throws ApiError
     */
    public static getDashboardData({
        startDate,
        endDate,
        emailType,
    }: {
        startDate?: string,
        endDate?: string,
        emailType?: string,
    }): CancelablePromise<EmailDashboardData> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-analytics/dashboard',
            query: {
                'startDate': startDate,
                'endDate': endDate,
                'emailType': emailType,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
