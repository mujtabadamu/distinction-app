/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuestionView } from './QuestionView';
import type { SubjectView } from './SubjectView';
export type StudentPracticeView = {
    subject?: SubjectView;
    topics?: Array<string>;
    examYears?: Array<number>;
    questions?: Array<QuestionView>;
    id?: string;
};

