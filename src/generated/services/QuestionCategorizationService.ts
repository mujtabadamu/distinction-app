/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuestionCategorizationResponse } from '../models/QuestionCategorizationResponse';
import type { QuestionData } from '../models/QuestionData';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class QuestionCategorizationService {
    /**
     * Categorize questions by difficulty level using AI
     * @returns QuestionCategorizationResponse OK
     * @throws ApiError
     */
    public static categorizeQuestions({
        requestBody,
    }: {
        requestBody: Array<QuestionData>,
    }): CancelablePromise<QuestionCategorizationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/categorize',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Categorize a single question by difficulty level
     * @returns string OK
     * @throws ApiError
     */
    public static categorizeQuestion({
        questionId,
    }: {
        questionId: string,
    }): CancelablePromise<'EASY' | 'MEDIUM' | 'HARD' | 'RANDOM'> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/categorize/question/{questionId}',
            path: {
                'questionId': questionId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Categorize and persist a single question by difficulty level
     * @returns string OK
     * @throws ApiError
     */
    public static categorizeAndPersistQuestion({
        questionId,
    }: {
        questionId: string,
    }): CancelablePromise<'EASY' | 'MEDIUM' | 'HARD' | 'RANDOM'> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/categorize/question/{questionId}/persist',
            path: {
                'questionId': questionId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Categorize all questions for a specific paper
     * @returns string OK
     * @throws ApiError
     */
    public static categorizeQuestionsByPaper({
        paperId,
    }: {
        paperId: string,
    }): CancelablePromise<Record<string, 'EASY' | 'MEDIUM' | 'HARD' | 'RANDOM'>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/categorize/paper/{paperId}',
            path: {
                'paperId': paperId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Categorize and persist all questions for a specific paper
     * @returns string OK
     * @throws ApiError
     */
    public static categorizeAndPersistQuestionsByPaper({
        paperId,
    }: {
        paperId: string,
    }): CancelablePromise<Record<string, 'EASY' | 'MEDIUM' | 'HARD' | 'RANDOM'>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/categorize/paper/{paperId}/persist',
            path: {
                'paperId': paperId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Categorize multiple questions by their IDs
     * @returns string OK
     * @throws ApiError
     */
    public static categorizeQuestionsByIds({
        requestBody,
    }: {
        requestBody: Array<string>,
    }): CancelablePromise<Record<string, 'EASY' | 'MEDIUM' | 'HARD' | 'RANDOM'>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/categorize/by-ids',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Categorize and persist multiple questions by their IDs
     * @returns string OK
     * @throws ApiError
     */
    public static categorizeAndPersistQuestionsByIds({
        requestBody,
    }: {
        requestBody: Array<string>,
    }): CancelablePromise<Record<string, 'EASY' | 'MEDIUM' | 'HARD' | 'RANDOM'>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/categorize/by-ids/persist',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
