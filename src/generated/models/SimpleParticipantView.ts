/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SchoolInformationView } from './SchoolInformationView';
import type { SimpleQuizathonView } from './SimpleQuizathonView';
import type { UserInfoView } from './UserInfoView';
export type SimpleParticipantView = {
    createdAt?: string;
    schoolInformation?: SchoolInformationView;
    totalQuestions?: number;
    updatedAt?: string;
    quizathon?: SimpleQuizathonView;
    totalScores?: number;
    totalTimeSpent?: number;
    id?: string;
    userInfo?: UserInfoView;
};

