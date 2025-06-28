/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FlaggedQuestionStatsView } from '../models/FlaggedQuestionStatsView';
import type { FlagQuestionRequest } from '../models/FlagQuestionRequest';
import type { FlagQuestionView } from '../models/FlagQuestionView';
import type { PaginatedFlagQuestionSimpleView } from '../models/PaginatedFlagQuestionSimpleView';
import type { ResolveFlagQuestionRequest } from '../models/ResolveFlagQuestionRequest';
import type { SimpleQuestionView } from '../models/SimpleQuestionView';
import type { TrendingFlagsView } from '../models/TrendingFlagsView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FlagQuestionService {
    /**
     * @returns PaginatedFlagQuestionSimpleView OK
     * @throws ApiError
     */
    public static listFlagQuestion({
        keyword,
        issueType,
        resolved,
        questionId,
        page,
        size = 10,
    }: {
        keyword?: string,
        issueType?: 'QUESTION' | 'ANSWER' | 'DUPLICATE' | 'OTHER',
        resolved?: boolean,
        questionId?: string,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedFlagQuestionSimpleView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flagged-questions',
            query: {
                'keyword': keyword,
                'issueType': issueType,
                'resolved': resolved,
                'questionId': questionId,
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns FlagQuestionView OK
     * @throws ApiError
     */
    public static reportQuestion({
        requestBody,
    }: {
        requestBody: FlagQuestionRequest,
    }): CancelablePromise<FlagQuestionView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/flagged-questions',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns FlagQuestionView OK
     * @throws ApiError
     */
    public static resolveQuestion({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: ResolveFlagQuestionRequest,
    }): CancelablePromise<FlagQuestionView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/flagged-questions/{id}/resolve',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns FlagQuestionView OK
     * @throws ApiError
     */
    public static getFlaggedQuestion({
        id,
    }: {
        id: string,
    }): CancelablePromise<FlagQuestionView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flagged-questions/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns TrendingFlagsView OK
     * @throws ApiError
     */
    public static getTrendingFlagsStats({
        period,
    }: {
        period: string,
    }): CancelablePromise<Array<TrendingFlagsView>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flagged-questions/trending',
            query: {
                'period': period,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns FlaggedQuestionStatsView OK
     * @throws ApiError
     */
    public static getFlaggedQuestionStats(): CancelablePromise<FlaggedQuestionStatsView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flagged-questions/stats',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns SimpleQuestionView OK
     * @throws ApiError
     */
    public static suggestion({
        flaggedQuestionId,
    }: {
        flaggedQuestionId: string,
    }): CancelablePromise<SimpleQuestionView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flagged-questions/ai-suggestion/{flaggedQuestionId}',
            path: {
                'flaggedQuestionId': flaggedQuestionId,
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
    public static removeDuplicates({
        questionId,
    }: {
        questionId: string,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/flagged-questions/clear-duplicates/{questionId}',
            path: {
                'questionId': questionId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
