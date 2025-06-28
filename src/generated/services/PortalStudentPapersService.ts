/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookmarkRequest } from '../models/BookmarkRequest';
import type { BookmarkView } from '../models/BookmarkView';
import type { PaginatedObject } from '../models/PaginatedObject';
import type { PaginatedStudentPaperSimpleView } from '../models/PaginatedStudentPaperSimpleView';
import type { PaginatedStudentPaperSolutionView } from '../models/PaginatedStudentPaperSolutionView';
import type { PaginatedStudentPaperSolutionWithAnswersView } from '../models/PaginatedStudentPaperSolutionWithAnswersView';
import type { PracticeHistoryGroupView } from '../models/PracticeHistoryGroupView';
import type { SimplePaperView } from '../models/SimplePaperView';
import type { StudentAnswerProgressRequest } from '../models/StudentAnswerProgressRequest';
import type { StudentAnswerRequest } from '../models/StudentAnswerRequest';
import type { StudentAnswerView } from '../models/StudentAnswerView';
import type { StudentPaperRequest } from '../models/StudentPaperRequest';
import type { StudentPaperView } from '../models/StudentPaperView';
import type { StudentResultView } from '../models/StudentResultView';
import type { SubmitPaperRequest } from '../models/SubmitPaperRequest';
import type { TracktimerRequest } from '../models/TracktimerRequest';
import type { TrackTimerSimpleView } from '../models/TrackTimerSimpleView';
import type { TrackTimerView } from '../models/TrackTimerView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PortalStudentPapersService {
    /**
     * @returns PaginatedStudentPaperSimpleView OK
     * @throws ApiError
     */
    public static list10({
        keyword,
        examGroupId,
        paperId,
        subjectId,
        completed,
        date,
        page,
        size = 10,
    }: {
        keyword?: string,
        examGroupId?: string,
        paperId?: string,
        subjectId?: string,
        completed?: boolean,
        date?: string,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedStudentPaperSimpleView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/portal/student-papers',
            query: {
                'keyword': keyword,
                'examGroupId': examGroupId,
                'paperId': paperId,
                'subjectId': subjectId,
                'completed': completed,
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
     * @returns StudentPaperView OK
     * @throws ApiError
     */
    public static enroll({
        requestBody,
    }: {
        requestBody: StudentPaperRequest,
    }): CancelablePromise<StudentPaperView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/portal/student-papers',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns StudentResultView OK
     * @throws ApiError
     */
    public static submit({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: SubmitPaperRequest,
    }): CancelablePromise<StudentResultView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/portal/student-papers/{id}/submit',
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
    public static saveProgress({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: StudentAnswerProgressRequest,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/portal/student-papers/{id}/save-progress',
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
     * @returns BookmarkView OK
     * @throws ApiError
     */
    public static list11({
        id,
    }: {
        id: string,
    }): CancelablePromise<Array<BookmarkView>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/portal/student-papers/{id}/bookmarks',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns BookmarkView OK
     * @throws ApiError
     */
    public static add({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: BookmarkRequest,
    }): CancelablePromise<BookmarkView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/portal/student-papers/{id}/bookmarks',
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
    public static delete7({
        id,
        questionId,
    }: {
        id: string,
        questionId?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/portal/student-papers/{id}/bookmarks',
            path: {
                'id': id,
            },
            query: {
                'questionId': questionId,
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
    public static getAnswers({
        id,
        questionIds,
    }: {
        id: string,
        questionIds?: Array<string>,
    }): CancelablePromise<Record<string, Record<string, any>>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/portal/student-papers/{id}/answers',
            path: {
                'id': id,
            },
            query: {
                'questionIds': questionIds,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns StudentAnswerView OK
     * @throws ApiError
     */
    public static answer({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: StudentAnswerRequest,
    }): CancelablePromise<StudentAnswerView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/portal/student-papers/{id}/answers',
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
     * @returns TrackTimerSimpleView OK
     * @throws ApiError
     */
    public static trackTimer({
        requestBody,
    }: {
        requestBody: TracktimerRequest,
    }): CancelablePromise<TrackTimerSimpleView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/portal/student-papers/track-timer',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns number OK
     * @throws ApiError
     */
    public static getTotalCorrectAnswers({
        studentPaperId,
    }: {
        studentPaperId: string,
    }): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/portal/student-papers/{studentPaperId}/total-correct-answers',
            path: {
                'studentPaperId': studentPaperId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedStudentPaperSolutionWithAnswersView OK
     * @throws ApiError
     */
    public static getStudentAnswerSolutions({
        studentPaperId,
        page,
        size = 5,
    }: {
        studentPaperId: string,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedStudentPaperSolutionWithAnswersView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/portal/student-papers/{studentPaperId}/student-answer-solutions',
            path: {
                'studentPaperId': studentPaperId,
            },
            query: {
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns SimplePaperView OK
     * @throws ApiError
     */
    public static getRecommendedPapers({
        studentId,
        examGroupId,
        subjectId,
    }: {
        studentId: string,
        examGroupId?: string,
        subjectId?: string,
    }): CancelablePromise<Array<SimplePaperView>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/portal/student-papers/{studentId}/recommended-papers',
            path: {
                'studentId': studentId,
            },
            query: {
                'examGroupId': examGroupId,
                'subjectId': subjectId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns StudentPaperView OK
     * @throws ApiError
     */
    public static retrieve3({
        id,
    }: {
        id: string,
    }): CancelablePromise<StudentPaperView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/portal/student-papers/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns TrackTimerView OK
     * @throws ApiError
     */
    public static retrieveTrackTimer({
        id,
    }: {
        id: string,
    }): CancelablePromise<TrackTimerView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/portal/student-papers/{id}/track-timer',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedStudentPaperSolutionView OK
     * @throws ApiError
     */
    public static solutions({
        id,
        page,
        size = 5,
    }: {
        id: string,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedStudentPaperSolutionView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/portal/student-papers/{id}/solutions',
            path: {
                'id': id,
            },
            query: {
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns StudentResultView OK
     * @throws ApiError
     */
    public static retrieveResult({
        id,
    }: {
        id: string,
    }): CancelablePromise<StudentResultView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/portal/student-papers/{id}/result',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedObject OK
     * @throws ApiError
     */
    public static questions({
        id,
        page,
        size = 5,
    }: {
        id: string,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedObject> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/portal/student-papers/{id}/questions',
            path: {
                'id': id,
            },
            query: {
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedStudentPaperSimpleView OK
     * @throws ApiError
     */
    public static listPracticesByPaperId({
        paperId,
        page,
        size = 10,
    }: {
        paperId: string,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedStudentPaperSimpleView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/portal/student-papers/practice-by-paper',
            query: {
                'paperId': paperId,
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PracticeHistoryGroupView OK
     * @throws ApiError
     */
    public static groupPracticesByCourse({
        keyword,
        examGroupId,
        subjectId,
        paperId,
        page,
        size = 10,
    }: {
        keyword?: string,
        examGroupId?: string,
        subjectId?: string,
        paperId?: string,
        page?: number,
        size?: number,
    }): CancelablePromise<Array<PracticeHistoryGroupView>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/portal/student-papers/practice-by-course',
            query: {
                'keyword': keyword,
                'examGroupId': examGroupId,
                'subjectId': subjectId,
                'paperId': paperId,
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedStudentPaperSimpleView OK
     * @throws ApiError
     */
    public static studentQuizathonPapers({
        quizathonId,
        page,
        size = 10,
    }: {
        quizathonId: string,
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedStudentPaperSimpleView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/portal/student-papers/StudentQuizathonPapers',
            query: {
                'quizathonId': quizathonId,
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
