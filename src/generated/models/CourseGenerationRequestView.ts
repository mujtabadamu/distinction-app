/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CourseGenerationRequestView = {
    retryCount?: number;
    progressStage?: string;
    aiModelVersion?: string;
    curriculum?: 'NUC' | 'NBTE' | 'NCCE' | 'OTHERS';
    courseCode?: string;
    aiJobId?: string;
    aiStatus?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'RETRYING';
    createdAt?: string;
    difficulty?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
    documentUrl?: string;
    maxRetries?: number;
    retryDelaySeconds?: number;
    lastRetryTime?: string;
    progressPercentage?: number;
    aiError?: string;
    ownerId?: string;
    lastTriedAt?: string;
    progressMessage?: string;
    totalStages?: number;
    currentStage?: number;
    stageStartTime?: string;
    estimatedCompletionTime?: string;
    id?: string;
    query?: string;
};

