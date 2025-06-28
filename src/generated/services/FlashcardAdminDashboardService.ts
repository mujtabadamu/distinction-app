/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Alert } from '../models/Alert';
import type { ContentAnalytics } from '../models/ContentAnalytics';
import type { FlashcardAdminDashboardView } from '../models/FlashcardAdminDashboardView';
import type { InstitutionAnalytics } from '../models/InstitutionAnalytics';
import type { PerformanceMetrics } from '../models/PerformanceMetrics';
import type { RealTimeMetrics } from '../models/RealTimeMetrics';
import type { StudentAnalytics } from '../models/StudentAnalytics';
import type { SystemOverview } from '../models/SystemOverview';
import type { TrendAnalysis } from '../models/TrendAnalysis';
import type { UsagePatterns } from '../models/UsagePatterns';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FlashcardAdminDashboardService {
    /**
     * Get top performing students
     * Get students with highest engagement scores
     * @returns StudentAnalytics OK
     * @throws ApiError
     */
    public static getTopPerformingStudents({
        limit = 10,
    }: {
        /**
         * Number of students to return
         */
        limit?: number,
    }): CancelablePromise<Array<StudentAnalytics>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flashcard-dashboard/admin/students/top-performers',
            query: {
                'limit': limit,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get at-risk students
     * Get students with low engagement scores
     * @returns StudentAnalytics OK
     * @throws ApiError
     */
    public static getAtRiskStudents({
        limit = 10,
    }: {
        /**
         * Number of students to return
         */
        limit?: number,
    }): CancelablePromise<Array<StudentAnalytics>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flashcard-dashboard/admin/students/at-risk',
            query: {
                'limit': limit,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get real-time metrics
     * Get current system metrics and health status
     * @returns RealTimeMetrics OK
     * @throws ApiError
     */
    public static getRealTimeMetrics(): CancelablePromise<RealTimeMetrics> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flashcard-dashboard/admin/realtime/metrics',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get performance metrics
     * Get system performance and error metrics
     * @returns PerformanceMetrics OK
     * @throws ApiError
     */
    public static getPerformanceMetrics(): CancelablePromise<PerformanceMetrics> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flashcard-dashboard/admin/performance/metrics',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get system overview
     * Get comprehensive system-wide metrics and overview
     * @returns SystemOverview OK
     * @throws ApiError
     */
    public static getSystemOverview(): CancelablePromise<SystemOverview> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flashcard-dashboard/admin/overview',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get institution analytics
     * Get analytics for all institutions
     * @returns InstitutionAnalytics OK
     * @throws ApiError
     */
    public static getInstitutionAnalytics(): CancelablePromise<Array<InstitutionAnalytics>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flashcard-dashboard/admin/institutions',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get institution analytics
     * Get analytics for a specific institution
     * @returns InstitutionAnalytics OK
     * @throws ApiError
     */
    public static getInstitutionAnalytics1({
        institutionId,
    }: {
        /**
         * Institution ID
         */
        institutionId: string,
    }): CancelablePromise<InstitutionAnalytics> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flashcard-dashboard/admin/institutions/{institutionId}',
            path: {
                'institutionId': institutionId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get content performance
     * Get performance analytics for all flashcard content
     * @returns ContentAnalytics OK
     * @throws ApiError
     */
    public static getContentPerformanceAnalytics(): CancelablePromise<Array<ContentAnalytics>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flashcard-dashboard/admin/content/performance',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get comprehensive dashboard
     * Get all dashboard data in a single request
     * @returns FlashcardAdminDashboardView OK
     * @throws ApiError
     */
    public static getComprehensiveDashboard(): CancelablePromise<FlashcardAdminDashboardView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flashcard-dashboard/admin/comprehensive',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get usage patterns
     * Get detailed usage pattern analysis
     * @returns UsagePatterns OK
     * @throws ApiError
     */
    public static getUsagePatterns(): CancelablePromise<UsagePatterns> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flashcard-dashboard/admin/analytics/usage-patterns',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get trend analysis
     * Get trend analysis for different time periods
     * @returns TrendAnalysis OK
     * @throws ApiError
     */
    public static getTrendAnalysis({
        startDate,
        endDate,
    }: {
        /**
         * Start date for analysis
         */
        startDate?: string,
        /**
         * End date for analysis
         */
        endDate?: string,
    }): CancelablePromise<TrendAnalysis> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flashcard-dashboard/admin/analytics/trends',
            query: {
                'startDate': startDate,
                'endDate': endDate,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get system alerts
     * Get current system alerts and notifications
     * @returns Alert OK
     * @throws ApiError
     */
    public static getSystemAlerts(): CancelablePromise<Array<Alert>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flashcard-dashboard/admin/alerts',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
