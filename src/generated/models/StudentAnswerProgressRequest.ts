/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StudentQuestionAnswerRequest } from './StudentQuestionAnswerRequest';
export type StudentAnswerProgressRequest = {
    timeElapsed: number;
    studentQuestionAnswers: Array<StudentQuestionAnswerRequest>;
    done?: boolean;
};

