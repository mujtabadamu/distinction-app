/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SchoolInformationView } from './SchoolInformationView';
import type { UserInfoMiniView } from './UserInfoMiniView';
export type DailyLeaderBoardView = {
    createdAt?: string;
    schoolInformation?: SchoolInformationView;
    updatedAt?: string;
    totalScores?: number;
    totalQuestionsAttempted?: number;
    id?: string;
    userInfo?: UserInfoMiniView;
};

