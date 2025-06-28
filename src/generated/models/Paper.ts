/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Exam } from './Exam';
import type { Question } from './Question';
import type { Subject } from './Subject';
export type Paper = {
    id?: string;
    name: string;
    duration?: number;
    exam?: Exam;
    subject?: Subject;
    instruction?: string;
    questions?: Array<Question>;
    curriculum: 'NUC' | 'NBTE' | 'NCCE' | 'OTHERS';
    curriculumUrl?: string;
    institutionId: string;
    createdBy: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
    active?: boolean;
};

