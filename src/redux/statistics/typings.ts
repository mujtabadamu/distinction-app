import { StudentPaperFull } from '../studentPapers/typings';
import { IRecentPractice } from '../../hooks/practice/useRecentPracticesQuery';

export interface StatisticsError {
  message: string;
}

export interface StatisticsState {
  isFetchingOverviewStatistics: boolean;
  isFetchingLearningStatistics: boolean;
  activity: Activity | null;
  score: Score | null;
  recentPapers: StudentPaperFull[] | null;
  error: StatisticsError | null;
  overview: Overview | null;
  learningStats: LearningStats | null;
  mostRecentPractice: IRecentPractice | null;
  showContinuePractice: boolean;
  TotalSingleQuestion: GetSingleTotalQuestionSuccess | null;
  isFetchingTotalQuestion:boolean
}

export interface Activity {
  totalTime: number;
}

export interface Score {
  totalQuestions: number;
  totalScore: number;
}

export interface RecentPapers {
  items: StudentPaperFull[];
  count: number;
  pages: number;
}
export interface QuestionCountByYear {
  [key: string]: number;
}
export interface SubjectStats {
  score: number;
  questionCount: number;
  breakdown: {
    [key: string]: {
      score: number;
      questionCount: number;
    };
  };
}

export interface Overview {
  score: Score | null;
  activity: Activity | null;
  recentPapers: RecentPapers | null;
  questionCountByYear:QuestionCountByYear | null

}

export interface LearningStats {
  score: Score | null;
  activity: Activity | null;
  recentPapers: RecentPapers | null;
}

// Payloads

export interface GetScoreBreakdown {
  subjectId?: string;
  topic?: string;
  examGroupId: string;
  page?: number;
  size?: number;
}

export interface GetRecentPapers {
  keyword?: string;
  examGroupId?: string;
  subjectId?: string;
  page?: number;
  size?: number;
  paperId?:string;
  date?:string;
}

export interface GetScore {
  examGroupId?: string;
  subjectId?: string;
  paperId?:string;
  date?:string;
}

// export interface timeSpent {
//   examGroupId: string;
//   subjectId?: string;
// }

export interface GetTimeSpent {
  examGroupId?: string;
  subjectId?: string;
  paperId?:string;
  date?:string;
}

export interface GetQuestionCountByYear {
  year?:string
}
export interface GetOverviewPayload {
  data: {
    scoreData: GetScore;
    timeSpent: GetTimeSpent;
    recentPapersData: GetRecentPapers;
    questionCountByYearData:GetQuestionCountByYear
  };
  onSuccess?: () => void;
  onFailure?: () => void;
}

export interface GetSubjectStats {
  examGroupId: string;
  subjectId: string;
  paperId:string;
}

export interface GetLearningStatsPayload {
  data: {
    scoreData: GetScore;
    timeSpent: GetTimeSpent;
    recentPapersData: GetRecentPapers;
  };
  onSuccess?: () => void;
  onFailure?: () => void;
}

export interface GetSingleTotalQuestion {
  data: { paperId: string};
  onSuccess?: () => void;
  onFailure?: () => void;
}

export interface GetSingleTotalQuestionSuccess {
  totalQuestions: number;
}