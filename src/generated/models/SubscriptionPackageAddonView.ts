/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlanView } from './PlanView';
export type SubscriptionPackageAddonView = {
    duration?: string;
    durationType?: 'DAILY' | 'MONTHLY';
    plan?: PlanView;
    name?: 'FLASHCARD' | 'KEYPOINTS' | 'PRACTICE_QUESTIONS' | 'MONTHLY_QUIZATON' | 'LEADERBOARD' | 'QUIZATON_CERTIFICATE' | 'STUDY_PAL';
    value?: string;
    id?: string;
};

