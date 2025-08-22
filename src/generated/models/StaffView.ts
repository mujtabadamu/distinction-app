/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { School } from './School';
export type StaffView = {
    role?: 'ADMIN' | 'SUPER_ADMIN';
    firstName?: string;
    lastName?: string;
    gender?: 'M' | 'F';
    otherName?: string;
    email?: string;
    school?: School;
    phoneNumber?: string;
    id?: string;
};

