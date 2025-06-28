/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionPackageAddonView } from './SubscriptionPackageAddonView';
import type { SubscriptionPackagePlanView } from './SubscriptionPackagePlanView';
import type { SubscriptionPackagePropertyView } from './SubscriptionPackagePropertyView';
export type SubscriptionPackageView = {
    description?: string;
    code?: 'BASIC_PLAN' | 'STANDARD_PLAN' | 'PREMIUM_PLAN';
    propertyPlan?: Array<SubscriptionPackagePropertyView>;
    institutionId?: string;
    isActive?: boolean;
    packagePlan?: Array<SubscriptionPackagePlanView>;
    addOn?: Array<SubscriptionPackageAddonView>;
    name?: string;
    id?: string;
};

