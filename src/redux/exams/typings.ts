export interface ExamsError {
  message: string;
}

export interface ExamsState {
  isFetchingExams: boolean;
  exams: GetExamsSuccess | null;
  error: ExamsError | null;
}

export interface Exam {
  name: string;
  id: string;
  year: number;
  month: number;
  isActive: boolean;
  examGroup: {
    name: string;
    id: string;
  };
}

export interface GetExamsPayload {
  name?: string;
  year?: number;
  examGroupId?: string;
  page?: number;
  size?: number;
}

export interface GetExamsSuccess {
  count: number;
  pages: number;
  items: Exam[];
}
