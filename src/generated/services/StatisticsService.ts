/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuestionStatisticsResponse } from '../models/QuestionStatisticsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StatisticsService {
    /**
     * @returns QuestionStatisticsResponse OK
     * @throws ApiError
     */
    public static getTotalQuestions({
        examGroupId,
        examId,
        paperId,
    }: {
        examGroupId?: string,
        examId?: string,
        paperId?: string,
    }): CancelablePromise<QuestionStatisticsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/statistics/questions',
            query: {
                'examGroupId': examGroupId,
                'examId': examId,
                'paperId': paperId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
