/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LessonView } from './LessonView';
export type LessonItemView = {
    description?: string;
    title?: string;
    lesson?: LessonView;
    itemNumber?: number;
    studyTimeSecs?: number;
    id?: string;
    type?: 'VIDEO' | 'ARTICLE' | 'QUIZ' | 'EXERCISE' | 'FLASHCARD';
    content?: string;
};

