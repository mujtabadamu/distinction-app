/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuestionIssueType } from './QuestionIssueType';
import type { QuestionView } from './QuestionView';
export type FlagQuestionView = {
    flagCount?: number;
    duplicateCount?: number;
    answerIssuePercentage?: number;
    questionIssuePercentage?: number;
    duplicateIssuePercentage?: number;
    createdAt?: string;
    resolved?: boolean;
    question?: QuestionView;
    issues?: Array<QuestionIssueType>;
    createdBy?: string;
    message?: string;
    id?: string;
};

