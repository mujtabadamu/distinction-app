/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionPackageAddonView } from './SubscriptionPackageAddonView';
import type { SubscriptionPackageLiteView } from './SubscriptionPackageLiteView';
export type SubscriptionHistoryView = {
    endAt?: string;
    planType?: string;
    subscriptionPackage?: SubscriptionPackageLiteView;
    username?: string;
    createdAt?: string;
    startAt?: string;
    price?: number;
    addOn?: SubscriptionPackageAddonView;
    id?: string;
};

