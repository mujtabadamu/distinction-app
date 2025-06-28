/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TelcoRequest = {
    planType: 'TRIAL' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
    network: 'MTN' | 'AIRTEL' | 'GL0' | 'NINE_MOBILE';
    planCode: number;
    confirmationMessage: string;
};

