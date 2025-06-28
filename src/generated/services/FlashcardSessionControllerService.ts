/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FlashcardSessionRequest } from '../models/FlashcardSessionRequest';
import type { FlashcardSessionView } from '../models/FlashcardSessionView';
import type { FlashcardUsageStatisticsView } from '../models/FlashcardUsageStatisticsView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FlashcardSessionControllerService {
    /**
     * @returns FlashcardSessionView OK
     * @throws ApiError
     */
    public static updateSessionStatistics({
        sessionId,
    }: {
        sessionId: string,
    }): CancelablePromise<FlashcardSessionView> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/flashcard-sessions/{sessionId}/update-stats',
            path: {
                'sessionId': sessionId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns FlashcardSessionView OK
     * @throws ApiError
     */
    public static resumeSession({
        sessionId,
    }: {
        sessionId: string,
    }): CancelablePromise<FlashcardSessionView> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/flashcard-sessions/{sessionId}/resume',
            path: {
                'sessionId': sessionId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns FlashcardSessionView OK
     * @throws ApiError
     */
    public static pauseSession({
        sessionId,
    }: {
        sessionId: string,
    }): CancelablePromise<FlashcardSessionView> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/flashcard-sessions/{sessionId}/pause',
            path: {
                'sessionId': sessionId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns FlashcardSessionView OK
     * @throws ApiError
     */
    public static endSession({
        sessionId,
        status,
    }: {
        sessionId: string,
        status: 'ACTIVE' | 'COMPLETED' | 'PAUSED' | 'ABANDONED',
    }): CancelablePromise<FlashcardSessionView> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/flashcard-sessions/{sessionId}/end',
            path: {
                'sessionId': sessionId,
            },
            query: {
                'status': status,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns FlashcardSessionView OK
     * @throws ApiError
     */
    public static abandonSession({
        sessionId,
    }: {
        sessionId: string,
    }): CancelablePromise<FlashcardSessionView> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/flashcard-sessions/{sessionId}/abandon',
            path: {
                'sessionId': sessionId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns FlashcardSessionView OK
     * @throws ApiError
     */
    public static startSession({
        requestBody,
    }: {
        requestBody: FlashcardSessionRequest,
    }): CancelablePromise<FlashcardSessionView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/flashcard-sessions/start',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns FlashcardSessionView OK
     * @throws ApiError
     */
    public static getSessionById({
        sessionId,
    }: {
        sessionId: string,
    }): CancelablePromise<FlashcardSessionView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flashcard-sessions/{sessionId}',
            path: {
                'sessionId': sessionId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static getSessionStatus({
        sessionId,
    }: {
        sessionId: string,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flashcard-sessions/{sessionId}/status',
            path: {
                'sessionId': sessionId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns FlashcardSessionView OK
     * @throws ApiError
     */
    public static getSessionsByStudent({
        studentId,
    }: {
        studentId: string,
    }): CancelablePromise<Array<FlashcardSessionView>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flashcard-sessions/student/{studentId}',
            path: {
                'studentId': studentId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns FlashcardUsageStatisticsView OK
     * @throws ApiError
     */
    public static getSessionStatistics({
        studentId,
    }: {
        studentId: string,
    }): CancelablePromise<FlashcardUsageStatisticsView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flashcard-sessions/student/{studentId}/statistics',
            path: {
                'studentId': studentId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns FlashcardSessionView OK
     * @throws ApiError
     */
    public static getActiveSession({
        studentId,
        flashcardId,
    }: {
        studentId: string,
        flashcardId: string,
    }): CancelablePromise<FlashcardSessionView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flashcard-sessions/active',
            query: {
                'studentId': studentId,
                'flashcardId': flashcardId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
