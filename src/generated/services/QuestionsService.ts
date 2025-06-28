/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedSimpleQuestionView } from '../models/PaginatedSimpleQuestionView';
import type { QuestionRequest } from '../models/QuestionRequest';
import type { QuestionUpdateRequest } from '../models/QuestionUpdateRequest';
import type { QuestionView } from '../models/QuestionView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class QuestionsService {
    /**
     * @returns QuestionView OK
     * @throws ApiError
     */
    public static get3({
        id,
    }: {
        id: string,
    }): CancelablePromise<QuestionView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/questions/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns QuestionView OK
     * @throws ApiError
     */
    public static update7({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: QuestionUpdateRequest,
    }): CancelablePromise<QuestionView> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/questions/{id}',
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
     * @returns any OK
     * @throws ApiError
     */
    public static delete6({
        id,
    }: {
        id: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/questions/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedSimpleQuestionView OK
     * @throws ApiError
     */
    public static list7({
        keyword,
        topic,
        tag,
        year,
        subjectId,
        paperId,
        examGroupId,
        examId,
        difficulty,
        page,
        size = 10,
    }: {
        keyword?: string,
        topic?: string,
        tag?: string,
        year?: number,
        subjectId?: string,
        paperId?: string,
        examGroupId?: string,
        examId?: string,
        difficulty?: 'EASY' | 'MEDIUM' | 'HARD' | 'RANDOM',
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedSimpleQuestionView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/questions',
            query: {
                'keyword': keyword,
                'topic': topic,
                'tag': tag,
                'year': year,
                'subjectId': subjectId,
                'paperId': paperId,
                'examGroupId': examGroupId,
                'examId': examId,
                'difficulty': difficulty,
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns QuestionView OK
     * @throws ApiError
     */
    public static create7({
        requestBody,
    }: {
        requestBody: QuestionRequest,
    }): CancelablePromise<QuestionView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/questions',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns QuestionView OK
     * @throws ApiError
     */
    public static bulkUploadQuestionsData1({
        paperId,
        difficulty = 'RANDOM',
        formData,
    }: {
        paperId: string,
        difficulty?: 'EASY' | 'MEDIUM' | 'HARD' | 'RANDOM',
        formData?: {
            file: Blob;
        },
    }): CancelablePromise<Array<QuestionView>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/questions/bulk-upload',
            query: {
                'paperId': paperId,
                'difficulty': difficulty,
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
    public static deleteDuplicates(): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/questions/delete-duplicates',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
