/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuestionRequest } from '../models/QuestionRequest';
import type { ResponseBodyEmitter } from '../models/ResponseBodyEmitter';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AiQuestionsService {
    /**
     * @returns ResponseBodyEmitter OK
     * @throws ApiError
     */
    public static batchStreaming({
        paperId,
        optionsCount,
        questionsCount,
        questionType,
        query,
        requestBody,
    }: {
        paperId: string,
        optionsCount: number,
        questionsCount: number,
        questionType: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'SHORT_TEXT' | 'LONG_TEXT',
        query?: string,
        requestBody?: {
            contentFile?: Blob;
        },
    }): CancelablePromise<ResponseBodyEmitter> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ai-questions/v3-batch-streaming',
            query: {
                'query': query,
                'paperId': paperId,
                'optionsCount': optionsCount,
                'questionsCount': questionsCount,
                'questionType': questionType,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns QuestionRequest OK
     * @throws ApiError
     */
    public static inferKnowledge2({
        paperId,
        optionsCount,
        questionsCount,
        questionType,
        query,
        formData,
    }: {
        paperId: string,
        optionsCount: number,
        questionsCount: number,
        questionType: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'SHORT_TEXT' | 'LONG_TEXT',
        query?: string,
        formData?: {
            contentFile?: Blob;
        },
    }): CancelablePromise<Array<QuestionRequest>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ai-questions/v2',
            query: {
                'query': query,
                'paperId': paperId,
                'optionsCount': optionsCount,
                'questionsCount': questionsCount,
                'questionType': questionType,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns ResponseBodyEmitter OK
     * @throws ApiError
     */
    public static inferKnowledgeStreaming({
        query,
        paperName,
        optionsCount,
        questionsCount,
        questionType,
    }: {
        query: string,
        paperName: string,
        optionsCount: number,
        questionsCount: number,
        questionType: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'SHORT_TEXT' | 'LONG_TEXT',
    }): CancelablePromise<ResponseBodyEmitter> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ai-questions/v2-streaming',
            query: {
                'query': query,
                'paperName': paperName,
                'optionsCount': optionsCount,
                'questionsCount': questionsCount,
                'questionType': questionType,
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
    public static save({
        paperId,
        requestBody,
    }: {
        paperId: string,
        requestBody: Array<QuestionRequest>,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ai-questions/save',
            query: {
                'paperId': paperId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns QuestionRequest OK
     * @throws ApiError
     */
    public static generateQuestions2({
        paperId,
        questionType,
        questionCount = 5,
        optionCount = 4,
        formData,
    }: {
        paperId: string,
        questionType: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'SHORT_TEXT' | 'LONG_TEXT',
        questionCount?: number,
        optionCount?: number,
        formData?: {
            curriculumFile?: Blob;
            contentFile?: Blob;
        },
    }): CancelablePromise<Array<QuestionRequest>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ai-questions/generate',
            query: {
                'paperId': paperId,
                'questionCount': questionCount,
                'question-type': questionType,
                'optionCount': optionCount,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static create22({
        paperName,
        paperId,
        formData,
    }: {
        paperName: string,
        paperId: string,
        formData?: {
            file: Array<Blob>;
        },
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ai-questions/add-knowledge',
            query: {
                'paperName': paperName,
                'paperId': paperId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
