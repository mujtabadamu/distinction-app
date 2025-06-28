/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProfileShareEventRequest } from '../models/ProfileShareEventRequest';
import type { ProfileShareEventResponse } from '../models/ProfileShareEventResponse';
import type { ProfileVisitCountResponse } from '../models/ProfileVisitCountResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DistinctionProfileEventsService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static trackPublicProfileClick({
        username,
        requestBody,
    }: {
        username: string,
        requestBody: ProfileShareEventRequest,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/profile/event/track-public-profile/{username}',
            path: {
                'username': username,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns ProfileShareEventResponse OK
     * @throws ApiError
     */
    public static trackProfileShareEvent({
        requestBody,
    }: {
        requestBody: ProfileShareEventRequest,
    }): CancelablePromise<ProfileShareEventResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/profile/event/track-profile-shares',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns ProfileVisitCountResponse OK
     * @throws ApiError
     */
    public static getMyProfileVisitCount(): CancelablePromise<ProfileVisitCountResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/profile/event/count-profile-visits',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
