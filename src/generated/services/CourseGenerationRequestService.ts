/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CourseGenerationRequestView } from '../models/CourseGenerationRequestView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CourseGenerationRequestService {
    /**
     * @returns CourseGenerationRequestView OK
     * @throws ApiError
     */
    public static get16({
        id,
    }: {
        id: string,
    }): CancelablePromise<CourseGenerationRequestView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/course-gen-requests/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
