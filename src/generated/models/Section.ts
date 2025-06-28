/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MultimediaFile } from './MultimediaFile';
import type { Paper } from './Paper';
export type Section = {
    id?: string;
    title: string;
    content: string;
    imageUrl?: string;
    paper: Paper;
    multimediaFile?: MultimediaFile;
    institutionId: string;
    createdBy: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
};

