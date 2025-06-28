/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BulkCategorizationProgress } from '../models/BulkCategorizationProgress';
import type { BulkCategorizationResponse } from '../models/BulkCategorizationResponse';
import type { BulkCategorizationStatusResponse } from '../models/BulkCategorizationStatusResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BulkQuestionCategorizationService {
    /**
     * Stop bulk categorization
     * Attempts to stop the ongoing bulk categorization process
     * @returns BulkCategorizationResponse OK
     * @throws ApiError
     */
    public static stopBulkCategorization({
        institutionId,
    }: {
        /**
         * Institution ID to stop processing for
         */
        institutionId: string,
    }): CancelablePromise<BulkCategorizationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/bulk-categorization/stop',
            query: {
                'institutionId': institutionId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Start bulk categorization of all uncategorized questions
     * Initiates background processing of all questions that haven't been categorized by AI yet
     * @returns BulkCategorizationResponse OK
     * @throws ApiError
     */
    public static startBulkCategorization({
        institutionId,
    }: {
        /**
         * Institution ID to process questions for
         */
        institutionId: string,
    }): CancelablePromise<BulkCategorizationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/bulk-categorization/start',
            query: {
                'institutionId': institutionId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get bulk categorization status
     * Returns detailed status information about bulk categorization
     * @returns BulkCategorizationStatusResponse OK
     * @throws ApiError
     */
    public static getStatus({
        institutionId,
    }: {
        /**
         * Institution ID to check status for
         */
        institutionId: string,
    }): CancelablePromise<BulkCategorizationStatusResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/bulk-categorization/status',
            query: {
                'institutionId': institutionId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get bulk categorization progress
     * Returns the current progress of bulk categorization for the specified institution
     * @returns BulkCategorizationProgress OK
     * @throws ApiError
     */
    public static getProgress({
        institutionId,
    }: {
        /**
         * Institution ID to check progress for
         */
        institutionId: string,
    }): CancelablePromise<BulkCategorizationProgress> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/bulk-categorization/progress',
            query: {
                'institutionId': institutionId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
