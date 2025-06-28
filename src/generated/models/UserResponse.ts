/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ContactResponse } from './ContactResponse';
import type { UserRoleResponse } from './UserRoleResponse';
export type UserResponse = {
    id?: string;
    firstName?: string;
    lastName?: string;
    otherName?: string;
    createdAt?: string;
    product?: string;
    organisation?: string;
    email?: string;
    roles?: Array<UserRoleResponse>;
    contacts?: Array<ContactResponse>;
    blocked?: boolean;
    verified?: boolean;
};

