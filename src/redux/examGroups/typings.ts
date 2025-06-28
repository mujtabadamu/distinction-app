export interface ExamGroupError {
  message: string;
}

export interface ExamGroupsState {
  isFetchingGroups: boolean;
  isFilteringGroups: boolean;
  examGroups: {
    count: number;
    pages: number;
    items: ExamGroup[] | [];
  };
  error: ExamGroupError | null;
  activeExamGroup: ActiveExamGroup | null;
}

export interface ActiveExamGroup {
  label: string;
  value: string;
}

export interface Exam {
  examGroupId: string;
  examGroupName: string;
  name: string;
  year: number;
}

export interface ExamGroup {
  label: string;
  value: string;
  averageRating: number;
  createdAt: string;
  exam: Exam;
  id: string;
  instruction: string;
  isActive: boolean;
  name: string;
  questionCount: number;
  subjectId: string;
  subjectName: string;
}

export interface GetExamGroupsPayload {
  name?: string;
  page?: number;
  size?: number;
}

export interface GetExamGroupsSuccess {
  count: number;
  pages: number;
  items: ExamGroup[];
}
