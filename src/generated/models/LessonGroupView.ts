/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LessonView } from './LessonView';
import type { SimpleCourseView } from './SimpleCourseView';
export type LessonGroupView = {
    description?: string;
    groupNumber?: number;
    lessons?: Array<LessonView>;
    course?: SimpleCourseView;
    estimatedStudyTime?: string;
    name?: string;
    id?: string;
};

