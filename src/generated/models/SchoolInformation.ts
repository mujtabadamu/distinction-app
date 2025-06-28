/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Department } from './Department';
import type { School } from './School';
import type { UserInfo } from './UserInfo';
export type SchoolInformation = {
    id?: string;
    institutionId: string;
    level?: string;
    studentId?: string;
    userInfo?: UserInfo;
    department?: Department;
    school?: School;
    matriculationNumber?: string;
    createdAt?: string;
    updatedAt?: string;
};

