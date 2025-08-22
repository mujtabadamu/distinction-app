/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FlashcardView } from '../models/FlashcardView';
import type { PaginatedFlashcardView } from '../models/PaginatedFlashcardView';
import type { ResponseBodyEmitter } from '../models/ResponseBodyEmitter';
import type { UpdateFlashcardRequest } from '../models/UpdateFlashcardRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FlashcardsService {
    /**
     * @returns FlashcardView OK
     * @throws ApiError
     */
    public static update12({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: UpdateFlashcardRequest,
    }): CancelablePromise<FlashcardView> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/flashcards/{id}/rename',
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
     * @returns PaginatedFlashcardView OK
     * @throws ApiError
     */
    public static list19({
        studentId,
        keyword,
        paperId,
        difficulty,
        page,
        size = 10,
    }: {
        studentId: string,
        keyword?: string,
        paperId?: string,
        difficulty?: 'EASY' | 'MEDIUM' | 'HARD',
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedFlashcardView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flashcards',
            query: {
                'keyword': keyword,
                'paperId': paperId,
                'studentId': studentId,
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
     * @returns FlashcardView OK
     * @throws ApiError
     */
    public static create13({
        difficulty,
        paperId,
        formData,
    }: {
        difficulty: 'EASY' | 'MEDIUM' | 'HARD',
        paperId: string,
        formData?: {
            file?: Blob;
        },
    }): CancelablePromise<FlashcardView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/flashcards',
            query: {
                'difficulty': difficulty,
                'paperId': paperId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns FlashcardView OK
     * @throws ApiError
     */
    public static generateFlashcardsV3({
        difficulty,
        curriculum,
        paperId,
        formData,
    }: {
        difficulty: 'EASY' | 'MEDIUM' | 'HARD',
        curriculum?: 'NUC' | 'NBTE' | 'NCCE' | 'OTHERS',
        paperId?: string,
        formData?: {
            file?: Blob;
        },
    }): CancelablePromise<FlashcardView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/flashcards/v3',
            query: {
                'difficulty': difficulty,
                'curriculum': curriculum,
                'paperId': paperId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns FlashcardView OK
     * @throws ApiError
     */
    public static inferKnowledge1({
        difficulty,
        paperId,
        formData,
    }: {
        difficulty: 'EASY' | 'MEDIUM' | 'HARD',
        paperId: string,
        formData?: {
            file?: Blob;
        },
    }): CancelablePromise<FlashcardView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/flashcards/v2',
            query: {
                'difficulty': difficulty,
                'paperId': paperId,
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
    public static inferKnowledgeWithStreaming1({
        difficulty,
        paperId,
        cardsCount,
    }: {
        difficulty: 'EASY' | 'MEDIUM' | 'HARD',
        paperId: string,
        cardsCount: number,
    }): CancelablePromise<ResponseBodyEmitter> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/flashcards/v2-streaming',
            query: {
                'difficulty': difficulty,
                'paperId': paperId,
                'cardsCount': cardsCount,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns FlashcardView OK
     * @throws ApiError
     */
    public static get11({
        id,
    }: {
        id: string,
    }): CancelablePromise<FlashcardView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flashcards/{id}',
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
    public static delete12({
        id,
    }: {
        id: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/flashcards/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
