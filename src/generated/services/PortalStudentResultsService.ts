/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedStudentResultView } from '../models/PaginatedStudentResultView';
import type { StudentResultView } from '../models/StudentResultView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PortalStudentResultsService {
    /**
     * @returns PaginatedStudentResultView OK
     * @throws ApiError
     */
    public static list8({
        keyword,
        paperId,
        examGroupId,
        examId,
        page,
        size = 10,
    }: {
        keyword?: string,
        paperId?: string,
        examGroupId?: string,
        examId?: string,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedStudentResultView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/portal/student-results',
            query: {
                'keyword': keyword,
                'paperId': paperId,
                'examGroupId': examGroupId,
                'examId': examId,
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns StudentResultView OK
     * @throws ApiError
     */
    public static retrieve1({
        id,
    }: {
        id: string,
    }): CancelablePromise<StudentResultView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/portal/student-results/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
