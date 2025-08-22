/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LessonItemTitleView } from './LessonItemTitleView';
export type EnrolledLessonItemView = {
    status?: 'IN_PROGRESS' | 'COMPLETED';
    userId?: string;
    lessonItem?: LessonItemTitleView;
    completionDate?: string;
    startDate?: string;
    id?: string;
};

