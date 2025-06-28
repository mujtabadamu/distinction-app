export interface TopicsError {
  message: string;
}

export interface TopicsState {
  isLoading: boolean;
  error: TopicsError | null;
  topics: GetTopicsSuccess | null;
}

export type GetTopicsSuccess = string[];

export interface TopicsPayload {
  examGroupId?: string;
  subjectId?: string;
  years?: string | null;
  key?: string;
  term?: string;
  filter?: string;
  limit?: number;
}
