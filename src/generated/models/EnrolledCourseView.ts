/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SimpleCourseView } from './SimpleCourseView';
export type EnrolledCourseView = {
    status?: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
    createdAt?: string;
    userId?: string;
    course?: SimpleCourseView;
    startDate?: string;
    completionDate?: string;
    id?: string;
};

