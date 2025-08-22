/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActivityRequest } from '../models/ActivityRequest';
import type { StreakHistoryDto } from '../models/StreakHistoryDto';
import type { StreakNotificationSettingsDto } from '../models/StreakNotificationSettingsDto';
import type { UserStreakStatusDto } from '../models/UserStreakStatusDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StreakService {
    /**
     * Get current user's streak notification settings
     * @returns StreakNotificationSettingsDto OK
     * @throws ApiError
     */
    public static getCurrentUserSettings(): CancelablePromise<StreakNotificationSettingsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/streak/user-streak-settings',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Update current user's streak notification settings
     * @returns StreakNotificationSettingsDto OK
     * @throws ApiError
     */
    public static updateCurrentUserSettings({
        requestBody,
    }: {
        requestBody: StreakNotificationSettingsDto,
    }): CancelablePromise<StreakNotificationSettingsDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/streak/user-streak-settings',
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
    public static testEmailTemplate({
        toAddress,
        template,
    }: {
        toAddress?: string,
        template?: string,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/streak/email-testing',
            query: {
                'toAddress': toAddress,
                'template': template,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Record a new activity and update streak
     * @returns any OK
     * @throws ApiError
     */
    public static recordActivity({
        requestBody,
    }: {
        requestBody: ActivityRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/streak/activities',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get current user's streak statistics
     * @returns UserStreakStatusDto OK
     * @throws ApiError
     */
    public static getCurrentUserStreakStatus(): CancelablePromise<UserStreakStatusDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/streak/user-streak-stats',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get current user's complete streak history
     * @returns StreakHistoryDto OK
     * @throws ApiError
     */
    public static getUserStreakHistory(): CancelablePromise<Array<StreakHistoryDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/streak/user-streak-history',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get current user's recent streak history
     * @returns StreakHistoryDto OK
     * @throws ApiError
     */
    public static getRecentStreakHistory({
        days = 7,
    }: {
        /**
         * Number of days to look back
         */
        days?: number,
    }): CancelablePromise<Array<StreakHistoryDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/streak/user-streak-history/recent',
            query: {
                'days': days,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get current user's streak history within a date range
     * @returns StreakHistoryDto OK
     * @throws ApiError
     */
    public static getStreakHistoryInRange({
        startDate,
        endDate,
    }: {
        /**
         * Start date (YYYY-MM-DD)
         */
        startDate: string,
        /**
         * End date (YYYY-MM-DD)
         */
        endDate: string,
    }): CancelablePromise<Array<StreakHistoryDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/streak/user-streak-history/range',
            query: {
                'startDate': startDate,
                'endDate': endDate,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get current user's streak achievements
     * @returns StreakHistoryDto OK
     * @throws ApiError
     */
    public static getUserAchievements(): CancelablePromise<Array<StreakHistoryDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/streak/user-achievements',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Check if user has completed activity for a specific date
     * @returns boolean OK
     * @throws ApiError
     */
    public static hasActivityForDate({
        date,
    }: {
        /**
         * Date to check (YYYY-MM-DD)
         */
        date: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/streak/activity-status/{date}',
            path: {
                'date': date,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
