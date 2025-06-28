/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaperSimpleView } from './PaperSimpleView';
import type { SimpleTrackTimerSimpleView } from './SimpleTrackTimerSimpleView';
import type { StudentResultSimpleView } from './StudentResultSimpleView';
export type StudentPaperSimpleView = {
    result?: StudentResultSimpleView;
    trackTimer?: SimpleTrackTimerSimpleView;
    status?: 'NOT_STARTED' | 'STARTED' | 'COMPLETED';
    createdAt?: string;
    paper?: PaperSimpleView;
    questionCount?: number;
    updatedAt?: string;
    mode?: 'LEARNING_MODE' | 'REAL_MODE';
    timeElapsed?: number;
    id?: string;
};

