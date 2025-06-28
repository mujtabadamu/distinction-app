/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaperRatingRequest } from '../models/PaperRatingRequest';
import type { PaperRatingView } from '../models/PaperRatingView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PaperRatingsService {
    /**
     * @returns PaperRatingView OK
     * @throws ApiError
     */
    public static ratePaper({
        requestBody,
    }: {
        requestBody: PaperRatingRequest,
    }): CancelablePromise<PaperRatingView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/paper-ratings',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
