/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LessonGroupView } from './LessonGroupView';
import type { SimpleSubjectView } from './SimpleSubjectView';
export type CourseView = {
    description?: string;
    level?: string;
    title?: string;
    units?: number;
    tags?: Array<string>;
    subject?: SimpleSubjectView;
    createdAt?: string;
    curriculum?: 'NUC' | 'NBTE' | 'NCCE' | 'OTHERS';
    experienceLevel?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
    lessonGroups?: Array<LessonGroupView>;
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

