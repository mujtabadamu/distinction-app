/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LessonGroupView } from './LessonGroupView';
import type { SimpleSubjectView } from './SimpleSubjectView';
import type { SimpleUserInfoView } from './SimpleUserInfoView';
export type CourseView = {
    level?: string;
    description?: string;
    units?: number;
    title?: string;
    tags?: Array<string>;
    courseUrl?: string;
    subject?: SimpleSubjectView;
    lessonGroups?: Array<LessonGroupView>;
    aiModelVersion?: string;
    curriculum?: 'NUC' | 'NBTE' | 'NCCE' | 'OTHERS';
    courseCode?: string;
    aiJobId?: string;
    coverImageUrl?: string;
    aiStatus?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
    certificateUrl?: string;
    learningObjectives?: Array<string>;
    accessLevel?: 'PRIVATE' | 'INVITE' | 'PUBLIC';
    createdAt?: string;
    difficulty?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
    bannerUrl?: string;
    lessonGroupType?: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'TERM' | 'SEMESTER';
    aiError?: string;
    id?: string;
    owner?: SimpleUserInfoView;
};

