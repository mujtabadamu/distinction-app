// Types migrated from the old redux/studentPapers/typings.ts

export interface BookmarksDb {
  id?: number;
  questionId: string;
  studentPaperId: string;
}

export interface AnswerOptionChoice {
  questionId: string;
  answerOptionIds: string[];
  answerText?: string;
}

export type QuestionAnswerMap = Record<string, AnswerOptionChoice>;

export interface StudentPaperQuestion {
  id: string;
  question: any; // Replace 'any' with the actual question type if available
  answerOptionChoices: AnswerOptionChoice[];
  questionType:
    | 'SINGLE_CHOICE'
    | 'MULTIPLE_CHOICE'
    | 'LONG_TEXT'
    | 'SHORT_TEXT';
}

// Payload/request/response types used in services and hooks
export interface PostStudentPapersPayload {
  paperId: string;
  size: number;
  mode: 'REAL_MODE' | 'LEARNING_MODE' | string;
  captcha?: string;
  callback?: () => void;
  retakeStudentPaperId?: string;
}

export interface GetStudentPapersPayload {
  data?: {
    examGroupId?: string;
    page?: number;
    size?: number;
  };
  options?: {
    filterBy?: 'completed' | 'inProgress' | null;
  };
}

export interface GetStudentPaperQuestionsPayload {
  id: string;
  page?: number;
  size?: number;
}

export interface GetSingleStudentPaperPayload {
  data: {
    id: string;
  };
}

export interface SubmitPaperPayload {
  id: string;
  data: any;
}

export interface SubmitPaperResponseSuccess {
  id: string;
  score: number;
  questionCount: number;
  remark: string;
  scoreBreakdown?: any[];
}
