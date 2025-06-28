/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SchoolInformation } from './SchoolInformation';
export type UserInfo = {
    studentId?: string;
    email: string;
    phoneNumber: string;
    institutionId: string;
    firstName?: string;
    lastName?: string;
    otherName?: string;
    username?: string;
    gender?: string;
    stateOfOrigin?: string;
    referralCode?: string;
    profileImage?: string;
    nin?: string;
    dateOfBirth?: string;
    schoolInformation?: Array<SchoolInformation>;
    ninVerified?: boolean;
    blocked?: boolean;
};

