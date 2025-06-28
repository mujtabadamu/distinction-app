/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CardView } from './CardView';
import type { SimplePaperView } from './SimplePaperView';
export type FlashcardView = {
    title?: string;
    createdAt?: string;
    studentId?: string;
    difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
    paper?: SimplePaperView;
    cards?: Array<CardView>;
    updatedAt?: string;
    id?: string;
};

