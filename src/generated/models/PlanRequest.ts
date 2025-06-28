/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PlanRequest = {
    type: 'TRIAL' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
    price: number;
    platform: 'TELCO' | 'PAYSTACK' | 'STRIPE' | 'MTN_NIGERIA';
};

