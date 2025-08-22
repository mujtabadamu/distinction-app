/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaperView } from './PaperView';
import type { ScoreBreakdown } from './ScoreBreakdown';
export type StudentResultView = {
    score?: number;
    paper?: PaperView;
    questionCount?: number;
    scoreBreakdown?: Array<ScoreBreakdown>;
    remark?: string;
    id?: string;
};

