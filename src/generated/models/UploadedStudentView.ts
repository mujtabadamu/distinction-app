/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DepartmentView } from './DepartmentView';
import type { SchoolView } from './SchoolView';
export type UploadedStudentView = {
    level?: string;
    createdBy?: string;
    institutionId?: string;
    firstName?: string;
    lastName?: string;
    otherName?: string;
    email?: string;
    updatedAt?: string;
    createdAt?: string;
    department?: DepartmentView;
    school?: SchoolView;
    matriculationNumber?: string;
    phoneNumber?: string;
    status?: boolean;
    enrolment?: boolean;
    id?: string;
};

