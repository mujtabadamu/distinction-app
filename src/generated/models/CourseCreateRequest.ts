/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CourseCreateRequest = {
    name: string;
    courseCode?: string;
    curriculum?: 'NUC' | 'NBTE' | 'NCCE' | 'OTHERS';
    difficulty?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
    documentUrl?: string;
};

