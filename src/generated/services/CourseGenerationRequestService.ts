/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CourseGenerationRequestView } from '../models/CourseGenerationRequestView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CourseGenerationRequestService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static manualRetry({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/course-gen-requests/{id}/retry',
            path: {
                'id': id,
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
    public static resetRetryCount({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/course-gen-requests/{id}/reset-retry',
            path: {
                'id': id,
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
    public static updateProgress({
        id,
        percentage,
        stage,
        message,
    }: {
        id: string,
        percentage: number,
        stage: string,
        message: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/course-gen-requests/{id}/progress',
            path: {
                'id': id,
            },
            query: {
                'percentage': percentage,
                'stage': stage,
                'message': message,
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
    public static updateAiStatus1({
        id,
        aiStatus,
        aiError,
    }: {
        id: string,
        aiStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'RETRYING',
        aiError?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/course-gen-requests/{id}/ai-status',
            path: {
                'id': id,
            },
            query: {
                'aiStatus': aiStatus,
                'aiError': aiError,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns CourseGenerationRequestView OK
     * @throws ApiError
     */
    public static get16({
        id,
    }: {
        id: string,
    }): CancelablePromise<CourseGenerationRequestView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/course-gen-requests/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns CourseGenerationRequestView OK
     * @throws ApiError
     */
    public static getRequestsNeedingRetry(): CancelablePromise<Array<CourseGenerationRequestView>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/course-gen-requests/retry/needed',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns CourseGenerationRequestView OK
     * @throws ApiError
     */
    public static getByProgressStage({
        stage,
    }: {
        stage: string,
    }): CancelablePromise<Array<CourseGenerationRequestView>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/course-gen-requests/progress/stage/{stage}',
            path: {
                'stage': stage,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns CourseGenerationRequestView OK
     * @throws ApiError
     */
    public static getByProgressPercentage({
        minPercentage,
        maxPercentage,
    }: {
        minPercentage: number,
        maxPercentage: number,
    }): CancelablePromise<Array<CourseGenerationRequestView>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/course-gen-requests/progress/percentage',
            query: {
                'minPercentage': minPercentage,
                'maxPercentage': maxPercentage,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns CourseGenerationRequestView OK
     * @throws ApiError
     */
    public static getByAiStatus1({
        aiStatus,
    }: {
        aiStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'RETRYING',
    }): CancelablePromise<Array<CourseGenerationRequestView>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/course-gen-requests/ai-status/{aiStatus}',
            path: {
                'aiStatus': aiStatus,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns CourseGenerationRequestView OK
     * @throws ApiError
     */
    public static getByAiJobId({
        aiJobId,
    }: {
        aiJobId: string,
    }): CancelablePromise<CourseGenerationRequestView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/course-gen-requests/ai-job/{aiJobId}',
            path: {
                'aiJobId': aiJobId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
