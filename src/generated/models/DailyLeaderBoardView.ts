/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SchoolInformationView } from './SchoolInformationView';
import type { UserInfoMiniView } from './UserInfoMiniView';
export type DailyLeaderBoardView = {
    schoolInformation?: SchoolInformationView;
    updatedAt?: string;
    createdAt?: string;
    totalScores?: number;
    totalQuestionsAttempted?: number;
    id?: string;
    userInfo?: UserInfoMiniView;
};

