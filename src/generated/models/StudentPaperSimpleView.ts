/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaperSimpleView } from './PaperSimpleView';
import type { SimpleTrackTimerSimpleView } from './SimpleTrackTimerSimpleView';
import type { StudentResultSimpleView } from './StudentResultSimpleView';
export type StudentPaperSimpleView = {
    result?: StudentResultSimpleView;
    status?: 'NOT_STARTED' | 'STARTED' | 'COMPLETED';
    paper?: PaperSimpleView;
    updatedAt?: string;
    createdAt?: string;
    questionCount?: number;
    mode?: 'LEARNING_MODE' | 'REAL_MODE';
    timeElapsed?: number;
    trackTimer?: SimpleTrackTimerSimpleView;
    id?: string;
};

