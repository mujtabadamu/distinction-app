/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnswerOptionView } from './AnswerOptionView';
import type { SectionView } from './SectionView';
export type SimpleQuestionView = {
    text?: string;
    point?: number;
    topic?: string;
    tags?: Array<string>;
    section?: SectionView;
    imageUrl?: string;
    answerOptions?: Array<AnswerOptionView>;
    difficulty?: 'EASY' | 'MEDIUM' | 'HARD' | 'RANDOM';
    questionNumber?: number;
    aiCategorizationReason?: string;
    aiCategorized?: boolean;
    id?: string;
    type?: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'SHORT_TEXT' | 'LONG_TEXT';
};

