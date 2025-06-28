/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedStudentPracticeSimpleView } from '../models/PaginatedStudentPracticeSimpleView';
import type { StudentPracticeRequest } from '../models/StudentPracticeRequest';
import type { StudentPracticeResultRequest } from '../models/StudentPracticeResultRequest';
import type { StudentPracticeResultView } from '../models/StudentPracticeResultView';
import type { StudentPracticeView } from '../models/StudentPracticeView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PortalStudentPracticeService {
    /**
     * @returns PaginatedStudentPracticeSimpleView OK
     * @throws ApiError
     */
    public static list9({
        keyword,
        subjectId,
        paperId,
        date,
        completed,
        page,
        size = 10,
    }: {
        keyword?: string,
        subjectId?: string,
        paperId?: string,
        date?: string,
        completed?: boolean,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedStudentPracticeSimpleView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/portal/student-practice',
            query: {
                'keyword': keyword,
                'subjectId': subjectId,
                'paperId': paperId,
                'date': date,
                'completed': completed,
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns StudentPracticeView OK
     * @throws ApiError
     */
    public static start({
        requestBody,
    }: {
        requestBody: StudentPracticeRequest,
    }): CancelablePromise<StudentPracticeView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/portal/student-practice',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns StudentPracticeResultView OK
     * @throws ApiError
     */
    public static submitResult({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: StudentPracticeResultRequest,
    }): CancelablePromise<StudentPracticeResultView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/portal/student-practice/{id}/submit',
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
     * @returns StudentPracticeView OK
     * @throws ApiError
     */
    public static retrieve2({
        id,
    }: {
        id: string,
    }): CancelablePromise<StudentPracticeView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/portal/student-practice/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
