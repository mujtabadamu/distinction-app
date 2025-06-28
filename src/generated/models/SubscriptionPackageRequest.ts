/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionPackagePlanRequest } from './SubscriptionPackagePlanRequest';
import type { SubscriptionPackagePropertyRequest } from './SubscriptionPackagePropertyRequest';
export type SubscriptionPackageRequest = {
    code: 'BASIC_PLAN' | 'STANDARD_PLAN' | 'PREMIUM_PLAN';
    name: string;
    description: string;
    isActive?: boolean;
    packagePlan?: Array<SubscriptionPackagePlanRequest>;
    properties?: Array<SubscriptionPackagePropertyRequest>;
};

