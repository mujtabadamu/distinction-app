export interface QuestionsError {
  message: string;
}

export interface QuestionsState {
  isFetchingQuestions: boolean;
  questions: GetQuestionsSuccess | null;
  isFetchingQuestionsStats: boolean;
  questionStats: GetQuestionStatsSuccess | null;
  error: QuestionsError | null;
}

export interface MultimediaFile {
  contentType: string;
  name: string;
  id: string;
}

export interface Section {
  title: string;
  imageUrl: string;
  multimediaFile: MultimediaFile;
  id: string;
  content: string;
}

export interface Questions {
  createdAt: string;
  customTags: string[];
  id: string;
  imageUrl: string | null;
  paperName: string;
  section: null | Section;
  status: string;
  text: string;
  topic: string;
  type: string;
}

export interface GetQuestionsPayload {
  keyword?: string;
  topic?: string;
  tag?: string;
  year?: number;
  subjectId?: string;
  paperId?: string;
  examGroupId?: string;
  examId?: string;
  userId?: string;
  status?: string;
  page?: number;
  size?: number;
}

export interface GetQuestionsStatsPayload {
  paperId?: string;
  userId?: string;
}

export interface GetQuestionStatsSuccess {
  totalQuestions: number;
  pendingQuestions: number;
  declinedQuestions: number;
  approvedQuestions: number;
}

interface AnswerOption {
  id?: string;
  text?: string;
  correct?: boolean;
  imageUrl?: string;
}

export interface QuestionCreateData {
  type: string;
  topic: string;
  paperId: string;
  text: string;
  sectionId: string;
  tags: string[];
  imageUrl: string;
  answerTexts: string[];
  solution: string;
  answerOptions: AnswerOption[];
}
export interface QuestionCreatePayload {
  data: QuestionCreateData;
  callback: () => void;
}

export interface GetQuestionsSuccess {
  count: number;
  pages: number;
  items: Questions[];
}

export interface BulkQuestionData {
  formData: FormData;
  paperId: string;
}

export interface BulkQuestionCreatePayload {
  data: BulkQuestionData;
  callback: () => void;
}
