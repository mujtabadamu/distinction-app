/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AirtimeRewardRequestView } from './AirtimeRewardRequestView';
import type { UserInfoView } from './UserInfoView';
export type AirtimeRewardView = {
    status?: string;
    phoneNumber?: string;
    network?: string;
    airtimeRewardRequest?: AirtimeRewardRequestView;
    approvedAmount?: number;
    requestedAt?: string;
    approved?: boolean;
    id?: string;
    userInfo?: UserInfoView;
};

