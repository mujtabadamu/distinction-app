/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DailyTrend } from './DailyTrend';
export type WeeklySummary = {
    weekStart?: string;
    weekEnd?: string;
    totalSessions?: number;
    totalCardsStudied?: number;
    totalTimeSpentSeconds?: number;
    averageSessionDurationSeconds?: number;
    completionRate?: number;
    studyStreak?: number;
    dailyBreakdown?: Array<DailyTrend>;
};

