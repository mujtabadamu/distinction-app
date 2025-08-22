/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SimpleUserInfoView } from './SimpleUserInfoView';
export type SimpleCourseView = {
    description?: string;
    units?: number;
    title?: string;
    courseUrl?: string;
    curriculum?: 'NUC' | 'NBTE' | 'NCCE' | 'OTHERS';
    courseCode?: string;
    coverImageUrl?: string;
    certificateUrl?: string;
    learningObjectives?: Array<string>;
    accessLevel?: 'PRIVATE' | 'INVITE' | 'PUBLIC';
    createdAt?: string;
    difficulty?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
    bannerUrl?: string;
    lessonGroupType?: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'TERM' | 'SEMESTER';
    id?: string;
    owner?: SimpleUserInfoView;
};

