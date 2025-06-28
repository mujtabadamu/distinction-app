export interface FlagQuestionError {
  message: string;
}

export interface FlagQuestionState {
  flaggedQuestion: FlaggedQuestionSuccess | null;
  isFlaggingQUestion: boolean;
  error: FlagQuestionError | null;
}

export interface FlagQuestionPayload {
  data: {
    questionId: string;
    issueType: string[];
    message: string;
  };
  onSuccess?: () => void;
  onFailure?: () => void;
}

export interface FlaggedQuestionSuccess {
  flaggedQuestion: object;
}

