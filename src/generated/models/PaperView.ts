/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExamView } from './ExamView';
import type { SubjectView } from './SubjectView';
export type PaperView = {
    duration?: number;
    subject?: SubjectView;
    isActive?: boolean;
    curriculumUrl?: string;
    curriculum?: 'NUC' | 'NBTE' | 'NCCE' | 'OTHERS';
    exam?: ExamView;
    instruction?: string;
    createdAt?: string;
    name?: string;
    id?: string;
};

