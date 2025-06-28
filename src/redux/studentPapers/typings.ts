import type { StatisticProps } from 'antd';
import { Paper } from '../papers/typings';
export interface StudentPapersError {
  message: string;
}

export interface StudentPapersState {
  isFetchingStudentPapers: boolean;
  isFetchingSingleStudentPaper: boolean;
  isCreatingStudentPaper: boolean;
  isSubmitingStudentPaper: boolean;
  isSuccessStudentPaperQuestions: boolean;
  isFetchingStudentPaperQuestions: boolean;
  studentPapers: GetStudentPapersSuccess | null;
  completedStudentPapers: GetStudentPapersSuccess | null;
  inProgressStudentPapers: GetStudentPapersSuccess | null;
  elapsedTime: number;
  singlePaper: StudentPaperFull | null;
  studentPaperQuestions: GetStudentPaperQuestionsSuccess | null;
  error: StudentPapersError | null;
  questionAnswerMap: QuestionAnswerMap;
  timeLeft: StatisticProps['value'];
  paperResult: SubmitPaperResponseSuccess | null;
  bookmarks: BookmarksDb[] | [];
}

export interface GetStudentPapersSuccess {
  count: number;
  pages: number;
  items: StudentPaper[];
}

export interface GetStudentPaperQuestionsSuccess {
  count: number;
  pages: number;
  items: StudentPaperQuestionItem[];
}

export interface GetStudentPaperQuestionsSolutionsSuccess {
  count: number;
  pages: number;
  items: StudentPaperQuestionItem[];
}

export interface StudentPaper {
  id: string;
  status: 'NOT_STARTED' | 'STARTED' | 'COMPLETED';
  paper: {
    duration: number;
    name: string;
    id: string;
    subject: {
      id: string;
      name: string;
    };
  };
  result: null | {
    id: string;
    questionCount: number;
    score: number;
  };
  timeElapsed: number;
  updatedAt: string;
}

export interface StudentPaperFull {
  id: string;
  status: 'NOT_STARTED' | 'STARTED' | 'COMPLETED';
  paper: {
    name: string;
    duration: number;
    id: string;
    exam: {
      name: string;
      id: string;
      year: number;
      examGroup: {
        name: string;
        id: string;
        imageUrl?: string;
      };
    };
    subject: {
      name: string;
      id: string;
    };
    instruction: string;
    isActive: boolean;
    createdAt: string;
  };
  result: {
    id: string;
    questionCount: number;
    score: number;
  };
  timeElapsed: number;
  updatedAt: string;
  mode: string;
}

export interface StudentPaperQuestion {
  text: string;
  id: string;
  type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'SHORT_TEXT' | 'LONG_TEXT';
  tags: string[];
  answerOptions: AnswerOption[];
  answerTexts: any[];
  questionNumber: number;
  topic: string;
  imageUrl: string;
  solution?: string;
  section: null | Section;
}

// Updated practice questions DTO structure
export interface StudentPaperQuestionItem {
  id: string;
  mode: string;
  paperName: string;
  question: StudentPaperQuestion;
  studentPaperId: string;
}

export interface Section {
  content: string;
  id: string;
  imageUrl: string;
  title: string;
  multimediaFile: {
    name: string;
    id: string;
    contentType: string;
  } | null;
}

export interface AnswerOption {
  text: string;
  id: string;
  isCorrect?: boolean;
}

export interface SubmitPaperResponseSuccess<T = Paper> {
  id: string;
  paper: T | StudentPaperFull['paper'];
  score: number;
  remark: string;
  questionCount: number;
  scoreBreakdown: ScoreBreakdown[];
}

export interface ScoreBreakdown {
  topic: string;
  questionCount: number;
  score: number;
}

// Payloads

export interface GetStudentPapersPayload {
  data?: {
    keyword?: string;
    page?: number;
    size?: number;
    examGroupId?: string;
    subjectId?: string;
    completed?: boolean;
  };
  onSuccess?: () => void;
  onFailure?: () => void;
  options?: {
    filterBy: 'completed' | 'inProgress' | null;
  };
}

export interface GetSingleStudentPaperPayload {
  data: { id: string };
  onSuccess?: () => void;
  onFailure?: () => void;
}

export interface PostStudentPapersPayload {
  paperId: string;
  size: number;
  captcha?: string;
  mode: string;
  retakeStudentPaperId?: string;
  callback?: () => void;
}

export interface GetStudentPaperQuestionsPayload {
  id: string;
  page?: number;
  size?: number;
}

// export interface AnswerOptionChoice {
//   answerOptionIds: string[];
//   studentPaperId: string;
//   answerText?: string;
//   timeElapsed: number;
//   questionId: string;
// }
export interface AnswerOptionChoice {
  questionId: string;
  answerOptionIds: string[];
  answerText?: string;
}

export interface QuestionAnswerMap {
  [key: number]: AnswerOptionChoice;
}

export interface SubmitPaperPayload {
  id: string;
  timeElapsed: number;
  callback?: () => void;
}

export interface BookmarksDb {
  id?: string;
  questionId: string;
  studentPaperId?: string;
}
