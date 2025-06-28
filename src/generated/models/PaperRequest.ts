/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PaperRequest = {
    name: string;
    duration: number;
    instruction?: string;
    subjectId: string;
    examId: string;
    curriculum?: 'NUC' | 'NBTE' | 'NCCE' | 'OTHERS';
    curriculumUrl?: string;
    active?: boolean;
};

