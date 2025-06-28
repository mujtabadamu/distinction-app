export interface PapersError {
  message: string;
}

export interface PapersState {
  isFetchingPapers: boolean;
  papers: GetPapersSuccess | null;
  error: PapersError | null;
  isCreatingRating: boolean;
  paperRating: PaperRatingSuccess | null;
}

export interface Paper {
  createdat: string;
  exam: {
    examGroupName: string;
    name: string;
    year: number;
    examGroupId: string;
  };
  subjectId: string;
  id: string;
  instruction: string;
  isActive: boolean;
  name: string;
  averageRating: number;
  subjectName: string;
}
export interface selectExamGroupItem {
  createdat: string;
  exam: {
    examGroupName: string;
    name: string;
    year: number;
    examGroupId: string;
  };
  subjectId: string;
  id: string;
  instruction: string;
  isActive: boolean;
  name: string;
  averageRating: number;
  subjectName: string;
  label?: string;
  value?: string;
}
export interface GetPapersPayload {
  examId?: string;
  subjectId?: string;
  page?: number;
  size?: number;
  examGroupId?: string;
  keyword?: string;
  curriculum?: string;
}
export interface PaperRatingData {
  rating: number;
  paperId: string;
}
export interface PostPaperRatingPayload {
  data: PaperRatingData;
  callback: () => void;
}
export interface GetPapersSuccess {
  count: number;
  pages: number;
  items: Paper[];
}
export interface PaperRatingSuccess {
  count: number;
  pages: number;
  items: Paper[];
}
