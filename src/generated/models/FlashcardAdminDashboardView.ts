/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Alert } from './Alert';
import type { ContentAnalytics } from './ContentAnalytics';
import type { InstitutionAnalytics } from './InstitutionAnalytics';
import type { PerformanceMetrics } from './PerformanceMetrics';
import type { RealTimeMetrics } from './RealTimeMetrics';
import type { StudentAnalytics } from './StudentAnalytics';
import type { SystemOverview } from './SystemOverview';
import type { TrendAnalysis } from './TrendAnalysis';
import type { UsagePatterns } from './UsagePatterns';
export type FlashcardAdminDashboardView = {
    systemOverview?: SystemOverview;
    institutionAnalytics?: Array<InstitutionAnalytics>;
    topPerformers?: Array<StudentAnalytics>;
    atRiskStudents?: Array<StudentAnalytics>;
    contentAnalytics?: Array<ContentAnalytics>;
    realTimeMetrics?: RealTimeMetrics;
    usagePatterns?: UsagePatterns;
    trendAnalysis?: TrendAnalysis;
    performanceMetrics?: PerformanceMetrics;
    alerts?: Array<Alert>;
};

