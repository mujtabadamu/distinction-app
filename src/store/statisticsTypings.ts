export interface StatisticsError {
  message: string;
}

export interface Activity {
  totalTime: number;
}

export interface Score {
  totalQuestions: number;
  totalScore: number;
}

export interface QuestionCountByYear {
  [key: string]: number;
}

export interface Overview {
  score: Score | null;
  activity: Activity | null;
  questionCountByYear: QuestionCountByYear | null;
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
  paperId?: string;
  date?: string;
}

export interface GetScore {
  examGroupId?: string;
  subjectId?: string;
  paperId?: string;
  date?: string;
}

export interface GetTimeSpent {
  examGroupId?: string;
  subjectId?: string;
  paperId?: string;
  date?: string;
}

export interface GetQuestionCountByYear {
  year?: string;
}

export interface GetOverviewPayload {
  data: {
    scoreData: GetScore;
    timeSpent: GetTimeSpent;
    recentPapersData: GetRecentPapers;
    questionCountByYearData: GetQuestionCountByYear;
  };
  onSuccess?: () => void;
  onFailure?: () => void;
}

export interface GetSubjectStats {
  examGroupId: string;
  subjectId: string;
  paperId: string;
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
  data: { paperId: string };
  onSuccess?: () => void;
  onFailure?: () => void;
}

export interface GetSingleTotalQuestionSuccess {
  totalQuestions: number;
}
