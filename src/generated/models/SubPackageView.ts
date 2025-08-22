/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionPackageAddonView } from './SubscriptionPackageAddonView';
import type { SubscriptionPackagePlanView } from './SubscriptionPackagePlanView';
import type { SubscriptionPackagePropertyView } from './SubscriptionPackagePropertyView';
export type SubPackageView = {
    description?: string;
    code?: 'BASIC_PLAN' | 'STANDARD_PLAN' | 'PREMIUM_PLAN';
    packagePlan?: Array<SubscriptionPackagePlanView>;
    isActive?: boolean;
    institutionId?: string;
    addOn?: Array<SubscriptionPackageAddonView>;
    propertyPlan?: Array<SubscriptionPackagePropertyView>;
    name?: string;
    id?: string;
};

