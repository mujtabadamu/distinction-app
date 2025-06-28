/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DailyStats } from './DailyStats';
import type { EmailTypeStats } from './EmailTypeStats';
export type EmailDashboardData = {
    totalEmailsSent?: number;
    totalDelivered?: number;
    totalOpens?: number;
    totalClicks?: number;
    uniqueOpens?: number;
    uniqueClicks?: number;
    totalBounces?: number;
    openRate?: number;
    clickThroughRate?: number;
    bounceRate?: number;
    deliveryRate?: number;
    dailyStats?: Array<DailyStats>;
    emailTypeStats?: Array<EmailTypeStats>;
};

