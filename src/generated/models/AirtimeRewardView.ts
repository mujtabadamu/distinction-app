/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AirtimeRewardRequestView } from './AirtimeRewardRequestView';
import type { UserInfoView } from './UserInfoView';
export type AirtimeRewardView = {
    status?: string;
    airtimeRewardRequest?: AirtimeRewardRequestView;
    approvedAmount?: number;
    requestedAt?: string;
    approved?: boolean;
    network?: string;
    phoneNumber?: string;
    id?: string;
    userInfo?: UserInfoView;
};

