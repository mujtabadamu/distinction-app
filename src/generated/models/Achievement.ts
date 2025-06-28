/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Achievement = {
    id?: string;
    title?: string;
    description?: string;
    icon?: string;
    unlocked?: boolean;
    unlockedAt?: string;
    type?: 'FIRST_SESSION' | 'WEEKLY_GOAL' | 'STREAK_3_DAYS' | 'STREAK_7_DAYS' | 'STREAK_30_DAYS' | 'COMPLETION_MASTER' | 'TIME_DEDICATED' | 'CONSISTENT_LEARNER';
    progress?: number;
    target?: number;
    progressPercentage?: number;
};

