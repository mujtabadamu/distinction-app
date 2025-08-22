/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SimpleCourseView } from './SimpleCourseView';
export type EnrolledCourseView = {
    status?: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
    course?: SimpleCourseView;
    userId?: string;
    createdAt?: string;
    completionDate?: string;
    startDate?: string;
    id?: string;
};

