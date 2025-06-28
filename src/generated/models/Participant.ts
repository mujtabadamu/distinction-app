/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Quizathon } from './Quizathon';
import type { SchoolInformation } from './SchoolInformation';
import type { UserInfo } from './UserInfo';
export type Participant = {
    id?: string;
    userInfo: UserInfo;
    schoolInformation?: SchoolInformation;
    year: number;
    quizathon?: Quizathon;
    institutionId: string;
    createdAt?: string;
    updatedAt?: string;
};

