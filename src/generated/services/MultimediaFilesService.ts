/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MultimediaFileView } from '../models/MultimediaFileView';
import type { PaginatedMultimediaFileView } from '../models/PaginatedMultimediaFileView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MultimediaFilesService {
    /**
     * @returns PaginatedMultimediaFileView OK
     * @throws ApiError
     */
    public static listMultimediaFiles({
        name,
        folderId,
        page,
        size = 10,
    }: {
        name?: string,
        folderId?: string,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedMultimediaFileView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/multimedia-files',
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
     * @returns MultimediaFileView OK
     * @throws ApiError
     */
    public static putImage({
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
    }): CancelablePromise<MultimediaFileView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/multimedia-files',
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
    public static getMultimediaFile({
        id,
    }: {
        id: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/multimedia-files/{id}',
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
    public static deleteMultimediaFile({
        id,
    }: {
        id: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/multimedia-files/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
