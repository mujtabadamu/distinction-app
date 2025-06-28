/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SectionView } from './SectionView';
export type SimpleCustomQuestionView = {
    text?: string;
    topic?: string;
    status?: 'APPROVED' | 'DECLINED' | 'PENDING';
    createdAt?: string;
    paperName?: string;
    section?: SectionView;
    imageUrl?: string;
    customTags?: Array<string>;
    id?: string;
    type?: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'SHORT_TEXT' | 'LONG_TEXT';
};

