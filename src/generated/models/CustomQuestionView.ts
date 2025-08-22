/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomAnswerOptionView } from './CustomAnswerOptionView';
import type { SectionView } from './SectionView';
export type CustomQuestionView = {
    text?: string;
    topic?: string;
    status?: 'APPROVED' | 'DECLINED' | 'PENDING';
    section?: SectionView;
    imageUrl?: string;
    createdBy?: string;
    solution?: string;
    answerOptions?: Array<CustomAnswerOptionView>;
    customTags?: Array<string>;
    customAnswerTexts?: Array<string>;
    id?: string;
    type?: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'SHORT_TEXT' | 'LONG_TEXT';
};

