/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnswerOption } from './AnswerOption';
export type QuestionRequest = {
    questionNumber?: number;
    type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'SHORT_TEXT' | 'LONG_TEXT';
    difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'RANDOM';
    topic: string;
    point?: number;
    paperId: string;
    text: string;
    sectionId?: string;
    tags?: Array<string>;
    imageUrl?: string;
    answerTexts?: Array<string>;
    solution: string;
    answerOptions?: Array<AnswerOption>;
};

