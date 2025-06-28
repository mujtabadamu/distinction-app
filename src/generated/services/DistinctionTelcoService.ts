/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedSimpleTelcoView } from '../models/PaginatedSimpleTelcoView';
import type { TelcoRequest } from '../models/TelcoRequest';
import type { TelcoView } from '../models/TelcoView';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DistinctionTelcoService {
    /**
     * @returns TelcoView OK
     * @throws ApiError
     */
    public static retrieve({
        id,
    }: {
        id: string,
    }): CancelablePromise<TelcoView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/telcos/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns TelcoView OK
     * @throws ApiError
     */
    public static update({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: TelcoRequest,
    }): CancelablePromise<TelcoView> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/telcos/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static delete({
        id,
    }: {
        id: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/telcos/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns PaginatedSimpleTelcoView OK
     * @throws ApiError
     */
    public static list({
        planType,
        network,
        page,
        size = 10,
    }: {
        planType?: 'TRIAL' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY',
        network?: 'MTN' | 'AIRTEL' | 'GL0' | 'NINE_MOBILE',
        page?: number,
        size?: number,
    }): CancelablePromise<PaginatedSimpleTelcoView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/telcos',
            query: {
                'planType': planType,
                'network': network,
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns TelcoView OK
     * @throws ApiError
     */
    public static create({
        requestBody,
    }: {
        requestBody: TelcoRequest,
    }): CancelablePromise<TelcoView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/telcos',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static callback({
        channel,
        action,
        circle,
        endDate,
        msisdn,
        operator,
        packName,
        amount,
        userStatus,
        transactionId,
        vendorName,
        startDate,
        subscriberType,
        contestName,
        language,
        contestLevel,
        src,
    }: {
        channel: string,
        action: string,
        circle: string,
        endDate: string,
        msisdn: string,
        operator: string,
        packName: string,
        amount: string,
        userStatus: number,
        transactionId: string,
        vendorName: string,
        startDate?: string,
        subscriberType?: number,
        contestName?: string,
        language?: string,
        contestLevel?: string,
        src?: string,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/telcos/callback',
            query: {
                'channel': channel,
                'action': action,
                'circle': circle,
                'endDate': endDate,
                'msisdn': msisdn,
                'operator': operator,
                'packName': packName,
                'amount': amount,
                'startDate': startDate,
                'userStatus': userStatus,
                'subscriberType': subscriberType,
                'transactionId': transactionId,
                'vendorName': vendorName,
                'contestName': contestName,
                'language': language,
                'contestLevel': contestLevel,
                'src': src,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
