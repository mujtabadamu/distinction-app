/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TelcoView = {
    platform?: 'SMS' | 'USSD' | 'WAP' | 'APP';
    sender?: number;
    planType?: 'TRIAL' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
    planCode?: number;
    confirmationMessage?: string;
    network?: 'MTN' | 'AIRTEL' | 'GL0' | 'NINE_MOBILE';
    id?: string;
};

