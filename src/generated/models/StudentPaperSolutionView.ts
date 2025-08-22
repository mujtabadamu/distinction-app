/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnswerOptionView } from './AnswerOptionView';
import type { SectionView } from './SectionView';
export type StudentPaperSolutionView = {
    text?: string;
    point?: number;
    topic?: string;
    tags?: Array<string>;
    section?: SectionView;
    imageUrl?: string;
    solution?: string;
    answerTexts?: Array<string>;
    answerOptions?: Array<AnswerOptionView>;
    studentPaperId?: string;
    questionNumber?: number;
    id?: string;
    type?: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'SHORT_TEXT' | 'LONG_TEXT';
};

