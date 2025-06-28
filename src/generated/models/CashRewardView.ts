/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminView } from './AdminView';
import type { UserInfoView } from './UserInfoView';
export type CashRewardView = {
    amount?: number;
    accountNumber?: string;
    bankName?: string;
    approved?: boolean;
    admin?: AdminView;
    approvedAt?: string;
    id?: string;
    userInfo?: UserInfoView;
};

