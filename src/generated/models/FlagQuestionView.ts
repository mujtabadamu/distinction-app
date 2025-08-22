/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuestionIssueType } from './QuestionIssueType';
import type { QuestionView } from './QuestionView';
export type FlagQuestionView = {
    createdBy?: string;
    createdAt?: string;
    question?: QuestionView;
    resolved?: boolean;
    issues?: Array<QuestionIssueType>;
    flagCount?: number;
    duplicateCount?: number;
    answerIssuePercentage?: number;
    questionIssuePercentage?: number;
    duplicateIssuePercentage?: number;
    message?: string;
    id?: string;
};

