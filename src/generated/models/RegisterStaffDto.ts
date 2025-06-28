/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { School } from './School';
export type RegisterStaffDto = {
    getId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    otherName?: string;
    gender?: 'M' | 'F';
    role?: 'ADMIN' | 'SUPER_ADMIN';
    school?: School;
    password?: string;
};

