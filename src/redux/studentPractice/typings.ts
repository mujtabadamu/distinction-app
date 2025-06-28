import { AnswerOption, Section } from '../studentPapers/typings';

export interface StudentPracticeError {
  message: string;
}

export interface StudentPracticeState {
  error: StudentPracticeError | null;
  isCreatingStudentPractice: boolean;
  isFetchingStudentPractice: boolean;
  isFetchingSingleStudentPractice: boolean;
  studentPractice: StudentPracticeSuccess | null;
  practices: null | GetStudentPracticeSuccess;
}

export interface StudentPracticeSuccess {
  id: string;
  questions: Question[];
}

export interface GetStudentPracticeSuccess {
  count: number;
  pages: number;
  items: Practice[];
}

export interface Practice {
  name: string;
  id: string;
  questionCount: number;
  score: number;
  completed: boolean;
  createdAt: string;
  subject: {
    id: string;
    name: string;
  };
}

export interface Question {
  tags: string[];
  text: string;
  solution: string;
  topic: string;
  imageUrl: string;
  questionNumber: number;
  answerOptions: AnswerOption[];
  id: string;
  type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'SHORT_TEXT' | 'LONG_TEXT';
  section: null | Section;
}

// Payloads
export interface GetStudentPracticePayload {
  data: {
    keyword?: string;
    subjectId?: string;
    page?: number;
    size?: number;
  };
  onSuccess?: () => void;
  onFailure?: () => void;
}

export interface GetSingleStudentPracticePayload {
  data: { id: string };
  onSuccess?: () => void;
  onFailure?: () => void;
}

export interface PostStudentPracticePayload {
  data: {
    groupId: string;
    examYears: number[];
    topics: string[] | [];
    questionCount: number;
    paperId?: string;
    subjectId?: string;
  };
  onSuccess?: () => void;
  onFailure?: () => void;
}
