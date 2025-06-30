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
  GetCurrentUserStreakStatusApiResponse,
  GetCurrentUserStreakStatusApiArg,
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
        url: '/portal/student-practice',
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
    enhancedGetCurrentUserStreakStatus: build.query<
      GetCurrentUserStreakStatusApiResponse,
      GetCurrentUserStreakStatusApiArg
    >({
      query: () => ({
        url: `/streak/user-streak-stats`,
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

  // Course hooks
  useEnhancedGetCoursesQuery,
  useEnhancedEnrollCourseMutation,

  // Exam hooks
  useEnhancedGetExamsQuery,
  useEnhancedGetExamPapersQuery,

  // Practice hooks
  useEnhancedGetStudentPracticeQuery,
  useEnhancedStartStudentPracticeMutation,
  useEnhancedSubmitStudentPracticeMutation,

  // Student paper hooks
  useEnhancedGetStudentPapersQuery,
  useEnhancedEnrollStudentPaperMutation,
  useEnhancedSubmitStudentPaperMutation,
  useEnhancedSaveStudentPaperProgressMutation,

  // Statistics hooks
  useEnhancedGetUserStatisticsQuery,
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

  // Streak hooks
  useEnhancedGetCurrentUserStreakStatusQuery,

  // Subscription Billing hooks
  useEnhancedGetActivePlanQuery,
  useEnhancedGetSubscriptionPackagesQuery,
  useEnhancedGetSubscriptionHistoryQuery,
  useEnhancedGetFeatureLimitQuery,
  useEnhancedCancelSubscriptionMutation,
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
