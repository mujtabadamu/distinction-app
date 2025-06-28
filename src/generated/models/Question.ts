/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnswerOption } from './AnswerOption';
import type { Paper } from './Paper';
import type { Section } from './Section';
export type Question = {
    id?: string;
    questionNumber?: number;
    type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'SHORT_TEXT' | 'LONG_TEXT';
    difficulty?: 'EASY' | 'MEDIUM' | 'HARD' | 'RANDOM';
    topic?: string;
    point?: number;
    paper: Paper;
    tags?: Array<string>;
    text: string;
    imageUrl?: string;
    section?: Section;
    answerOptions?: Array<AnswerOption>;
    answerTexts?: Array<string>;
    solution?: string;
    institutionId: string;
    createdBy: string;
    updatedBy?: string;
    aiCategorized?: boolean;
    aiCategorizationReason?: string;
    createdAt?: string;
    updatedAt?: string;
    reviewed?: boolean;
};

