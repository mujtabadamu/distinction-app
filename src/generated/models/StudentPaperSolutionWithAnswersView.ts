/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnswerOptionView } from './AnswerOptionView';
export type StudentPaperSolutionWithAnswersView = {
    questionId?: string;
    studentPaperId?: string;
    questionNumber?: number;
    questionText?: string;
    type?: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'SHORT_TEXT' | 'LONG_TEXT';
    topic?: string;
    solution?: string;
    point?: number;
    tags?: Array<string>;
    imageUrl?: string;
    answerOptions?: Array<AnswerOptionView>;
    answerTexts?: Array<string>;
    studentSelectedAnswerIds?: Array<string>;
    isCorrect?: boolean;
};

