/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Achievement } from '../models/Achievement';
import type { DailyTrend } from '../models/DailyTrend';
import type { FlashcardDashboardView } from '../models/FlashcardDashboardView';
import type { FlashcardSessionView } from '../models/FlashcardSessionView';
import type { SessionOutcomes } from '../models/SessionOutcomes';
import type { StudyStreak } from '../models/StudyStreak';
import type { WeeklySummary } from '../models/WeeklySummary';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FlashcardDashboardControllerService {
    /**
     * @returns WeeklySummary OK
     * @throws ApiError
     */
    public static getWeeklySummary({
        studentId,
        weekStart,
    }: {
        studentId: string,
        weekStart?: string,
    }): CancelablePromise<WeeklySummary> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flashcard-dashboard/student/{studentId}/weekly-summary',
            path: {
                'studentId': studentId,
            },
            query: {
                'weekStart': weekStart,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns DailyTrend OK
     * @throws ApiError
     */
    public static getStudyTrends({
        studentId,
        days = 7,
    }: {
        studentId: string,
        days?: number,
    }): CancelablePromise<Array<DailyTrend>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flashcard-dashboard/student/{studentId}/trends',
            path: {
                'studentId': studentId,
            },
            query: {
                'days': days,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns StudyStreak OK
     * @throws ApiError
     */
    public static getStudyStreak({
        studentId,
    }: {
        studentId: string,
    }): CancelablePromise<StudyStreak> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flashcard-dashboard/student/{studentId}/streak',
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
    public static getSessionHistory({
        studentId,
        page,
        size = 10,
    }: {
        studentId: string,
        page?: number,
        size?: number,
    }): CancelablePromise<Array<FlashcardSessionView>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flashcard-dashboard/student/{studentId}/sessions',
            path: {
                'studentId': studentId,
            },
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
     * @returns FlashcardDashboardView OK
     * @throws ApiError
     */
    public static getDashboardOverview({
        studentId,
    }: {
        studentId: string,
    }): CancelablePromise<FlashcardDashboardView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flashcard-dashboard/student/{studentId}/overview',
            path: {
                'studentId': studentId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns SessionOutcomes OK
     * @throws ApiError
     */
    public static getSessionOutcomes({
        studentId,
    }: {
        studentId: string,
    }): CancelablePromise<SessionOutcomes> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flashcard-dashboard/student/{studentId}/outcomes',
            path: {
                'studentId': studentId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns Achievement OK
     * @throws ApiError
     */
    public static getAchievements({
        studentId,
    }: {
        studentId: string,
    }): CancelablePromise<Array<Achievement>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flashcard-dashboard/student/{studentId}/achievements',
            path: {
                'studentId': studentId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
