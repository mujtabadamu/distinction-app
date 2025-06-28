/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BadgesDto } from '../models/BadgesDto';
import type { GlobalRankingDto } from '../models/GlobalRankingDto';
import type { MonthlyPracticeDto } from '../models/MonthlyPracticeDto';
import type { PointTypeView } from '../models/PointTypeView';
import type { SchoolRankingDto } from '../models/SchoolRankingDto';
import type { TotalPointsDto } from '../models/TotalPointsDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PointAccumulationSystemService {
    /**
     * @returns SchoolRankingDto OK
     * @throws ApiError
     */
    public static getSchoolRanking({
        schoolId,
        userId,
        page = 1,
        limit = 10,
    }: {
        schoolId: string,
        userId?: string,
        page?: number,
        limit?: number,
    }): CancelablePromise<SchoolRankingDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ranking/school',
            query: {
                'schoolId': schoolId,
                'userId': userId,
                'page': page,
                'limit': limit,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns GlobalRankingDto OK
     * @throws ApiError
     */
    public static getGlobalRanking({
        userId,
        page = 1,
        limit = 10,
    }: {
        userId?: string,
        page?: number,
        limit?: number,
    }): CancelablePromise<GlobalRankingDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ranking/global',
            query: {
                'userId': userId,
                'page': page,
                'limit': limit,
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
    public static getQuestionCountByYear({
        year,
    }: {
        year?: number,
    }): CancelablePromise<Record<string, number>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/questions-count-by-year',
            query: {
                'year': year,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns TotalPointsDto OK
     * @throws ApiError
     */
    public static getTotalPoints({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<TotalPointsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/points/total',
            query: {
                'userId': userId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PointTypeView OK
     * @throws ApiError
     */
    public static getAllPointTypes(): CancelablePromise<Array<PointTypeView>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/point-types',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns MonthlyPracticeDto OK
     * @throws ApiError
     */
    public static getMonthlyPractice({
        userId,
        year,
    }: {
        userId: string,
        year?: number,
    }): CancelablePromise<MonthlyPracticeDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/monthly-practice',
            query: {
                'userId': userId,
                'year': year,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns BadgesDto OK
     * @throws ApiError
     */
    public static getBadges(): CancelablePromise<BadgesDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/badges',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
