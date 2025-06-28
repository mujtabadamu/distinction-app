/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { KeypointSummaryView } from '../models/KeypointSummaryView';
import type { KeypointView } from '../models/KeypointView';
import type { PaginatedKeypointView } from '../models/PaginatedKeypointView';
import type { ResponseBodyEmitter } from '../models/ResponseBodyEmitter';
import type { UpdateKeyPointRequest } from '../models/UpdateKeyPointRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class KeyPointsService {
    /**
     * @returns KeypointView OK
     * @throws ApiError
     */
    public static update10({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: UpdateKeyPointRequest,
    }): CancelablePromise<KeypointView> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/keypoints/{id}/rename',
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
     * @returns PaginatedKeypointView OK
     * @throws ApiError
     */
    public static list17({
        studentId,
        keyword,
        paperId,
        page,
        size = 10,
    }: {
        studentId: string,
        keyword?: string,
        paperId?: string,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedKeypointView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/keypoints',
            query: {
                'keyword': keyword,
                'paperId': paperId,
                'studentId': studentId,
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns KeypointView OK
     * @throws ApiError
     */
    public static create10({
        paperId,
        formData,
    }: {
        paperId: string,
        formData?: {
            file?: Blob;
        },
    }): CancelablePromise<KeypointView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/keypoints',
            query: {
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
     * @returns KeypointView OK
     * @throws ApiError
     */
    public static createKeypointV3({
        curriculum,
        paperId,
        formData,
    }: {
        curriculum?: 'NUC' | 'NBTE' | 'NCCE' | 'OTHERS',
        paperId?: string,
        formData?: {
            file?: Blob;
        },
    }): CancelablePromise<KeypointView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/keypoints/v3',
            query: {
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
     * @returns KeypointView OK
     * @throws ApiError
     */
    public static inferKnowledge({
        paperId,
        formData,
    }: {
        paperId: string,
        formData?: {
            file?: Blob;
        },
    }): CancelablePromise<KeypointView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/keypoints/v2',
            query: {
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
    public static inferKnowledgeWithStreaming({
        paperId,
    }: {
        paperId: string,
    }): CancelablePromise<ResponseBodyEmitter> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/keypoints/v2-streaming',
            query: {
                'paperId': paperId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns KeypointView OK
     * @throws ApiError
     */
    public static get8({
        id,
    }: {
        id: string,
    }): CancelablePromise<KeypointView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/keypoints/{id}',
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
    public static delete10({
        id,
    }: {
        id: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/keypoints/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns KeypointSummaryView OK
     * @throws ApiError
     */
    public static keyPointPapers({
        studentId,
        keyword,
        paperId,
    }: {
        studentId: string,
        keyword?: string,
        paperId?: string,
    }): CancelablePromise<Array<KeypointSummaryView>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/keypoints/papers',
            query: {
                'keyword': keyword,
                'paperId': paperId,
                'studentId': studentId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
