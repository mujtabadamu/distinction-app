/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Folder } from './Folder';
export type MultimediaFile = {
    id?: string;
    name: string;
    filePath: string;
    thumbnailPath?: string;
    folder?: Folder;
    contentType: string;
    size?: number;
    isPublic?: boolean;
    institutionId: string;
    createdBy: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
};

