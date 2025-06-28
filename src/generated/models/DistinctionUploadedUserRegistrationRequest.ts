/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type DistinctionUploadedUserRegistrationRequest = {
    firstName: string;
    lastName: string;
    otherName?: string;
    platform: 'DISTINCTION_NG' | 'DISTINCTION_APP' | 'SCHOOLS_DISTINCTION_APP' | 'DISTINCTION_ADMIN';
    email: string;
    phone: string;
    password: string;
    matricNumber: string;
    schoolId?: string;
    department: string;
    referralCode?: string;
};

