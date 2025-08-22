/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExamGroup } from '../models/ExamGroup';
import type { PaginatedSimpleExamGroupView } from '../models/PaginatedSimpleExamGroupView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ExamGroupsService {
    /**
     * @returns ExamGroup OK
     * @throws ApiError
     */
    public static examGroup({
        id,
    }: {
        id: string,
    }): CancelablePromise<ExamGroup> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/exam-groups/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns ExamGroup OK
     * @throws ApiError
     */
    public static update14({
        id,
        name,
        description,
        isActive = false,
        formData,
    }: {
        id: string,
        name: string,
        description?: string,
        isActive?: boolean,
        formData?: {
            image?: Blob;
        },
    }): CancelablePromise<ExamGroup> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/exam-groups/{id}',
            path: {
                'id': id,
            },
            query: {
                'name': name,
                'description': description,
                'isActive': isActive,
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
    public static delete15({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/exam-groups/{id}',
            path: {
                'id': id,
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
    public static list22({
        name,
        isActive,
        page,
        size = 10,
    }: {
        name?: string,
        isActive?: boolean,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedSimpleExamGroupView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/exam-groups',
            query: {
                'name': name,
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
     * @returns ExamGroup OK
     * @throws ApiError
     */
    public static create16({
        name,
        description,
        isActive = false,
        formData,
    }: {
        name: string,
        description?: string,
        isActive?: boolean,
        formData?: {
            image: Blob;
        },
    }): CancelablePromise<ExamGroup> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/exam-groups',
            query: {
                'name': name,
                'description': description,
                'isActive': isActive,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
