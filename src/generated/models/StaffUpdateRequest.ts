/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StaffUpdateRequest = {
    firstName: string;
    lastName: string;
    otherName?: string;
    schoolId?: string;
    gender: 'M' | 'F';
    role: 'ADMIN' | 'SUPER_ADMIN';
    email: string;
    phone: string;
    platform: 'DISTINCTION_NG' | 'DISTINCTION_APP' | 'SCHOOLS_DISTINCTION_APP' | 'DISTINCTION_ADMIN';
};

