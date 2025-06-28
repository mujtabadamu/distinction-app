/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedExamView } from '../models/PaginatedExamView';
import type { PaginatedSimpleExamGroupView } from '../models/PaginatedSimpleExamGroupView';
import type { PaginatedSimplePaperView } from '../models/PaginatedSimplePaperView';
import type { SimpleSubjectView } from '../models/SimpleSubjectView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PortalService {
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static getTopics({
        examGroupId,
        subjectId,
        years,
    }: {
        examGroupId: string,
        subjectId: string,
        years?: Array<number>,
    }): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/portal/topics',
            query: {
                'examGroupId': examGroupId,
                'subjectId': subjectId,
                'years': years,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns SimpleSubjectView OK
     * @throws ApiError
     */
    public static getSubjects({
        examGroupId,
    }: {
        examGroupId?: string,
    }): CancelablePromise<Array<SimpleSubjectView>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/portal/subjects',
            query: {
                'examGroupId': examGroupId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedSimplePaperView OK
     * @throws ApiError
     */
    public static getPapers({
        keyword,
        name,
        examId,
        examGroupId,
        year,
        subjectId,
        curriculum,
        page,
        size = 10,
    }: {
        keyword?: string,
        name?: string,
        examId?: string,
        examGroupId?: string,
        year?: number,
        subjectId?: string,
        curriculum?: 'NUC' | 'NBTE' | 'NCCE' | 'OTHERS',
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedSimplePaperView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/portal/papers',
            query: {
                'keyword': keyword,
                'name': name,
                'examId': examId,
                'examGroupId': examGroupId,
                'year': year,
                'subjectId': subjectId,
                'curriculum': curriculum,
                'page': page,
                'size': size,
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
    public static getExams({
        name,
        year,
        examGroupId,
        page,
        size = 10,
    }: {
        name?: string,
        year?: number,
        examGroupId?: string,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedExamView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/portal/exams',
            query: {
                'name': name,
                'year': year,
                'examGroupId': examGroupId,
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedSimpleExamGroupView OK
     * @throws ApiError
     */
    public static getExamGroups({
        name,
        page,
        size = 10,
    }: {
        name?: string,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedSimpleExamGroupView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/portal/exam-groups',
            query: {
                'name': name,
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
