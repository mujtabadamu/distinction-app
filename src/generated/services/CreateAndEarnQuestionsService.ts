/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomQuestionRequest } from '../models/CustomQuestionRequest';
import type { CustomQuestionStatusRequest } from '../models/CustomQuestionStatusRequest';
import type { CustomQuestionUpdateRequest } from '../models/CustomQuestionUpdateRequest';
import type { CustomQuestionView } from '../models/CustomQuestionView';
import type { PaginatedSimpleCustomQuestionView } from '../models/PaginatedSimpleCustomQuestionView';
import type { SubmissionStatisticsResponse } from '../models/SubmissionStatisticsResponse';
import type { SubmissionsView } from '../models/SubmissionsView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CreateAndEarnQuestionsService {
    /**
     * @returns CustomQuestionView OK
     * @throws ApiError
     */
    public static get14({
        id,
    }: {
        id: string,
    }): CancelablePromise<CustomQuestionView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/custom-questions/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns CustomQuestionView OK
     * @throws ApiError
     */
    public static update16({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: CustomQuestionUpdateRequest,
    }): CancelablePromise<CustomQuestionView> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/custom-questions/{id}',
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
    public static delete19({
        id,
    }: {
        id: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/custom-questions/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedSimpleCustomQuestionView OK
     * @throws ApiError
     */
    public static list31({
        keyword,
        topic,
        tag,
        year,
        subjectId,
        paperId,
        examGroupId,
        examId,
        userId,
        status,
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
        userId?: string,
        status?: 'APPROVED' | 'DECLINED' | 'PENDING',
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedSimpleCustomQuestionView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/custom-questions',
            query: {
                'keyword': keyword,
                'topic': topic,
                'tag': tag,
                'year': year,
                'subjectId': subjectId,
                'paperId': paperId,
                'examGroupId': examGroupId,
                'examId': examId,
                'userId': userId,
                'status': status,
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns CustomQuestionView OK
     * @throws ApiError
     */
    public static create20({
        requestBody,
    }: {
        requestBody: CustomQuestionRequest,
    }): CancelablePromise<CustomQuestionView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/custom-questions',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns CustomQuestionView OK
     * @throws ApiError
     */
    public static updateCustomQuestionStatus({
        requestBody,
    }: {
        requestBody: CustomQuestionStatusRequest,
    }): CancelablePromise<CustomQuestionView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/custom-questions/update-status',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static bulkUploadQuestionsData2({
        paperId,
        formData,
    }: {
        paperId: string,
        formData?: {
            file: Blob;
        },
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/custom-questions/bulk-upload',
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
     * @returns SubmissionsView OK
     * @throws ApiError
     */
    public static getSubmissions(): CancelablePromise<Array<SubmissionsView>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/custom-questions/submissions',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns SubmissionStatisticsResponse OK
     * @throws ApiError
     */
    public static getStatistics({
        paperId,
        userId,
    }: {
        paperId?: string,
        userId?: string,
    }): CancelablePromise<SubmissionStatisticsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/custom-questions/statistics',
            query: {
                'paperId': paperId,
                'userId': userId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
