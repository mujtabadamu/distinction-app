/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TelcoView = {
    planType?: 'TRIAL' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
    sender?: number;
    network?: 'MTN' | 'AIRTEL' | 'GL0' | 'NINE_MOBILE';
    planCode?: number;
    confirmationMessage?: string;
    platform?: 'SMS' | 'USSD' | 'WAP' | 'APP';
    id?: string;
};

