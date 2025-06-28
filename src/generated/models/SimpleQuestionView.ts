/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnswerOptionView } from './AnswerOptionView';
import type { SectionView } from './SectionView';
export type SimpleQuestionView = {
    text?: string;
    topic?: string;
    tags?: Array<string>;
    aiCategorizationReason?: string;
    aiCategorized?: boolean;
    difficulty?: 'EASY' | 'MEDIUM' | 'HARD' | 'RANDOM';
    answerOptions?: Array<AnswerOptionView>;
    section?: SectionView;
    questionNumber?: number;
    point?: number;
    imageUrl?: string;
    id?: string;
    type?: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'SHORT_TEXT' | 'LONG_TEXT';
};

