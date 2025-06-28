/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type FlashcardSessionView = {
    id?: string;
    flashcardId?: string;
    studentId?: string;
    flashcardTitle?: string;
    flashcardDifficulty?: 'EASY' | 'MEDIUM' | 'HARD';
    sessionStart?: string;
    sessionEnd?: string;
    totalCardsStudied?: number;
    cardsSkipped?: number;
    totalTimeSpentSeconds?: number;
    averageTimePerCardSeconds?: number;
    completionPercentage?: number;
    sessionStatus?: 'ACTIVE' | 'COMPLETED' | 'PAUSED' | 'ABANDONED';
    createdAt?: string;
    updatedAt?: string;
};

