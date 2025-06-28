/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExamView } from './ExamView';
import type { SubjectView } from './SubjectView';
export type PaperView = {
    duration?: number;
    subject?: SubjectView;
    createdAt?: string;
    isActive?: boolean;
    curriculum?: 'NUC' | 'NBTE' | 'NCCE' | 'OTHERS';
    curriculumUrl?: string;
    exam?: ExamView;
    instruction?: string;
    name?: string;
    id?: string;
};

