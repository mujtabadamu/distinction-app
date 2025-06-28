/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlanRequest } from './PlanRequest';
export type SubscriptionPackageAddonRequest = {
    subscriptionPackageId: string;
    plan: PlanRequest;
    name: 'FLASHCARD' | 'KEYPOINTS' | 'PRACTICE_QUESTIONS' | 'MONTHLY_QUIZATON' | 'LEADERBOARD' | 'QUIZATON_CERTIFICATE' | 'STUDY_PAL';
    value?: string;
    duration: string;
    durationType: 'DAILY' | 'MONTHLY';
};

