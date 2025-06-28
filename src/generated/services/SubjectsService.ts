/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SimpleSubjectView } from '../models/SimpleSubjectView';
import type { Subject } from '../models/Subject';
import type { SubjectRequest } from '../models/SubjectRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SubjectsService {
    /**
     * @returns Subject OK
     * @throws ApiError
     */
    public static update2({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: SubjectRequest,
    }): CancelablePromise<Subject> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/subjects/{id}',
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
    public static delete1({
        id,
    }: {
        id: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/subjects/{id}',
            path: {
                'id': id,
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
    public static list2({
        curriculum,
    }: {
        curriculum?: 'NUC' | 'NBTE' | 'NCCE' | 'OTHERS',
    }): CancelablePromise<Array<SimpleSubjectView>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/subjects',
            query: {
                'curriculum': curriculum,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns Subject OK
     * @throws ApiError
     */
    public static create2({
        requestBody,
    }: {
        requestBody: SubjectRequest,
    }): CancelablePromise<Subject> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/subjects',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
