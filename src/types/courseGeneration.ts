/**
 * Enhanced Course Generation Types
 * Based on the new async course generation backend API
 */

export enum AIStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
}

export enum GenerationStage {
  INITIALIZING = 'INITIALIZING',
  GENERATING_COURSE_STRUCTURE = 'GENERATING_COURSE_STRUCTURE',
  GENERATING_LESSONS = 'GENERATING_LESSONS',
  GENERATING_CONTENT = 'GENERATING_CONTENT',
  FINALIZING = 'FINALIZING',
}

export interface CreateCourseGenerationRequestPayload {
  name: string;
  courseCode: string;
  curriculum: 'NUC' | 'WAEC' | 'NECO';
  description?: string;
  targetAudience?: string;
  learningObjectives?: string[];
  estimatedDuration?: number;
}

export interface EnhancedCourseGenerationRequestView {
  id: string;
  name: string;
  courseCode: string;
  status: AIStatus;
  aiStatus: AIStatus;
  progressPercentage: number;
  currentStage: GenerationStage;
  stageDetails?: string;
  totalStages: number;
  currentStageNumber: number;
  retryCount: number;
  maxRetries: number;
  createdAt: string;
  estimatedCompletionTime?: string;
}

export interface PaginatedCourseGenerationRequests {
  content: EnhancedCourseGenerationRequestView[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface ListCourseGenerationRequestsParams {
  page?: number;
  size?: number;
  status?: AIStatus;
}

export interface CourseGenerationRequestUpdateMessage {
  id: string;
  aiStatus: AIStatus;
  aiJobId: string;
  courseId: string;
}

export interface AIStatusUpdateMessage {
  requestId: string;
  aiStatus: AIStatus;
  aiJobId: string;
  aiError?: string | null;
  timestamp: string;
}

export interface AIErrorUpdateMessage {
  requestId: string;
  error: string;
  type: 'fatal' | string;
  aiJobId: string;
  timestamp: string;
}

export interface AICompletionUpdateMessage {
  requestId: string;
  aiJobId: string;
  modelVersion: string;
  timestamp: string;
}

export interface ProgressUpdateMessage {
  requestId: string;
  percentage: number;
  stage: string;
  message: string;
  timestamp: string;
  stageDetails?: any;
  estimatedCompletionTime?: string;
}

export interface AIRetryUpdateMessage {
  requestId: string;
  retryCount: number;
  maxRetries: number;
  reason: string;
  timestamp: string;
}

export interface StageUpdateMessage {
  requestId: string;
  stage: string;
  stageMessage: string;
  percentage: number;
  message: string;
  estimatedCompletion: string;
  timestamp: string;
  stageDetails?: {
    objectives?: string[];
    modules?: Array<{
      name: string;
      description: string;
      groupNumber: number;
      estimatedStudyTime: string;
    }>;
    [key: string]: any;
  };
}

export interface GenerationProgress {
  percentage: number;
  message?: string;
}

export enum GenerationStatus {
  Done = 'DONE',
  Generating = 'GENERATING',
  Failed = 'FAILED',
  Unknown = 'UNKNOWN',
}
