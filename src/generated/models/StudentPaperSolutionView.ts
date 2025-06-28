/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnswerOptionView } from './AnswerOptionView';
import type { SectionView } from './SectionView';
export type StudentPaperSolutionView = {
    text?: string;
    topic?: string;
    tags?: Array<string>;
    solution?: string;
    answerTexts?: Array<string>;
    answerOptions?: Array<AnswerOptionView>;
    section?: SectionView;
    questionNumber?: number;
    point?: number;
    imageUrl?: string;
    studentPaperId?: string;
    id?: string;
    type?: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'SHORT_TEXT' | 'LONG_TEXT';
};

