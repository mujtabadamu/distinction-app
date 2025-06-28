/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExamGroup } from './ExamGroup';
export type Exam = {
    id?: string;
    name: string;
    description?: string;
    month: number;
    year: number;
    examGroup?: ExamGroup;
    institutionId: string;
    createdBy: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
    active?: boolean;
};

