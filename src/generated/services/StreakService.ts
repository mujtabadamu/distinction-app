/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StreakNotificationSettingsDto } from '../models/StreakNotificationSettingsDto';
import type { UserStreakStatusDto } from '../models/UserStreakStatusDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StreakService {
    /**
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
}
