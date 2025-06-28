/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Exam } from '../models/Exam';
import type { ExamRequest } from '../models/ExamRequest';
import type { ExamView } from '../models/ExamView';
import type { PaginatedExamView } from '../models/PaginatedExamView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ExamsService {
    /**
     * @returns Exam OK
     * @throws ApiError
     */
    public static exam({
        id,
    }: {
        id: string,
    }): CancelablePromise<Exam> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/exams/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns Exam OK
     * @throws ApiError
     */
    public static update13({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: ExamRequest,
    }): CancelablePromise<Exam> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/exams/{id}',
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
    public static delete14({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/exams/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedExamView OK
     * @throws ApiError
     */
    public static list20({
        name,
        year,
        examGroupId,
        isActive,
        page,
        size = 10,
    }: {
        name?: string,
        year?: number,
        examGroupId?: string,
        isActive?: boolean,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedExamView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/exams',
            query: {
                'name': name,
                'year': year,
                'examGroupId': examGroupId,
                'isActive': isActive,
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns ExamView OK
     * @throws ApiError
     */
    public static create15({
        requestBody,
    }: {
        requestBody: ExamRequest,
    }): CancelablePromise<ExamView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/exams',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
