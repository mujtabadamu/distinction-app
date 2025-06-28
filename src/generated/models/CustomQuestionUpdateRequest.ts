/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnswerOption } from './AnswerOption';
export type CustomQuestionUpdateRequest = {
    type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'SHORT_TEXT' | 'LONG_TEXT';
    topic: string;
    paperId: string;
    text: string;
    sectionId?: string;
    tags?: Array<string>;
    imageUrl?: string;
    answerTexts?: Array<string>;
    solution: string;
    answerOptions?: Array<AnswerOption>;
};

