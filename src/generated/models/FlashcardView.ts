/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CardView } from './CardView';
import type { SimplePaperView } from './SimplePaperView';
export type FlashcardView = {
    title?: string;
    paper?: SimplePaperView;
    studentId?: string;
    cards?: Array<CardView>;
    updatedAt?: string;
    createdAt?: string;
    difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
    id?: string;
};

