export interface SubjectError {
  message: string;
}

export interface SubjectsState {
  isFetchingSubjects: boolean;
  subjects: Subject[] | [];
  error: SubjectError | null;
}

export interface Subject {
  name: string;
  id: string;
  description: string;
}

export interface GetSubjectsPayload {
  examGroupId?: string;
}

export type GetSubjectsSuccess = Subject[];
