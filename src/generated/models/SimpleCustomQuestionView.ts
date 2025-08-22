/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SectionView } from './SectionView';
export type SimpleCustomQuestionView = {
    text?: string;
    topic?: string;
    status?: 'APPROVED' | 'DECLINED' | 'PENDING';
    paperName?: string;
    section?: SectionView;
    imageUrl?: string;
    customTags?: Array<string>;
    createdAt?: string;
    id?: string;
    type?: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'SHORT_TEXT' | 'LONG_TEXT';
};

