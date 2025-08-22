/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Document } from '../models/Document';
import type { DocumentUploadProgress } from '../models/DocumentUploadProgress';
import type { DocumentUploadResponse } from '../models/DocumentUploadResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DocumentUploadService {
    /**
     * Start asynchronous document upload
     * Initiates an asynchronous document upload and returns an upload ID immediately. Use the progress endpoint to track upload status.
     * @returns DocumentUploadResponse OK
     * @throws ApiError
     */
    public static uploadDocument({
        name,
        folderId,
        isPublic = false,
        requestBody,
    }: {
        /**
         * Custom name for the document
         */
        name?: string,
        /**
         * Folder ID to store the document in
         */
        folderId?: string,
        /**
         * Whether the document should be publicly accessible
         */
        isPublic?: boolean,
        requestBody?: {
            /**
             * Document file to upload
             */
            file: Blob;
        },
    }): CancelablePromise<DocumentUploadResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/documents/upload',
            query: {
                'name': name,
                'folderId': folderId,
                'isPublic': isPublic,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get document metadata
     * Returns metadata for a specific document
     * @returns Document OK
     * @throws ApiError
     */
    public static getDocument({
        documentId,
    }: {
        /**
         * Document ID
         */
        documentId: string,
    }): CancelablePromise<Document> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/documents/{documentId}',
            path: {
                'documentId': documentId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Delete document
     * Deletes a document from S3 and database
     * @returns any OK
     * @throws ApiError
     */
    public static deleteDocument({
        documentId,
    }: {
        /**
         * Document ID
         */
        documentId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/documents/{documentId}',
            path: {
                'documentId': documentId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get document upload result
     * Returns the final result of a completed document upload
     * @returns DocumentUploadResponse OK
     * @throws ApiError
     */
    public static getUploadResult({
        uploadId,
    }: {
        /**
         * Upload ID to get result for
         */
        uploadId: string,
    }): CancelablePromise<DocumentUploadResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/documents/upload/{uploadId}/result',
            path: {
                'uploadId': uploadId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get document upload progress
     * Returns the current progress of document upload
     * @returns DocumentUploadProgress OK
     * @throws ApiError
     */
    public static getUploadProgress({
        uploadId,
    }: {
        /**
         * Upload ID to check progress for
         */
        uploadId: string,
    }): CancelablePromise<DocumentUploadProgress> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/documents/upload/{uploadId}/progress',
            path: {
                'uploadId': uploadId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
