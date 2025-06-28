/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginationDto } from './PaginationDto';
import type { UserRankDto } from './UserRankDto';
export type SchoolRankingDto = {
    schoolId?: string;
    schoolName?: string;
    ranking?: Array<UserRankDto>;
    userRanking?: UserRankDto;
    pagination?: PaginationDto;
};

