/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionPackageAddonView } from './SubscriptionPackageAddonView';
import type { SubscriptionPackageLiteView } from './SubscriptionPackageLiteView';
export type SubscriptionHistoryView = {
    username?: string;
    createdAt?: string;
    startAt?: string;
    endAt?: string;
    subscriptionPackage?: SubscriptionPackageLiteView;
    price?: number;
    planType?: string;
    addOn?: SubscriptionPackageAddonView;
    id?: string;
};

