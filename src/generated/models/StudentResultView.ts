/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaperView } from './PaperView';
import type { ScoreBreakdown } from './ScoreBreakdown';
export type StudentResultView = {
    score?: number;
    remark?: string;
    paper?: PaperView;
    questionCount?: number;
    scoreBreakdown?: Array<ScoreBreakdown>;
    id?: string;
};

