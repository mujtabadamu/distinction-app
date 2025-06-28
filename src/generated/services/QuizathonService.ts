/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CertificateDto } from '../models/CertificateDto';
import type { PaginatedAccuracyRankingView } from '../models/PaginatedAccuracyRankingView';
import type { PaginatedDailyLeaderBoardView } from '../models/PaginatedDailyLeaderBoardView';
import type { PaginatedQuizathonHistroyView } from '../models/PaginatedQuizathonHistroyView';
import type { PaginatedQuizathonView } from '../models/PaginatedQuizathonView';
import type { PaginatedSchoolLeaderboardView } from '../models/PaginatedSchoolLeaderboardView';
import type { PaginatedScoreLeaderboardView } from '../models/PaginatedScoreLeaderboardView';
import type { PaginatedSimpleParticipantView } from '../models/PaginatedSimpleParticipantView';
import type { Participant } from '../models/Participant';
import type { ParticipantRequest } from '../models/ParticipantRequest';
import type { ParticipantResultStatsView } from '../models/ParticipantResultStatsView';
import type { ParticipantTimeElapsedView } from '../models/ParticipantTimeElapsedView';
import type { Quizathon } from '../models/Quizathon';
import type { QuizathonRequest } from '../models/QuizathonRequest';
import type { SimpleParticipantView } from '../models/SimpleParticipantView';
import type { SimpleQuizathonView } from '../models/SimpleQuizathonView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class QuizathonService {
    /**
     * @returns Quizathon OK
     * @throws ApiError
     */
    public static get1({
        id,
    }: {
        id: string,
    }): CancelablePromise<Quizathon> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/quizathon/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns Quizathon OK
     * @throws ApiError
     */
    public static update5({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: QuizathonRequest,
    }): CancelablePromise<Quizathon> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/quizathon/{id}',
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
    public static delete4({
        id,
    }: {
        id: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/quizathon/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns Participant OK
     * @throws ApiError
     */
    public static get2({
        id,
    }: {
        id: string,
    }): CancelablePromise<Participant> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/quizathon/particpant/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns Participant OK
     * @throws ApiError
     */
    public static update6({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: ParticipantRequest,
    }): CancelablePromise<Participant> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/quizathon/particpant/{id}',
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
    public static delete5({
        id,
    }: {
        id: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/quizathon/particpant/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedQuizathonView OK
     * @throws ApiError
     */
    public static list5({
        keyword,
        status,
        page,
        size = 10,
    }: {
        keyword?: string,
        status?: boolean,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedQuizathonView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/quizathon',
            query: {
                'keyword': keyword,
                'status': status,
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns Quizathon OK
     * @throws ApiError
     */
    public static create5({
        requestBody,
    }: {
        requestBody: QuizathonRequest,
    }): CancelablePromise<Quizathon> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/quizathon',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedSimpleParticipantView OK
     * @throws ApiError
     */
    public static list6({
        quizathonId,
        studentId,
        schoolId,
        keyword,
        page,
        size = 10,
    }: {
        quizathonId: string,
        studentId?: string,
        schoolId?: string,
        keyword?: string,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedSimpleParticipantView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/quizathon/particpant',
            query: {
                'studentId': studentId,
                'quizathonId': quizathonId,
                'schoolId': schoolId,
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
     * @returns SimpleParticipantView OK
     * @throws ApiError
     */
    public static create6({
        requestBody,
    }: {
        requestBody: ParticipantRequest,
    }): CancelablePromise<SimpleParticipantView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/quizathon/particpant',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns ParticipantTimeElapsedView OK
     * @throws ApiError
     */
    public static getTotalTimeElapsed({
        studentId,
        quizathonId,
    }: {
        studentId: string,
        quizathonId: string,
    }): CancelablePromise<ParticipantTimeElapsedView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/quizathon/{studentId}/total-time-elapsed',
            path: {
                'studentId': studentId,
            },
            query: {
                'quizathonId': quizathonId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedQuizathonHistroyView OK
     * @throws ApiError
     */
    public static getStudentQUizathonHistory({
        studentId,
        keyword,
        page,
        size = 10,
    }: {
        studentId: string,
        keyword?: string,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedQuizathonHistroyView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/quizathon/{studentId}/history',
            path: {
                'studentId': studentId,
            },
            query: {
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
     * @returns CertificateDto OK
     * @throws ApiError
     */
    public static getCertificate({
        participantId,
    }: {
        participantId: string,
    }): CancelablePromise<CertificateDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/quizathon/{participantId}/certificate',
            path: {
                'participantId': participantId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns CertificateDto OK
     * @throws ApiError
     */
    public static verifyCertificate({
        participantId,
    }: {
        participantId: string,
    }): CancelablePromise<CertificateDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/quizathon/{participantId}/certificate/verify',
            path: {
                'participantId': participantId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns ParticipantResultStatsView OK
     * @throws ApiError
     */
    public static getParticipantStats({
        studentId,
        quizathonId,
    }: {
        studentId: string,
        quizathonId: string,
    }): CancelablePromise<ParticipantResultStatsView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/quizathon/participants/stats/{studentId}',
            path: {
                'studentId': studentId,
            },
            query: {
                'quizathonId': quizathonId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedScoreLeaderboardView OK
     * @throws ApiError
     */
    public static getLeaderboard({
        studentId,
        quizathonId,
        schoolId,
        keyword,
        page,
        size = 10,
    }: {
        studentId?: string,
        quizathonId?: string,
        schoolId?: string,
        keyword?: string,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedScoreLeaderboardView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/quizathon/leaderboard',
            query: {
                'studentId': studentId,
                'quizathonId': quizathonId,
                'schoolId': schoolId,
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
     * @returns PaginatedSchoolLeaderboardView OK
     * @throws ApiError
     */
    public static universityLeaderboard({
        quizathonId,
        keyword,
        page,
        size = 10,
    }: {
        quizathonId?: string,
        keyword?: string,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedSchoolLeaderboardView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/quizathon/leaderboard/university',
            query: {
                'quizathonId': quizathonId,
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
     * @returns PaginatedAccuracyRankingView OK
     * @throws ApiError
     */
    public static getLeaderboardRankings({
        quizathonId,
        page,
        size = 10,
        studentId,
    }: {
        quizathonId?: string,
        page?: number,
        size?: number,
        studentId?: string,
    }): CancelablePromise<PaginatedAccuracyRankingView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/quizathon/leaderboard/accuracy',
            query: {
                'quizathonId': quizathonId,
                'page': page,
                'size': size,
                'studentId': studentId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedDailyLeaderBoardView OK
     * @throws ApiError
     */
    public static getLeaderboard1({
        studentId,
        quizathonId,
        date,
        page,
        size = 10,
    }: {
        studentId?: string,
        quizathonId?: string,
        date?: string,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedDailyLeaderBoardView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/quizathon/daily-leaderboard',
            query: {
                'studentId': studentId,
                'quizathonId': quizathonId,
                'date': date,
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns SimpleQuizathonView OK
     * @throws ApiError
     */
    public static getActiveQuizathon(): CancelablePromise<Array<SimpleQuizathonView>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/quizathon/active',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
