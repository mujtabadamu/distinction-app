/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FlashcardUsageRequest } from '../models/FlashcardUsageRequest';
import type { FlashcardUsageView } from '../models/FlashcardUsageView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FlashcardUsageControllerService {
    /**
     * @returns FlashcardUsageView OK
     * @throws ApiError
     */
    public static recordUsage({
        requestBody,
    }: {
        requestBody: FlashcardUsageRequest,
    }): CancelablePromise<FlashcardUsageView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/flashcard-usage',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns FlashcardUsageView OK
     * @throws ApiError
     */
    public static getUsageByStudent({
        studentId,
    }: {
        studentId: string,
    }): CancelablePromise<Array<FlashcardUsageView>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flashcard-usage/student/{studentId}',
            path: {
                'studentId': studentId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns number OK
     * @throws ApiError
     */
    public static countActionsByStudent({
        studentId,
        actionType,
    }: {
        studentId: string,
        actionType: 'TAP_TO_FLIP' | 'SKIP' | 'COMPLETE',
    }): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flashcard-usage/student/{studentId}/count/{actionType}',
            path: {
                'studentId': studentId,
                'actionType': actionType,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
