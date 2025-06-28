/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Achievement } from './Achievement';
import type { DailyTrend } from './DailyTrend';
import type { OverviewMetrics } from './OverviewMetrics';
import type { SessionOutcomes } from './SessionOutcomes';
import type { StudyStreak } from './StudyStreak';
import type { WeeklySummary } from './WeeklySummary';
export type FlashcardDashboardView = {
    overview?: OverviewMetrics;
    trends?: Array<DailyTrend>;
    outcomes?: SessionOutcomes;
    achievements?: Array<Achievement>;
    weeklySummary?: WeeklySummary;
    streak?: StudyStreak;
};

