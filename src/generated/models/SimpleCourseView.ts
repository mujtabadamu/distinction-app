/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SimpleCourseView = {
    description?: string;
    title?: string;
    units?: number;
    createdAt?: string;
    curriculum?: 'NUC' | 'NBTE' | 'NCCE' | 'OTHERS';
    lessonGroupType?: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'TERM' | 'SEMESTER';
    bannerUrl?: string;
    coverImageUrl?: string;
    certificateUrl?: string;
    learningObjectives?: Array<string>;
    courseUrl?: string;
    accessLevel?: 'PRIVATE' | 'PUBLIC';
    courseCode?: string;
    id?: string;
};

