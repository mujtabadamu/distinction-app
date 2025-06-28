/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedReferralAdminView } from '../models/PaginatedReferralAdminView';
import type { PaginatedReferralView } from '../models/PaginatedReferralView';
import type { PublicUserProfileDTO } from '../models/PublicUserProfileDTO';
import type { ReferralAdminStatisticsView } from '../models/ReferralAdminStatisticsView';
import type { ReferralDTO } from '../models/ReferralDTO';
import type { ReferralStatisticsView } from '../models/ReferralStatisticsView';
import type { UpdateUsernameRequest } from '../models/UpdateUsernameRequest';
import type { UserProfileDTO } from '../models/UserProfileDTO';
import type { UserProfileNinRequest } from '../models/UserProfileNinRequest';
import type { VerifyNinDTO } from '../models/VerifyNinDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DistinctionProfileService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static updateUsername({
        requestBody,
    }: {
        requestBody: UpdateUsernameRequest,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/Profile/update/username',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns UserProfileDTO OK
     * @throws ApiError
     */
    public static editUserProfileNin({
        requestBody,
    }: {
        requestBody: UserProfileNinRequest,
    }): CancelablePromise<UserProfileDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/Profile/nin/update',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns UserProfileDTO OK
     * @throws ApiError
     */
    public static editUserProfile({
        phoneNumber,
        firstName,
        lastName,
        gender,
        matriculationNumber,
        department,
        stateOfOrigin,
        schoolId,
        level,
        dateOfBirth,
        otherName,
        bio,
        formData,
    }: {
        phoneNumber: string,
        firstName: string,
        lastName: string,
        gender: string,
        matriculationNumber: string,
        department: string,
        stateOfOrigin: string,
        schoolId: string,
        level: string,
        dateOfBirth: string,
        otherName?: string,
        bio?: string,
        formData?: {
            profileImage?: Blob;
        },
    }): CancelablePromise<UserProfileDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/Profile/',
            query: {
                'phoneNumber': phoneNumber,
                'firstName': firstName,
                'lastName': lastName,
                'otherName': otherName,
                'gender': gender,
                'bio': bio,
                'matriculationNumber': matriculationNumber,
                'department': department,
                'stateOfOrigin': stateOfOrigin,
                'schoolId': schoolId,
                'level': level,
                'dateOfBirth': dateOfBirth,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns VerifyNinDTO OK
     * @throws ApiError
     */
    public static verifyProfileNin(): CancelablePromise<VerifyNinDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/Profile/verify/nin',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns ReferralDTO OK
     * @throws ApiError
     */
    public static createReferral({
        referredEmail,
    }: {
        referredEmail: string,
    }): CancelablePromise<ReferralDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/Profile/refer',
            query: {
                'referredEmail': referredEmail,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns UserProfileDTO OK
     * @throws ApiError
     */
    public static getUserProfile({
        studentId,
    }: {
        studentId: string,
    }): CancelablePromise<UserProfileDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Profile',
            query: {
                'studentId': studentId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns ReferralStatisticsView OK
     * @throws ApiError
     */
    public static statisticsReferral({
        studentId,
    }: {
        studentId: string,
    }): CancelablePromise<ReferralStatisticsView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Profile/student/statistics',
            query: {
                'studentId': studentId,
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
    public static getStudentReferralCode1({
        studentId,
    }: {
        studentId: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Profile/student/getReferralCode',
            query: {
                'studentId': studentId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedReferralView OK
     * @throws ApiError
     */
    public static getReferrals({
        studentId,
        keyword,
        page,
        size = 10,
    }: {
        studentId: string,
        keyword?: string,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedReferralView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Profile/referrals',
            query: {
                'studentId': studentId,
                'keyword': keyword,
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PublicUserProfileDTO OK
     * @throws ApiError
     */
    public static getPublicUserProfile({
        username,
    }: {
        username: string,
    }): CancelablePromise<PublicUserProfileDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Profile/public/{username}',
            path: {
                'username': username,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedReferralAdminView OK
     * @throws ApiError
     */
    public static filterReferrals({
        sort,
        keyword,
        page,
        size = 10,
    }: {
        sort?: string,
        keyword?: string,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedReferralAdminView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Profile/adminReferral',
            query: {
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
    /**
     * @returns ReferralAdminStatisticsView OK
     * @throws ApiError
     */
    public static adminReferral(): CancelablePromise<ReferralAdminStatisticsView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Profile/admin/statistics',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
