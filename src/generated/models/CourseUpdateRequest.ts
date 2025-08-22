/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CourseUpdateRequest = {
    title?: string;
    level?: string;
    subjectId?: string;
    tags?: Array<string>;
    bannerUrl?: string;
    certificateUrl?: string;
    coverImageUrl?: string;
    courseCode?: string;
    description?: string;
    learningObjectives?: Array<string>;
    units?: number;
    courseUrl?: string;
    accessLevel?: 'PRIVATE' | 'INVITE' | 'PUBLIC';
};

