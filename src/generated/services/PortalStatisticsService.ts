/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ScoreStatisticsResponse } from '../models/ScoreStatisticsResponse';
import type { ScoreTotalStatisticsResponse } from '../models/ScoreTotalStatisticsResponse';
import type { TimeStatisticsResponse } from '../models/TimeStatisticsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PortalStatisticsService {
    /**
     * @returns TimeStatisticsResponse OK
     * @throws ApiError
     */
    public static time({
        examGroupId,
        date,
        paperId,
        subjectId,
    }: {
        examGroupId?: string,
        date?: string,
        paperId?: string,
        subjectId?: string,
    }): CancelablePromise<TimeStatisticsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/portal/statistics/time',
            query: {
                'examGroupId': examGroupId,
                'date': date,
                'paperId': paperId,
                'subjectId': subjectId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns ScoreTotalStatisticsResponse OK
     * @throws ApiError
     */
    public static scoreTotal({
        examGroupId,
        date,
        paperId,
        subjectId,
    }: {
        examGroupId?: string,
        date?: string,
        paperId?: string,
        subjectId?: string,
    }): CancelablePromise<ScoreTotalStatisticsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/portal/statistics/scores',
            query: {
                'examGroupId': examGroupId,
                'date': date,
                'paperId': paperId,
                'subjectId': subjectId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns ScoreStatisticsResponse OK
     * @throws ApiError
     */
    public static scoreBreakdown({
        examGroupId,
        subjectId,
    }: {
        examGroupId?: string,
        subjectId?: string,
    }): CancelablePromise<ScoreStatisticsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/portal/statistics/scores/breakdown',
            query: {
                'examGroupId': examGroupId,
                'subjectId': subjectId,
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
    public static getQuestionCountByYear1({
        year,
    }: {
        year?: number,
    }): CancelablePromise<Record<string, number>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/portal/statistics/questions-count-by-year',
            query: {
                'year': year,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
