/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Card } from './Card';
export type FlashcardUsageView = {
    id?: string;
    studentId?: string;
    card?: Card;
    actionType?: 'TAP_TO_FLIP' | 'SKIP' | 'COMPLETE';
    timeSpentSeconds?: number;
    sessionId?: string;
    notes?: string;
    createdAt?: string;
};

