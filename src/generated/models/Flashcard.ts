/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Card } from './Card';
import type { Paper } from './Paper';
export type Flashcard = {
    id?: string;
    title: string;
    paper: Paper;
    cards?: Array<Card>;
    studentId: string;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    curriculum?: 'NUC' | 'NBTE' | 'NCCE' | 'OTHERS';
    institutionId: string;
    createdAt?: string;
    updatedAt?: string;
    custom?: boolean;
};

