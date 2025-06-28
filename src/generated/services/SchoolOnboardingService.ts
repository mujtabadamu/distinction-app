/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedUploadedStudentView } from '../models/PaginatedUploadedStudentView';
import type { ResendInviteDTO } from '../models/ResendInviteDTO';
import type { StatisticsView } from '../models/StatisticsView';
import type { UploadedStudentDTO } from '../models/UploadedStudentDTO';
import type { UploadedStudentView } from '../models/UploadedStudentView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SchoolOnboardingService {
    /**
     * @returns UploadedStudentView OK
     * @throws ApiError
     */
    public static updateStudent({
        studentId,
        requestBody,
    }: {
        studentId: string,
        requestBody: UploadedStudentDTO,
    }): CancelablePromise<UploadedStudentView> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/schoolOnboarding/students/{studentId}',
            path: {
                'studentId': studentId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns UploadedStudentView OK
     * @throws ApiError
     */
    public static addSingleStudent({
        requestBody,
    }: {
        requestBody: UploadedStudentDTO,
    }): CancelablePromise<UploadedStudentView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/schoolOnboarding/students',
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
    public static validateBulkUploadStudentData({
        schoolId,
        formData,
    }: {
        schoolId: string,
        formData?: {
            file: Blob;
        },
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/schoolOnboarding/students/validate-bulk-upload',
            query: {
                'schoolId': schoolId,
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
    public static bulkUploadQuestionsData({
        schoolId,
        formData,
    }: {
        schoolId: string,
        formData?: {
            file: Blob;
        },
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/schoolOnboarding/students/upload',
            query: {
                'schoolId': schoolId,
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
    public static bulkUploadStudentData({
        schoolId,
        formData,
    }: {
        schoolId: string,
        formData?: {
            file: string;
        },
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/schoolOnboarding/students/bulk-upload',
            query: {
                'schoolId': schoolId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static sendInvite({
        requestBody,
    }: {
        requestBody: Array<ResendInviteDTO>,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/schoolOnboarding/sendInvite',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static sendBulkInvite({
        schoolId,
    }: {
        schoolId: string,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/schoolOnboarding/send-bulk-invite/{schoolId}',
            path: {
                'schoolId': schoolId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns StatisticsView OK
     * @throws ApiError
     */
    public static getSchoolStatistics({
        schoolId,
    }: {
        schoolId: string,
    }): CancelablePromise<StatisticsView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/schoolOnboarding/statistics/{schoolId}',
            path: {
                'schoolId': schoolId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedUploadedStudentView OK
     * @throws ApiError
     */
    public static getUploadedStudents({
        schoolId,
        sort,
        keyword,
        page,
        size = 10,
    }: {
        schoolId: string,
        sort?: string,
        keyword?: string,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedUploadedStudentView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/schoolOnboarding/getUploadedStudents',
            query: {
                'schoolId': schoolId,
                'sort': sort,
                'keyword': keyword,
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
