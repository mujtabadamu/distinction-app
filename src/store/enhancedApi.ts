import { baseApi } from './emptyApi';

import { Notify } from '@flexisaf/flexibull2';
// Import only used types from generated API for type safety
import type {
  // Auth
  Register1ApiResponse,
  Register1ApiArg,
  RefreshTokenApiResponse,
  RefreshTokenApiArg,
  PasswordReset1ApiResponse,
  PasswordReset1ApiArg,
  PasswordResetRequest1ApiResponse,
  PasswordResetRequest1ApiArg,
  ResendVerificationApiResponse,
  ResendVerificationApiArg,
  ConfirmApiResponse,
  ConfirmApiArg,
  TokenLoginApiResponse,
  TokenLoginApiArg,
  GoogleLoginApiResponse,
  GoogleLoginApiArg,
  Login2ApiResponse,
  Login2ApiArg,
  // Student Practice
  List9ApiResponse,
  List9ApiArg,
  StartApiResponse,
  StartApiArg,
  SubmitResultApiResponse,
  SubmitResultApiArg,
  // Student Papers
  List10ApiResponse,
  List10ApiArg,
  EnrollApiResponse,
  EnrollApiArg,
  SubmitApiResponse,
  SubmitApiArg,
  SaveProgressApiResponse,
  SaveProgressApiArg,
  List11ApiResponse,
  List11ApiArg,
  AddApiResponse,
  AddApiArg,
  Delete7ApiResponse,
  Delete7ApiArg,
  GetAnswersApiResponse,
  GetAnswersApiArg,
  AnswerApiResponse,
  AnswerApiArg,
  TrackTimerApiResponse,
  TrackTimerApiArg,
  // Points and Statistics
  GetTotalPointsApiResponse,
  GetTotalPointsApiArg,
  GetBadgesApiResponse,
  GetBadgesApiArg,
  GetTotalQuestionsApiResponse,
  GetTotalQuestionsApiArg,
  GetSchoolRankingApiResponse,
  GetSchoolRankingApiArg,
  GetGlobalRankingApiResponse,
  GetGlobalRankingApiArg,
  GetMonthlyPracticeApiResponse,
  GetMonthlyPracticeApiArg,
  ScoreTotalApiResponse,
  ScoreTotalApiArg,
  TimeApiResponse,
  TimeApiArg,
  // Practice History
  GroupPracticesByCourseApiResponse,
  GroupPracticesByCourseApiArg,
  ListPracticesByPaperIdApiResponse,
  ListPracticesByPaperIdApiArg,
  GetStudentAnswerSolutionsApiResponse,
  GetStudentAnswerSolutionsApiArg,
  RetrieveResultApiResponse,
  RetrieveResultApiArg,
  QuestionsApiResponse,
  QuestionsApiArg,
  StudentPaperView,
  StudentResultView,
  // GetCurrentUserStreakStatusApiResponse,
  // GetCurrentUserStreakStatusApiArg,
  // Subscription Billing
  GetSubscriptionApiResponse,
  GetSubscriptionApiArg,
  List29ApiResponse,
  List29ApiArg,
  PaginatedSubscriptionHistoryView,
  GetPlanLimitApiResponse,
  GetPlanLimitApiArg,
  CancelSubscriptionApiResponse,
  CancelSubscriptionApiArg,
  SubscribeApiResponse,
  SubscribeApiArg,
  // Quizathon types
  PaginatedSimpleSchoolView,
  SimpleParticipantView,
  ParticipantRequest,
  // Chatbot types
  ChatRequest,
  Participant,
  PaginatedSimpleParticipantView,
  PaginatedScoreLeaderboardView,
  PaginatedAccuracyRankingView,
  ParticipantResultStatsView,
  SimpleQuizathonView,
  PaginatedStudentPaperSimpleView,
  ParticipantTimeElapsedView,
  PaginatedQuizathonView,
  Quizathon,
  PaginatedSchoolLeaderboardView,
  CertificateDto,
  PaginatedDailyLeaderBoardView,
  PaginatedGeniusScoreRankingView,
  // PaginatedSimpleExamView,
  GetExamsApiArg,
  GetExamGroupsApiResponse,
  GetExamGroupsApiArg,
  PaginatedSimplePaperView,
  GetPapersApiArg,
  // Chatbot related types
  GetMessages1ApiResponse,
  GetMessages1ApiArg,
  GetWelcomeMessage1ApiResponse,
  GetWelcomeMessage1ApiArg,
  NewThreadApiResponse,
  NewThreadApiArg,
  GetThreadsApiResponse,
  GetThreadsApiArg,
  DeleteThread1ApiResponse,
  DeleteThread1ApiArg,
  PaginatedSimpleExamGroupView,
  UserProfileDto,
  VerifyNinDto,
  PublicUserProfileDto,
} from './result';

// Import profile types from generated models
import type {
  UserProfileNinRequest,
  ProfileShareEventRequest,
  ProfileShareEventResponse,
  ProfileVisitCountResponse,
  UserStreakStatusDto,
  // Referral types
  ReferralDto,
  ReferralStatisticsView,
  PaginatedReferralView,
  AirtimeRewardDto,
  RewardRequestDto,
  // Flashcard types
  Get11ApiResponse,
  Get11ApiArg,
  Update12ApiResponse,
  Update12ApiArg,
  Delete12ApiResponse,
  Delete12ApiArg,
  List19ApiResponse,
  List19ApiArg,
  Create13ApiResponse,
  Create13ApiArg,
  GenerateFlashcardsV3ApiResponse,
  GenerateFlashcardsV3ApiArg,
  InferKnowledge1ApiResponse,
  InferKnowledge1ApiArg,
  InferKnowledgeWithStreaming1ApiResponse,
  InferKnowledgeWithStreaming1ApiArg,
  RecordUsageApiResponse,
  RecordUsageApiArg,
  StartSessionApiResponse,
  StartSessionApiArg,
  GetUsageByStudentApiResponse,
  GetUsageByStudentApiArg,
  CountActionsByStudentApiResponse,
  CountActionsByStudentApiArg,
  GetSessionByIdApiResponse,
  GetSessionByIdApiArg,
  GetSessionStatusApiResponse,
  GetSessionStatusApiArg,
  GetSessionsByStudentApiResponse,
  GetSessionsByStudentApiArg,
  GetSessionStatisticsApiResponse,
  GetSessionStatisticsApiArg,
  GetActiveSessionApiResponse,
  GetActiveSessionApiArg,
  UpdateSessionStatisticsApiResponse,
  UpdateSessionStatisticsApiArg,
  ResumeSessionApiResponse,
  ResumeSessionApiArg,
  PauseSessionApiResponse,
  PauseSessionApiArg,
  EndSessionApiResponse,
  EndSessionApiArg,
  AbandonSessionApiResponse,
  AbandonSessionApiArg,
  GetWeeklySummaryApiResponse,
  GetWeeklySummaryApiArg,
  GetStudyTrendsApiResponse,
  GetStudyTrendsApiArg,
  GetStudyStreakApiResponse,
  GetStudyStreakApiArg,
  GetSessionHistoryApiResponse,
  GetSessionHistoryApiArg,
  GetDashboardOverviewApiResponse,
  GetDashboardOverviewApiArg,
  GetSessionOutcomesApiResponse,
  GetSessionOutcomesApiArg,
  GetAchievementsApiResponse,
  GetAchievementsApiArg,
  // Keypoint types
  Get8ApiResponse,
  Get8ApiArg,
  Update10ApiResponse,
  Update10ApiArg,
  Delete10ApiResponse,
  Delete10ApiArg,
  List18ApiResponse,
  List18ApiArg,
  Create10ApiResponse,
  Create10ApiArg,
  CreateKeypointV3ApiResponse,
  CreateKeypointV3ApiArg,
  KeyPointPapersApiResponse,
  KeyPointPapersApiArg,
} from './result';

// Define SubscriptionHistoryPayload locally since it's not exported from './result'
export type SubscriptionHistoryPayload = {
  page?: number;
  size?: number;
};

// Define all possible tags for the application
export const API_TAGS = {
  // Auth related tags
  AUTH: 'AUTH',
  USER: 'USER',
  SESSION: 'SESSION',

  // Course related tags
  COURSE: 'COURSE',
  ENROLLMENT: 'ENROLLMENT',
  LESSON: 'LESSON',

  // Assessment related tags
  EXAM: 'EXAM',
  PAPER: 'PAPER',
  QUESTION: 'QUESTION',
  PRACTICE: 'PRACTICE',
  QUIZ: 'QUIZ',

  // Student related tags
  STUDENT: 'STUDENT',
  STUDENT_PAPER: 'STUDENT_PAPER',
  STUDENT_PRACTICE: 'STUDENT_PRACTICE',

  // Content related tags
  SUBJECT: 'SUBJECT',
  TOPIC: 'TOPIC',
  CONTENT: 'CONTENT',

  // Statistics and analytics
  STATISTICS: 'STATISTICS',
  ANALYTICS: 'ANALYTICS',

  // Create and earn
  CREATE_EARN: 'CREATE_EARN',
  QUESTION_FLAG: 'QUESTION_FLAG',

  // General tags
  PROFILE: 'PROFILE',
  PREFERENCE: 'PREFERENCE',
  NOTIFICATION: 'NOTIFICATION',
  CHATBOT: 'CHATBOT',
  REFERRAL: 'REFERRAL',
} as const;

// Type for tag combinations
export type ApiTag = (typeof API_TAGS)[keyof typeof API_TAGS];
export type TagCombination = ApiTag[];

// Utility function to create tag combinations
export const createTagCombination = (...tags: ApiTag[]): TagCombination => tags;

// Common tag combinations
export const COMMON_TAG_COMBINATIONS = {
  // User related
  USER_PROFILE: createTagCombination(API_TAGS.USER, API_TAGS.PROFILE),
  USER_PREFERENCES: createTagCombination(API_TAGS.USER, API_TAGS.PREFERENCE),

  // Course related
  COURSE_ENROLLMENT: createTagCombination(API_TAGS.COURSE, API_TAGS.ENROLLMENT),
  COURSE_LESSON: createTagCombination(API_TAGS.COURSE, API_TAGS.LESSON),

  // Assessment related
  EXAM_PAPER: createTagCombination(API_TAGS.EXAM, API_TAGS.PAPER),
  PRACTICE_QUESTION: createTagCombination(API_TAGS.PRACTICE, API_TAGS.QUESTION),
  STUDENT_ASSESSMENT: createTagCombination(
    API_TAGS.STUDENT,
    API_TAGS.EXAM,
    API_TAGS.PAPER
  ),

  // Content related
  SUBJECT_TOPIC: createTagCombination(API_TAGS.SUBJECT, API_TAGS.TOPIC),
  CONTENT_SUBJECT: createTagCombination(API_TAGS.CONTENT, API_TAGS.SUBJECT),

  // Statistics related
  USER_STATISTICS: createTagCombination(API_TAGS.USER, API_TAGS.STATISTICS),
  COURSE_ANALYTICS: createTagCombination(API_TAGS.COURSE, API_TAGS.ANALYTICS),
} as const;

// Enhanced API with proper tag management
export const enhancedApi = baseApi.injectEndpoints({
  overrideExisting: true,
  //   reducerPath: 'enhancedApi',
  endpoints: (build) => ({
    // Enhanced auth endpoints with proper tags

    enhancedLogin2: build.mutation<Login2ApiResponse, Login2ApiArg>({
      query: (credentials) => ({
        url: '/distinction/auth/login',
        method: 'POST',
        body: credentials.distinctionLoginRequest,
      }),
      // Invalidate user-related data on login
      invalidatesTags: [
        API_TAGS.USER,
        API_TAGS.PROFILE,
        API_TAGS.PREFERENCE,
        API_TAGS.STATISTICS,
      ],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Login2 error:', error);
          Notify('Invalid credentials', {
            status: 'error',
          });
        }
      },
    }),

    enhancedRegister: build.mutation<Register1ApiResponse, Register1ApiArg>({
      query: (registrationData) => ({
        url: '/distinction/auth/register',
        method: 'POST',
        body: registrationData.dinstinctionRegistrationRequest,
      }),
      invalidatesTags: [API_TAGS.USER, API_TAGS.PROFILE],
    }),

    enhancedRefreshToken: build.mutation<
      RefreshTokenApiResponse,
      RefreshTokenApiArg
    >({
      query: (refreshData) => ({
        url: '/distinction/auth/refresh-token',
        method: 'POST',
        body: refreshData.refreshTokenRequest,
      }),
    }),

    enhancedPasswordResetRequest: build.mutation<
      PasswordResetRequest1ApiResponse,
      PasswordResetRequest1ApiArg
    >({
      query: (resetRequest) => ({
        url: '/distinction/auth/password/reset-request',
        method: 'POST',
        body: resetRequest.distinctionPasswordResetRequest,
      }),
    }),

    enhancedPasswordReset: build.mutation<
      PasswordReset1ApiResponse,
      PasswordReset1ApiArg
    >({
      query: (resetData) => ({
        url: '/distinction/auth/password/reset',
        method: 'POST',
        body: resetData.distinctionPasswordReset,
      }),
      invalidatesTags: [API_TAGS.USER, API_TAGS.PROFILE],
    }),

    enhancedResendVerification: build.mutation<
      ResendVerificationApiResponse,
      ResendVerificationApiArg
    >({
      query: (verificationData) => ({
        url: '/distinction/auth/verify/resend',
        method: 'POST',
        body: verificationData.distinctionResendVerification,
      }),
    }),

    enhancedConfirmEmail: build.mutation<ConfirmApiResponse, ConfirmApiArg>({
      query: (confirmData) => ({
        url: '/distinction/auth/verify/confirm',
        method: 'POST',
        body: confirmData.distinctionUserConfirmRequest,
      }),
    }),

    enhancedTokenLogin: build.mutation<TokenLoginApiResponse, TokenLoginApiArg>(
      {
        query: (loginData) => ({
          url: '/distinction/auth/token-login',
          method: 'POST',
          body: loginData.distinctionTokenLoginRequest,
        }),
        // Invalidate user-related data on token login
        invalidatesTags: [
          API_TAGS.USER,
          API_TAGS.PROFILE,
          API_TAGS.PREFERENCE,
          API_TAGS.STATISTICS,
        ],
      }
    ),

    enhancedGoogleLogin: build.query<GoogleLoginApiResponse, GoogleLoginApiArg>(
      {
        query: (googleData) => ({
          url: '/distinction/auth/google-authorize',
          method: 'GET',
          params: googleData,
        }),
      }
    ),

    enhancedLogout: build.mutation({
      query: () => ({
        url: '/distinction/auth/logout',
        method: 'POST',
      }),
      // Invalidate all user-related data on logout
      invalidatesTags: [
        API_TAGS.USER,
        API_TAGS.PROFILE,
        API_TAGS.PREFERENCE,
        API_TAGS.STATISTICS,
        API_TAGS.COURSE,
        API_TAGS.ENROLLMENT,
        API_TAGS.EXAM,
        API_TAGS.PAPER,
        API_TAGS.PRACTICE,
        API_TAGS.STUDENT,
        API_TAGS.STUDENT_PAPER,
        API_TAGS.STUDENT_PRACTICE,
      ],
    }),

    // Enhanced user profile endpoints
    enhancedGetUserProfile: build.query({
      query: (userId) => ({
        url: `/users/${userId}/profile`,
        method: 'GET',
      }),
      providesTags: [API_TAGS.USER, API_TAGS.PROFILE],
    }),

    enhancedUpdateUserProfile: build.mutation({
      query: ({ userId, profileData }) => ({
        url: `/users/${userId}/profile`,
        method: 'PUT',
        body: profileData,
      }),
      invalidatesTags: [API_TAGS.USER, API_TAGS.PROFILE],
    }),

    // Enhanced course endpoints
    enhancedGetCourses: build.query({
      query: (params) => ({
        url: '/courses',
        method: 'GET',
        params,
      }),
      providesTags: [API_TAGS.COURSE],
    }),

    enhancedEnrollCourse: build.mutation({
      query: ({ courseId, enrollmentData }) => ({
        url: `/courses/${courseId}/enroll`,
        method: 'POST',
        body: enrollmentData,
      }),
      invalidatesTags: [API_TAGS.COURSE, API_TAGS.ENROLLMENT, API_TAGS.STUDENT],
    }),

    // Enhanced exam endpoints
    enhancedGetExams: build.query({
      query: (params) => ({
        url: '/portal/exams',
        method: 'GET',
        params,
      }),
      providesTags: [API_TAGS.EXAM],
    }),

    enhancedGetExamGroups: build.query<
      GetExamGroupsApiResponse,
      GetExamGroupsApiArg
    >({
      query: (params) => ({
        url: '/portal/exam-groups',
        method: 'GET',
        params,
      }),
      providesTags: [API_TAGS.EXAM],
    }),

    enhancedGetExamPapers: build.query({
      query: ({ examId, params }) => ({
        url: `/portal/exams/${examId}/papers`,
        method: 'GET',
        params,
      }),
      providesTags: [API_TAGS.EXAM, API_TAGS.PAPER],
    }),

    // Enhanced practice endpoints
    enhancedGetPracticeQuestions: build.query({
      query: (params) => ({
        url: '/portal/practice/questions',
        method: 'GET',
        params,
      }),
      providesTags: [API_TAGS.PRACTICE, API_TAGS.QUESTION],
    }),

    enhancedSubmitPracticeAnswer: build.mutation({
      query: ({ questionId, answer }) => ({
        url: `/portal/practice/questions/${questionId}/answer`,
        method: 'POST',
        body: answer,
      }),
      invalidatesTags: [
        API_TAGS.PRACTICE,
        API_TAGS.QUESTION,
        API_TAGS.STUDENT_PRACTICE,
        API_TAGS.STATISTICS,
      ],
    }),

    // Enhanced student practice endpoints with proper types
    enhancedGetStudentPractice: build.query<List9ApiResponse, List9ApiArg>({
      query: (params) => ({
        url: '/portal/student-results',
        method: 'GET',
        params: {
          keyword: params.keyword,
          paperId: params.paperId,
          examGroupId: params.examGroupId,
          examId: params.examId,
          page: params.page,
          size: params.size,
        },
      }),
      providesTags: [API_TAGS.STUDENT, API_TAGS.STUDENT_PRACTICE],
    }),

    enhancedStartStudentPractice: build.mutation<StartApiResponse, StartApiArg>(
      {
        query: (practiceData) => ({
          url: '/portal/student-practice',
          method: 'POST',
          body: practiceData.studentPracticeRequest,
        }),
        invalidatesTags: [API_TAGS.STUDENT, API_TAGS.STUDENT_PRACTICE],
      }
    ),

    enhancedSubmitStudentPractice: build.mutation<
      SubmitResultApiResponse,
      SubmitResultApiArg
    >({
      query: ({ id, studentPracticeResultRequest }) => ({
        url: `/portal/student-practice/${id}/submit`,
        method: 'POST',
        body: studentPracticeResultRequest,
      }),
      invalidatesTags: [
        API_TAGS.STUDENT,
        API_TAGS.STUDENT_PRACTICE,
        API_TAGS.STATISTICS,
      ],
    }),

    // Enhanced student paper endpoints with proper types
    enhancedGetStudentPapers: build.query<List10ApiResponse, List10ApiArg>({
      query: (params) => ({
        url: '/portal/student-papers',
        method: 'GET',
        params: {
          keyword: params.keyword,
          subjectId: params.subjectId,
          paperId: params.paperId,
          date: params.date,
          completed: params.completed,
          page: params.page,
          size: params.size,
        },
      }),
      providesTags: [API_TAGS.STUDENT, API_TAGS.STUDENT_PAPER],
    }),

    enhancedEnrollStudentPaper: build.mutation<EnrollApiResponse, EnrollApiArg>(
      {
        query: ({ studentPaperRequest }) => ({
          url: '/portal/student-papers',
          method: 'POST',
          body: studentPaperRequest,
        }),
        invalidatesTags: [API_TAGS.STUDENT, API_TAGS.STUDENT_PAPER],
      }
    ),

    enhancedSubmitStudentPaper: build.mutation<SubmitApiResponse, SubmitApiArg>(
      {
        query: ({ id, submitPaperRequest }) => ({
          url: `/portal/student-papers/${id}/submit`,
          method: 'POST',
          body: submitPaperRequest,
        }),
        invalidatesTags: [
          API_TAGS.STUDENT,
          API_TAGS.STUDENT_PAPER,
          API_TAGS.STATISTICS,
          API_TAGS.ANALYTICS,
        ],
      }
    ),

    enhancedSaveStudentPaperProgress: build.mutation<
      SaveProgressApiResponse,
      SaveProgressApiArg
    >({
      query: ({ id, studentAnswerProgressRequest }) => ({
        url: `/portal/student-papers/${id}/save-progress`,
        method: 'POST',
        body: studentAnswerProgressRequest,
      }),
    }),

    // Enhanced bookmark endpoints
    enhancedGetBookmarks: build.query<List11ApiResponse, List11ApiArg>({
      query: (params) => ({
        url: `/portal/student-papers`,
        method: 'GET',
        params: {
          keyword: params.keyword,
          examGroupId: params.examGroupId,
          paperId: params.paperId,
          subjectId: params.subjectId,
          completed: params.completed,
          date: params.date,
          page: params.page,
          size: params.size,
        },
      }),
      providesTags: [API_TAGS.STUDENT, API_TAGS.STUDENT_PAPER],
    }),

    enhancedAddBookmark: build.mutation<AddApiResponse, AddApiArg>({
      query: ({ id, bookmarkRequest }) => ({
        url: `/portal/student-papers/${id}/bookmarks`,
        method: 'POST',
        body: bookmarkRequest,
      }),
      invalidatesTags: [API_TAGS.STUDENT, API_TAGS.STUDENT_PAPER],
    }),

    enhancedDeleteBookmark: build.mutation<Delete7ApiResponse, Delete7ApiArg>({
      query: ({ id, questionId }) => ({
        url: `/portal/student-papers/${id}/bookmarks`,
        method: 'DELETE',
        params: { questionId },
      }),
      invalidatesTags: [API_TAGS.STUDENT, API_TAGS.STUDENT_PAPER],
    }),

    // Enhanced answer endpoints
    enhancedGetAnswers: build.query<GetAnswersApiResponse, GetAnswersApiArg>({
      query: ({ id, questionIds }) => ({
        url: `/portal/student-papers/${id}/answers`,
        method: 'GET',
        params: { questionIds },
      }),
      providesTags: [API_TAGS.STUDENT, API_TAGS.STUDENT_PAPER],
    }),

    enhancedSubmitAnswer: build.mutation<AnswerApiResponse, AnswerApiArg>({
      query: ({ id, studentAnswerRequest }) => ({
        url: `/portal/student-papers/${id}/answers`,
        method: 'POST',
        body: studentAnswerRequest,
      }),
      invalidatesTags: [API_TAGS.STUDENT, API_TAGS.STUDENT_PAPER],
    }),

    // Enhanced timer tracking
    enhancedTrackTimer: build.mutation<TrackTimerApiResponse, TrackTimerApiArg>(
      {
        query: (timerData) => ({
          url: '/portal/student-papers/track-timer',
          method: 'POST',
          body: timerData.tracktimerRequest,
        }),
      }
    ),

    // Enhanced statistics endpoints
    enhancedGetUserStatistics: build.query({
      query: (params) => ({
        url: '/portal/statistics/user',
        method: 'GET',
        params,
      }),
      providesTags: [API_TAGS.USER, API_TAGS.STATISTICS],
    }),

    enhancedGetQuestionStatistics: build.query<
      GetTotalQuestionsApiResponse,
      GetTotalQuestionsApiArg
    >({
      query: (params) => ({
        url: '/statistics/questions',
        method: 'GET',
        params,
      }),
      providesTags: [API_TAGS.STATISTICS],
    }),

    enhancedGetCourseAnalytics: build.query({
      query: ({ courseId, params }) => ({
        url: `/portal/courses/${courseId}/analytics`,
        method: 'GET',
        params,
      }),
      providesTags: [API_TAGS.COURSE, API_TAGS.ANALYTICS],
    }),

    // Enhanced content endpoints
    enhancedGetSubjects: build.query({
      query: (params) => ({
        url: '/portal/subjects',
        method: 'GET',
        params,
      }),
      providesTags: [API_TAGS.SUBJECT],
    }),

    enhancedGetTopics: build.query({
      query: ({ subjectId, params }) => ({
        url: `/portal/subjects/${subjectId}/topics`,
        method: 'GET',
        params,
      }),
      providesTags: [API_TAGS.SUBJECT, API_TAGS.TOPIC],
    }),

    // Enhanced create and earn endpoints
    enhancedCreateQuestion: build.mutation({
      query: (questionData) => ({
        url: '/portal/create-earn/questions',
        method: 'POST',
        body: questionData,
      }),
      invalidatesTags: [
        API_TAGS.CREATE_EARN,
        API_TAGS.QUESTION,
        API_TAGS.STATISTICS,
      ],
    }),

    enhancedFlagQuestion: build.mutation({
      query: ({ questionId, flagData }) => ({
        url: `/portal/questions/${questionId}/flag`,
        method: 'POST',
        body: flagData,
      }),
      invalidatesTags: [API_TAGS.QUESTION_FLAG, API_TAGS.QUESTION],
    }),

    // Enhanced points endpoints
    enhancedGetTotalPoints: build.query<
      GetTotalPointsApiResponse,
      GetTotalPointsApiArg
    >({
      query: ({ userId }) => ({
        url: `/points/total`,
        method: 'GET',
        params: { userId },
      }),
      providesTags: [API_TAGS.USER, API_TAGS.STATISTICS],
    }),

    enhancedGetBadges: build.query<GetBadgesApiResponse, GetBadgesApiArg>({
      query: () => ({
        url: `/point-types`,
        method: 'GET',
      }),
      providesTags: [API_TAGS.USER, API_TAGS.STATISTICS],
    }),

    enhancedGetSchoolRanking: build.query<
      GetSchoolRankingApiResponse,
      GetSchoolRankingApiArg
    >({
      query: (params) => ({
        url: `/portal/statistics/school-ranking`,
        method: 'GET',
        params,
      }),
      providesTags: [API_TAGS.USER, API_TAGS.STATISTICS],
    }),

    enhancedGetGlobalRanking: build.query<
      GetGlobalRankingApiResponse,
      GetGlobalRankingApiArg
    >({
      query: (params) => ({
        url: `/portal/statistics/global-ranking`,
        method: 'GET',
        params,
      }),
      providesTags: [API_TAGS.USER, API_TAGS.STATISTICS],
    }),

    // Enhanced statistics endpoints
    enhancedGetMonthlyPractice: build.query<
      GetMonthlyPracticeApiResponse,
      GetMonthlyPracticeApiArg
    >({
      query: (params) => ({
        url: `/monthly-practice`,
        method: 'GET',
        params: {
          userId: params.userId,
          year: params.year,
        },
      }),
      providesTags: [API_TAGS.USER, API_TAGS.STATISTICS],
    }),

    enhancedGetScoreTotal: build.query<ScoreTotalApiResponse, ScoreTotalApiArg>(
      {
        query: (params) => ({
          url: `/portal/statistics/scores`,
          method: 'GET',
          params: {
            examGroupId: params.examGroupId,
            date: params.date,
            paperId: params.paperId,
            subjectId: params.subjectId,
          },
        }),
        providesTags: [API_TAGS.USER, API_TAGS.STATISTICS],
      }
    ),

    enhancedGetTimeStats: build.query<TimeApiResponse, TimeApiArg>({
      query: (params) => ({
        url: `/portal/statistics/time`,
        method: 'GET',
        params: {
          examGroupId: params.examGroupId,
          date: params.date,
          paperId: params.paperId,
          subjectId: params.subjectId,
        },
      }),
      providesTags: [API_TAGS.USER, API_TAGS.STATISTICS],
    }),

    // Enhanced streak endpoints
    enhancedGetCurrentUserStreakStatus: build.query<UserStreakStatusDto, void>({
      query: () => ({
        url: '/streak/user-streak-stats',
        method: 'GET',
      }),
      providesTags: [API_TAGS.USER, API_TAGS.STATISTICS],
    }),

    // Enhanced practice history endpoints
    enhancedGroupPracticesByCourse: build.query<
      GroupPracticesByCourseApiResponse,
      GroupPracticesByCourseApiArg
    >({
      query: (params) => ({
        url: `/portal/student-papers/practice-by-course`,
        method: 'GET',
        params: {
          keyword: params.keyword,
          examGroupId: params.examGroupId,
          subjectId: params.subjectId,
          paperId: params.paperId,
          page: params.page,
          size: params.size,
        },
      }),
      providesTags: [
        API_TAGS.STUDENT,
        API_TAGS.STUDENT_PAPER,
        API_TAGS.STATISTICS,
      ],
    }),

    enhancedListPracticesByPaperId: build.query<
      ListPracticesByPaperIdApiResponse,
      ListPracticesByPaperIdApiArg
    >({
      query: (params) => ({
        url: `/portal/student-papers/practice-by-paper`,
        method: 'GET',
        params: {
          paperId: params.paperId,
          page: params.page,
          size: params.size,
        },
      }),
      providesTags: [API_TAGS.STUDENT, API_TAGS.STUDENT_PAPER],
    }),

    enhancedGetStudentAnswerSolutions: build.query<
      GetStudentAnswerSolutionsApiResponse,
      GetStudentAnswerSolutionsApiArg
    >({
      query: (params) => ({
        url: `/portal/student-papers/${params.studentPaperId}/student-answer-solutions`,
        method: 'GET',
        params: {
          page: params.page,
          size: params.size,
        },
      }),
      providesTags: [API_TAGS.STUDENT, API_TAGS.STUDENT_PAPER],
    }),

    enhancedGetStudentPaperQuestions: build.query<
      QuestionsApiResponse,
      QuestionsApiArg
    >({
      query: (params) => ({
        url: `/portal/student-papers/${params.id}/questions`,
        method: 'GET',
        params: {
          page: params.page,
          size: params.size,
        },
      }),
      providesTags: [API_TAGS.STUDENT, API_TAGS.STUDENT_PAPER],
    }),

    // Create student paper
    enhancedCreateStudentPaper: build.mutation<
      StudentPaperView,
      {
        paperId: string;
        size: number;
        mode: string;
        captcha?: string;
      }
    >({
      query: (params) => ({
        url: '/portal/student-papers',
        method: 'POST',
        body: {
          paperId: params.paperId,
          size: params.size,
          mode: params.mode,
          ...(params.captcha && { captcha: params.captcha }),
        },
      }),
      invalidatesTags: [API_TAGS.STUDENT, API_TAGS.STUDENT_PAPER],
    }),

    enhancedRetrieveResult: build.query<
      RetrieveResultApiResponse,
      RetrieveResultApiArg
    >({
      query: ({ id }) => ({
        url: `/portal/student-papers/${id}/result`,
        method: 'GET',
      }),
      providesTags: [API_TAGS.STUDENT, API_TAGS.STUDENT_PAPER],
    }),

    // --- Enhanced Subscription Billing Endpoints ---
    enhancedGetActivePlan: build.query<
      GetSubscriptionApiResponse,
      GetSubscriptionApiArg
    >({
      query: () => ({
        url: '/distinction/portal/subscriptions/active',
        method: 'GET',
      }),
      providesTags: [API_TAGS.USER, API_TAGS.PROFILE],
    }),
    enhancedGetSubscriptionPackages: build.query<
      List29ApiResponse,
      List29ApiArg
    >({
      query: (params) => ({
        url: '/distinction/portal/subscription-packages',
        method: 'GET',
        params,
      }),
      providesTags: [API_TAGS.USER, API_TAGS.PROFILE],
    }),
    enhancedGetSubscriptionHistory: build.query<
      PaginatedSubscriptionHistoryView,
      SubscriptionHistoryPayload
    >({
      query: (params) => ({
        url: '/distinction/portal/subscriptions',
        method: 'GET',
        params,
      }),
      providesTags: [API_TAGS.USER, API_TAGS.PROFILE],
    }),
    enhancedGetFeatureLimit: build.query<
      GetPlanLimitApiResponse,
      GetPlanLimitApiArg
    >({
      query: (params) => ({
        url: '/distinction/portal/subscriptions/limit',
        method: 'GET',
        params,
      }),
      providesTags: [API_TAGS.USER, API_TAGS.PROFILE],
    }),
    enhancedCancelSubscription: build.mutation<
      CancelSubscriptionApiResponse,
      CancelSubscriptionApiArg
    >({
      query: () => ({
        url: '/distinction/portal/subscriptions/cancel',
        method: 'POST',
      }),
      invalidatesTags: [API_TAGS.USER, API_TAGS.PROFILE],
    }),

    enhancedSubscribe: build.mutation<SubscribeApiResponse, SubscribeApiArg>({
      query: (subscriptionRequest) => ({
        url: '/distinction/portal/subscriptions/subscribe',
        method: 'POST',
        body: subscriptionRequest.subscriptionRequest,
      }),
      invalidatesTags: [API_TAGS.USER, API_TAGS.PROFILE],
    }),

    // Enhanced quizathon endpoints
    enhancedGetSchoolList: build.query<
      PaginatedSimpleSchoolView,
      {
        name?: string;
        abbr?: string;
        curriculum?: 'NUC' | 'NBTE' | 'NCCE' | 'OTHERS';
        page?: number;
        size?: number;
      }
    >({
      query: (params) => ({
        url: '/schools',
        method: 'GET',
        params: {
          name: params.name,
          abbr: params.abbr,
          curriculum: params.curriculum,
          page: params.page,
          size: params.size || -1,
        },
      }),
      providesTags: [API_TAGS.QUIZ],
    }),

    enhancedSubmitStudentInfo: build.mutation<
      SimpleParticipantView,
      ParticipantRequest
    >({
      query: (participantRequest) => ({
        url: '/quizathon/particpant',
        method: 'POST',
        body: participantRequest,
      }),
      invalidatesTags: [API_TAGS.QUIZ],
    }),

    enhancedEditStudentInfo: build.mutation<
      Participant,
      { id: string; participantRequest: ParticipantRequest }
    >({
      query: ({ id, participantRequest }) => ({
        url: `/quizathon/particpant/${id}`,
        method: 'PUT',
        body: participantRequest,
      }),
      invalidatesTags: [API_TAGS.QUIZ],
    }),

    enhancedGetParticipant: build.query<
      PaginatedSimpleParticipantView,
      {
        quizathonId: string;
        studentId?: string;
        schoolId?: string;
        keyword?: string;
        page?: number;
        size?: number;
      }
    >({
      query: (params) => ({
        url: '/quizathon/particpant',
        method: 'GET',
        params: {
          quizathonId: params.quizathonId,
          studentId: params.studentId,
          schoolId: params.schoolId,
          keyword: params.keyword,
          page: params.page,
          size: params.size,
        },
      }),
      providesTags: [API_TAGS.QUIZ],
    }),

    enhancedGetLeaderboard: build.query<
      PaginatedScoreLeaderboardView,
      {
        studentId?: string;
        quizathonId?: string;
        schoolId?: string;
        keyword?: string;
        page?: number;
        size?: number;
      }
    >({
      query: (params) => ({
        url: '/quizathon/leaderboard',
        method: 'GET',
        params: {
          studentId: params.studentId,
          quizathonId: params.quizathonId,
          schoolId: params.schoolId,
          keyword: params.keyword,
          page: params.page,
          size: params.size,
        },
      }),
      providesTags: [API_TAGS.QUIZ],
    }),

    enhancedGetIndividualLeaderboardStat: build.query<
      PaginatedScoreLeaderboardView | PaginatedAccuracyRankingView,
      {
        params: {
          studentId?: string;
          quizathonId?: string;
          schoolId?: string;
          keyword?: string;
          page?: number;
          size?: number;
        };
        useAccuracy: boolean;
      }
    >({
      query: ({ params, useAccuracy }) => ({
        url: useAccuracy
          ? '/quizathon/leaderboard-rankings'
          : '/quizathon/leaderboard',
        method: 'GET',
        params: {
          studentId: params.studentId,
          quizathonId: params.quizathonId,
          schoolId: params.schoolId,
          keyword: params.keyword,
          page: params.page,
          size: params.size,
        },
      }),
      providesTags: [API_TAGS.QUIZ],
    }),

    enhancedGetParticipantStats: build.query<
      ParticipantResultStatsView,
      {
        studentId: string;
        quizathonId: string;
      }
    >({
      query: (params) => ({
        url: `/quizathon/participants/stats/${params.studentId}`,
        method: 'GET',
        params: {
          quizathonId: params.quizathonId,
        },
      }),
      providesTags: [API_TAGS.QUIZ],
    }),

    enhancedGetActiveQuizathon: build.query<SimpleQuizathonView[], void>({
      query: () => ({
        url: '/quizathon/active',
        method: 'GET',
      }),
      providesTags: [API_TAGS.QUIZ],
    }),

    enhancedGetAllActiveQuizathon: build.query<SimpleQuizathonView[], void>({
      query: () => ({
        url: '/quizathon/active',
        method: 'GET',
      }),
      providesTags: [API_TAGS.QUIZ],
    }),

    enhancedGetQuizathonPapersTaken: build.query<
      PaginatedStudentPaperSimpleView,
      {
        quizathonId: string;
        page?: number;
        size?: number;
      }
    >({
      query: (params) => ({
        url: '/portal/student-papers/quizathon',
        method: 'GET',
        params: {
          quizathonId: params.quizathonId,
          page: params.page,
          size: params.size,
        },
      }),
      providesTags: [API_TAGS.QUIZ, API_TAGS.STUDENT_PAPER],
    }),

    enhancedGetQuizathonElapsedTime: build.query<
      ParticipantTimeElapsedView,
      {
        studentId: string;
        quizathonId: string;
      }
    >({
      query: (params) => ({
        url: '/quizathon/time-elapsed',
        method: 'GET',
        params: {
          studentId: params.studentId,
          quizathonId: params.quizathonId,
        },
      }),
      providesTags: [API_TAGS.QUIZ],
    }),

    enhancedGetQuizathonHistory: build.query<
      PaginatedQuizathonView,
      {
        keyword?: string;
        status?: boolean;
        page?: number;
        size?: number;
        studentId?: string;
      }
    >({
      query: (params) => ({
        url: '/quizathon',
        method: 'GET',
        params: {
          keyword: params.keyword,
          status: params.status,
          page: params.page,
          size: params.size,
        },
      }),
      providesTags: [API_TAGS.QUIZ],
    }),

    enhancedGetSingleQuizathon: build.query<Quizathon, string>({
      query: (id) => ({
        url: `/quizathon/${id}`,
        method: 'GET',
      }),
      providesTags: [API_TAGS.QUIZ],
    }),

    enhancedGetSchoolLeaderboard: build.query<
      PaginatedSchoolLeaderboardView,
      {
        quizathonId?: string;
        keyword?: string;
        page?: number;
        size?: number;
      }
    >({
      query: (params) => ({
        url: '/quizathon/university-leaderboard',
        method: 'GET',
        params: {
          quizathonId: params.quizathonId,
          keyword: params.keyword,
          page: params.page,
          size: params.size,
        },
      }),
      providesTags: [API_TAGS.QUIZ],
    }),

    enhancedGenerateCertificate: build.mutation<CertificateDto, string>({
      query: (participantId) => ({
        url: `/quizathon/certificate/${participantId}`,
        method: 'GET',
      }),
      invalidatesTags: [API_TAGS.QUIZ],
    }),

    enhancedVerifyCertificate: build.mutation<CertificateDto, string>({
      query: (participantId) => ({
        url: `/quizathon/certificate/verify/${participantId}`,
        method: 'GET',
      }),
      invalidatesTags: [API_TAGS.QUIZ],
    }),

    enhancedGetAccuracyLeaderboard: build.query<
      PaginatedAccuracyRankingView,
      {
        quizathonId?: string;
        page?: number;
        size?: number;
        studentId?: string;
      }
    >({
      query: (params) => ({
        url: '/quizathon/leaderboard-rankings',
        method: 'GET',
        params: {
          quizathonId: params.quizathonId,
          page: params.page,
          size: params.size,
          studentId: params.studentId,
        },
      }),
      providesTags: [API_TAGS.QUIZ],
    }),

    enhancedGetGeniusLeaderboard: build.query<
      PaginatedGeniusScoreRankingView,
      {
        quizathonId?: string;
        page?: number;
        size?: number;
        studentId?: string;
      }
    >({
      query: (params) => ({
        url: '/quizathon/genius-score-leaderboard',
        method: 'GET',
        params: {
          quizathonId: params.quizathonId,
          page: params.page,
          size: params.size,
          studentId: params.studentId,
        },
      }),
      providesTags: [API_TAGS.QUIZ],
    }),

    enhancedGetQuizathonDailyLeaderBoard: build.query<
      PaginatedDailyLeaderBoardView,
      {
        studentId?: string;
        quizathonId?: string;
        date?: string;
        page?: number;
        size?: number;
      }
    >({
      query: (params) => ({
        url: '/quizathon/daily-leaderboard',
        method: 'GET',
        params: {
          studentId: params.studentId,
          quizathonId: params.quizathonId,
          ...(params.date && { date: params.date }),
          page: params.page,
          size: params.size,
        },
      }),
      providesTags: [API_TAGS.QUIZ],
    }),

    // Enhanced profile endpoints
    enhancedGetUserProfileByStudentId: build.query<UserProfileDto, string>({
      query: (studentId: string) => ({
        url: '/Profile',
        method: 'GET',
        params: { studentId },
      }),
      providesTags: [API_TAGS.USER, API_TAGS.PROFILE],
    }),

    enhancedEditUserProfile: build.mutation<
      UserProfileDto,
      {
        phoneNumber: string;
        firstName: string;
        lastName: string;
        gender: string;
        matriculationNumber: string;
        department: string;
        stateOfOrigin: string;
        schoolId: string;
        level: string;
        dateOfBirth: string;
        otherName?: string;
        bio?: string;
        formData?: {
          profileImage?: Blob;
        };
      }
    >({
      query: (profileData) => {
        const { formData, ...params } = profileData;

        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            queryParams.append(key, String(value));
          }
        });

        const url = `/Profile/?${queryParams.toString()}`;

        const formDataObj = new FormData();
        formDataObj.append('profileImage', formData?.profileImage as Blob);

        return {
          url,
          method: 'PUT',
          body: formDataObj,
        };
      },
      invalidatesTags: [API_TAGS.USER, API_TAGS.PROFILE],
    }),

    enhancedEditUserProfileNin: build.mutation<
      UserProfileDto,
      UserProfileNinRequest
    >({
      query: (requestBody) => ({
        url: '/Profile/nin/update',
        method: 'PUT',
        body: requestBody,
      }),
      invalidatesTags: [API_TAGS.USER, API_TAGS.PROFILE],
    }),

    enhancedVerifyProfileNin: build.mutation<VerifyNinDto, void>({
      query: () => ({
        url: '/Profile/verify/nin',
        method: 'POST',
      }),
      invalidatesTags: [API_TAGS.USER, API_TAGS.PROFILE],
    }),

    enhancedGetPublicUserProfile: build.query<PublicUserProfileDto, string>({
      query: (username: string) => ({
        url: `/Profile/public/${username}`,
        method: 'GET',
      }),
      providesTags: [API_TAGS.USER, API_TAGS.PROFILE],
    }),

    // Enhanced profile events endpoints
    enhancedTrackProfileShareEvent: build.mutation<
      ProfileShareEventResponse,
      ProfileShareEventRequest
    >({
      query: (requestBody) => ({
        url: '/profile/event/track-profile-shares',
        method: 'POST',
        body: requestBody,
      }),
    }),

    enhancedTrackPublicProfileClick: build.mutation<
      Record<string, any>,
      { username: string; requestBody: ProfileShareEventRequest }
    >({
      query: ({ username, requestBody }) => ({
        url: `/profile/event/track-public-profile/${username}`,
        method: 'POST',
        body: requestBody,
      }),
    }),

    enhancedGetMyProfileVisitCount: build.query<
      ProfileVisitCountResponse,
      void
    >({
      query: () => ({
        url: '/profile/event/count-profile-visits',
        method: 'GET',
      }),
      providesTags: [API_TAGS.USER, API_TAGS.PROFILE],
    }),

    // Enhanced exam hooks
    enhancedGetExamsQuery: build.query<
      PaginatedSimpleExamGroupView,
      GetExamsApiArg
    >({
      query: (params) => ({
        url: '/exams',
        method: 'GET',
        params,
      }),
      providesTags: [API_TAGS.EXAM],
    }),

    // Enhanced papers hooks
    enhancedGetPapersQuery: build.query<
      PaginatedSimplePaperView,
      GetPapersApiArg
    >({
      query: (params) => ({
        url: '/portal/papers',
        method: 'GET',
        params,
      }),
      providesTags: [API_TAGS.PAPER],
    }),

    // Enhanced chatbot hooks
    enhancedGetMessages1: build.query<
      GetMessages1ApiResponse,
      GetMessages1ApiArg
    >({
      query: (params) => ({
        url: `/assistant/thread/${params.threadId}/sessions`,
        method: 'GET',
        params: {
          limit: params.limit,
          order: params.order,
        },
      }),
      providesTags: [API_TAGS.CHATBOT],
    }),

    enhancedGetWelcomeMessage1: build.query<
      GetWelcomeMessage1ApiResponse,
      GetWelcomeMessage1ApiArg
    >({
      query: (params) => ({
        url: '/assistant/welcome',
        method: 'GET',
        params: {
          paperName: params.paperName,
        },
      }),
      providesTags: [API_TAGS.CHATBOT],
    }),

    enhancedNewThread: build.mutation<NewThreadApiResponse, NewThreadApiArg>({
      query: (params) => ({
        url: '/assistant/thread/new-thread',
        method: 'POST',
        body: params.newThreadRequest,
      }),
      invalidatesTags: [API_TAGS.CHATBOT],
    }),

    enhancedGetThreads: build.query<GetThreadsApiResponse, GetThreadsApiArg>({
      query: () => ({
        url: '/assistant/threads',
        method: 'GET',
      }),
      providesTags: [API_TAGS.CHATBOT],
    }),

    enhancedDeleteThread1: build.mutation<
      DeleteThread1ApiResponse,
      DeleteThread1ApiArg
    >({
      query: (params) => ({
        url: `/assistant/thread/${params.threadId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [API_TAGS.CHATBOT],
    }),

    enhancedChatStream: build.mutation<
      Response,
      { threadId: string; chatRequest: ChatRequest }
    >({
      query: ({ threadId, chatRequest }) => ({
        url: `/assistant/thread/${threadId}/chat-stream`,
        method: 'POST',
        body: chatRequest,
        responseHandler: async (response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch response from server');
          }
          return response;
        },
      }),
      invalidatesTags: [API_TAGS.CHATBOT],
    }),

    // Enhanced referral endpoints
    enhancedCreateReferral: build.mutation<
      ReferralDto,
      { referredEmail: string }
    >({
      query: (params) => ({
        url: '/Profile/refer',
        method: 'POST',
        params: {
          referredEmail: params.referredEmail,
        },
      }),
      invalidatesTags: [API_TAGS.REFERRAL],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          Notify('Invitation sent successfully', { status: 'success' });
        } catch (error) {
          console.error('Create referral error:', error);
        }
      },
    }),

    enhancedGetReferralStatistics: build.query<
      ReferralStatisticsView,
      { studentId: string }
    >({
      query: (params) => ({
        url: '/Profile/student/statistics',
        method: 'GET',
        params: {
          studentId: params.studentId,
        },
      }),
      providesTags: [API_TAGS.REFERRAL],
    }),

    enhancedGetStudentReferralCode: build.query<
      Record<string, any>,
      { studentId: string }
    >({
      query: (params) => ({
        url: '/Profile/student/getReferralCode',
        method: 'GET',
        params: {
          studentId: params.studentId,
        },
      }),
      providesTags: [API_TAGS.REFERRAL],
    }),

    enhancedGetReferrals: build.query<
      PaginatedReferralView,
      {
        studentId: string;
        keyword?: string;
        page?: number;
        size?: number;
      }
    >({
      query: (params) => ({
        url: '/Profile/referrals',
        method: 'GET',
        params: {
          studentId: params.studentId,
          keyword: params.keyword,
          page: params.page,
          size: params.size,
        },
      }),
      providesTags: [API_TAGS.REFERRAL],
    }),

    enhancedRequestReward: build.mutation<
      AirtimeRewardDto,
      { requestBody: RewardRequestDto }
    >({
      query: (params) => ({
        url: '/rewards/request',
        method: 'POST',
        body: params.requestBody,
      }),
      invalidatesTags: [API_TAGS.REFERRAL],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          Notify('Reward Claimed Successfully', { status: 'success' });
        } catch (error) {
          console.error('Request reward error:', error);
        }
      },
    }),

    enhancedGetAirtimeRewardsByStudentId: build.query<
      AirtimeRewardDto[],
      { studentId: string }
    >({
      query: (params) => ({
        url: `/rewards/student-airtime-rewards/${params.studentId}`,
        method: 'GET',
      }),
      providesTags: [API_TAGS.REFERRAL],
    }),

    // Flashcard endpoints
    enhancedGetFlashcard: build.query<Get11ApiResponse, Get11ApiArg>({
      query: (params) => ({
        url: `/flashcards/${params.id}`,
        method: 'GET',
      }),
      providesTags: [API_TAGS.CONTENT],
    }),

    enhancedUpdateFlashcard: build.mutation<
      Update12ApiResponse,
      Update12ApiArg
    >({
      query: (params) => ({
        url: `/flashcards/${params.id}/rename`,
        method: 'PUT',
        body: params.updateFlashcardRequest,
      }),
      invalidatesTags: [API_TAGS.CONTENT],
    }),

    enhancedDeleteFlashcard: build.mutation<
      Delete12ApiResponse,
      Delete12ApiArg
    >({
      query: (params) => ({
        url: `/flashcards/${params.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [API_TAGS.CONTENT],
    }),

    enhancedListFlashcards: build.query<List19ApiResponse, List19ApiArg>({
      query: (params) => ({
        url: '/flashcards',
        method: 'GET',
        params: {
          keyword: params.keyword,
          paperId: params.paperId,
          studentId: params.studentId,
          difficulty: params.difficulty,
          page: params.page,
          size: params.size,
        },
      }),
      providesTags: [API_TAGS.CONTENT],
    }),

    enhancedCreateFlashcard: build.mutation<
      Create13ApiResponse,
      Create13ApiArg
    >({
      query: (params) => ({
        url: '/flashcards',
        method: 'POST',
        params: {
          difficulty: params.difficulty,
          paperId: params.paperId,
        },
        body: params.body,
      }),
      invalidatesTags: [API_TAGS.CONTENT],
    }),

    enhancedGenerateFlashcardsV3: build.mutation<
      GenerateFlashcardsV3ApiResponse,
      GenerateFlashcardsV3ApiArg
    >({
      query: (params) => ({
        url: '/flashcards/v3',
        method: 'POST',
        params: {
          difficulty: params.difficulty,
          curriculum: params.curriculum,
          paperId: params.paperId,
        },
        body: params.body,
      }),
      invalidatesTags: [API_TAGS.CONTENT],
    }),

    enhancedInferKnowledge1: build.mutation<
      InferKnowledge1ApiResponse,
      InferKnowledge1ApiArg
    >({
      query: (params) => ({
        url: '/flashcards/v2',
        method: 'POST',
        params: {
          difficulty: params.difficulty,
          paperId: params.paperId,
        },
        body: params.body,
      }),
      invalidatesTags: [API_TAGS.CONTENT],
    }),

    enhancedInferKnowledgeWithStreaming1: build.mutation<
      InferKnowledgeWithStreaming1ApiResponse,
      InferKnowledgeWithStreaming1ApiArg
    >({
      query: (params) => ({
        url: '/flashcards/v2-streaming',
        method: 'POST',
        params: {
          difficulty: params.difficulty,
          paperId: params.paperId,
          cardsCount: params.cardsCount,
        },
      }),
      invalidatesTags: [API_TAGS.CONTENT],
    }),

    enhancedRecordUsage: build.mutation<
      RecordUsageApiResponse,
      RecordUsageApiArg
    >({
      query: (params) => ({
        url: '/flashcard-usage',
        method: 'POST',
        body: params.flashcardUsageRequest,
      }),
      invalidatesTags: [API_TAGS.STATISTICS],
    }),

    enhancedStartSession: build.mutation<
      StartSessionApiResponse,
      StartSessionApiArg
    >({
      query: (params) => ({
        url: '/flashcard-sessions/start',
        method: 'POST',
        body: params.flashcardSessionRequest,
      }),
      invalidatesTags: [API_TAGS.STATISTICS],
    }),

    enhancedGetUsageByStudent: build.query<
      GetUsageByStudentApiResponse,
      GetUsageByStudentApiArg
    >({
      query: (params) => ({
        url: `/flashcard-usage/student/${params.studentId}`,
        method: 'GET',
      }),
      providesTags: [API_TAGS.STATISTICS],
    }),

    enhancedCountActionsByStudent: build.query<
      CountActionsByStudentApiResponse,
      CountActionsByStudentApiArg
    >({
      query: (params) => ({
        url: `/flashcard-usage/student/${params.studentId}/count/${params.actionType}`,
        method: 'GET',
      }),
      providesTags: [API_TAGS.STATISTICS],
    }),

    enhancedGetSessionById: build.query<
      GetSessionByIdApiResponse,
      GetSessionByIdApiArg
    >({
      query: (params) => ({
        url: `/flashcard-sessions/${params.sessionId}`,
        method: 'GET',
      }),
      providesTags: [API_TAGS.STATISTICS],
    }),

    enhancedGetSessionStatus: build.query<
      GetSessionStatusApiResponse,
      GetSessionStatusApiArg
    >({
      query: (params) => ({
        url: `/flashcard-sessions/${params.sessionId}/status`,
        method: 'GET',
      }),
      providesTags: [API_TAGS.STATISTICS],
    }),

    enhancedGetSessionsByStudent: build.query<
      GetSessionsByStudentApiResponse,
      GetSessionsByStudentApiArg
    >({
      query: (params) => ({
        url: `/flashcard-sessions/student/${params.studentId}`,
        method: 'GET',
      }),
      providesTags: [API_TAGS.STATISTICS],
    }),

    enhancedGetSessionStatistics: build.query<
      GetSessionStatisticsApiResponse,
      GetSessionStatisticsApiArg
    >({
      query: (params) => ({
        url: `/flashcard-sessions/student/${params.studentId}/statistics`,
        method: 'GET',
      }),
      providesTags: [API_TAGS.STATISTICS],
    }),

    enhancedGetActiveSession: build.query<
      GetActiveSessionApiResponse,
      GetActiveSessionApiArg
    >({
      query: (params) => ({
        url: '/flashcard-sessions/active',
        method: 'GET',
        params: {
          studentId: params.studentId,
          flashcardId: params.flashcardId,
        },
      }),
      providesTags: [API_TAGS.STATISTICS],
    }),

    enhancedUpdateSessionStatistics: build.mutation<
      UpdateSessionStatisticsApiResponse,
      UpdateSessionStatisticsApiArg
    >({
      query: (params) => ({
        url: `/flashcard-sessions/${params.sessionId}/update-stats`,
        method: 'PUT',
      }),
      invalidatesTags: [API_TAGS.STATISTICS],
    }),

    enhancedResumeSession: build.mutation<
      ResumeSessionApiResponse,
      ResumeSessionApiArg
    >({
      query: (params) => ({
        url: `/flashcard-sessions/${params.sessionId}/resume`,
        method: 'PUT',
      }),
      invalidatesTags: [API_TAGS.STATISTICS],
    }),

    enhancedPauseSession: build.mutation<
      PauseSessionApiResponse,
      PauseSessionApiArg
    >({
      query: (params) => ({
        url: `/flashcard-sessions/${params.sessionId}/pause`,
        method: 'PUT',
      }),
      invalidatesTags: [API_TAGS.STATISTICS],
    }),

    enhancedEndSession: build.mutation<EndSessionApiResponse, EndSessionApiArg>(
      {
        query: (params) => ({
          url: `/flashcard-sessions/${params.sessionId}/end`,
          method: 'PUT',
          params: {
            status: params.status,
          },
        }),
        invalidatesTags: [API_TAGS.STATISTICS],
      }
    ),

    enhancedAbandonSession: build.mutation<
      AbandonSessionApiResponse,
      AbandonSessionApiArg
    >({
      query: (params) => ({
        url: `/flashcard-sessions/${params.sessionId}/abandon`,
        method: 'PUT',
      }),
      invalidatesTags: [API_TAGS.STATISTICS],
    }),

    enhancedGetWeeklySummary: build.query<
      GetWeeklySummaryApiResponse,
      GetWeeklySummaryApiArg
    >({
      query: (params) => ({
        url: `/flashcard-dashboard/student/${params.studentId}/weekly-summary`,
        method: 'GET',
        params: {
          weekStart: params.weekStart,
        },
      }),
      providesTags: [API_TAGS.STATISTICS],
    }),

    enhancedGetStudyTrends: build.query<
      GetStudyTrendsApiResponse,
      GetStudyTrendsApiArg
    >({
      query: (params) => ({
        url: `/flashcard-dashboard/student/${params.studentId}/trends`,
        method: 'GET',
        params: {
          days: params.days,
        },
      }),
      providesTags: [API_TAGS.STATISTICS],
    }),

    enhancedGetStudyStreak: build.query<
      GetStudyStreakApiResponse,
      GetStudyStreakApiArg
    >({
      query: (params) => ({
        url: `/flashcard-dashboard/student/${params.studentId}/streak`,
        method: 'GET',
      }),
      providesTags: [API_TAGS.STATISTICS],
    }),

    enhancedGetSessionHistory: build.query<
      GetSessionHistoryApiResponse,
      GetSessionHistoryApiArg
    >({
      query: (params) => ({
        url: `/flashcard-dashboard/student/${params.studentId}/sessions`,
        method: 'GET',
        params: {
          page: params.page,
          size: params.size,
        },
      }),
      providesTags: [API_TAGS.STATISTICS],
    }),

    enhancedGetDashboardOverview: build.query<
      GetDashboardOverviewApiResponse,
      GetDashboardOverviewApiArg
    >({
      query: (params) => ({
        url: `/flashcard-dashboard/student/${params.studentId}/overview`,
        method: 'GET',
      }),
      providesTags: [API_TAGS.STATISTICS],
    }),

    enhancedGetSessionOutcomes: build.query<
      GetSessionOutcomesApiResponse,
      GetSessionOutcomesApiArg
    >({
      query: (params) => ({
        url: `/flashcard-dashboard/student/${params.studentId}/outcomes`,
        method: 'GET',
      }),
      providesTags: [API_TAGS.STATISTICS],
    }),

    enhancedGetAchievements: build.query<
      GetAchievementsApiResponse,
      GetAchievementsApiArg
    >({
      query: (params) => ({
        url: `/flashcard-dashboard/student/${params.studentId}/achievements`,
        method: 'GET',
      }),
      providesTags: [API_TAGS.STATISTICS],
    }),

    // Keypoint endpoints
    enhancedGetKeypoint: build.query<Get8ApiResponse, Get8ApiArg>({
      query: (params) => ({
        url: `/keypoints/${params.id}`,
        method: 'GET',
      }),
      providesTags: [API_TAGS.CONTENT],
    }),

    enhancedUpdateKeypoint: build.mutation<Update10ApiResponse, Update10ApiArg>(
      {
        query: (params) => ({
          url: `/keypoints/${params.id}/rename`,
          method: 'PUT',
          body: params.updateKeyPointRequest,
        }),
        invalidatesTags: [API_TAGS.CONTENT],
      }
    ),

    enhancedDeleteKeypoint: build.mutation<Delete10ApiResponse, Delete10ApiArg>(
      {
        query: (params) => ({
          url: `/keypoints/${params.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: [API_TAGS.CONTENT],
      }
    ),

    enhancedListKeypoints: build.query<List18ApiResponse, List18ApiArg>({
      query: (params) => ({
        url: '/keypoints',
        method: 'GET',
        params: {
          studentId: params.studentId,
          keyword: params.keyword,
          paperId: params.paperId,
          page: params.page,
          size: params.size,
        },
      }),
      providesTags: [API_TAGS.CONTENT],
    }),

    enhancedCreateKeypoint: build.mutation<Create10ApiResponse, Create10ApiArg>(
      {
        query: (params) => ({
          url: '/keypoints',
          method: 'POST',
          params: {
            paperId: params.paperId,
          },
          body: params.body,
        }),
        invalidatesTags: [API_TAGS.CONTENT],
      }
    ),

    enhancedCreateKeypointV3: build.mutation<
      CreateKeypointV3ApiResponse,
      CreateKeypointV3ApiArg
    >({
      query: (params) => ({
        url: '/keypoints/v3',
        method: 'POST',
        params: {
          curriculum: params.curriculum,
          paperId: params.paperId,
        },
        body: params.body,
      }),
      invalidatesTags: [API_TAGS.CONTENT],
    }),

    enhancedKeypointPapers: build.query<
      KeyPointPapersApiResponse,
      KeyPointPapersApiArg
    >({
      query: (params) => ({
        url: '/keypoints/papers',
        method: 'GET',
        params: {
          studentId: params.studentId,
          keyword: params.keyword,
          paperId: params.paperId,
        },
      }),
      providesTags: [API_TAGS.CONTENT],
    }),
  }),
});

// Export enhanced hooks
export const {
  // Auth hooks
  useEnhancedLogin2Mutation,
  useEnhancedRegisterMutation,
  useEnhancedRefreshTokenMutation,
  useEnhancedPasswordResetRequestMutation,
  useEnhancedPasswordResetMutation,
  useEnhancedResendVerificationMutation,
  useEnhancedConfirmEmailMutation,
  useEnhancedTokenLoginMutation,
  useEnhancedGoogleLoginQuery,
  useEnhancedLogoutMutation,

  // User profile hooks
  useEnhancedGetUserProfileQuery,
  useEnhancedUpdateUserProfileMutation,
  useEnhancedGetUserProfileByStudentIdQuery,
  useEnhancedEditUserProfileMutation,
  useEnhancedEditUserProfileNinMutation,
  useEnhancedVerifyProfileNinMutation,
  useEnhancedGetPublicUserProfileQuery,
  useEnhancedTrackProfileShareEventMutation,
  useEnhancedTrackPublicProfileClickMutation,
  useEnhancedGetMyProfileVisitCountQuery,

  // Course hooks
  useEnhancedGetCoursesQuery,
  useEnhancedEnrollCourseMutation,

  // Exam hooks
  useEnhancedGetExamsQuery,
  useEnhancedGetExamGroupsQuery,

  // Practice hooks
  useEnhancedGetStudentPracticeQuery,
  useEnhancedStartStudentPracticeMutation,
  useEnhancedSubmitStudentPracticeMutation,

  // Student paper hooks
  useEnhancedGetStudentPapersQuery,
  useEnhancedCreateStudentPaperMutation,
  useEnhancedEnrollStudentPaperMutation,
  useEnhancedSubmitStudentPaperMutation,
  useEnhancedSaveStudentPaperProgressMutation,

  // Statistics hooks
  useEnhancedGetUserStatisticsQuery,
  useEnhancedGetQuestionStatisticsQuery,
  useEnhancedGetCourseAnalyticsQuery,

  // Content hooks
  useEnhancedGetSubjectsQuery,
  useEnhancedGetTopicsQuery,

  // Create and earn hooks
  useEnhancedCreateQuestionMutation,
  useEnhancedFlagQuestionMutation,

  // Bookmark hooks
  useEnhancedGetBookmarksQuery,
  useEnhancedAddBookmarkMutation,
  useEnhancedDeleteBookmarkMutation,

  // Answer hooks
  useEnhancedGetAnswersQuery,
  useEnhancedSubmitAnswerMutation,

  // Timer hooks
  useEnhancedTrackTimerMutation,

  // Points hooks
  useEnhancedGetTotalPointsQuery,
  useEnhancedGetBadgesQuery,
  useEnhancedGetSchoolRankingQuery,
  useEnhancedGetGlobalRankingQuery,

  // Statistics hooks
  useEnhancedGetMonthlyPracticeQuery,
  useEnhancedGetScoreTotalQuery,
  useEnhancedGetTimeStatsQuery,

  // Practice history hooks
  useEnhancedGroupPracticesByCourseQuery,
  useEnhancedListPracticesByPaperIdQuery,
  useEnhancedGetStudentAnswerSolutionsQuery,
  useEnhancedRetrieveResultQuery,
  useEnhancedGetStudentPaperQuestionsQuery,

  // Streak hooks
  useEnhancedGetCurrentUserStreakStatusQuery,

  // Subscription Billing hooks
  useEnhancedGetActivePlanQuery,
  useEnhancedGetSubscriptionPackagesQuery,
  useEnhancedGetSubscriptionHistoryQuery,
  useEnhancedGetFeatureLimitQuery,
  useEnhancedCancelSubscriptionMutation,
  useEnhancedSubscribeMutation,

  // Quizathon hooks
  useEnhancedGetSchoolListQuery,
  useEnhancedSubmitStudentInfoMutation,
  useEnhancedEditStudentInfoMutation,
  useEnhancedGetParticipantQuery,
  useEnhancedGetLeaderboardQuery,
  useEnhancedGetIndividualLeaderboardStatQuery,
  useEnhancedGetParticipantStatsQuery,
  useEnhancedGetActiveQuizathonQuery,
  useEnhancedGetAllActiveQuizathonQuery,
  useEnhancedGetQuizathonPapersTakenQuery,
  useEnhancedGetQuizathonElapsedTimeQuery,
  useEnhancedGetQuizathonHistoryQuery,
  useEnhancedGetSingleQuizathonQuery,
  useEnhancedGetSchoolLeaderboardQuery,
  useEnhancedGenerateCertificateMutation,
  useEnhancedVerifyCertificateMutation,
  useEnhancedGetAccuracyLeaderboardQuery,
  useEnhancedGetGeniusLeaderboardQuery,
  useEnhancedGetQuizathonDailyLeaderBoardQuery,

  // Enhanced papers hooks
  // useEnhancedGetPapersQuery,

  // Chatbot hooks
  useEnhancedGetMessages1Query,
  useEnhancedGetWelcomeMessage1Query,
  useEnhancedNewThreadMutation,
  useEnhancedGetThreadsQuery,
  useEnhancedDeleteThread1Mutation,
  useEnhancedChatStreamMutation,

  // Referral hooks
  useEnhancedCreateReferralMutation,
  useEnhancedGetReferralStatisticsQuery,
  useEnhancedGetStudentReferralCodeQuery,
  useEnhancedGetReferralsQuery,
  useEnhancedRequestRewardMutation,
  useEnhancedGetAirtimeRewardsByStudentIdQuery,

  // Flashcard hooks
  useEnhancedGetFlashcardQuery,
  useEnhancedUpdateFlashcardMutation,
  useEnhancedDeleteFlashcardMutation,
  useEnhancedListFlashcardsQuery,
  useEnhancedCreateFlashcardMutation,
  useEnhancedGenerateFlashcardsV3Mutation,
  useEnhancedInferKnowledge1Mutation,
  useEnhancedInferKnowledgeWithStreaming1Mutation,
  useEnhancedRecordUsageMutation,
  useEnhancedStartSessionMutation,
  useEnhancedGetUsageByStudentQuery,
  useEnhancedCountActionsByStudentQuery,
  useEnhancedGetSessionByIdQuery,
  useEnhancedGetSessionStatusQuery,
  useEnhancedGetSessionsByStudentQuery,
  useEnhancedGetSessionStatisticsQuery,
  useEnhancedGetActiveSessionQuery,
  useEnhancedUpdateSessionStatisticsMutation,
  useEnhancedResumeSessionMutation,
  useEnhancedPauseSessionMutation,
  useEnhancedEndSessionMutation,
  useEnhancedAbandonSessionMutation,
  useEnhancedGetWeeklySummaryQuery,
  useEnhancedGetStudyTrendsQuery,
  useEnhancedGetStudyStreakQuery,
  useEnhancedGetSessionHistoryQuery,
  useEnhancedGetDashboardOverviewQuery,
  useEnhancedGetSessionOutcomesQuery,
  useEnhancedGetAchievementsQuery,

  // Keypoint hooks
  useEnhancedGetKeypointQuery,
  useEnhancedUpdateKeypointMutation,
  useEnhancedDeleteKeypointMutation,
  useEnhancedListKeypointsQuery,
  useEnhancedCreateKeypointMutation,
  useEnhancedCreateKeypointV3Mutation,
  useEnhancedKeypointPapersQuery,
} = enhancedApi;

// Utility functions for tag management
export const tagUtils = {
  // Get all tags that should be invalidated for a specific action
  getInvalidationTags: (action: string): TagCombination => {
    const invalidationMap: Record<string, TagCombination> = {
      'user.login': [API_TAGS.USER, API_TAGS.PROFILE, API_TAGS.PREFERENCE],
      'user.logout': Object.values(API_TAGS),
      'user.profile.update': [API_TAGS.USER, API_TAGS.PROFILE],
      'course.enroll': [API_TAGS.COURSE, API_TAGS.ENROLLMENT, API_TAGS.STUDENT],
      'exam.submit': [API_TAGS.EXAM, API_TAGS.STUDENT, API_TAGS.STATISTICS],
      'practice.submit': [
        API_TAGS.PRACTICE,
        API_TAGS.STUDENT_PRACTICE,
        API_TAGS.STATISTICS,
      ],
      'question.create': [
        API_TAGS.CREATE_EARN,
        API_TAGS.QUESTION,
        API_TAGS.STATISTICS,
      ],
      'question.flag': [API_TAGS.QUESTION_FLAG, API_TAGS.QUESTION],
    };

    return invalidationMap[action] || [];
  },

  // Get tags for a specific resource type
  getResourceTags: (resourceType: string): TagCombination => {
    const resourceTagMap: Record<string, TagCombination> = {
      user: [API_TAGS.USER, API_TAGS.PROFILE],
      course: [API_TAGS.COURSE, API_TAGS.ENROLLMENT],
      exam: [API_TAGS.EXAM, API_TAGS.PAPER],
      practice: [API_TAGS.PRACTICE, API_TAGS.QUESTION],
      student: [
        API_TAGS.STUDENT,
        API_TAGS.STUDENT_PAPER,
        API_TAGS.STUDENT_PRACTICE,
      ],
      subject: [API_TAGS.SUBJECT, API_TAGS.TOPIC],
      statistics: [API_TAGS.STATISTICS, API_TAGS.ANALYTICS],
    };

    return resourceTagMap[resourceType] || [];
  },

  // Create custom tag combination
  createCustomTags: (...tags: ApiTag[]): TagCombination => tags,

  // Get common tag combinations
  getCommonTags: () => COMMON_TAG_COMBINATIONS,
};

// Export the enhanced API for use in the store
export default enhancedApi;
