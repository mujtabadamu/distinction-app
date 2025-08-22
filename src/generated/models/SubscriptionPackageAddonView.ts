/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlanView } from './PlanView';
export type SubscriptionPackageAddonView = {
    duration?: string;
    plan?: PlanView;
    durationType?: 'DAILY' | 'MONTHLY';
    name?: 'FLASHCARD' | 'KEYPOINTS' | 'PRACTICE_QUESTIONS' | 'MONTHLY_QUIZATON' | 'LEADERBOARD' | 'QUIZATON_CERTIFICATE' | 'STUDY_PAL';
    value?: string;
    id?: string;
};

