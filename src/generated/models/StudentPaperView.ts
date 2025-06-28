/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaperView } from './PaperView';
export type StudentPaperView = {
    status?: 'NOT_STARTED' | 'STARTED' | 'COMPLETED';
    paper?: PaperView;
    mode?: 'LEARNING_MODE' | 'REAL_MODE';
    timeElapsed?: number;
    id?: string;
};

