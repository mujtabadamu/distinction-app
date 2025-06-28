/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type RateLimit = {
    id?: number;
    clientIp?: string;
    email?: string;
    endpoint?: string;
    timestamps?: string;
    backoffAttempts?: number;
    blockedUntil?: number;
    maxRequests?: number;
    timeWindowMinutes?: number;
    blockDurationMinutes?: number;
    blocked?: boolean;
    blockStartTime?: string;
    blockEndTime?: string;
};

