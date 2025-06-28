/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageView } from '../models/ImageView';
import type { PaginatedImageView } from '../models/PaginatedImageView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ImagesService {
    /**
     * @returns PaginatedImageView OK
     * @throws ApiError
     */
    public static listImages({
        name,
        folderId,
        page,
        size = 10,
    }: {
        name?: string,
        folderId?: string,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedImageView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/images',
            query: {
                'name': name,
                'folderId': folderId,
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns ImageView OK
     * @throws ApiError
     */
    public static putImage1({
        name,
        folderId,
        isPublic = false,
        formData,
    }: {
        name?: string,
        folderId?: string,
        isPublic?: boolean,
        formData?: {
            file: Blob;
        },
    }): CancelablePromise<ImageView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/images',
            query: {
                'name': name,
                'folderId': folderId,
                'isPublic': isPublic,
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
    public static getImage({
        id,
    }: {
        id: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/images/{id}',
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
    public static deleteImage({
        id,
    }: {
        id: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/images/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
