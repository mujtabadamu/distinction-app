import { baseApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    retrieve: build.query<RetrieveApiResponse, RetrieveApiArg>({
      query: (queryArg) => ({ url: `/telcos/${queryArg.id}` }),
    }),
    update: build.mutation<UpdateApiResponse, UpdateApiArg>({
      query: (queryArg) => ({
        url: `/telcos/${queryArg.id}`,
        method: "PUT",
        body: queryArg.telcoRequest,
      }),
    }),
    deleteTelcosById: build.mutation<
      DeleteTelcosByIdApiResponse,
      DeleteTelcosByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/telcos/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    update1: build.mutation<Update1ApiResponse, Update1ApiArg>({
      query: (queryArg) => ({
        url: `/subscription-packages/${queryArg.id}`,
        method: "PUT",
        body: queryArg.subscriptionPackageRequest,
      }),
    }),
    updateAddOn: build.mutation<UpdateAddOnApiResponse, UpdateAddOnApiArg>({
      query: (queryArg) => ({
        url: `/subscription-packages/add-on/${queryArg.id}`,
        method: "PUT",
        body: queryArg.subscriptionPackageAddonRequest,
      }),
    }),
    update2: build.mutation<Update2ApiResponse, Update2ApiArg>({
      query: (queryArg) => ({
        url: `/subjects/${queryArg.id}`,
        method: "PUT",
        body: queryArg.subjectRequest,
      }),
    }),
    delete1: build.mutation<Delete1ApiResponse, Delete1ApiArg>({
      query: (queryArg) => ({
        url: `/subjects/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getCurrentUserSettings: build.query<
      GetCurrentUserSettingsApiResponse,
      GetCurrentUserSettingsApiArg
    >({
      query: () => ({ url: `/streak/user-streak-settings` }),
    }),
    updateCurrentUserSettings: build.mutation<
      UpdateCurrentUserSettingsApiResponse,
      UpdateCurrentUserSettingsApiArg
    >({
      query: (queryArg) => ({
        url: `/streak/user-streak-settings`,
        method: "PUT",
        body: queryArg.streakNotificationSettingsDto,
      }),
    }),
    getSectionsById: build.query<
      GetSectionsByIdApiResponse,
      GetSectionsByIdApiArg
    >({
      query: (queryArg) => ({ url: `/sections/${queryArg.id}` }),
    }),
    update3: build.mutation<Update3ApiResponse, Update3ApiArg>({
      query: (queryArg) => ({
        url: `/sections/${queryArg.id}`,
        method: "PUT",
        body: queryArg.sectionRequest,
      }),
    }),
    delete2: build.mutation<Delete2ApiResponse, Delete2ApiArg>({
      query: (queryArg) => ({
        url: `/sections/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getSchool: build.query<GetSchoolApiResponse, GetSchoolApiArg>({
      query: (queryArg) => ({ url: `/schools/${queryArg.id}` }),
    }),
    update4: build.mutation<Update4ApiResponse, Update4ApiArg>({
      query: (queryArg) => ({
        url: `/schools/${queryArg.id}`,
        method: "PUT",
        body: queryArg.body,
        params: {
          name: queryArg.name,
          abbr: queryArg.abbr,
          state: queryArg.state,
          type: queryArg["type"],
        },
      }),
    }),
    delete3: build.mutation<Delete3ApiResponse, Delete3ApiArg>({
      query: (queryArg) => ({
        url: `/schools/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    updateStudent: build.mutation<
      UpdateStudentApiResponse,
      UpdateStudentApiArg
    >({
      query: (queryArg) => ({
        url: `/schoolOnboarding/students/${queryArg.studentId}`,
        method: "PUT",
        body: queryArg.uploadedStudentDto,
      }),
    }),
    get1: build.query<Get1ApiResponse, Get1ApiArg>({
      query: (queryArg) => ({ url: `/quizathon/${queryArg.id}` }),
    }),
    update5: build.mutation<Update5ApiResponse, Update5ApiArg>({
      query: (queryArg) => ({
        url: `/quizathon/${queryArg.id}`,
        method: "PUT",
        body: queryArg.quizathonRequest,
      }),
    }),
    delete4: build.mutation<Delete4ApiResponse, Delete4ApiArg>({
      query: (queryArg) => ({
        url: `/quizathon/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    get2: build.query<Get2ApiResponse, Get2ApiArg>({
      query: (queryArg) => ({ url: `/quizathon/particpant/${queryArg.id}` }),
    }),
    update6: build.mutation<Update6ApiResponse, Update6ApiArg>({
      query: (queryArg) => ({
        url: `/quizathon/particpant/${queryArg.id}`,
        method: "PUT",
        body: queryArg.participantRequest,
      }),
    }),
    delete5: build.mutation<Delete5ApiResponse, Delete5ApiArg>({
      query: (queryArg) => ({
        url: `/quizathon/particpant/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    get3: build.query<Get3ApiResponse, Get3ApiArg>({
      query: (queryArg) => ({ url: `/questions/${queryArg.id}` }),
    }),
    update7: build.mutation<Update7ApiResponse, Update7ApiArg>({
      query: (queryArg) => ({
        url: `/questions/${queryArg.id}`,
        method: "PUT",
        body: queryArg.questionUpdateRequest,
      }),
    }),
    delete6: build.mutation<Delete6ApiResponse, Delete6ApiArg>({
      query: (queryArg) => ({
        url: `/questions/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    retrieve4: build.query<Retrieve4ApiResponse, Retrieve4ApiArg>({
      query: (queryArg) => ({ url: `/plans/${queryArg.id}` }),
    }),
    update8: build.mutation<Update8ApiResponse, Update8ApiArg>({
      query: (queryArg) => ({
        url: `/plans/${queryArg.id}`,
        method: "PUT",
        body: queryArg.planUpdateRequest,
      }),
    }),
    delete8: build.mutation<Delete8ApiResponse, Delete8ApiArg>({
      query: (queryArg) => ({ url: `/plans/${queryArg.id}`, method: "DELETE" }),
    }),
    get4: build.query<Get4ApiResponse, Get4ApiArg>({
      query: (queryArg) => ({ url: `/papers/${queryArg.id}` }),
    }),
    update9: build.mutation<Update9ApiResponse, Update9ApiArg>({
      query: (queryArg) => ({
        url: `/papers/${queryArg.id}`,
        method: "PUT",
        body: queryArg.paperRequest,
      }),
    }),
    delete9: build.mutation<Delete9ApiResponse, Delete9ApiArg>({
      query: (queryArg) => ({
        url: `/papers/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    update10: build.mutation<Update10ApiResponse, Update10ApiArg>({
      query: (queryArg) => ({
        url: `/keypoints/${queryArg.id}/rename`,
        method: "PUT",
        body: queryArg.updateKeyPointRequest,
      }),
    }),
    update11: build.mutation<Update11ApiResponse, Update11ApiArg>({
      query: (queryArg) => ({
        url: `/folders/${queryArg.id}`,
        method: "PUT",
        params: {
          request: queryArg.request,
        },
      }),
    }),
    update12: build.mutation<Update12ApiResponse, Update12ApiArg>({
      query: (queryArg) => ({
        url: `/flashcards/${queryArg.id}/rename`,
        method: "PUT",
        body: queryArg.updateFlashcardRequest,
      }),
    }),
    updateSessionStatistics: build.mutation<
      UpdateSessionStatisticsApiResponse,
      UpdateSessionStatisticsApiArg
    >({
      query: (queryArg) => ({
        url: `/flashcard-sessions/${queryArg.sessionId}/update-stats`,
        method: "PUT",
      }),
    }),
    resumeSession: build.mutation<
      ResumeSessionApiResponse,
      ResumeSessionApiArg
    >({
      query: (queryArg) => ({
        url: `/flashcard-sessions/${queryArg.sessionId}/resume`,
        method: "PUT",
      }),
    }),
    pauseSession: build.mutation<PauseSessionApiResponse, PauseSessionApiArg>({
      query: (queryArg) => ({
        url: `/flashcard-sessions/${queryArg.sessionId}/pause`,
        method: "PUT",
      }),
    }),
    endSession: build.mutation<EndSessionApiResponse, EndSessionApiArg>({
      query: (queryArg) => ({
        url: `/flashcard-sessions/${queryArg.sessionId}/end`,
        method: "PUT",
        params: {
          status: queryArg.status,
        },
      }),
    }),
    abandonSession: build.mutation<
      AbandonSessionApiResponse,
      AbandonSessionApiArg
    >({
      query: (queryArg) => ({
        url: `/flashcard-sessions/${queryArg.sessionId}/abandon`,
        method: "PUT",
      }),
    }),
    exam: build.query<ExamApiResponse, ExamApiArg>({
      query: (queryArg) => ({ url: `/exams/${queryArg.id}` }),
    }),
    update13: build.mutation<Update13ApiResponse, Update13ApiArg>({
      query: (queryArg) => ({
        url: `/exams/${queryArg.id}`,
        method: "PUT",
        body: queryArg.examRequest,
      }),
    }),
    delete14: build.mutation<Delete14ApiResponse, Delete14ApiArg>({
      query: (queryArg) => ({ url: `/exams/${queryArg.id}`, method: "DELETE" }),
    }),
    examGroup: build.query<ExamGroupApiResponse, ExamGroupApiArg>({
      query: (queryArg) => ({ url: `/exam-groups/${queryArg.id}` }),
    }),
    update14: build.mutation<Update14ApiResponse, Update14ApiArg>({
      query: (queryArg) => ({
        url: `/exam-groups/${queryArg.id}`,
        method: "PUT",
        body: queryArg.body,
        params: {
          name: queryArg.name,
          description: queryArg.description,
          isActive: queryArg.isActive,
        },
      }),
    }),
    delete15: build.mutation<Delete15ApiResponse, Delete15ApiArg>({
      query: (queryArg) => ({
        url: `/exam-groups/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    get13: build.query<Get13ApiResponse, Get13ApiArg>({
      query: (queryArg) => ({ url: `/enrolled-courses/${queryArg.id}` }),
    }),
    update15: build.mutation<Update15ApiResponse, Update15ApiArg>({
      query: (queryArg) => ({
        url: `/enrolled-courses/${queryArg.id}`,
        method: "PUT",
        body: queryArg.enrolledCourseRequest,
      }),
    }),
    delete17: build.mutation<Delete17ApiResponse, Delete17ApiArg>({
      query: (queryArg) => ({
        url: `/enrolled-courses/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    get14: build.query<Get14ApiResponse, Get14ApiArg>({
      query: (queryArg) => ({ url: `/custom-questions/${queryArg.id}` }),
    }),
    update16: build.mutation<Update16ApiResponse, Update16ApiArg>({
      query: (queryArg) => ({
        url: `/custom-questions/${queryArg.id}`,
        method: "PUT",
        body: queryArg.customQuestionUpdateRequest,
      }),
    }),
    delete19: build.mutation<Delete19ApiResponse, Delete19ApiArg>({
      query: (queryArg) => ({
        url: `/custom-questions/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    updateUsername: build.mutation<
      UpdateUsernameApiResponse,
      UpdateUsernameApiArg
    >({
      query: (queryArg) => ({
        url: `/Profile/update/username`,
        method: "PUT",
        body: queryArg.updateUsernameRequest,
      }),
    }),
    editUserProfileNin: build.mutation<
      EditUserProfileNinApiResponse,
      EditUserProfileNinApiArg
    >({
      query: (queryArg) => ({
        url: `/Profile/nin/update`,
        method: "PUT",
        body: queryArg.userProfileNinRequest,
      }),
    }),
    editUserProfile: build.mutation<
      EditUserProfileApiResponse,
      EditUserProfileApiArg
    >({
      query: (queryArg) => ({
        url: `/Profile/`,
        method: "PUT",
        body: queryArg.body,
        params: {
          phoneNumber: queryArg.phoneNumber,
          firstName: queryArg.firstName,
          lastName: queryArg.lastName,
          otherName: queryArg.otherName,
          gender: queryArg.gender,
          bio: queryArg.bio,
          matriculationNumber: queryArg.matriculationNumber,
          department: queryArg.department,
          stateOfOrigin: queryArg.stateOfOrigin,
          schoolId: queryArg.schoolId,
          level: queryArg.level,
          dateOfBirth: queryArg.dateOfBirth,
        },
      }),
    }),
    list: build.query<ListApiResponse, ListApiArg>({
      query: (queryArg) => ({
        url: `/telcos`,
        params: {
          planType: queryArg.planType,
          network: queryArg.network,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    create: build.mutation<CreateApiResponse, CreateApiArg>({
      query: (queryArg) => ({
        url: `/telcos`,
        method: "POST",
        body: queryArg.telcoRequest,
      }),
    }),
    callback: build.mutation<CallbackApiResponse, CallbackApiArg>({
      query: (queryArg) => ({
        url: `/telcos/callback`,
        method: "POST",
        params: {
          channel: queryArg.channel,
          action: queryArg.action,
          circle: queryArg.circle,
          endDate: queryArg.endDate,
          msisdn: queryArg.msisdn,
          operator: queryArg.operator,
          packName: queryArg.packName,
          amount: queryArg.amount,
          startDate: queryArg.startDate,
          userStatus: queryArg.userStatus,
          subscriberType: queryArg.subscriberType,
          transactionId: queryArg.transactionId,
          vendorName: queryArg.vendorName,
          contestName: queryArg.contestName,
          language: queryArg.language,
          contestLevel: queryArg.contestLevel,
          src: queryArg.src,
        },
      }),
    }),
    list1: build.query<List1ApiResponse, List1ApiArg>({
      query: (queryArg) => ({
        url: `/subscription-packages`,
        params: {
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    create1: build.mutation<Create1ApiResponse, Create1ApiArg>({
      query: (queryArg) => ({
        url: `/subscription-packages`,
        method: "POST",
        body: queryArg.subscriptionPackageRequest,
      }),
    }),
    createAddOn: build.mutation<CreateAddOnApiResponse, CreateAddOnApiArg>({
      query: (queryArg) => ({
        url: `/subscription-packages/add-on`,
        method: "POST",
        body: queryArg.subscriptionPackageAddonRequest,
      }),
    }),
    list2: build.query<List2ApiResponse, List2ApiArg>({
      query: (queryArg) => ({
        url: `/subjects`,
        params: {
          curriculum: queryArg.curriculum,
        },
      }),
    }),
    create2: build.mutation<Create2ApiResponse, Create2ApiArg>({
      query: (queryArg) => ({
        url: `/subjects`,
        method: "POST",
        body: queryArg.subjectRequest,
      }),
    }),
    testEmailTemplate: build.mutation<
      TestEmailTemplateApiResponse,
      TestEmailTemplateApiArg
    >({
      query: (queryArg) => ({
        url: `/streak/email-testing`,
        method: "POST",
        params: {
          toAddress: queryArg.toAddress,
          template: queryArg.template,
        },
      }),
    }),
    recordActivity: build.mutation<
      RecordActivityApiResponse,
      RecordActivityApiArg
    >({
      query: (queryArg) => ({
        url: `/streak/activities`,
        method: "POST",
        body: queryArg.activityRequest,
      }),
    }),
    getSolution: build.mutation<GetSolutionApiResponse, GetSolutionApiArg>({
      query: (queryArg) => ({
        url: `/solutions/generate`,
        method: "POST",
        body: queryArg.solutionRequest,
      }),
    }),
    getAnswer: build.mutation<GetAnswerApiResponse, GetAnswerApiArg>({
      query: (queryArg) => ({
        url: `/solutions/answer`,
        method: "POST",
        body: queryArg.solutionRequest,
      }),
    }),
    list3: build.query<List3ApiResponse, List3ApiArg>({
      query: (queryArg) => ({
        url: `/sections`,
        params: {
          title: queryArg.title,
          paperId: queryArg.paperId,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    create3: build.mutation<Create3ApiResponse, Create3ApiArg>({
      query: (queryArg) => ({
        url: `/sections`,
        method: "POST",
        body: queryArg.sectionRequest,
      }),
    }),
    list4: build.query<List4ApiResponse, List4ApiArg>({
      query: (queryArg) => ({
        url: `/schools`,
        params: {
          name: queryArg.name,
          abbr: queryArg.abbr,
          curriculum: queryArg.curriculum,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    create4: build.mutation<Create4ApiResponse, Create4ApiArg>({
      query: (queryArg) => ({
        url: `/schools`,
        method: "POST",
        body: queryArg.body,
        params: {
          name: queryArg.name,
          abbr: queryArg.abbr,
          state: queryArg.state,
          type: queryArg["type"],
        },
      }),
    }),
    addSingleStudent: build.mutation<
      AddSingleStudentApiResponse,
      AddSingleStudentApiArg
    >({
      query: (queryArg) => ({
        url: `/schoolOnboarding/students`,
        method: "POST",
        body: queryArg.uploadedStudentDto,
      }),
    }),
    validateBulkUploadStudentData: build.mutation<
      ValidateBulkUploadStudentDataApiResponse,
      ValidateBulkUploadStudentDataApiArg
    >({
      query: (queryArg) => ({
        url: `/schoolOnboarding/students/validate-bulk-upload`,
        method: "POST",
        body: queryArg.body,
        params: {
          schoolId: queryArg.schoolId,
        },
      }),
    }),
    bulkUploadQuestionsData: build.mutation<
      BulkUploadQuestionsDataApiResponse,
      BulkUploadQuestionsDataApiArg
    >({
      query: (queryArg) => ({
        url: `/schoolOnboarding/students/upload`,
        method: "POST",
        body: queryArg.body,
        params: {
          schoolId: queryArg.schoolId,
        },
      }),
    }),
    bulkUploadStudentData: build.mutation<
      BulkUploadStudentDataApiResponse,
      BulkUploadStudentDataApiArg
    >({
      query: (queryArg) => ({
        url: `/schoolOnboarding/students/bulk-upload`,
        method: "POST",
        body: queryArg.body,
        params: {
          schoolId: queryArg.schoolId,
        },
      }),
    }),
    sendInvite: build.mutation<SendInviteApiResponse, SendInviteApiArg>({
      query: (queryArg) => ({
        url: `/schoolOnboarding/sendInvite`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    sendBulkInvite: build.mutation<
      SendBulkInviteApiResponse,
      SendBulkInviteApiArg
    >({
      query: (queryArg) => ({
        url: `/schoolOnboarding/send-bulk-invite/${queryArg.schoolId}`,
        method: "POST",
      }),
    }),
    requestRewardRequest: build.mutation<
      RequestRewardRequestApiResponse,
      RequestRewardRequestApiArg
    >({
      query: (queryArg) => ({
        url: `/rewards/retry-request`,
        method: "POST",
        body: queryArg.retryRewardRequestDto,
      }),
    }),
    requestReward: build.mutation<
      RequestRewardApiResponse,
      RequestRewardApiArg
    >({
      query: (queryArg) => ({
        url: `/rewards/request`,
        method: "POST",
        body: queryArg.rewardRequestDto,
      }),
    }),
    approveReward: build.mutation<
      ApproveRewardApiResponse,
      ApproveRewardApiArg
    >({
      query: (queryArg) => ({
        url: `/rewards/approve/${queryArg.referrerId}`,
        method: "POST",
        body: queryArg.rewardApprovalDto,
      }),
    }),
    airtimeStatusCallback: build.mutation<
      AirtimeStatusCallbackApiResponse,
      AirtimeStatusCallbackApiArg
    >({
      query: (queryArg) => ({
        url: `/rewards/airtime-status-callback`,
        method: "POST",
        body: queryArg.airtimeStatus,
      }),
    }),
    registerUser: build.mutation<RegisterUserApiResponse, RegisterUserApiArg>({
      query: (queryArg) => ({
        url: `/rate-limit/register`,
        method: "POST",
        body: queryArg.userRegistrationRequest,
      }),
    }),
    blockClient: build.mutation<BlockClientApiResponse, BlockClientApiArg>({
      query: (queryArg) => ({
        url: `/rate-limit/block`,
        method: "POST",
        params: {
          clientIp: queryArg.clientIp,
        },
      }),
    }),
    list5: build.query<List5ApiResponse, List5ApiArg>({
      query: (queryArg) => ({
        url: `/quizathon`,
        params: {
          keyword: queryArg.keyword,
          status: queryArg.status,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    create5: build.mutation<Create5ApiResponse, Create5ApiArg>({
      query: (queryArg) => ({
        url: `/quizathon`,
        method: "POST",
        body: queryArg.quizathonRequest,
      }),
    }),
    joinWaitlist: build.mutation<JoinWaitlistApiResponse, JoinWaitlistApiArg>({
      query: (queryArg) => ({
        url: `/quizathon/waitlist/${queryArg.id}`,
        method: "POST",
        params: {
          studentId: queryArg.studentId,
        },
      }),
    }),
    list7: build.query<List7ApiResponse, List7ApiArg>({
      query: (queryArg) => ({
        url: `/quizathon/particpant`,
        params: {
          studentId: queryArg.studentId,
          quizathonId: queryArg.quizathonId,
          schoolId: queryArg.schoolId,
          keyword: queryArg.keyword,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    create6: build.mutation<Create6ApiResponse, Create6ApiArg>({
      query: (queryArg) => ({
        url: `/quizathon/particpant`,
        method: "POST",
        body: queryArg.participantRequest,
      }),
    }),
    list8: build.query<List8ApiResponse, List8ApiArg>({
      query: (queryArg) => ({
        url: `/questions`,
        params: {
          keyword: queryArg.keyword,
          topic: queryArg.topic,
          tag: queryArg.tag,
          year: queryArg.year,
          subjectId: queryArg.subjectId,
          paperId: queryArg.paperId,
          examGroupId: queryArg.examGroupId,
          examId: queryArg.examId,
          difficulty: queryArg.difficulty,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    create7: build.mutation<Create7ApiResponse, Create7ApiArg>({
      query: (queryArg) => ({
        url: `/questions`,
        method: "POST",
        body: queryArg.questionRequest,
      }),
    }),
    bulkUploadQuestionsData1: build.mutation<
      BulkUploadQuestionsData1ApiResponse,
      BulkUploadQuestionsData1ApiArg
    >({
      query: (queryArg) => ({
        url: `/questions/bulk-upload`,
        method: "POST",
        body: queryArg.body,
        params: {
          paperId: queryArg.paperId,
          difficulty: queryArg.difficulty,
        },
      }),
    }),
    trackPublicProfileClick: build.mutation<
      TrackPublicProfileClickApiResponse,
      TrackPublicProfileClickApiArg
    >({
      query: (queryArg) => ({
        url: `/profile/event/track-public-profile/${queryArg.username}`,
        method: "POST",
        body: queryArg.profileShareEventRequest,
      }),
    }),
    trackProfileShareEvent: build.mutation<
      TrackProfileShareEventApiResponse,
      TrackProfileShareEventApiArg
    >({
      query: (queryArg) => ({
        url: `/profile/event/track-profile-shares`,
        method: "POST",
        body: queryArg.profileShareEventRequest,
      }),
    }),
    list10: build.query<List10ApiResponse, List10ApiArg>({
      query: (queryArg) => ({
        url: `/portal/student-practice`,
        params: {
          keyword: queryArg.keyword,
          subjectId: queryArg.subjectId,
          paperId: queryArg.paperId,
          date: queryArg.date,
          completed: queryArg.completed,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    start: build.mutation<StartApiResponse, StartApiArg>({
      query: (queryArg) => ({
        url: `/portal/student-practice`,
        method: "POST",
        body: queryArg.studentPracticeRequest,
      }),
    }),
    submitResult: build.mutation<SubmitResultApiResponse, SubmitResultApiArg>({
      query: (queryArg) => ({
        url: `/portal/student-practice/${queryArg.id}/submit`,
        method: "POST",
        body: queryArg.studentPracticeResultRequest,
      }),
    }),
    list11: build.query<List11ApiResponse, List11ApiArg>({
      query: (queryArg) => ({
        url: `/portal/student-papers`,
        params: {
          keyword: queryArg.keyword,
          examGroupId: queryArg.examGroupId,
          paperId: queryArg.paperId,
          subjectId: queryArg.subjectId,
          completed: queryArg.completed,
          date: queryArg.date,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    enroll: build.mutation<EnrollApiResponse, EnrollApiArg>({
      query: (queryArg) => ({
        url: `/portal/student-papers`,
        method: "POST",
        body: queryArg.studentPaperRequest,
      }),
    }),
    submit: build.mutation<SubmitApiResponse, SubmitApiArg>({
      query: (queryArg) => ({
        url: `/portal/student-papers/${queryArg.id}/submit`,
        method: "POST",
        body: queryArg.submitPaperRequest,
      }),
    }),
    saveProgress: build.mutation<SaveProgressApiResponse, SaveProgressApiArg>({
      query: (queryArg) => ({
        url: `/portal/student-papers/${queryArg.id}/save-progress`,
        method: "POST",
        body: queryArg.studentAnswerProgressRequest,
      }),
    }),
    list12: build.query<List12ApiResponse, List12ApiArg>({
      query: (queryArg) => ({
        url: `/portal/student-papers/${queryArg.id}/bookmarks`,
      }),
    }),
    add: build.mutation<AddApiResponse, AddApiArg>({
      query: (queryArg) => ({
        url: `/portal/student-papers/${queryArg.id}/bookmarks`,
        method: "POST",
        body: queryArg.bookmarkRequest,
      }),
    }),
    delete7: build.mutation<Delete7ApiResponse, Delete7ApiArg>({
      query: (queryArg) => ({
        url: `/portal/student-papers/${queryArg.id}/bookmarks`,
        method: "DELETE",
        params: {
          questionId: queryArg.questionId,
        },
      }),
    }),
    getAnswers: build.query<GetAnswersApiResponse, GetAnswersApiArg>({
      query: (queryArg) => ({
        url: `/portal/student-papers/${queryArg.id}/answers`,
        params: {
          questionIds: queryArg.questionIds,
        },
      }),
    }),
    answer: build.mutation<AnswerApiResponse, AnswerApiArg>({
      query: (queryArg) => ({
        url: `/portal/student-papers/${queryArg.id}/answers`,
        method: "POST",
        body: queryArg.studentAnswerRequest,
      }),
    }),
    trackTimer: build.mutation<TrackTimerApiResponse, TrackTimerApiArg>({
      query: (queryArg) => ({
        url: `/portal/student-papers/track-timer`,
        method: "POST",
        body: queryArg.tracktimerRequest,
      }),
    }),
    refreshToken: build.mutation<RefreshTokenApiResponse, RefreshTokenApiArg>({
      query: (queryArg) => ({
        url: `/portal/auth/refresh-token`,
        method: "POST",
        body: queryArg.refreshTokenRequest,
      }),
    }),
    passwordReset: build.mutation<
      PasswordResetApiResponse,
      PasswordResetApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/auth/password/reset`,
        method: "POST",
        body: queryArg.passwordReset,
      }),
    }),
    passwordResetRequest: build.mutation<
      PasswordResetRequestApiResponse,
      PasswordResetRequestApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/auth/password/reset-request`,
        method: "POST",
        body: queryArg.passwordResetRequest,
      }),
    }),
    login: build.mutation<LoginApiResponse, LoginApiArg>({
      query: (queryArg) => ({
        url: `/portal/auth/login`,
        method: "POST",
        body: queryArg.loginRequest,
      }),
    }),
    list13: build.query<List13ApiResponse, List13ApiArg>({
      query: () => ({ url: `/plans` }),
    }),
    create8: build.mutation<Create8ApiResponse, Create8ApiArg>({
      query: (queryArg) => ({
        url: `/plans`,
        method: "POST",
        body: queryArg.planRequest,
      }),
    }),
    webhook: build.mutation<WebhookApiResponse, WebhookApiArg>({
      query: (queryArg) => ({
        url: `/payment-gateways/paystack/webhook`,
        method: "POST",
        body: queryArg.body,
        headers: {
          "X-Forwarded-For": queryArg["X-Forwarded-For"],
          "x-paystack-signature": queryArg["x-paystack-signature"],
        },
      }),
    }),
    list14: build.query<List14ApiResponse, List14ApiArg>({
      query: (queryArg) => ({
        url: `/papers`,
        params: {
          keyword: queryArg.keyword,
          name: queryArg.name,
          examId: queryArg.examId,
          examGroupId: queryArg.examGroupId,
          year: queryArg.year,
          subjectId: queryArg.subjectId,
          isActive: queryArg.isActive,
          curriculum: queryArg.curriculum,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    create9: build.mutation<Create9ApiResponse, Create9ApiArg>({
      query: (queryArg) => ({
        url: `/papers`,
        method: "POST",
        body: queryArg.paperRequest,
      }),
    }),
    generateCourseFromPaper: build.mutation<
      GenerateCourseFromPaperApiResponse,
      GenerateCourseFromPaperApiArg
    >({
      query: (queryArg) => ({
        url: `/papers/${queryArg.paperId}/generate-course`,
        method: "POST",
      }),
    }),
    generateCoursesFromPapers: build.mutation<
      GenerateCoursesFromPapersApiResponse,
      GenerateCoursesFromPapersApiArg
    >({
      query: (queryArg) => ({
        url: `/papers/generate-courses`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    ratePaper: build.mutation<RatePaperApiResponse, RatePaperApiArg>({
      query: (queryArg) => ({
        url: `/paper-ratings`,
        method: "POST",
        body: queryArg.paperRatingRequest,
      }),
    }),
    markTour: build.mutation<MarkTourApiResponse, MarkTourApiArg>({
      query: (queryArg) => ({
        url: `/onboarding-tour/mark`,
        method: "POST",
        body: queryArg.markTourRequest,
      }),
    }),
    listMultimediaFiles: build.query<
      ListMultimediaFilesApiResponse,
      ListMultimediaFilesApiArg
    >({
      query: (queryArg) => ({
        url: `/multimedia-files`,
        params: {
          name: queryArg.name,
          folderId: queryArg.folderId,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    putImage: build.mutation<PutImageApiResponse, PutImageApiArg>({
      query: (queryArg) => ({
        url: `/multimedia-files`,
        method: "POST",
        body: queryArg.body,
        params: {
          name: queryArg.name,
          folderId: queryArg.folderId,
          isPublic: queryArg.isPublic,
        },
      }),
    }),
    copy: build.mutation<CopyApiResponse, CopyApiArg>({
      query: (queryArg) => ({
        url: `/migrations`,
        method: "POST",
        params: {
          request: queryArg.request,
        },
      }),
    }),
    list18: build.query<List18ApiResponse, List18ApiArg>({
      query: (queryArg) => ({
        url: `/keypoints`,
        params: {
          keyword: queryArg.keyword,
          paperId: queryArg.paperId,
          studentId: queryArg.studentId,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    create10: build.mutation<Create10ApiResponse, Create10ApiArg>({
      query: (queryArg) => ({
        url: `/keypoints`,
        method: "POST",
        body: queryArg.body,
        params: {
          paperId: queryArg.paperId,
        },
      }),
    }),
    createKeypointV3: build.mutation<
      CreateKeypointV3ApiResponse,
      CreateKeypointV3ApiArg
    >({
      query: (queryArg) => ({
        url: `/keypoints/v3`,
        method: "POST",
        body: queryArg.body,
        params: {
          curriculum: queryArg.curriculum,
          paperId: queryArg.paperId,
        },
      }),
    }),
    inferKnowledge: build.mutation<
      InferKnowledgeApiResponse,
      InferKnowledgeApiArg
    >({
      query: (queryArg) => ({
        url: `/keypoints/v2`,
        method: "POST",
        body: queryArg.body,
        params: {
          paperId: queryArg.paperId,
        },
      }),
    }),
    inferKnowledgeWithStreaming: build.mutation<
      InferKnowledgeWithStreamingApiResponse,
      InferKnowledgeWithStreamingApiArg
    >({
      query: (queryArg) => ({
        url: `/keypoints/v2-streaming`,
        method: "POST",
        params: {
          paperId: queryArg.paperId,
        },
      }),
    }),
    create11: build.mutation<Create11ApiResponse, Create11ApiArg>({
      query: (queryArg) => ({
        url: `/institutions`,
        method: "POST",
        body: queryArg.institutionRequest,
      }),
    }),
    listImages: build.query<ListImagesApiResponse, ListImagesApiArg>({
      query: (queryArg) => ({
        url: `/images`,
        params: {
          name: queryArg.name,
          folderId: queryArg.folderId,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    putImage1: build.mutation<PutImage1ApiResponse, PutImage1ApiArg>({
      query: (queryArg) => ({
        url: `/images`,
        method: "POST",
        body: queryArg.body,
        params: {
          name: queryArg.name,
          folderId: queryArg.folderId,
          isPublic: queryArg.isPublic,
        },
      }),
    }),
    get9: build.query<Get9ApiResponse, Get9ApiArg>({
      query: () => ({ url: `/folders` }),
    }),
    create12: build.mutation<Create12ApiResponse, Create12ApiArg>({
      query: (queryArg) => ({
        url: `/folders`,
        method: "POST",
        body: queryArg.folderRequest,
      }),
    }),
    delete11: build.mutation<Delete11ApiResponse, Delete11ApiArg>({
      query: (queryArg) => ({ url: `/folders`, method: "DELETE" }),
    }),
    list19: build.query<List19ApiResponse, List19ApiArg>({
      query: (queryArg) => ({
        url: `/flashcards`,
        params: {
          keyword: queryArg.keyword,
          paperId: queryArg.paperId,
          studentId: queryArg.studentId,
          difficulty: queryArg.difficulty,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    create13: build.mutation<Create13ApiResponse, Create13ApiArg>({
      query: (queryArg) => ({
        url: `/flashcards`,
        method: "POST",
        body: queryArg.body,
        params: {
          difficulty: queryArg.difficulty,
          paperId: queryArg.paperId,
        },
      }),
    }),
    generateFlashcardsV3: build.mutation<
      GenerateFlashcardsV3ApiResponse,
      GenerateFlashcardsV3ApiArg
    >({
      query: (queryArg) => ({
        url: `/flashcards/v3`,
        method: "POST",
        body: queryArg.body,
        params: {
          difficulty: queryArg.difficulty,
          curriculum: queryArg.curriculum,
          paperId: queryArg.paperId,
        },
      }),
    }),
    inferKnowledge1: build.mutation<
      InferKnowledge1ApiResponse,
      InferKnowledge1ApiArg
    >({
      query: (queryArg) => ({
        url: `/flashcards/v2`,
        method: "POST",
        body: queryArg.body,
        params: {
          difficulty: queryArg.difficulty,
          paperId: queryArg.paperId,
        },
      }),
    }),
    inferKnowledgeWithStreaming1: build.mutation<
      InferKnowledgeWithStreaming1ApiResponse,
      InferKnowledgeWithStreaming1ApiArg
    >({
      query: (queryArg) => ({
        url: `/flashcards/v2-streaming`,
        method: "POST",
        params: {
          difficulty: queryArg.difficulty,
          paperId: queryArg.paperId,
          cardsCount: queryArg.cardsCount,
        },
      }),
    }),
    recordUsage: build.mutation<RecordUsageApiResponse, RecordUsageApiArg>({
      query: (queryArg) => ({
        url: `/flashcard-usage`,
        method: "POST",
        body: queryArg.flashcardUsageRequest,
      }),
    }),
    startSession: build.mutation<StartSessionApiResponse, StartSessionApiArg>({
      query: (queryArg) => ({
        url: `/flashcard-sessions/start`,
        method: "POST",
        body: queryArg.flashcardSessionRequest,
      }),
    }),
    listFlagQuestion: build.query<
      ListFlagQuestionApiResponse,
      ListFlagQuestionApiArg
    >({
      query: (queryArg) => ({
        url: `/flagged-questions`,
        params: {
          keyword: queryArg.keyword,
          issueType: queryArg.issueType,
          resolved: queryArg.resolved,
          questionId: queryArg.questionId,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    reportQuestion: build.mutation<
      ReportQuestionApiResponse,
      ReportQuestionApiArg
    >({
      query: (queryArg) => ({
        url: `/flagged-questions`,
        method: "POST",
        body: queryArg.flagQuestionRequest,
      }),
    }),
    resolveQuestion: build.mutation<
      ResolveQuestionApiResponse,
      ResolveQuestionApiArg
    >({
      query: (queryArg) => ({
        url: `/flagged-questions/${queryArg.id}/resolve`,
        method: "POST",
        body: queryArg.resolveFlagQuestionRequest,
      }),
    }),
    list20: build.query<List20ApiResponse, List20ApiArg>({
      query: (queryArg) => ({
        url: `/faculties`,
        params: {
          name: queryArg.name,
          keyword: queryArg.keyword,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    create14: build.mutation<Create14ApiResponse, Create14ApiArg>({
      query: (queryArg) => ({
        url: `/faculties`,
        method: "POST",
        body: queryArg.facultyRequest,
      }),
    }),
    list21: build.query<List21ApiResponse, List21ApiArg>({
      query: (queryArg) => ({
        url: `/exams`,
        params: {
          name: queryArg.name,
          year: queryArg.year,
          examGroupId: queryArg.examGroupId,
          isActive: queryArg.isActive,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    create15: build.mutation<Create15ApiResponse, Create15ApiArg>({
      query: (queryArg) => ({
        url: `/exams`,
        method: "POST",
        body: queryArg.examRequest,
      }),
    }),
    list22: build.query<List22ApiResponse, List22ApiArg>({
      query: (queryArg) => ({
        url: `/exam-groups`,
        params: {
          name: queryArg.name,
          isActive: queryArg.isActive,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    create16: build.mutation<Create16ApiResponse, Create16ApiArg>({
      query: (queryArg) => ({
        url: `/exam-groups`,
        method: "POST",
        body: queryArg.body,
        params: {
          name: queryArg.name,
          description: queryArg.description,
          isActive: queryArg.isActive,
        },
      }),
    }),
    getEvaluation: build.mutation<
      GetEvaluationApiResponse,
      GetEvaluationApiArg
    >({
      query: (queryArg) => ({
        url: `/evaluation/evaluate`,
        method: "POST",
        body: queryArg.evaluationRequest,
      }),
    }),
    list23: build.query<List23ApiResponse, List23ApiArg>({
      query: (queryArg) => ({
        url: `/enrolled-lesson-items`,
        params: {
          keyword: queryArg.keyword,
          enrolledCourseId: queryArg.enrolledCourseId,
          sortField: queryArg.sortField,
          status: queryArg.status,
          sortOrder: queryArg.sortOrder,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    create17: build.mutation<Create17ApiResponse, Create17ApiArg>({
      query: (queryArg) => ({
        url: `/enrolled-lesson-items`,
        method: "POST",
        body: queryArg.enrolledLessonItemCreateRequest,
      }),
    }),
    list24: build.query<List24ApiResponse, List24ApiArg>({
      query: (queryArg) => ({
        url: `/enrolled-courses`,
        params: {
          keyword: queryArg.keyword,
          courseId: queryArg.courseId,
          sortField: queryArg.sortField,
          status: queryArg.status,
          sortOrder: queryArg.sortOrder,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    create18: build.mutation<Create18ApiResponse, Create18ApiArg>({
      query: (queryArg) => ({
        url: `/enrolled-courses`,
        method: "POST",
        body: queryArg.enrolledCourseRequest,
      }),
    }),
    uploadDocument: build.mutation<
      UploadDocumentApiResponse,
      UploadDocumentApiArg
    >({
      query: (queryArg) => ({
        url: `/documents/upload`,
        method: "POST",
        body: queryArg.body,
        params: {
          name: queryArg.name,
          folderId: queryArg.folderId,
          isPublic: queryArg.isPublic,
        },
      }),
    }),
    subscribe: build.mutation<SubscribeApiResponse, SubscribeApiArg>({
      query: (queryArg) => ({
        url: `/distinction/portal/subscriptions/subscribe`,
        method: "POST",
        body: queryArg.subscriptionRequest,
      }),
    }),
    register: build.mutation<RegisterApiResponse, RegisterApiArg>({
      query: (queryArg) => ({
        url: `/distinction/phone/auth/register`,
        method: "POST",
        body: queryArg.phoneRegisterRequest,
      }),
    }),
    login1: build.mutation<Login1ApiResponse, Login1ApiArg>({
      query: (queryArg) => ({
        url: `/distinction/phone/auth/login`,
        method: "POST",
        body: queryArg.phoneLoginRequest,
      }),
    }),
    resendVerification: build.mutation<
      ResendVerificationApiResponse,
      ResendVerificationApiArg
    >({
      query: (queryArg) => ({
        url: `/distinction/auth/verify/resend`,
        method: "POST",
        body: queryArg.distinctionResendVerification,
      }),
    }),
    confirm: build.mutation<ConfirmApiResponse, ConfirmApiArg>({
      query: (queryArg) => ({
        url: `/distinction/auth/verify/confirm`,
        method: "POST",
        body: queryArg.distinctionUserConfirmRequest,
      }),
    }),
    tokenLogin: build.mutation<TokenLoginApiResponse, TokenLoginApiArg>({
      query: (queryArg) => ({
        url: `/distinction/auth/token-login`,
        method: "POST",
        body: queryArg.distinctionTokenLoginRequest,
      }),
    }),
    register1: build.mutation<Register1ApiResponse, Register1ApiArg>({
      query: (queryArg) => ({
        url: `/distinction/auth/register`,
        method: "POST",
        body: queryArg.dinstinctionRegistrationRequest,
      }),
    }),
    registerUploadedStudent: build.mutation<
      RegisterUploadedStudentApiResponse,
      RegisterUploadedStudentApiArg
    >({
      query: (queryArg) => ({
        url: `/distinction/auth/register-uploaded-student`,
        method: "POST",
        body: queryArg.distinctionUploadedUserRegistrationRequest,
      }),
    }),
    refreshToken1: build.mutation<
      RefreshToken1ApiResponse,
      RefreshToken1ApiArg
    >({
      query: (queryArg) => ({
        url: `/distinction/auth/refresh-token`,
        method: "POST",
        body: queryArg.refreshTokenRequest,
      }),
    }),
    passwordReset1: build.mutation<
      PasswordReset1ApiResponse,
      PasswordReset1ApiArg
    >({
      query: (queryArg) => ({
        url: `/distinction/auth/password/reset`,
        method: "POST",
        body: queryArg.distinctionPasswordReset,
      }),
    }),
    passwordResetRequest1: build.mutation<
      PasswordResetRequest1ApiResponse,
      PasswordResetRequest1ApiArg
    >({
      query: (queryArg) => ({
        url: `/distinction/auth/password/reset-request`,
        method: "POST",
        body: queryArg.distinctionPasswordResetRequest,
      }),
    }),
    login2: build.mutation<Login2ApiResponse, Login2ApiArg>({
      query: (queryArg) => ({
        url: `/distinction/auth/login`,
        method: "POST",
        body: queryArg.distinctionLoginRequest,
      }),
    }),
    list31: build.query<List31ApiResponse, List31ApiArg>({
      query: (queryArg) => ({
        url: `/departments`,
        params: {
          name: queryArg.name,
          keyword: queryArg.keyword,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    create19: build.mutation<Create19ApiResponse, Create19ApiArg>({
      query: (queryArg) => ({
        url: `/departments`,
        method: "POST",
        body: queryArg.departmentRequest,
      }),
    }),
    list32: build.query<List32ApiResponse, List32ApiArg>({
      query: (queryArg) => ({
        url: `/custom-questions`,
        params: {
          keyword: queryArg.keyword,
          topic: queryArg.topic,
          tag: queryArg.tag,
          year: queryArg.year,
          subjectId: queryArg.subjectId,
          paperId: queryArg.paperId,
          examGroupId: queryArg.examGroupId,
          examId: queryArg.examId,
          userId: queryArg.userId,
          status: queryArg.status,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    create20: build.mutation<Create20ApiResponse, Create20ApiArg>({
      query: (queryArg) => ({
        url: `/custom-questions`,
        method: "POST",
        body: queryArg.customQuestionRequest,
      }),
    }),
    updateCustomQuestionStatus: build.mutation<
      UpdateCustomQuestionStatusApiResponse,
      UpdateCustomQuestionStatusApiArg
    >({
      query: (queryArg) => ({
        url: `/custom-questions/update-status`,
        method: "POST",
        body: queryArg.customQuestionStatusRequest,
      }),
    }),
    bulkUploadQuestionsData2: build.mutation<
      BulkUploadQuestionsData2ApiResponse,
      BulkUploadQuestionsData2ApiArg
    >({
      query: (queryArg) => ({
        url: `/custom-questions/bulk-upload`,
        method: "POST",
        body: queryArg.body,
        params: {
          paperId: queryArg.paperId,
        },
      }),
    }),
    list33: build.query<List33ApiResponse, List33ApiArg>({
      query: (queryArg) => ({
        url: `/courses`,
        params: {
          keyword: queryArg.keyword,
          subjectId: queryArg.subjectId,
          units: queryArg.units,
          sortField: queryArg.sortField,
          sortOrder: queryArg.sortOrder,
          aiStatus: queryArg.aiStatus,
          offset: queryArg.offset,
          size: queryArg.size,
        },
      }),
    }),
    generate: build.mutation<GenerateApiResponse, GenerateApiArg>({
      query: (queryArg) => ({
        url: `/courses`,
        method: "POST",
        body: queryArg.courseCreateRequest,
      }),
    }),
    manualRetry: build.mutation<ManualRetryApiResponse, ManualRetryApiArg>({
      query: (queryArg) => ({
        url: `/course-gen-requests/${queryArg.id}/retry`,
        method: "POST",
      }),
    }),
    resetRetryCount: build.mutation<
      ResetRetryCountApiResponse,
      ResetRetryCountApiArg
    >({
      query: (queryArg) => ({
        url: `/course-gen-requests/${queryArg.id}/reset-retry`,
        method: "POST",
      }),
    }),
    getMessages: build.query<GetMessagesApiResponse, GetMessagesApiArg>({
      query: (queryArg) => ({
        url: `/chatbot/thread/${queryArg.threadId}/messages`,
        params: {
          limit: queryArg.limit,
          order: queryArg.order,
        },
      }),
    }),
    chatMessage: build.mutation<ChatMessageApiResponse, ChatMessageApiArg>({
      query: (queryArg) => ({
        url: `/chatbot/thread/${queryArg.threadId}/messages`,
        method: "POST",
        body: queryArg.chatBotNewMessageRequest,
      }),
    }),
    newChat: build.mutation<NewChatApiResponse, NewChatApiArg>({
      query: (queryArg) => ({
        url: `/chatbot/thread/new-chat`,
        method: "POST",
        body: queryArg.chatBotNewMessageRequest,
      }),
    }),
    refreshToken2: build.mutation<
      RefreshToken2ApiResponse,
      RefreshToken2ApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/refresh-token`,
        method: "POST",
        body: queryArg.refreshTokenRequest,
      }),
    }),
    passwordReset2: build.mutation<
      PasswordReset2ApiResponse,
      PasswordReset2ApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/password/reset`,
        method: "POST",
        body: queryArg.passwordReset,
      }),
    }),
    passwordResetRequest2: build.mutation<
      PasswordResetRequest2ApiResponse,
      PasswordResetRequest2ApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/password/reset-request`,
        method: "POST",
        body: queryArg.passwordResetRequest,
      }),
    }),
    login3: build.mutation<Login3ApiResponse, Login3ApiArg>({
      query: (queryArg) => ({
        url: `/auth/login`,
        method: "POST",
        body: queryArg.loginRequest,
      }),
    }),
    chatMessage1: build.mutation<ChatMessage1ApiResponse, ChatMessage1ApiArg>({
      query: (queryArg) => ({
        url: `/assistant/thread/${queryArg.threadId}/chat`,
        method: "POST",
        body: queryArg.chatRequest,
      }),
    }),
    chatStreamMessage: build.mutation<
      ChatStreamMessageApiResponse,
      ChatStreamMessageApiArg
    >({
      query: (queryArg) => ({
        url: `/assistant/thread/${queryArg.threadId}/chat-stream`,
        method: "POST",
        body: queryArg.chatRequest,
      }),
    }),
    newThread: build.mutation<NewThreadApiResponse, NewThreadApiArg>({
      query: (queryArg) => ({
        url: `/assistant/thread/new-thread`,
        method: "POST",
        body: queryArg.newThreadRequest,
      }),
    }),
    categorizeQuestions: build.mutation<
      CategorizeQuestionsApiResponse,
      CategorizeQuestionsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/question/categorize`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    categorizeQuestion: build.mutation<
      CategorizeQuestionApiResponse,
      CategorizeQuestionApiArg
    >({
      query: (queryArg) => ({
        url: `/api/question/categorize/question/${queryArg.questionId}`,
        method: "POST",
      }),
    }),
    categorizeAndPersistQuestion: build.mutation<
      CategorizeAndPersistQuestionApiResponse,
      CategorizeAndPersistQuestionApiArg
    >({
      query: (queryArg) => ({
        url: `/api/question/categorize/question/${queryArg.questionId}/persist`,
        method: "POST",
      }),
    }),
    categorizeQuestionsByPaper: build.mutation<
      CategorizeQuestionsByPaperApiResponse,
      CategorizeQuestionsByPaperApiArg
    >({
      query: (queryArg) => ({
        url: `/api/question/categorize/paper/${queryArg.paperId}`,
        method: "POST",
      }),
    }),
    categorizeAndPersistQuestionsByPaper: build.mutation<
      CategorizeAndPersistQuestionsByPaperApiResponse,
      CategorizeAndPersistQuestionsByPaperApiArg
    >({
      query: (queryArg) => ({
        url: `/api/question/categorize/paper/${queryArg.paperId}/persist`,
        method: "POST",
      }),
    }),
    categorizeQuestionsByIds: build.mutation<
      CategorizeQuestionsByIdsApiResponse,
      CategorizeQuestionsByIdsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/question/categorize/by-ids`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    categorizeAndPersistQuestionsByIds: build.mutation<
      CategorizeAndPersistQuestionsByIdsApiResponse,
      CategorizeAndPersistQuestionsByIdsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/question/categorize/by-ids/persist`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    stopBulkCategorization: build.mutation<
      StopBulkCategorizationApiResponse,
      StopBulkCategorizationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/question/bulk-categorization/stop`,
        method: "POST",
        params: {
          institutionId: queryArg.institutionId,
        },
      }),
    }),
    startBulkCategorization: build.mutation<
      StartBulkCategorizationApiResponse,
      StartBulkCategorizationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/question/bulk-categorization/start`,
        method: "POST",
        params: {
          institutionId: queryArg.institutionId,
        },
      }),
    }),
    list35: build.query<List35ApiResponse, List35ApiArg>({
      query: () => ({ url: `/api-tokens` }),
    }),
    create21: build.mutation<Create21ApiResponse, Create21ApiArg>({
      query: (queryArg) => ({
        url: `/api-tokens`,
        method: "POST",
        body: queryArg.apiTokenRequest,
      }),
    }),
    batchStreaming: build.mutation<
      BatchStreamingApiResponse,
      BatchStreamingApiArg
    >({
      query: (queryArg) => ({
        url: `/ai-questions/v3-batch-streaming`,
        method: "POST",
        body: queryArg.body,
        params: {
          query: queryArg.query,
          paperId: queryArg.paperId,
          optionsCount: queryArg.optionsCount,
          questionsCount: queryArg.questionsCount,
          questionType: queryArg.questionType,
        },
      }),
    }),
    inferKnowledge2: build.mutation<
      InferKnowledge2ApiResponse,
      InferKnowledge2ApiArg
    >({
      query: (queryArg) => ({
        url: `/ai-questions/v2`,
        method: "POST",
        body: queryArg.body,
        params: {
          query: queryArg.query,
          paperId: queryArg.paperId,
          optionsCount: queryArg.optionsCount,
          questionsCount: queryArg.questionsCount,
          questionType: queryArg.questionType,
        },
      }),
    }),
    inferKnowledgeStreaming: build.mutation<
      InferKnowledgeStreamingApiResponse,
      InferKnowledgeStreamingApiArg
    >({
      query: (queryArg) => ({
        url: `/ai-questions/v2-streaming`,
        method: "POST",
        params: {
          query: queryArg.query,
          paperName: queryArg.paperName,
          optionsCount: queryArg.optionsCount,
          questionsCount: queryArg.questionsCount,
          questionType: queryArg.questionType,
        },
      }),
    }),
    save: build.mutation<SaveApiResponse, SaveApiArg>({
      query: (queryArg) => ({
        url: `/ai-questions/save`,
        method: "POST",
        body: queryArg.body,
        params: {
          paperId: queryArg.paperId,
        },
      }),
    }),
    generateQuestions2: build.mutation<
      GenerateQuestions2ApiResponse,
      GenerateQuestions2ApiArg
    >({
      query: (queryArg) => ({
        url: `/ai-questions/generate`,
        method: "POST",
        body: queryArg.body,
        params: {
          paperId: queryArg.paperId,
          questionCount: queryArg.questionCount,
          "question-type": queryArg["question-type"],
          optionCount: queryArg.optionCount,
        },
      }),
    }),
    create22: build.mutation<Create22ApiResponse, Create22ApiArg>({
      query: (queryArg) => ({
        url: `/ai-questions/add-knowledge`,
        method: "POST",
        body: queryArg.body,
        params: {
          paperName: queryArg.paperName,
          paperId: queryArg.paperId,
        },
      }),
    }),
    resendVerification1: build.mutation<
      ResendVerification1ApiResponse,
      ResendVerification1ApiArg
    >({
      query: (queryArg) => ({
        url: `/admin/staff/verify/resend`,
        method: "POST",
        body: queryArg.distinctionResendVerification,
      }),
    }),
    confirm1: build.mutation<Confirm1ApiResponse, Confirm1ApiArg>({
      query: (queryArg) => ({
        url: `/admin/staff/verify/confirm`,
        method: "POST",
        body: queryArg.distinctionUserConfirmRequest,
      }),
    }),
    register2: build.mutation<Register2ApiResponse, Register2ApiArg>({
      query: (queryArg) => ({
        url: `/admin/staff/register`,
        method: "POST",
        body: queryArg.staffRegistrationRequest,
      }),
    }),
    passwordReset3: build.mutation<
      PasswordReset3ApiResponse,
      PasswordReset3ApiArg
    >({
      query: (queryArg) => ({
        url: `/admin/staff/password/reset`,
        method: "POST",
        body: queryArg.distinctionPasswordReset,
      }),
    }),
    passwordResetRequest3: build.mutation<
      PasswordResetRequest3ApiResponse,
      PasswordResetRequest3ApiArg
    >({
      query: (queryArg) => ({
        url: `/admin/staff/password/reset-request`,
        method: "POST",
        body: queryArg.distinctionPasswordResetRequest,
      }),
    }),
    login4: build.mutation<Login4ApiResponse, Login4ApiArg>({
      query: (queryArg) => ({
        url: `/admin/staff/login`,
        method: "POST",
        body: queryArg.staffLoginRequest,
      }),
    }),
    verifyProfileNin: build.mutation<
      VerifyProfileNinApiResponse,
      VerifyProfileNinApiArg
    >({
      query: () => ({ url: `/Profile/verify/nin`, method: "POST" }),
    }),
    createReferral: build.mutation<
      CreateReferralApiResponse,
      CreateReferralApiArg
    >({
      query: (queryArg) => ({
        url: `/Profile/refer`,
        method: "POST",
        params: {
          referredEmail: queryArg.referredEmail,
        },
      }),
    }),
    get5: build.query<Get5ApiResponse, Get5ApiArg>({
      query: (queryArg) => ({ url: `/lessons/${queryArg.id}` }),
    }),
    update17: build.mutation<Update17ApiResponse, Update17ApiArg>({
      query: (queryArg) => ({
        url: `/lessons/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.lessonUpdateRequest,
      }),
    }),
    get6: build.query<Get6ApiResponse, Get6ApiArg>({
      query: (queryArg) => ({ url: `/lesson-items/${queryArg.id}` }),
    }),
    update18: build.mutation<Update18ApiResponse, Update18ApiArg>({
      query: (queryArg) => ({
        url: `/lesson-items/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.lessonItemUpdateRequest,
      }),
    }),
    get7: build.query<Get7ApiResponse, Get7ApiArg>({
      query: (queryArg) => ({ url: `/lesson-groups/${queryArg.id}` }),
    }),
    update19: build.mutation<Update19ApiResponse, Update19ApiArg>({
      query: (queryArg) => ({
        url: `/lesson-groups/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.lessonGroupUpdateRequest,
      }),
    }),
    retrieve5: build.query<Retrieve5ApiResponse, Retrieve5ApiArg>({
      query: (queryArg) => ({ url: `/institutions/${queryArg.id}` }),
    }),
    upate: build.mutation<UpateApiResponse, UpateApiArg>({
      query: (queryArg) => ({
        url: `/institutions/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.institutionUpdateRequest,
      }),
    }),
    retrieve6: build.query<Retrieve6ApiResponse, Retrieve6ApiArg>({
      query: (queryArg) => ({ url: `/faculties/${queryArg.id}` }),
    }),
    delete13: build.mutation<Delete13ApiResponse, Delete13ApiArg>({
      query: (queryArg) => ({
        url: `/faculties/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    update20: build.mutation<Update20ApiResponse, Update20ApiArg>({
      query: (queryArg) => ({
        url: `/faculties/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.facultyUpdateRequest,
      }),
    }),
    get12: build.query<Get12ApiResponse, Get12ApiArg>({
      query: (queryArg) => ({ url: `/enrolled-lesson-items/${queryArg.id}` }),
    }),
    delete16: build.mutation<Delete16ApiResponse, Delete16ApiArg>({
      query: (queryArg) => ({
        url: `/enrolled-lesson-items/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    update21: build.mutation<Update21ApiResponse, Update21ApiArg>({
      query: (queryArg) => ({
        url: `/enrolled-lesson-items/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.enrolledLessonItemUpdateRequest,
      }),
    }),
    retrieve7: build.query<Retrieve7ApiResponse, Retrieve7ApiArg>({
      query: (queryArg) => ({ url: `/departments/${queryArg.id}` }),
    }),
    delete18: build.mutation<Delete18ApiResponse, Delete18ApiArg>({
      query: (queryArg) => ({
        url: `/departments/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    update22: build.mutation<Update22ApiResponse, Update22ApiArg>({
      query: (queryArg) => ({
        url: `/departments/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.departmentUpdateRequest,
      }),
    }),
    get15: build.query<Get15ApiResponse, Get15ApiArg>({
      query: (queryArg) => ({ url: `/courses/${queryArg.id}` }),
    }),
    delete20: build.mutation<Delete20ApiResponse, Delete20ApiArg>({
      query: (queryArg) => ({
        url: `/courses/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    update23: build.mutation<Update23ApiResponse, Update23ApiArg>({
      query: (queryArg) => ({
        url: `/courses/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.courseUpdateRequest,
      }),
    }),
    updateAiStatus: build.mutation<
      UpdateAiStatusApiResponse,
      UpdateAiStatusApiArg
    >({
      query: (queryArg) => ({
        url: `/courses/${queryArg.id}/ai-status`,
        method: "PATCH",
        params: {
          aiStatus: queryArg.aiStatus,
          aiError: queryArg.aiError,
        },
      }),
    }),
    regenerate: build.mutation<RegenerateApiResponse, RegenerateApiArg>({
      query: (queryArg) => ({
        url: `/courses/regenerate/${queryArg.id}`,
        method: "PATCH",
      }),
    }),
    updateProgress: build.mutation<
      UpdateProgressApiResponse,
      UpdateProgressApiArg
    >({
      query: (queryArg) => ({
        url: `/course-gen-requests/${queryArg.id}/progress`,
        method: "PATCH",
        params: {
          percentage: queryArg.percentage,
          stage: queryArg.stage,
          message: queryArg.message,
        },
      }),
    }),
    updateAiStatus1: build.mutation<
      UpdateAiStatus1ApiResponse,
      UpdateAiStatus1ApiArg
    >({
      query: (queryArg) => ({
        url: `/course-gen-requests/${queryArg.id}/ai-status`,
        method: "PATCH",
        params: {
          aiStatus: queryArg.aiStatus,
          aiError: queryArg.aiError,
        },
      }),
    }),
    get17: build.query<Get17ApiResponse, Get17ApiArg>({
      query: (queryArg) => ({ url: `/api-tokens/${queryArg.id}` }),
    }),
    delete22: build.mutation<Delete22ApiResponse, Delete22ApiArg>({
      query: (queryArg) => ({
        url: `/api-tokens/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    update24: build.mutation<Update24ApiResponse, Update24ApiArg>({
      query: (queryArg) => ({
        url: `/api-tokens/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.apiTokenUpdateRequest,
      }),
    }),
    get18: build.query<Get18ApiResponse, Get18ApiArg>({
      query: (queryArg) => ({ url: `/admin/staff/${queryArg.id}` }),
    }),
    update25: build.mutation<Update25ApiResponse, Update25ApiArg>({
      query: (queryArg) => ({
        url: `/admin/staff/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.staffUpdateRequest,
      }),
    }),
    unblockStudent: build.mutation<
      UnblockStudentApiResponse,
      UnblockStudentApiArg
    >({
      query: (queryArg) => ({
        url: `/admin/manage-users/${queryArg.studentId}/unblock`,
        method: "PATCH",
      }),
    }),
    blockStudent: build.mutation<BlockStudentApiResponse, BlockStudentApiArg>({
      query: (queryArg) => ({
        url: `/admin/manage-users/${queryArg.studentId}/block`,
        method: "PATCH",
      }),
    }),
    getCurrentUserStreakStatus: build.query<
      GetCurrentUserStreakStatusApiResponse,
      GetCurrentUserStreakStatusApiArg
    >({
      query: () => ({ url: `/streak/user-streak-stats` }),
    }),
    getUserStreakHistory: build.query<
      GetUserStreakHistoryApiResponse,
      GetUserStreakHistoryApiArg
    >({
      query: () => ({ url: `/streak/user-streak-history` }),
    }),
    getRecentStreakHistory: build.query<
      GetRecentStreakHistoryApiResponse,
      GetRecentStreakHistoryApiArg
    >({
      query: (queryArg) => ({
        url: `/streak/user-streak-history/recent`,
        params: {
          days: queryArg.days,
        },
      }),
    }),
    getStreakHistoryInRange: build.query<
      GetStreakHistoryInRangeApiResponse,
      GetStreakHistoryInRangeApiArg
    >({
      query: (queryArg) => ({
        url: `/streak/user-streak-history/range`,
        params: {
          startDate: queryArg.startDate,
          endDate: queryArg.endDate,
        },
      }),
    }),
    getUserAchievements: build.query<
      GetUserAchievementsApiResponse,
      GetUserAchievementsApiArg
    >({
      query: () => ({ url: `/streak/user-achievements` }),
    }),
    hasActivityForDate: build.query<
      HasActivityForDateApiResponse,
      HasActivityForDateApiArg
    >({
      query: (queryArg) => ({
        url: `/streak/activity-status/${queryArg.date}`,
      }),
    }),
    getTotalQuestions: build.query<
      GetTotalQuestionsApiResponse,
      GetTotalQuestionsApiArg
    >({
      query: (queryArg) => ({
        url: `/statistics/questions`,
        params: {
          examGroupId: queryArg.examGroupId,
          examId: queryArg.examId,
          paperId: queryArg.paperId,
        },
      }),
    }),
    getSchoolStatistics: build.query<
      GetSchoolStatisticsApiResponse,
      GetSchoolStatisticsApiArg
    >({
      query: (queryArg) => ({
        url: `/schoolOnboarding/statistics/${queryArg.schoolId}`,
      }),
    }),
    getUploadedStudents: build.query<
      GetUploadedStudentsApiResponse,
      GetUploadedStudentsApiArg
    >({
      query: (queryArg) => ({
        url: `/schoolOnboarding/getUploadedStudents`,
        params: {
          schoolId: queryArg.schoolId,
          sort: queryArg.sort,
          keyword: queryArg.keyword,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    getCashRewardsByStudentId: build.query<
      GetCashRewardsByStudentIdApiResponse,
      GetCashRewardsByStudentIdApiArg
    >({
      query: (queryArg) => ({
        url: `/rewards/student-cash-rewards/${queryArg.studentId}`,
      }),
    }),
    getAirtimeRewardsByStudentId: build.query<
      GetAirtimeRewardsByStudentIdApiResponse,
      GetAirtimeRewardsByStudentIdApiArg
    >({
      query: (queryArg) => ({
        url: `/rewards/student-airtime-rewards/${queryArg.studentId}`,
      }),
    }),
    getAllCashRewards: build.query<
      GetAllCashRewardsApiResponse,
      GetAllCashRewardsApiArg
    >({
      query: (queryArg) => ({
        url: `/rewards/all-cash-rewards`,
        params: {
          keyword: queryArg.keyword,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    getAllAirtimeRewards: build.query<
      GetAllAirtimeRewardsApiResponse,
      GetAllAirtimeRewardsApiArg
    >({
      query: (queryArg) => ({
        url: `/rewards/all-airtime-rewards`,
        params: {
          keyword: queryArg.keyword,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    getAllAirtimeRequests: build.query<
      GetAllAirtimeRequestsApiResponse,
      GetAllAirtimeRequestsApiArg
    >({
      query: (queryArg) => ({
        url: `/rewards/all-airtime-requests`,
        params: {
          keyword: queryArg.keyword,
          statusFilter: queryArg.statusFilter,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    getRateLimitStatus: build.query<
      GetRateLimitStatusApiResponse,
      GetRateLimitStatusApiArg
    >({
      query: (queryArg) => ({
        url: `/rate-limit/status`,
        params: {
          clientIp: queryArg.clientIp,
        },
      }),
    }),
    allowRequest: build.query<AllowRequestApiResponse, AllowRequestApiArg>({
      query: (queryArg) => ({
        url: `/rate-limit/allow-request`,
        params: {
          clientIp: queryArg.clientIp,
          email: queryArg.email,
        },
      }),
    }),
    getSchoolRanking: build.query<
      GetSchoolRankingApiResponse,
      GetSchoolRankingApiArg
    >({
      query: (queryArg) => ({
        url: `/ranking/school`,
        params: {
          schoolId: queryArg.schoolId,
          userId: queryArg.userId,
          page: queryArg.page,
          limit: queryArg.limit,
        },
      }),
    }),
    getGlobalRanking: build.query<
      GetGlobalRankingApiResponse,
      GetGlobalRankingApiArg
    >({
      query: (queryArg) => ({
        url: `/ranking/global`,
        params: {
          userId: queryArg.userId,
          page: queryArg.page,
          limit: queryArg.limit,
        },
      }),
    }),
    getTotalTimeElapsed: build.query<
      GetTotalTimeElapsedApiResponse,
      GetTotalTimeElapsedApiArg
    >({
      query: (queryArg) => ({
        url: `/quizathon/${queryArg.studentId}/total-time-elapsed`,
        params: {
          quizathonId: queryArg.quizathonId,
        },
      }),
    }),
    getStudentQUizathonHistory: build.query<
      GetStudentQUizathonHistoryApiResponse,
      GetStudentQUizathonHistoryApiArg
    >({
      query: (queryArg) => ({
        url: `/quizathon/${queryArg.studentId}/history`,
        params: {
          keyword: queryArg.keyword,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    getCertificate: build.query<
      GetCertificateApiResponse,
      GetCertificateApiArg
    >({
      query: (queryArg) => ({
        url: `/quizathon/${queryArg.participantId}/certificate`,
      }),
    }),
    verifyCertificate: build.query<
      VerifyCertificateApiResponse,
      VerifyCertificateApiArg
    >({
      query: (queryArg) => ({
        url: `/quizathon/${queryArg.participantId}/certificate/verify`,
      }),
    }),
    list6: build.query<List6ApiResponse, List6ApiArg>({
      query: (queryArg) => ({
        url: `/quizathon/waitlist`,
        params: {
          studentId: queryArg.studentId,
          quizathonId: queryArg.quizathonId,
          keyword: queryArg.keyword,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    getParticipantStats: build.query<
      GetParticipantStatsApiResponse,
      GetParticipantStatsApiArg
    >({
      query: (queryArg) => ({
        url: `/quizathon/participants/stats/${queryArg.studentId}`,
        params: {
          quizathonId: queryArg.quizathonId,
        },
      }),
    }),
    getLeaderboard: build.query<
      GetLeaderboardApiResponse,
      GetLeaderboardApiArg
    >({
      query: (queryArg) => ({
        url: `/quizathon/leaderboard`,
        params: {
          studentId: queryArg.studentId,
          quizathonId: queryArg.quizathonId,
          schoolId: queryArg.schoolId,
          keyword: queryArg.keyword,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    universityLeaderboard: build.query<
      UniversityLeaderboardApiResponse,
      UniversityLeaderboardApiArg
    >({
      query: (queryArg) => ({
        url: `/quizathon/leaderboard/university`,
        params: {
          quizathonId: queryArg.quizathonId,
          keyword: queryArg.keyword,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    getGeniusScoreLeaderboard: build.query<
      GetGeniusScoreLeaderboardApiResponse,
      GetGeniusScoreLeaderboardApiArg
    >({
      query: (queryArg) => ({
        url: `/quizathon/leaderboard/genius-score`,
        params: {
          quizathonId: queryArg.quizathonId,
          page: queryArg.page,
          size: queryArg.size,
          studentId: queryArg.studentId,
        },
      }),
    }),
    getLeaderboardRankings: build.query<
      GetLeaderboardRankingsApiResponse,
      GetLeaderboardRankingsApiArg
    >({
      query: (queryArg) => ({
        url: `/quizathon/leaderboard/accuracy`,
        params: {
          quizathonId: queryArg.quizathonId,
          page: queryArg.page,
          size: queryArg.size,
          studentId: queryArg.studentId,
        },
      }),
    }),
    getLeaderboard1: build.query<
      GetLeaderboard1ApiResponse,
      GetLeaderboard1ApiArg
    >({
      query: (queryArg) => ({
        url: `/quizathon/daily-leaderboard`,
        params: {
          studentId: queryArg.studentId,
          quizathonId: queryArg.quizathonId,
          date: queryArg.date,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    getActiveQuizathon: build.query<
      GetActiveQuizathonApiResponse,
      GetActiveQuizathonApiArg
    >({
      query: () => ({ url: `/quizathon/active` }),
    }),
    getQuestionCountByYear: build.query<
      GetQuestionCountByYearApiResponse,
      GetQuestionCountByYearApiArg
    >({
      query: (queryArg) => ({
        url: `/questions-count-by-year`,
        params: {
          year: queryArg.year,
        },
      }),
    }),
    getMyProfileVisitCount: build.query<
      GetMyProfileVisitCountApiResponse,
      GetMyProfileVisitCountApiArg
    >({
      query: () => ({ url: `/profile/event/count-profile-visits` }),
    }),
    getTopics: build.query<GetTopicsApiResponse, GetTopicsApiArg>({
      query: (queryArg) => ({
        url: `/portal/topics`,
        params: {
          examGroupId: queryArg.examGroupId,
          subjectId: queryArg.subjectId,
          years: queryArg.years,
        },
      }),
    }),
    getSubjects: build.query<GetSubjectsApiResponse, GetSubjectsApiArg>({
      query: (queryArg) => ({
        url: `/portal/subjects`,
        params: {
          examGroupId: queryArg.examGroupId,
        },
      }),
    }),
    list9: build.query<List9ApiResponse, List9ApiArg>({
      query: (queryArg) => ({
        url: `/portal/student-results`,
        params: {
          keyword: queryArg.keyword,
          paperId: queryArg.paperId,
          examGroupId: queryArg.examGroupId,
          examId: queryArg.examId,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    retrieve1: build.query<Retrieve1ApiResponse, Retrieve1ApiArg>({
      query: (queryArg) => ({ url: `/portal/student-results/${queryArg.id}` }),
    }),
    retrieve2: build.query<Retrieve2ApiResponse, Retrieve2ApiArg>({
      query: (queryArg) => ({ url: `/portal/student-practice/${queryArg.id}` }),
    }),
    getTotalCorrectAnswers: build.query<
      GetTotalCorrectAnswersApiResponse,
      GetTotalCorrectAnswersApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/student-papers/${queryArg.studentPaperId}/total-correct-answers`,
      }),
    }),
    getStudentAnswerSolutions: build.query<
      GetStudentAnswerSolutionsApiResponse,
      GetStudentAnswerSolutionsApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/student-papers/${queryArg.studentPaperId}/student-answer-solutions`,
        params: {
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    getRecommendedPapers: build.query<
      GetRecommendedPapersApiResponse,
      GetRecommendedPapersApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/student-papers/${queryArg.studentId}/recommended-papers`,
        params: {
          examGroupId: queryArg.examGroupId,
          subjectId: queryArg.subjectId,
        },
      }),
    }),
    retrieve3: build.query<Retrieve3ApiResponse, Retrieve3ApiArg>({
      query: (queryArg) => ({ url: `/portal/student-papers/${queryArg.id}` }),
    }),
    retrieveTrackTimer: build.query<
      RetrieveTrackTimerApiResponse,
      RetrieveTrackTimerApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/student-papers/${queryArg.id}/track-timer`,
      }),
    }),
    solutions: build.query<SolutionsApiResponse, SolutionsApiArg>({
      query: (queryArg) => ({
        url: `/portal/student-papers/${queryArg.id}/solutions`,
        params: {
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    retrieveResult: build.query<
      RetrieveResultApiResponse,
      RetrieveResultApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/student-papers/${queryArg.id}/result`,
      }),
    }),
    questions: build.query<QuestionsApiResponse, QuestionsApiArg>({
      query: (queryArg) => ({
        url: `/portal/student-papers/${queryArg.id}/questions`,
        params: {
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    listPracticesByPaperId: build.query<
      ListPracticesByPaperIdApiResponse,
      ListPracticesByPaperIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/student-papers/practice-by-paper`,
        params: {
          paperId: queryArg.paperId,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    groupPracticesByCourse: build.query<
      GroupPracticesByCourseApiResponse,
      GroupPracticesByCourseApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/student-papers/practice-by-course`,
        params: {
          keyword: queryArg.keyword,
          examGroupId: queryArg.examGroupId,
          subjectId: queryArg.subjectId,
          paperId: queryArg.paperId,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    studentQuizathonPapers: build.query<
      StudentQuizathonPapersApiResponse,
      StudentQuizathonPapersApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/student-papers/StudentQuizathonPapers`,
        params: {
          quizathonId: queryArg.quizathonId,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    time: build.query<TimeApiResponse, TimeApiArg>({
      query: (queryArg) => ({
        url: `/portal/statistics/time`,
        params: {
          examGroupId: queryArg.examGroupId,
          date: queryArg.date,
          paperId: queryArg.paperId,
          subjectId: queryArg.subjectId,
        },
      }),
    }),
    scoreTotal: build.query<ScoreTotalApiResponse, ScoreTotalApiArg>({
      query: (queryArg) => ({
        url: `/portal/statistics/scores`,
        params: {
          examGroupId: queryArg.examGroupId,
          date: queryArg.date,
          paperId: queryArg.paperId,
          subjectId: queryArg.subjectId,
        },
      }),
    }),
    scoreBreakdown: build.query<
      ScoreBreakdownApiResponse,
      ScoreBreakdownApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/statistics/scores/breakdown`,
        params: {
          examGroupId: queryArg.examGroupId,
          subjectId: queryArg.subjectId,
        },
      }),
    }),
    getQuestionCountByYear1: build.query<
      GetQuestionCountByYear1ApiResponse,
      GetQuestionCountByYear1ApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/statistics/questions-count-by-year`,
        params: {
          year: queryArg.year,
        },
      }),
    }),
    getPapers: build.query<GetPapersApiResponse, GetPapersApiArg>({
      query: (queryArg) => ({
        url: `/portal/papers`,
        params: {
          keyword: queryArg.keyword,
          name: queryArg.name,
          examId: queryArg.examId,
          examGroupId: queryArg.examGroupId,
          year: queryArg.year,
          subjectId: queryArg.subjectId,
          curriculum: queryArg.curriculum,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    getExams: build.query<GetExamsApiResponse, GetExamsApiArg>({
      query: (queryArg) => ({
        url: `/portal/exams`,
        params: {
          name: queryArg.name,
          year: queryArg.year,
          examGroupId: queryArg.examGroupId,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    getExamGroups: build.query<GetExamGroupsApiResponse, GetExamGroupsApiArg>({
      query: (queryArg) => ({
        url: `/portal/exam-groups`,
        params: {
          name: queryArg.name,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    getTotalPoints: build.query<
      GetTotalPointsApiResponse,
      GetTotalPointsApiArg
    >({
      query: (queryArg) => ({
        url: `/points/total`,
        params: {
          userId: queryArg.userId,
        },
      }),
    }),
    getAllPointTypes: build.query<
      GetAllPointTypesApiResponse,
      GetAllPointTypesApiArg
    >({
      query: () => ({ url: `/point-types` }),
    }),
    getOnboardingTours: build.query<
      GetOnboardingToursApiResponse,
      GetOnboardingToursApiArg
    >({
      query: () => ({ url: `/onboarding-tour/` }),
    }),
    getMultimediaFile: build.query<
      GetMultimediaFileApiResponse,
      GetMultimediaFileApiArg
    >({
      query: (queryArg) => ({ url: `/multimedia-files/${queryArg.id}` }),
    }),
    deleteMultimediaFile: build.mutation<
      DeleteMultimediaFileApiResponse,
      DeleteMultimediaFileApiArg
    >({
      query: (queryArg) => ({
        url: `/multimedia-files/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getMonthlyPractice: build.query<
      GetMonthlyPracticeApiResponse,
      GetMonthlyPracticeApiArg
    >({
      query: (queryArg) => ({
        url: `/monthly-practice`,
        params: {
          userId: queryArg.userId,
          year: queryArg.year,
        },
      }),
    }),
    list15: build.query<List15ApiResponse, List15ApiArg>({
      query: (queryArg) => ({
        url: `/lessons`,
        params: {
          keyword: queryArg.keyword,
          lessonGroupId: queryArg.lessonGroupId,
          sortField: queryArg.sortField,
          sortOrder: queryArg.sortOrder,
          offset: queryArg.offset,
          size: queryArg.size,
        },
      }),
    }),
    count: build.query<CountApiResponse, CountApiArg>({
      query: (queryArg) => ({
        url: `/lessons/count`,
        params: {
          keyword: queryArg.keyword,
          lessonGroupId: queryArg.lessonGroupId,
        },
      }),
    }),
    list16: build.query<List16ApiResponse, List16ApiArg>({
      query: (queryArg) => ({
        url: `/lesson-items`,
        params: {
          keyword: queryArg.keyword,
          lessonId: queryArg.lessonId,
          lessonGroupId: queryArg.lessonGroupId,
          courseId: queryArg.courseId,
          type: queryArg["type"],
          sortField: queryArg.sortField,
          sortOrder: queryArg.sortOrder,
          offset: queryArg.offset,
          size: queryArg.size,
        },
      }),
    }),
    count1: build.query<Count1ApiResponse, Count1ApiArg>({
      query: (queryArg) => ({
        url: `/lesson-items/count`,
        params: {
          keyword: queryArg.keyword,
          lessonId: queryArg.lessonId,
          lessonGroupId: queryArg.lessonGroupId,
          courseId: queryArg.courseId,
          type: queryArg["type"],
        },
      }),
    }),
    list17: build.query<List17ApiResponse, List17ApiArg>({
      query: (queryArg) => ({
        url: `/lesson-groups`,
        params: {
          courseId: queryArg.courseId,
          keyword: queryArg.keyword,
          groupNumber: queryArg.groupNumber,
          sortField: queryArg.sortField,
          sortOrder: queryArg.sortOrder,
          offset: queryArg.offset,
          size: queryArg.size,
        },
      }),
    }),
    count2: build.query<Count2ApiResponse, Count2ApiArg>({
      query: (queryArg) => ({
        url: `/lesson-groups/count`,
        params: {
          courseId: queryArg.courseId,
          keyword: queryArg.keyword,
          groupNumber: queryArg.groupNumber,
        },
      }),
    }),
    get8: build.query<Get8ApiResponse, Get8ApiArg>({
      query: (queryArg) => ({ url: `/keypoints/${queryArg.id}` }),
    }),
    delete10: build.mutation<Delete10ApiResponse, Delete10ApiArg>({
      query: (queryArg) => ({
        url: `/keypoints/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    keyPointPapers: build.query<
      KeyPointPapersApiResponse,
      KeyPointPapersApiArg
    >({
      query: (queryArg) => ({
        url: `/keypoints/papers`,
        params: {
          keyword: queryArg.keyword,
          paperId: queryArg.paperId,
          studentId: queryArg.studentId,
        },
      }),
    }),
    getImage: build.query<GetImageApiResponse, GetImageApiArg>({
      query: (queryArg) => ({ url: `/images/${queryArg.id}` }),
    }),
    deleteImage: build.mutation<DeleteImageApiResponse, DeleteImageApiArg>({
      query: (queryArg) => ({
        url: `/images/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    get10: build.query<Get10ApiResponse, Get10ApiArg>({
      query: (queryArg) => ({ url: `/folders/id` }),
    }),
    get11: build.query<Get11ApiResponse, Get11ApiArg>({
      query: (queryArg) => ({ url: `/flashcards/${queryArg.id}` }),
    }),
    delete12: build.mutation<Delete12ApiResponse, Delete12ApiArg>({
      query: (queryArg) => ({
        url: `/flashcards/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getUsageByStudent: build.query<
      GetUsageByStudentApiResponse,
      GetUsageByStudentApiArg
    >({
      query: (queryArg) => ({
        url: `/flashcard-usage/student/${queryArg.studentId}`,
      }),
    }),
    countActionsByStudent: build.query<
      CountActionsByStudentApiResponse,
      CountActionsByStudentApiArg
    >({
      query: (queryArg) => ({
        url: `/flashcard-usage/student/${queryArg.studentId}/count/${queryArg.actionType}`,
      }),
    }),
    getSessionById: build.query<
      GetSessionByIdApiResponse,
      GetSessionByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/flashcard-sessions/${queryArg.sessionId}`,
      }),
    }),
    getSessionStatus: build.query<
      GetSessionStatusApiResponse,
      GetSessionStatusApiArg
    >({
      query: (queryArg) => ({
        url: `/flashcard-sessions/${queryArg.sessionId}/status`,
      }),
    }),
    getSessionsByStudent: build.query<
      GetSessionsByStudentApiResponse,
      GetSessionsByStudentApiArg
    >({
      query: (queryArg) => ({
        url: `/flashcard-sessions/student/${queryArg.studentId}`,
      }),
    }),
    getSessionStatistics: build.query<
      GetSessionStatisticsApiResponse,
      GetSessionStatisticsApiArg
    >({
      query: (queryArg) => ({
        url: `/flashcard-sessions/student/${queryArg.studentId}/statistics`,
      }),
    }),
    getActiveSession: build.query<
      GetActiveSessionApiResponse,
      GetActiveSessionApiArg
    >({
      query: (queryArg) => ({
        url: `/flashcard-sessions/active`,
        params: {
          studentId: queryArg.studentId,
          flashcardId: queryArg.flashcardId,
        },
      }),
    }),
    getWeeklySummary: build.query<
      GetWeeklySummaryApiResponse,
      GetWeeklySummaryApiArg
    >({
      query: (queryArg) => ({
        url: `/flashcard-dashboard/student/${queryArg.studentId}/weekly-summary`,
        params: {
          weekStart: queryArg.weekStart,
        },
      }),
    }),
    getStudyTrends: build.query<
      GetStudyTrendsApiResponse,
      GetStudyTrendsApiArg
    >({
      query: (queryArg) => ({
        url: `/flashcard-dashboard/student/${queryArg.studentId}/trends`,
        params: {
          days: queryArg.days,
        },
      }),
    }),
    getStudyStreak: build.query<
      GetStudyStreakApiResponse,
      GetStudyStreakApiArg
    >({
      query: (queryArg) => ({
        url: `/flashcard-dashboard/student/${queryArg.studentId}/streak`,
      }),
    }),
    getSessionHistory: build.query<
      GetSessionHistoryApiResponse,
      GetSessionHistoryApiArg
    >({
      query: (queryArg) => ({
        url: `/flashcard-dashboard/student/${queryArg.studentId}/sessions`,
        params: {
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    getDashboardOverview: build.query<
      GetDashboardOverviewApiResponse,
      GetDashboardOverviewApiArg
    >({
      query: (queryArg) => ({
        url: `/flashcard-dashboard/student/${queryArg.studentId}/overview`,
      }),
    }),
    getSessionOutcomes: build.query<
      GetSessionOutcomesApiResponse,
      GetSessionOutcomesApiArg
    >({
      query: (queryArg) => ({
        url: `/flashcard-dashboard/student/${queryArg.studentId}/outcomes`,
      }),
    }),
    getAchievements: build.query<
      GetAchievementsApiResponse,
      GetAchievementsApiArg
    >({
      query: (queryArg) => ({
        url: `/flashcard-dashboard/student/${queryArg.studentId}/achievements`,
      }),
    }),
    getTopPerformingStudents: build.query<
      GetTopPerformingStudentsApiResponse,
      GetTopPerformingStudentsApiArg
    >({
      query: (queryArg) => ({
        url: `/flashcard-dashboard/admin/students/top-performers`,
        params: {
          limit: queryArg.limit,
        },
      }),
    }),
    getAtRiskStudents: build.query<
      GetAtRiskStudentsApiResponse,
      GetAtRiskStudentsApiArg
    >({
      query: (queryArg) => ({
        url: `/flashcard-dashboard/admin/students/at-risk`,
        params: {
          limit: queryArg.limit,
        },
      }),
    }),
    getRealTimeMetrics: build.query<
      GetRealTimeMetricsApiResponse,
      GetRealTimeMetricsApiArg
    >({
      query: () => ({ url: `/flashcard-dashboard/admin/realtime/metrics` }),
    }),
    getPerformanceMetrics: build.query<
      GetPerformanceMetricsApiResponse,
      GetPerformanceMetricsApiArg
    >({
      query: () => ({ url: `/flashcard-dashboard/admin/performance/metrics` }),
    }),
    getSystemOverview: build.query<
      GetSystemOverviewApiResponse,
      GetSystemOverviewApiArg
    >({
      query: () => ({ url: `/flashcard-dashboard/admin/overview` }),
    }),
    getInstitutionAnalytics: build.query<
      GetInstitutionAnalyticsApiResponse,
      GetInstitutionAnalyticsApiArg
    >({
      query: () => ({ url: `/flashcard-dashboard/admin/institutions` }),
    }),
    getInstitutionAnalytics1: build.query<
      GetInstitutionAnalytics1ApiResponse,
      GetInstitutionAnalytics1ApiArg
    >({
      query: (queryArg) => ({
        url: `/flashcard-dashboard/admin/institutions/${queryArg.institutionId}`,
      }),
    }),
    getContentPerformanceAnalytics: build.query<
      GetContentPerformanceAnalyticsApiResponse,
      GetContentPerformanceAnalyticsApiArg
    >({
      query: () => ({ url: `/flashcard-dashboard/admin/content/performance` }),
    }),
    getComprehensiveDashboard: build.query<
      GetComprehensiveDashboardApiResponse,
      GetComprehensiveDashboardApiArg
    >({
      query: () => ({ url: `/flashcard-dashboard/admin/comprehensive` }),
    }),
    getUsagePatterns: build.query<
      GetUsagePatternsApiResponse,
      GetUsagePatternsApiArg
    >({
      query: () => ({
        url: `/flashcard-dashboard/admin/analytics/usage-patterns`,
      }),
    }),
    getTrendAnalysis: build.query<
      GetTrendAnalysisApiResponse,
      GetTrendAnalysisApiArg
    >({
      query: (queryArg) => ({
        url: `/flashcard-dashboard/admin/analytics/trends`,
        params: {
          startDate: queryArg.startDate,
          endDate: queryArg.endDate,
        },
      }),
    }),
    getSystemAlerts: build.query<
      GetSystemAlertsApiResponse,
      GetSystemAlertsApiArg
    >({
      query: () => ({ url: `/flashcard-dashboard/admin/alerts` }),
    }),
    getFlaggedQuestion: build.query<
      GetFlaggedQuestionApiResponse,
      GetFlaggedQuestionApiArg
    >({
      query: (queryArg) => ({ url: `/flagged-questions/${queryArg.id}` }),
    }),
    getTrendingFlagsStats: build.query<
      GetTrendingFlagsStatsApiResponse,
      GetTrendingFlagsStatsApiArg
    >({
      query: (queryArg) => ({
        url: `/flagged-questions/trending`,
        params: {
          period: queryArg.period,
        },
      }),
    }),
    getFlaggedQuestionStats: build.query<
      GetFlaggedQuestionStatsApiResponse,
      GetFlaggedQuestionStatsApiArg
    >({
      query: () => ({ url: `/flagged-questions/stats` }),
    }),
    suggestion: build.query<SuggestionApiResponse, SuggestionApiArg>({
      query: (queryArg) => ({
        url: `/flagged-questions/ai-suggestion/${queryArg.flaggedQuestionId}`,
      }),
    }),
    listMine: build.query<ListMineApiResponse, ListMineApiArg>({
      query: (queryArg) => ({
        url: `/enrolled-courses/mine`,
        params: {
          keyword: queryArg.keyword,
          courseId: queryArg.courseId,
          sortField: queryArg.sortField,
          status: queryArg.status,
          sortOrder: queryArg.sortOrder,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    trackEmailOpen: build.query<
      TrackEmailOpenApiResponse,
      TrackEmailOpenApiArg
    >({
      query: (queryArg) => ({
        url: `/email-tracking/open/${queryArg.messageId}/pixel.gif`,
      }),
    }),
    trackEmailClick: build.query<
      TrackEmailClickApiResponse,
      TrackEmailClickApiArg
    >({
      query: (queryArg) => ({
        url: `/email-tracking/click/${queryArg.messageId}`,
        params: {
          url: queryArg.url,
        },
      }),
    }),
    getTopCampaigns: build.query<
      GetTopCampaignsApiResponse,
      GetTopCampaignsApiArg
    >({
      query: (queryArg) => ({
        url: `/email-analytics/top-campaigns`,
        params: {
          limit: queryArg.limit,
        },
      }),
    }),
    getUserEmailStats: build.query<
      GetUserEmailStatsApiResponse,
      GetUserEmailStatsApiArg
    >({
      query: (queryArg) => ({
        url: `/email-analytics/stats/${queryArg.userEmail}`,
      }),
    }),
    getDashboardData: build.query<
      GetDashboardDataApiResponse,
      GetDashboardDataApiArg
    >({
      query: (queryArg) => ({
        url: `/email-analytics/dashboard`,
        params: {
          startDate: queryArg.startDate,
          endDate: queryArg.endDate,
          emailType: queryArg.emailType,
        },
      }),
    }),
    getDocument: build.query<GetDocumentApiResponse, GetDocumentApiArg>({
      query: (queryArg) => ({ url: `/documents/${queryArg.documentId}` }),
    }),
    deleteDocument: build.mutation<
      DeleteDocumentApiResponse,
      DeleteDocumentApiArg
    >({
      query: (queryArg) => ({
        url: `/documents/${queryArg.documentId}`,
        method: "DELETE",
      }),
    }),
    getUploadResult: build.query<
      GetUploadResultApiResponse,
      GetUploadResultApiArg
    >({
      query: (queryArg) => ({
        url: `/documents/upload/${queryArg.uploadId}/result`,
      }),
    }),
    getUploadProgress: build.query<
      GetUploadProgressApiResponse,
      GetUploadProgressApiArg
    >({
      query: (queryArg) => ({
        url: `/documents/upload/${queryArg.uploadId}/progress`,
      }),
    }),
    getExams1: build.query<GetExams1ApiResponse, GetExams1ApiArg>({
      query: () => ({ url: `/distinction` }),
    }),
    list25: build.query<List25ApiResponse, List25ApiArg>({
      query: (queryArg) => ({
        url: `/distinction/transactions`,
        params: {
          from: queryArg["from"],
          to: queryArg.to,
          username: queryArg.username,
          status: queryArg.status,
          studentId: queryArg.studentId,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    verify: build.query<VerifyApiResponse, VerifyApiArg>({
      query: (queryArg) => ({
        url: `/distinction/transactions/verify`,
        params: {
          transactionId: queryArg.transactionId,
          referenceId: queryArg.referenceId,
          platform: queryArg.platform,
        },
      }),
    }),
    list26: build.query<List26ApiResponse, List26ApiArg>({
      query: (queryArg) => ({
        url: `/distinction/statistics/transactions`,
        params: {
          from: queryArg["from"],
          to: queryArg.to,
          username: queryArg.username,
          studentId: queryArg.studentId,
        },
      }),
    }),
    list27: build.query<List27ApiResponse, List27ApiArg>({
      query: (queryArg) => ({
        url: `/distinction/portal/transactions`,
        params: {
          from: queryArg["from"],
          to: queryArg.to,
          status: queryArg.status,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    verify1: build.query<Verify1ApiResponse, Verify1ApiArg>({
      query: (queryArg) => ({
        url: `/distinction/portal/transactions/verify`,
        params: {
          transactionId: queryArg.transactionId,
          referenceId: queryArg.referenceId,
          platform: queryArg.platform,
        },
      }),
    }),
    list28: build.query<List28ApiResponse, List28ApiArg>({
      query: (queryArg) => ({
        url: `/distinction/portal/subscriptions`,
        params: {
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    status: build.query<StatusApiResponse, StatusApiArg>({
      query: () => ({ url: `/distinction/portal/subscriptions/status` }),
    }),
    getPlanLimit: build.query<GetPlanLimitApiResponse, GetPlanLimitApiArg>({
      query: (queryArg) => ({
        url: `/distinction/portal/subscriptions/limit`,
        params: {
          property: queryArg.property,
        },
      }),
    }),
    getSubscription: build.query<
      GetSubscriptionApiResponse,
      GetSubscriptionApiArg
    >({
      query: () => ({ url: `/distinction/portal/subscriptions/active` }),
    }),
    list29: build.query<List29ApiResponse, List29ApiArg>({
      query: (queryArg) => ({
        url: `/distinction/portal/subscription-packages`,
        params: {
          institutionId: queryArg.institutionId,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    list30: build.query<List30ApiResponse, List30ApiArg>({
      query: (queryArg) => ({
        url: `/distinction/portal/plans`,
        params: {
          institutionId: queryArg.institutionId,
        },
      }),
    }),
    getStudentReferralCode: build.query<
      GetStudentReferralCodeApiResponse,
      GetStudentReferralCodeApiArg
    >({
      query: (queryArg) => ({
        url: `/distinction/auth/validate-student`,
        params: {
          matriculationNumber: queryArg.matriculationNumber,
        },
      }),
    }),
    validateStudentEmail: build.query<
      ValidateStudentEmailApiResponse,
      ValidateStudentEmailApiArg
    >({
      query: (queryArg) => ({
        url: `/distinction/auth/validate-email`,
        params: {
          email: queryArg.email,
        },
      }),
    }),
    googleLogin: build.query<GoogleLoginApiResponse, GoogleLoginApiArg>({
      query: (queryArg) => ({
        url: `/distinction/auth/google-authorize`,
        params: {
          platform: queryArg.platform,
          callbackUrl: queryArg.callbackUrl,
        },
      }),
    }),
    getSubmissions: build.query<
      GetSubmissionsApiResponse,
      GetSubmissionsApiArg
    >({
      query: () => ({ url: `/custom-questions/submissions` }),
    }),
    getStatistics: build.query<GetStatisticsApiResponse, GetStatisticsApiArg>({
      query: (queryArg) => ({
        url: `/custom-questions/statistics`,
        params: {
          paperId: queryArg.paperId,
          userId: queryArg.userId,
        },
      }),
    }),
    listMine1: build.query<ListMine1ApiResponse, ListMine1ApiArg>({
      query: (queryArg) => ({
        url: `/courses/mine`,
        params: {
          keyword: queryArg.keyword,
          subjectId: queryArg.subjectId,
          units: queryArg.units,
          sortField: queryArg.sortField,
          sortOrder: queryArg.sortOrder,
          aiStatus: queryArg.aiStatus,
          offset: queryArg.offset,
          size: queryArg.size,
        },
      }),
    }),
    countMine: build.query<CountMineApiResponse, CountMineApiArg>({
      query: (queryArg) => ({
        url: `/courses/mine/count`,
        params: {
          keyword: queryArg.keyword,
          subjectId: queryArg.subjectId,
          units: queryArg.units,
          aiStatus: queryArg.aiStatus,
        },
      }),
    }),
    count3: build.query<Count3ApiResponse, Count3ApiArg>({
      query: (queryArg) => ({
        url: `/courses/count`,
        params: {
          keyword: queryArg.keyword,
          subjectId: queryArg.subjectId,
          units: queryArg.units,
          aiStatus: queryArg.aiStatus,
        },
      }),
    }),
    getByAiStatus: build.query<GetByAiStatusApiResponse, GetByAiStatusApiArg>({
      query: (queryArg) => ({ url: `/courses/ai-status/${queryArg.aiStatus}` }),
    }),
    get16: build.query<Get16ApiResponse, Get16ApiArg>({
      query: (queryArg) => ({ url: `/course-gen-requests/${queryArg.id}` }),
    }),
    getRequestsNeedingRetry: build.query<
      GetRequestsNeedingRetryApiResponse,
      GetRequestsNeedingRetryApiArg
    >({
      query: () => ({ url: `/course-gen-requests/retry/needed` }),
    }),
    getByProgressStage: build.query<
      GetByProgressStageApiResponse,
      GetByProgressStageApiArg
    >({
      query: (queryArg) => ({
        url: `/course-gen-requests/progress/stage/${queryArg.stage}`,
      }),
    }),
    getByProgressPercentage: build.query<
      GetByProgressPercentageApiResponse,
      GetByProgressPercentageApiArg
    >({
      query: (queryArg) => ({
        url: `/course-gen-requests/progress/percentage`,
        params: {
          minPercentage: queryArg.minPercentage,
          maxPercentage: queryArg.maxPercentage,
        },
      }),
    }),
    getByAiStatus1: build.query<
      GetByAiStatus1ApiResponse,
      GetByAiStatus1ApiArg
    >({
      query: (queryArg) => ({
        url: `/course-gen-requests/ai-status/${queryArg.aiStatus}`,
      }),
    }),
    getByAiJobId: build.query<GetByAiJobIdApiResponse, GetByAiJobIdApiArg>({
      query: (queryArg) => ({
        url: `/course-gen-requests/ai-job/${queryArg.aiJobId}`,
      }),
    }),
    getWelcomeMessage: build.query<
      GetWelcomeMessageApiResponse,
      GetWelcomeMessageApiArg
    >({
      query: (queryArg) => ({
        url: `/chatbot/welcome`,
        params: {
          paperId: queryArg.paperId,
        },
      }),
    }),
    getChatBotAssistant: build.query<
      GetChatBotAssistantApiResponse,
      GetChatBotAssistantApiArg
    >({
      query: () => ({ url: `/chatbot/assistant` }),
    }),
    getBadges: build.query<GetBadgesApiResponse, GetBadgesApiArg>({
      query: () => ({ url: `/badges` }),
    }),
    list34: build.query<List34ApiResponse, List34ApiArg>({
      query: (queryArg) => ({
        url: `/autocomplete`,
        params: {
          key: queryArg.key,
          term: queryArg.term,
          filter: queryArg.filter,
          limit: queryArg.limit,
        },
      }),
    }),
    getWelcomeMessage1: build.query<
      GetWelcomeMessage1ApiResponse,
      GetWelcomeMessage1ApiArg
    >({
      query: (queryArg) => ({
        url: `/assistant/welcome`,
        params: {
          paperName: queryArg.paperName,
        },
      }),
    }),
    getThreads: build.query<GetThreadsApiResponse, GetThreadsApiArg>({
      query: () => ({ url: `/assistant/threads` }),
    }),
    getThread: build.query<GetThreadApiResponse, GetThreadApiArg>({
      query: (queryArg) => ({ url: `/assistant/thread/${queryArg.threadId}` }),
    }),
    deleteThread1: build.mutation<
      DeleteThread1ApiResponse,
      DeleteThread1ApiArg
    >({
      query: (queryArg) => ({
        url: `/assistant/thread/${queryArg.threadId}`,
        method: "DELETE",
      }),
    }),
    getMessages1: build.query<GetMessages1ApiResponse, GetMessages1ApiArg>({
      query: (queryArg) => ({
        url: `/assistant/thread/${queryArg.threadId}/sessions`,
        params: {
          limit: queryArg.limit,
          order: queryArg.order,
        },
      }),
    }),
    getChatBotAssistant1: build.query<
      GetChatBotAssistant1ApiResponse,
      GetChatBotAssistant1ApiArg
    >({
      query: () => ({ url: `/assistant/assistant` }),
    }),
    exportCourseAsScorm: build.query<
      ExportCourseAsScormApiResponse,
      ExportCourseAsScormApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/courses/${queryArg.courseId}/export/scorm`,
      }),
    }),
    healthCheck: build.query<HealthCheckApiResponse, HealthCheckApiArg>({
      query: () => ({ url: `/api/v1/courses/export/scorm/health` }),
    }),
    getStatus: build.query<GetStatusApiResponse, GetStatusApiArg>({
      query: (queryArg) => ({
        url: `/api/question/bulk-categorization/status`,
        params: {
          institutionId: queryArg.institutionId,
        },
      }),
    }),
    getProgress: build.query<GetProgressApiResponse, GetProgressApiArg>({
      query: (queryArg) => ({
        url: `/api/question/bulk-categorization/progress`,
        params: {
          institutionId: queryArg.institutionId,
        },
      }),
    }),
    list36: build.query<List36ApiResponse, List36ApiArg>({
      query: (queryArg) => ({
        url: `/admin/staff`,
        params: {
          search: queryArg.search,
          schoolId: queryArg.schoolId,
          role: queryArg.role,
          offset: queryArg.offset,
          size: queryArg.size,
        },
      }),
    }),
    listUsers: build.query<ListUsersApiResponse, ListUsersApiArg>({
      query: (queryArg) => ({
        url: `/admin/manage-users`,
        params: {
          keyword: queryArg.keyword,
          schoolId: queryArg.schoolId,
          schoolType: queryArg.schoolType,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    getUserById: build.query<GetUserByIdApiResponse, GetUserByIdApiArg>({
      query: (queryArg) => ({
        url: `/admin/manage-users/${queryArg.studentId}`,
      }),
    }),
    getUserProfile: build.query<
      GetUserProfileApiResponse,
      GetUserProfileApiArg
    >({
      query: (queryArg) => ({
        url: `/Profile`,
        params: {
          studentId: queryArg.studentId,
        },
      }),
    }),
    statisticsReferral: build.query<
      StatisticsReferralApiResponse,
      StatisticsReferralApiArg
    >({
      query: (queryArg) => ({
        url: `/Profile/student/statistics`,
        params: {
          studentId: queryArg.studentId,
        },
      }),
    }),
    getStudentReferralCode1: build.query<
      GetStudentReferralCode1ApiResponse,
      GetStudentReferralCode1ApiArg
    >({
      query: (queryArg) => ({
        url: `/Profile/student/getReferralCode`,
        params: {
          studentId: queryArg.studentId,
        },
      }),
    }),
    getReferrals: build.query<GetReferralsApiResponse, GetReferralsApiArg>({
      query: (queryArg) => ({
        url: `/Profile/referrals`,
        params: {
          studentId: queryArg.studentId,
          keyword: queryArg.keyword,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    getPublicUserProfile: build.query<
      GetPublicUserProfileApiResponse,
      GetPublicUserProfileApiArg
    >({
      query: (queryArg) => ({ url: `/Profile/public/${queryArg.username}` }),
    }),
    filterReferrals: build.query<
      FilterReferralsApiResponse,
      FilterReferralsApiArg
    >({
      query: (queryArg) => ({
        url: `/Profile/adminReferral`,
        params: {
          sort: queryArg.sort,
          keyword: queryArg.keyword,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    adminReferral: build.query<AdminReferralApiResponse, AdminReferralApiArg>({
      query: () => ({ url: `/Profile/admin/statistics` }),
    }),
    deleteDuplicates: build.mutation<
      DeleteDuplicatesApiResponse,
      DeleteDuplicatesApiArg
    >({
      query: () => ({ url: `/questions/delete-duplicates`, method: "DELETE" }),
    }),
    removeDuplicates: build.mutation<
      RemoveDuplicatesApiResponse,
      RemoveDuplicatesApiArg
    >({
      query: (queryArg) => ({
        url: `/flagged-questions/clear-duplicates/${queryArg.questionId}`,
        method: "DELETE",
      }),
    }),
    cancelSubscription: build.mutation<
      CancelSubscriptionApiResponse,
      CancelSubscriptionApiArg
    >({
      query: () => ({
        url: `/distinction/portal/subscriptions/cancel`,
        method: "DELETE",
      }),
    }),
    deleteThread: build.mutation<DeleteThreadApiResponse, DeleteThreadApiArg>({
      query: (queryArg) => ({
        url: `/chatbot/thread/${queryArg.threadId}`,
        method: "DELETE",
      }),
    }),
    delete21: build.mutation<Delete21ApiResponse, Delete21ApiArg>({
      query: (queryArg) => ({
        url: `/autocomplete/${queryArg.key}`,
        method: "DELETE",
        params: {
          term: queryArg.term,
          value: queryArg.value,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as coreApi };
export type RetrieveApiResponse = /** status 200 OK */ TelcoView;
export type RetrieveApiArg = {
  id: string;
};
export type UpdateApiResponse = /** status 200 OK */ TelcoView;
export type UpdateApiArg = {
  id: string;
  telcoRequest: TelcoRequest;
};
export type DeleteTelcosByIdApiResponse = /** status 200 OK */ object;
export type DeleteTelcosByIdApiArg = {
  id: string;
};
export type Update1ApiResponse = /** status 200 OK */ SubscriptionPackageView;
export type Update1ApiArg = {
  id: string;
  subscriptionPackageRequest: SubscriptionPackageRequest;
};
export type UpdateAddOnApiResponse =
  /** status 200 OK */ SubscriptionPackageAddonView;
export type UpdateAddOnApiArg = {
  id: string;
  subscriptionPackageAddonRequest: SubscriptionPackageAddonRequest;
};
export type Update2ApiResponse = /** status 200 OK */ Subject;
export type Update2ApiArg = {
  id: string;
  subjectRequest: SubjectRequest;
};
export type Delete1ApiResponse = /** status 200 OK */ object;
export type Delete1ApiArg = {
  id: string;
};
export type GetCurrentUserSettingsApiResponse =
  /** status 200 OK */ StreakNotificationSettingsDto;
export type GetCurrentUserSettingsApiArg = void;
export type UpdateCurrentUserSettingsApiResponse =
  /** status 200 OK */ StreakNotificationSettingsDto;
export type UpdateCurrentUserSettingsApiArg = {
  streakNotificationSettingsDto: StreakNotificationSettingsDto;
};
export type GetSectionsByIdApiResponse = /** status 200 OK */ SectionView;
export type GetSectionsByIdApiArg = {
  id: string;
};
export type Update3ApiResponse = /** status 200 OK */ SectionView;
export type Update3ApiArg = {
  id: string;
  sectionRequest: SectionRequest;
};
export type Delete2ApiResponse = /** status 200 OK */ object;
export type Delete2ApiArg = {
  id: string;
};
export type GetSchoolApiResponse = /** status 200 OK */ School;
export type GetSchoolApiArg = {
  id: string;
};
export type Update4ApiResponse = /** status 200 OK */ School;
export type Update4ApiArg = {
  id: string;
  name?: string;
  abbr?: string;
  state?: string;
  type?: "FEDERAL" | "STATE" | "PRIVATE";
  body: {
    image?: Blob;
  };
};
export type Delete3ApiResponse = /** status 200 OK */ object;
export type Delete3ApiArg = {
  id: string;
};
export type UpdateStudentApiResponse = /** status 200 OK */ UploadedStudentView;
export type UpdateStudentApiArg = {
  studentId: string;
  uploadedStudentDto: UploadedStudentDto;
};
export type Get1ApiResponse = /** status 200 OK */ Quizathon;
export type Get1ApiArg = {
  id: string;
};
export type Update5ApiResponse = /** status 200 OK */ Quizathon;
export type Update5ApiArg = {
  id: string;
  quizathonRequest: QuizathonRequest;
};
export type Delete4ApiResponse = /** status 200 OK */ object;
export type Delete4ApiArg = {
  id: string;
};
export type Get2ApiResponse = /** status 200 OK */ Participant;
export type Get2ApiArg = {
  id: string;
};
export type Update6ApiResponse = /** status 200 OK */ Participant;
export type Update6ApiArg = {
  id: string;
  participantRequest: ParticipantRequest;
};
export type Delete5ApiResponse = /** status 200 OK */ object;
export type Delete5ApiArg = {
  id: string;
};
export type Get3ApiResponse = /** status 200 OK */ QuestionView;
export type Get3ApiArg = {
  id: string;
};
export type Update7ApiResponse = /** status 200 OK */ QuestionView;
export type Update7ApiArg = {
  id: string;
  questionUpdateRequest: QuestionUpdateRequest;
};
export type Delete6ApiResponse = /** status 200 OK */ object;
export type Delete6ApiArg = {
  id: string;
};
export type Retrieve4ApiResponse = /** status 200 OK */ PlanView;
export type Retrieve4ApiArg = {
  id: string;
};
export type Update8ApiResponse = /** status 200 OK */ PlanView;
export type Update8ApiArg = {
  id: string;
  planUpdateRequest: PlanUpdateRequest;
};
export type Delete8ApiResponse = /** status 200 OK */ object;
export type Delete8ApiArg = {
  id: string;
};
export type Get4ApiResponse = /** status 200 OK */ PaperView;
export type Get4ApiArg = {
  id: string;
};
export type Update9ApiResponse = /** status 200 OK */ PaperView;
export type Update9ApiArg = {
  id: string;
  paperRequest: PaperRequest;
};
export type Delete9ApiResponse = /** status 200 OK */ object;
export type Delete9ApiArg = {
  id: string;
};
export type Update10ApiResponse = /** status 200 OK */ KeypointView;
export type Update10ApiArg = {
  id: string;
  updateKeyPointRequest: UpdateKeyPointRequest;
};
export type Update11ApiResponse = /** status 200 OK */ object;
export type Update11ApiArg = {
  id: string;
  request: FolderRequest;
};
export type Update12ApiResponse = /** status 200 OK */ FlashcardView;
export type Update12ApiArg = {
  id: string;
  updateFlashcardRequest: UpdateFlashcardRequest;
};
export type UpdateSessionStatisticsApiResponse =
  /** status 200 OK */ FlashcardSessionView;
export type UpdateSessionStatisticsApiArg = {
  sessionId: string;
};
export type ResumeSessionApiResponse =
  /** status 200 OK */ FlashcardSessionView;
export type ResumeSessionApiArg = {
  sessionId: string;
};
export type PauseSessionApiResponse = /** status 200 OK */ FlashcardSessionView;
export type PauseSessionApiArg = {
  sessionId: string;
};
export type EndSessionApiResponse = /** status 200 OK */ FlashcardSessionView;
export type EndSessionApiArg = {
  sessionId: string;
  status: "ACTIVE" | "COMPLETED" | "PAUSED" | "ABANDONED";
};
export type AbandonSessionApiResponse =
  /** status 200 OK */ FlashcardSessionView;
export type AbandonSessionApiArg = {
  sessionId: string;
};
export type ExamApiResponse = /** status 200 OK */ Exam;
export type ExamApiArg = {
  id: string;
};
export type Update13ApiResponse = /** status 200 OK */ Exam;
export type Update13ApiArg = {
  id: string;
  examRequest: ExamRequest;
};
export type Delete14ApiResponse = unknown;
export type Delete14ApiArg = {
  id: string;
};
export type ExamGroupApiResponse = /** status 200 OK */ ExamGroup;
export type ExamGroupApiArg = {
  id: string;
};
export type Update14ApiResponse = /** status 200 OK */ ExamGroup;
export type Update14ApiArg = {
  id: string;
  name: string;
  description?: string;
  isActive?: boolean;
  body: {
    image?: Blob;
  };
};
export type Delete15ApiResponse = unknown;
export type Delete15ApiArg = {
  id: string;
};
export type Get13ApiResponse = /** status 200 OK */ EnrolledCourseView;
export type Get13ApiArg = {
  id: string;
};
export type Update15ApiResponse = /** status 200 OK */ EnrolledCourseView;
export type Update15ApiArg = {
  id: string;
  enrolledCourseRequest: EnrolledCourseRequest;
};
export type Delete17ApiResponse = unknown;
export type Delete17ApiArg = {
  id: string;
};
export type Get14ApiResponse = /** status 200 OK */ CustomQuestionView;
export type Get14ApiArg = {
  id: string;
};
export type Update16ApiResponse = /** status 200 OK */ CustomQuestionView;
export type Update16ApiArg = {
  id: string;
  customQuestionUpdateRequest: CustomQuestionUpdateRequest;
};
export type Delete19ApiResponse = /** status 200 OK */ object;
export type Delete19ApiArg = {
  id: string;
};
export type UpdateUsernameApiResponse = /** status 200 OK */ object;
export type UpdateUsernameApiArg = {
  updateUsernameRequest: UpdateUsernameRequest;
};
export type EditUserProfileNinApiResponse = /** status 200 OK */ UserProfileDto;
export type EditUserProfileNinApiArg = {
  userProfileNinRequest: UserProfileNinRequest;
};
export type EditUserProfileApiResponse = /** status 200 OK */ UserProfileDto;
export type EditUserProfileApiArg = {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  otherName?: string;
  gender: string;
  bio?: string;
  matriculationNumber: string;
  department: string;
  stateOfOrigin: string;
  schoolId: string;
  level: string;
  dateOfBirth: string;
  body: {
    profileImage?: Blob;
  };
};
export type ListApiResponse = /** status 200 OK */ PaginatedSimpleTelcoView;
export type ListApiArg = {
  planType?: "TRIAL" | "DAILY" | "WEEKLY" | "MONTHLY" | "QUARTERLY" | "YEARLY";
  network?: "MTN" | "AIRTEL" | "GL0" | "NINE_MOBILE";
  page?: number;
  size?: number;
};
export type CreateApiResponse = /** status 200 OK */ TelcoView;
export type CreateApiArg = {
  telcoRequest: TelcoRequest;
};
export type CallbackApiResponse = /** status 200 OK */ string;
export type CallbackApiArg = {
  channel: string;
  action: string;
  circle: string;
  endDate: string;
  msisdn: string;
  operator: string;
  packName: string;
  amount: string;
  startDate?: string;
  userStatus: number;
  subscriberType?: number;
  transactionId: string;
  vendorName: string;
  contestName?: string;
  language?: string;
  contestLevel?: string;
  src?: string;
};
export type List1ApiResponse =
  /** status 200 OK */ PaginatedSubscriptionPackageView;
export type List1ApiArg = {
  page?: number;
  size?: number;
};
export type Create1ApiResponse = /** status 200 OK */ SubscriptionPackageView;
export type Create1ApiArg = {
  subscriptionPackageRequest: SubscriptionPackageRequest;
};
export type CreateAddOnApiResponse =
  /** status 200 OK */ SubscriptionPackageAddonView;
export type CreateAddOnApiArg = {
  subscriptionPackageAddonRequest: SubscriptionPackageAddonRequest;
};
export type List2ApiResponse = /** status 200 OK */ SimpleSubjectView[];
export type List2ApiArg = {
  curriculum?: "NUC" | "NBTE" | "NCCE" | "OTHERS";
};
export type Create2ApiResponse = /** status 200 OK */ Subject;
export type Create2ApiArg = {
  subjectRequest: SubjectRequest;
};
export type TestEmailTemplateApiResponse = /** status 200 OK */ string;
export type TestEmailTemplateApiArg = {
  toAddress?: string;
  template?: string;
};
export type RecordActivityApiResponse = unknown;
export type RecordActivityApiArg = {
  activityRequest: ActivityRequest;
};
export type GetSolutionApiResponse = /** status 200 OK */ string;
export type GetSolutionApiArg = {
  solutionRequest: SolutionRequest;
};
export type GetAnswerApiResponse = /** status 200 OK */ number[];
export type GetAnswerApiArg = {
  solutionRequest: SolutionRequest;
};
export type List3ApiResponse = /** status 200 OK */ PaginatedSimpleSectionView;
export type List3ApiArg = {
  title?: string;
  paperId: string;
  page?: number;
  size?: number;
};
export type Create3ApiResponse = /** status 200 OK */ SectionView;
export type Create3ApiArg = {
  sectionRequest: SectionRequest;
};
export type List4ApiResponse = /** status 200 OK */ PaginatedSimpleSchoolView;
export type List4ApiArg = {
  name?: string;
  abbr?: string;
  curriculum?: "NUC" | "NBTE" | "NCCE" | "OTHERS";
  page?: number;
  size?: number;
};
export type Create4ApiResponse = /** status 200 OK */ School;
export type Create4ApiArg = {
  name?: string;
  abbr?: string;
  state?: string;
  type?: "FEDERAL" | "STATE" | "PRIVATE";
  body: {
    image?: Blob;
  };
};
export type AddSingleStudentApiResponse =
  /** status 200 OK */ UploadedStudentView;
export type AddSingleStudentApiArg = {
  uploadedStudentDto: UploadedStudentDto;
};
export type ValidateBulkUploadStudentDataApiResponse =
  /** status 200 OK */ object;
export type ValidateBulkUploadStudentDataApiArg = {
  schoolId: string;
  body: {
    file: Blob;
  };
};
export type BulkUploadQuestionsDataApiResponse = /** status 200 OK */ object;
export type BulkUploadQuestionsDataApiArg = {
  schoolId: string;
  body: {
    file: Blob;
  };
};
export type BulkUploadStudentDataApiResponse = /** status 200 OK */ object;
export type BulkUploadStudentDataApiArg = {
  schoolId: string;
  body: {
    file: string;
  };
};
export type SendInviteApiResponse = /** status 200 OK */ string;
export type SendInviteApiArg = {
  body: ResendInviteDto[];
};
export type SendBulkInviteApiResponse = /** status 200 OK */ string;
export type SendBulkInviteApiArg = {
  schoolId: string;
};
export type RequestRewardRequestApiResponse = /** status 200 OK */ string;
export type RequestRewardRequestApiArg = {
  retryRewardRequestDto: RetryRewardRequestDto;
};
export type RequestRewardApiResponse = /** status 200 OK */ AirtimeRewardDto;
export type RequestRewardApiArg = {
  rewardRequestDto: RewardRequestDto;
};
export type ApproveRewardApiResponse = /** status 200 OK */ CashRewardDto;
export type ApproveRewardApiArg = {
  referrerId: string;
  rewardApprovalDto: RewardApprovalDto;
};
export type AirtimeStatusCallbackApiResponse = /** status 200 OK */ string;
export type AirtimeStatusCallbackApiArg = {
  airtimeStatus: AirtimeStatus;
};
export type RegisterUserApiResponse = /** status 200 OK */ string;
export type RegisterUserApiArg = {
  userRegistrationRequest: UserRegistrationRequest;
};
export type BlockClientApiResponse = /** status 200 OK */ string;
export type BlockClientApiArg = {
  clientIp: string;
};
export type List5ApiResponse = /** status 200 OK */ PaginatedQuizathonView;
export type List5ApiArg = {
  keyword?: string;
  status?: boolean;
  page?: number;
  size?: number;
};
export type Create5ApiResponse = /** status 200 OK */ Quizathon;
export type Create5ApiArg = {
  quizathonRequest: QuizathonRequest;
};
export type JoinWaitlistApiResponse = unknown;
export type JoinWaitlistApiArg = {
  id: string;
  studentId: string;
};
export type List7ApiResponse =
  /** status 200 OK */ PaginatedSimpleParticipantView;
export type List7ApiArg = {
  studentId?: string;
  quizathonId: string;
  schoolId?: string;
  keyword?: string;
  page?: number;
  size?: number;
};
export type Create6ApiResponse = /** status 200 OK */ SimpleParticipantView;
export type Create6ApiArg = {
  participantRequest: ParticipantRequest;
};
export type List8ApiResponse = /** status 200 OK */ PaginatedSimpleQuestionView;
export type List8ApiArg = {
  keyword?: string;
  topic?: string;
  tag?: string;
  year?: number;
  subjectId?: string;
  paperId?: string;
  examGroupId?: string;
  examId?: string;
  difficulty?: "EASY" | "MEDIUM" | "HARD" | "RANDOM";
  page?: number;
  size?: number;
};
export type Create7ApiResponse = /** status 200 OK */ QuestionView;
export type Create7ApiArg = {
  questionRequest: QuestionRequest;
};
export type BulkUploadQuestionsData1ApiResponse =
  /** status 200 OK */ QuestionView[];
export type BulkUploadQuestionsData1ApiArg = {
  paperId: string;
  difficulty?: "EASY" | "MEDIUM" | "HARD" | "RANDOM";
  body: {
    file: Blob;
  };
};
export type TrackPublicProfileClickApiResponse = /** status 200 OK */ object;
export type TrackPublicProfileClickApiArg = {
  username: string;
  profileShareEventRequest: ProfileShareEventRequest;
};
export type TrackProfileShareEventApiResponse =
  /** status 200 OK */ ProfileShareEventResponse;
export type TrackProfileShareEventApiArg = {
  profileShareEventRequest: ProfileShareEventRequest;
};
export type List10ApiResponse =
  /** status 200 OK */ PaginatedStudentPracticeSimpleView;
export type List10ApiArg = {
  keyword?: string;
  subjectId?: string;
  paperId?: string;
  date?: string;
  completed?: boolean;
  page?: number;
  size?: number;
};
export type StartApiResponse = /** status 200 OK */ StudentPracticeView;
export type StartApiArg = {
  studentPracticeRequest: StudentPracticeRequest;
};
export type SubmitResultApiResponse =
  /** status 200 OK */ StudentPracticeResultView;
export type SubmitResultApiArg = {
  id: string;
  studentPracticeResultRequest: StudentPracticeResultRequest;
};
export type List11ApiResponse =
  /** status 200 OK */ PaginatedStudentPaperSimpleView;
export type List11ApiArg = {
  keyword?: string;
  examGroupId?: string;
  paperId?: string;
  subjectId?: string;
  completed?: boolean;
  date?: string;
  page?: number;
  size?: number;
};
export type EnrollApiResponse = /** status 200 OK */ StudentPaperView;
export type EnrollApiArg = {
  studentPaperRequest: StudentPaperRequest;
};
export type SubmitApiResponse = /** status 200 OK */ StudentResultView;
export type SubmitApiArg = {
  id: string;
  submitPaperRequest: SubmitPaperRequest;
};
export type SaveProgressApiResponse = /** status 200 OK */ object;
export type SaveProgressApiArg = {
  id: string;
  studentAnswerProgressRequest: StudentAnswerProgressRequest;
};
export type List12ApiResponse = /** status 200 OK */ BookmarkView[];
export type List12ApiArg = {
  id: string;
};
export type AddApiResponse = /** status 200 OK */ BookmarkView;
export type AddApiArg = {
  id: string;
  bookmarkRequest: BookmarkRequest;
};
export type Delete7ApiResponse = unknown;
export type Delete7ApiArg = {
  id: string;
  questionId?: string;
};
export type GetAnswersApiResponse = /** status 200 OK */ {
  [key: string]: object;
};
export type GetAnswersApiArg = {
  id: string;
  questionIds?: string[];
};
export type AnswerApiResponse = /** status 200 OK */ StudentAnswerView;
export type AnswerApiArg = {
  id: string;
  studentAnswerRequest: StudentAnswerRequest;
};
export type TrackTimerApiResponse = /** status 200 OK */ TrackTimerSimpleView;
export type TrackTimerApiArg = {
  tracktimerRequest: TracktimerRequest;
};
export type RefreshTokenApiResponse = /** status 200 OK */ RefreshTokenResponse;
export type RefreshTokenApiArg = {
  refreshTokenRequest: RefreshTokenRequest;
};
export type PasswordResetApiResponse = /** status 200 OK */ LoginResponse;
export type PasswordResetApiArg = {
  passwordReset: PasswordReset;
};
export type PasswordResetRequestApiResponse = /** status 200 OK */ object;
export type PasswordResetRequestApiArg = {
  passwordResetRequest: PasswordResetRequest;
};
export type LoginApiResponse = /** status 200 OK */ LoginResponse;
export type LoginApiArg = {
  loginRequest: LoginRequest;
};
export type List13ApiResponse = /** status 200 OK */ PlanView[];
export type List13ApiArg = void;
export type Create8ApiResponse = /** status 200 OK */ PlanView;
export type Create8ApiArg = {
  planRequest: PlanRequest;
};
export type WebhookApiResponse = unknown;
export type WebhookApiArg = {
  "X-Forwarded-For"?: string;
  "x-paystack-signature": string;
  body: object;
};
export type List14ApiResponse = /** status 200 OK */ PaginatedSimplePaperView;
export type List14ApiArg = {
  keyword?: string;
  name?: string;
  examId?: string;
  examGroupId?: string;
  year?: number;
  subjectId?: string;
  isActive?: boolean;
  curriculum?: "NUC" | "NBTE" | "NCCE" | "OTHERS";
  page?: number;
  size?: number;
};
export type Create9ApiResponse = /** status 200 OK */ PaperView;
export type Create9ApiArg = {
  paperRequest: PaperRequest;
};
export type GenerateCourseFromPaperApiResponse =
  /** status 200 OK */ CourseGenerationRequestView;
export type GenerateCourseFromPaperApiArg = {
  paperId: string;
};
export type GenerateCoursesFromPapersApiResponse =
  /** status 200 OK */ CourseGenerationRequestView[];
export type GenerateCoursesFromPapersApiArg = {
  body: string[];
};
export type RatePaperApiResponse = /** status 200 OK */ PaperRatingView;
export type RatePaperApiArg = {
  paperRatingRequest: PaperRatingRequest;
};
export type MarkTourApiResponse = /** status 200 OK */ OnboardingTourResponse;
export type MarkTourApiArg = {
  markTourRequest: MarkTourRequest;
};
export type ListMultimediaFilesApiResponse =
  /** status 200 OK */ PaginatedMultimediaFileView;
export type ListMultimediaFilesApiArg = {
  name?: string;
  folderId?: string;
  page?: number;
  size?: number;
};
export type PutImageApiResponse = /** status 200 OK */ MultimediaFileView;
export type PutImageApiArg = {
  name?: string;
  folderId?: string;
  isPublic?: boolean;
  body: {
    file: Blob;
  };
};
export type CopyApiResponse = unknown;
export type CopyApiArg = {
  request: MigrationRequest;
};
export type List18ApiResponse = /** status 200 OK */ PaginatedKeypointView;
export type List18ApiArg = {
  keyword?: string;
  paperId?: string;
  studentId: string;
  page?: number;
  size?: number;
};
export type Create10ApiResponse = /** status 200 OK */ KeypointView;
export type Create10ApiArg = {
  paperId: string;
  body: {
    file?: Blob;
  };
};
export type CreateKeypointV3ApiResponse = /** status 200 OK */ KeypointView;
export type CreateKeypointV3ApiArg = {
  curriculum?: "NUC" | "NBTE" | "NCCE" | "OTHERS";
  paperId?: string;
  body: {
    file?: Blob;
  };
};
export type InferKnowledgeApiResponse = /** status 200 OK */ KeypointView;
export type InferKnowledgeApiArg = {
  paperId: string;
  body: {
    file?: Blob;
  };
};
export type InferKnowledgeWithStreamingApiResponse =
  /** status 200 OK */ ResponseBodyEmitter;
export type InferKnowledgeWithStreamingApiArg = {
  paperId: string;
};
export type Create11ApiResponse = /** status 200 OK */ InstitutionView;
export type Create11ApiArg = {
  institutionRequest: InstitutionRequest;
};
export type ListImagesApiResponse = /** status 200 OK */ PaginatedImageView;
export type ListImagesApiArg = {
  name?: string;
  folderId?: string;
  page?: number;
  size?: number;
};
export type PutImage1ApiResponse = /** status 200 OK */ ImageView;
export type PutImage1ApiArg = {
  name?: string;
  folderId?: string;
  isPublic?: boolean;
  body: {
    file: Blob;
  };
};
export type Get9ApiResponse = /** status 200 OK */ FolderView[];
export type Get9ApiArg = void;
export type Create12ApiResponse = /** status 200 OK */ FolderView;
export type Create12ApiArg = {
  folderRequest: FolderRequest;
};
export type Delete11ApiResponse = /** status 200 OK */ object;
export type Delete11ApiArg = {
  id: string;
};
export type List19ApiResponse = /** status 200 OK */ PaginatedFlashcardView;
export type List19ApiArg = {
  keyword?: string;
  paperId?: string;
  studentId: string;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  page?: number;
  size?: number;
};
export type Create13ApiResponse = /** status 200 OK */ FlashcardView;
export type Create13ApiArg = {
  difficulty: "EASY" | "MEDIUM" | "HARD";
  paperId: string;
  body: {
    file?: Blob;
  };
};
export type GenerateFlashcardsV3ApiResponse =
  /** status 200 OK */ FlashcardView;
export type GenerateFlashcardsV3ApiArg = {
  difficulty: "EASY" | "MEDIUM" | "HARD";
  curriculum?: "NUC" | "NBTE" | "NCCE" | "OTHERS";
  paperId?: string;
  body: {
    file?: Blob;
  };
};
export type InferKnowledge1ApiResponse = /** status 200 OK */ FlashcardView;
export type InferKnowledge1ApiArg = {
  difficulty: "EASY" | "MEDIUM" | "HARD";
  paperId: string;
  body: {
    file?: Blob;
  };
};
export type InferKnowledgeWithStreaming1ApiResponse =
  /** status 200 OK */ ResponseBodyEmitter;
export type InferKnowledgeWithStreaming1ApiArg = {
  difficulty: "EASY" | "MEDIUM" | "HARD";
  paperId: string;
  cardsCount: number;
};
export type RecordUsageApiResponse = /** status 200 OK */ FlashcardUsageView;
export type RecordUsageApiArg = {
  flashcardUsageRequest: FlashcardUsageRequest;
};
export type StartSessionApiResponse = /** status 200 OK */ FlashcardSessionView;
export type StartSessionApiArg = {
  flashcardSessionRequest: FlashcardSessionRequest;
};
export type ListFlagQuestionApiResponse =
  /** status 200 OK */ PaginatedFlagQuestionSimpleView;
export type ListFlagQuestionApiArg = {
  keyword?: string;
  issueType?: "QUESTION" | "ANSWER" | "DUPLICATE" | "OTHER";
  resolved?: boolean;
  questionId?: string;
  page?: number;
  size?: number;
};
export type ReportQuestionApiResponse = /** status 200 OK */ FlagQuestionView;
export type ReportQuestionApiArg = {
  flagQuestionRequest: FlagQuestionRequest;
};
export type ResolveQuestionApiResponse = /** status 200 OK */ FlagQuestionView;
export type ResolveQuestionApiArg = {
  id: string;
  resolveFlagQuestionRequest: ResolveFlagQuestionRequest;
};
export type List20ApiResponse = /** status 200 OK */ PaginatedFacultyView;
export type List20ApiArg = {
  name?: string;
  keyword?: string;
  page?: number;
  size?: number;
};
export type Create14ApiResponse = /** status 200 OK */ FacultyView;
export type Create14ApiArg = {
  facultyRequest: FacultyRequest;
};
export type List21ApiResponse = /** status 200 OK */ PaginatedExamView;
export type List21ApiArg = {
  name?: string;
  year?: number;
  examGroupId?: string;
  isActive?: boolean;
  page?: number;
  size?: number;
};
export type Create15ApiResponse = /** status 200 OK */ ExamView;
export type Create15ApiArg = {
  examRequest: ExamRequest;
};
export type List22ApiResponse =
  /** status 200 OK */ PaginatedSimpleExamGroupView;
export type List22ApiArg = {
  name?: string;
  isActive?: boolean;
  page?: number;
  size?: number;
};
export type Create16ApiResponse = /** status 200 OK */ ExamGroup;
export type Create16ApiArg = {
  name: string;
  description?: string;
  isActive?: boolean;
  body: {
    image: Blob;
  };
};
export type GetEvaluationApiResponse = /** status 200 OK */ boolean;
export type GetEvaluationApiArg = {
  evaluationRequest: EvaluationRequest;
};
export type List23ApiResponse =
  /** status 200 OK */ PaginatedSimpleEnrolledLessonItemView;
export type List23ApiArg = {
  keyword?: string;
  enrolledCourseId?: string;
  sortField?: "ID" | "ITEM_TITLE" | "ITEM_NUMBER" | "START_DATE";
  status?: "IN_PROGRESS" | "COMPLETED";
  sortOrder?: "ASC" | "DESC";
  page?: number;
  size?: number;
};
export type Create17ApiResponse = /** status 200 OK */ EnrolledLessonItemView;
export type Create17ApiArg = {
  enrolledLessonItemCreateRequest: EnrolledLessonItemCreateRequest;
};
export type List24ApiResponse =
  /** status 200 OK */ PaginatedSimpleEnrolledCourseView;
export type List24ApiArg = {
  keyword?: string;
  courseId?: string;
  sortField?: "ID" | "COURSE_TITLE" | "CREATED_AT";
  status?: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  sortOrder?: "ASC" | "DESC";
  page?: number;
  size?: number;
};
export type Create18ApiResponse = /** status 200 OK */ EnrolledCourseView;
export type Create18ApiArg = {
  enrolledCourseRequest: EnrolledCourseRequest;
};
export type UploadDocumentApiResponse =
  /** status 200 OK */ DocumentUploadResponse;
export type UploadDocumentApiArg = {
  /** Custom name for the document */
  name?: string;
  /** Folder ID to store the document in */
  folderId?: string;
  /** Whether the document should be publicly accessible */
  isPublic?: boolean;
  body: {
    /** Document file to upload */
    file: Blob;
  };
};
export type SubscribeApiResponse = /** status 200 OK */ object;
export type SubscribeApiArg = {
  subscriptionRequest: SubscriptionRequest;
};
export type RegisterApiResponse = /** status 200 OK */ UserInfo;
export type RegisterApiArg = {
  phoneRegisterRequest: PhoneRegisterRequest;
};
export type Login1ApiResponse = /** status 200 OK */ LoginResponse;
export type Login1ApiArg = {
  phoneLoginRequest: PhoneLoginRequest;
};
export type ResendVerificationApiResponse = /** status 200 OK */ object;
export type ResendVerificationApiArg = {
  distinctionResendVerification: DistinctionResendVerification;
};
export type ConfirmApiResponse = /** status 200 OK */ object;
export type ConfirmApiArg = {
  distinctionUserConfirmRequest: DistinctionUserConfirmRequest;
};
export type TokenLoginApiResponse = /** status 200 OK */ LoginResponse;
export type TokenLoginApiArg = {
  distinctionTokenLoginRequest: DistinctionTokenLoginRequest;
};
export type Register1ApiResponse =
  /** status 200 OK */ DistinctionRegistrationResponse;
export type Register1ApiArg = {
  dinstinctionRegistrationRequest: DinstinctionRegistrationRequest;
};
export type RegisterUploadedStudentApiResponse =
  /** status 200 OK */ DistinctionUploadedUserRegistrationResponse;
export type RegisterUploadedStudentApiArg = {
  distinctionUploadedUserRegistrationRequest: DistinctionUploadedUserRegistrationRequest;
};
export type RefreshToken1ApiResponse =
  /** status 200 OK */ RefreshTokenResponse;
export type RefreshToken1ApiArg = {
  refreshTokenRequest: RefreshTokenRequest;
};
export type PasswordReset1ApiResponse = /** status 200 OK */ LoginResponse;
export type PasswordReset1ApiArg = {
  distinctionPasswordReset: DistinctionPasswordReset;
};
export type PasswordResetRequest1ApiResponse = /** status 200 OK */ object;
export type PasswordResetRequest1ApiArg = {
  distinctionPasswordResetRequest: DistinctionPasswordResetRequest;
};
export type Login2ApiResponse = /** status 200 OK */ LoginResponse;
export type Login2ApiArg = {
  distinctionLoginRequest: DistinctionLoginRequest;
};
export type List31ApiResponse = /** status 200 OK */ PaginatedDepartmentView;
export type List31ApiArg = {
  name?: string;
  keyword?: string;
  page?: number;
  size?: number;
};
export type Create19ApiResponse = /** status 200 OK */ DepartmentView;
export type Create19ApiArg = {
  departmentRequest: DepartmentRequest;
};
export type List32ApiResponse =
  /** status 200 OK */ PaginatedSimpleCustomQuestionView;
export type List32ApiArg = {
  keyword?: string;
  topic?: string;
  tag?: string;
  year?: number;
  subjectId?: string;
  paperId?: string;
  examGroupId?: string;
  examId?: string;
  userId?: string;
  status?: "APPROVED" | "DECLINED" | "PENDING";
  page?: number;
  size?: number;
};
export type Create20ApiResponse = /** status 200 OK */ CustomQuestionView;
export type Create20ApiArg = {
  customQuestionRequest: CustomQuestionRequest;
};
export type UpdateCustomQuestionStatusApiResponse =
  /** status 200 OK */ CustomQuestionView;
export type UpdateCustomQuestionStatusApiArg = {
  customQuestionStatusRequest: CustomQuestionStatusRequest;
};
export type BulkUploadQuestionsData2ApiResponse = /** status 200 OK */ string;
export type BulkUploadQuestionsData2ApiArg = {
  paperId: string;
  body: {
    file: Blob;
  };
};
export type List33ApiResponse = /** status 200 OK */ PaginatedSimpleCourseView;
export type List33ApiArg = {
  keyword?: string;
  subjectId?: string;
  units?: number;
  sortField?:
    | "ID"
    | "TITLE"
    | "DATE_CREATED"
    | "CURRICULUM"
    | "COURSE_CODE"
    | "SUBJECT";
  sortOrder?: "ASC" | "DESC";
  aiStatus?: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
  offset?: number;
  size?: number;
};
export type GenerateApiResponse =
  /** status 200 OK */ CourseGenerationRequestView;
export type GenerateApiArg = {
  courseCreateRequest: CourseCreateRequest;
};
export type ManualRetryApiResponse = unknown;
export type ManualRetryApiArg = {
  id: string;
};
export type ResetRetryCountApiResponse = unknown;
export type ResetRetryCountApiArg = {
  id: string;
};
export type GetMessagesApiResponse = /** status 200 OK */ CustomMessageDto[];
export type GetMessagesApiArg = {
  threadId: string;
  limit?: number;
  order?: string;
};
export type ChatMessageApiResponse = /** status 200 OK */ CustomMessageDto;
export type ChatMessageApiArg = {
  threadId: string;
  chatBotNewMessageRequest: ChatBotNewMessageRequest;
};
export type NewChatApiResponse = /** status 200 OK */ CustomMessageDto;
export type NewChatApiArg = {
  chatBotNewMessageRequest: ChatBotNewMessageRequest;
};
export type RefreshToken2ApiResponse =
  /** status 200 OK */ RefreshTokenResponse;
export type RefreshToken2ApiArg = {
  refreshTokenRequest: RefreshTokenRequest;
};
export type PasswordReset2ApiResponse = /** status 200 OK */ LoginResponse;
export type PasswordReset2ApiArg = {
  passwordReset: PasswordReset;
};
export type PasswordResetRequest2ApiResponse = /** status 200 OK */ object;
export type PasswordResetRequest2ApiArg = {
  passwordResetRequest: PasswordResetRequest;
};
export type Login3ApiResponse = /** status 200 OK */ LoginResponse;
export type Login3ApiArg = {
  loginRequest: LoginRequest;
};
export type ChatMessage1ApiResponse = /** status 200 OK */ string;
export type ChatMessage1ApiArg = {
  threadId: string;
  chatRequest: ChatRequest;
};
export type ChatStreamMessageApiResponse =
  /** status 200 OK */ ResponseBodyEmitter;
export type ChatStreamMessageApiArg = {
  threadId: string;
  chatRequest: ChatRequest;
};
export type NewThreadApiResponse = /** status 200 OK */ ThreadDto;
export type NewThreadApiArg = {
  newThreadRequest: NewThreadRequest;
};
export type CategorizeQuestionsApiResponse =
  /** status 200 OK */ QuestionCategorizationResponse;
export type CategorizeQuestionsApiArg = {
  body: QuestionData[];
};
export type CategorizeQuestionApiResponse = /** status 200 OK */
  | "EASY"
  | "MEDIUM"
  | "HARD"
  | "RANDOM";
export type CategorizeQuestionApiArg = {
  questionId: string;
};
export type CategorizeAndPersistQuestionApiResponse = /** status 200 OK */
  | "EASY"
  | "MEDIUM"
  | "HARD"
  | "RANDOM";
export type CategorizeAndPersistQuestionApiArg = {
  questionId: string;
};
export type CategorizeQuestionsByPaperApiResponse = /** status 200 OK */ {
  [key: string]: "EASY" | "MEDIUM" | "HARD" | "RANDOM";
};
export type CategorizeQuestionsByPaperApiArg = {
  paperId: string;
};
export type CategorizeAndPersistQuestionsByPaperApiResponse =
  /** status 200 OK */ {
    [key: string]: "EASY" | "MEDIUM" | "HARD" | "RANDOM";
  };
export type CategorizeAndPersistQuestionsByPaperApiArg = {
  paperId: string;
};
export type CategorizeQuestionsByIdsApiResponse = /** status 200 OK */ {
  [key: string]: "EASY" | "MEDIUM" | "HARD" | "RANDOM";
};
export type CategorizeQuestionsByIdsApiArg = {
  body: string[];
};
export type CategorizeAndPersistQuestionsByIdsApiResponse =
  /** status 200 OK */ {
    [key: string]: "EASY" | "MEDIUM" | "HARD" | "RANDOM";
  };
export type CategorizeAndPersistQuestionsByIdsApiArg = {
  body: string[];
};
export type StopBulkCategorizationApiResponse =
  /** status 200 OK */ BulkCategorizationResponse;
export type StopBulkCategorizationApiArg = {
  /** Institution ID to stop processing for */
  institutionId: string;
};
export type StartBulkCategorizationApiResponse =
  /** status 200 OK */ BulkCategorizationResponse;
export type StartBulkCategorizationApiArg = {
  /** Institution ID to process questions for */
  institutionId: string;
};
export type List35ApiResponse = /** status 200 OK */ SimpleApiTokenView[];
export type List35ApiArg = void;
export type Create21ApiResponse = /** status 200 OK */ ApiTokenView;
export type Create21ApiArg = {
  apiTokenRequest: ApiTokenRequest;
};
export type BatchStreamingApiResponse =
  /** status 200 OK */ ResponseBodyEmitter;
export type BatchStreamingApiArg = {
  query?: string;
  paperId: string;
  optionsCount: number;
  questionsCount: number;
  questionType:
    | "SINGLE_CHOICE"
    | "MULTIPLE_CHOICE"
    | "SHORT_TEXT"
    | "LONG_TEXT";
  body: {
    contentFile?: Blob;
  };
};
export type InferKnowledge2ApiResponse = /** status 200 OK */ QuestionRequest[];
export type InferKnowledge2ApiArg = {
  query?: string;
  paperId: string;
  optionsCount: number;
  questionsCount: number;
  questionType:
    | "SINGLE_CHOICE"
    | "MULTIPLE_CHOICE"
    | "SHORT_TEXT"
    | "LONG_TEXT";
  body: {
    contentFile?: Blob;
  };
};
export type InferKnowledgeStreamingApiResponse =
  /** status 200 OK */ ResponseBodyEmitter;
export type InferKnowledgeStreamingApiArg = {
  query: string;
  paperName: string;
  optionsCount: number;
  questionsCount: number;
  questionType:
    | "SINGLE_CHOICE"
    | "MULTIPLE_CHOICE"
    | "SHORT_TEXT"
    | "LONG_TEXT";
};
export type SaveApiResponse = /** status 200 OK */ object;
export type SaveApiArg = {
  paperId: string;
  body: QuestionRequest[];
};
export type GenerateQuestions2ApiResponse =
  /** status 200 OK */ QuestionRequest[];
export type GenerateQuestions2ApiArg = {
  paperId: string;
  questionCount?: number;
  "question-type":
    | "SINGLE_CHOICE"
    | "MULTIPLE_CHOICE"
    | "SHORT_TEXT"
    | "LONG_TEXT";
  optionCount?: number;
  body: {
    curriculumFile?: Blob;
    contentFile?: Blob;
  };
};
export type Create22ApiResponse = /** status 200 OK */ object;
export type Create22ApiArg = {
  paperName: string;
  paperId: string;
  body: {
    file: Blob[];
  };
};
export type ResendVerification1ApiResponse = /** status 200 OK */ object;
export type ResendVerification1ApiArg = {
  distinctionResendVerification: DistinctionResendVerification;
};
export type Confirm1ApiResponse = /** status 200 OK */ object;
export type Confirm1ApiArg = {
  distinctionUserConfirmRequest: DistinctionUserConfirmRequest;
};
export type Register2ApiResponse = /** status 200 OK */ RegisterStaffDto;
export type Register2ApiArg = {
  staffRegistrationRequest: StaffRegistrationRequest;
};
export type PasswordReset3ApiResponse = /** status 200 OK */ LoginResponse;
export type PasswordReset3ApiArg = {
  distinctionPasswordReset: DistinctionPasswordReset;
};
export type PasswordResetRequest3ApiResponse = /** status 200 OK */ object;
export type PasswordResetRequest3ApiArg = {
  distinctionPasswordResetRequest: DistinctionPasswordResetRequest;
};
export type Login4ApiResponse = /** status 200 OK */ StaffLoginResponse;
export type Login4ApiArg = {
  staffLoginRequest: StaffLoginRequest;
};
export type VerifyProfileNinApiResponse = /** status 200 OK */ VerifyNinDto;
export type VerifyProfileNinApiArg = void;
export type CreateReferralApiResponse = /** status 200 OK */ ReferralDto;
export type CreateReferralApiArg = {
  referredEmail: string;
};
export type Get5ApiResponse = /** status 200 OK */ LessonView;
export type Get5ApiArg = {
  id: string;
};
export type Update17ApiResponse = /** status 200 OK */ LessonView;
export type Update17ApiArg = {
  id: string;
  lessonUpdateRequest: LessonUpdateRequest;
};
export type Get6ApiResponse = /** status 200 OK */ LessonItemView;
export type Get6ApiArg = {
  id: string;
};
export type Update18ApiResponse = /** status 200 OK */ LessonItemView;
export type Update18ApiArg = {
  id: string;
  lessonItemUpdateRequest: LessonItemUpdateRequest;
};
export type Get7ApiResponse = /** status 200 OK */ LessonGroupView;
export type Get7ApiArg = {
  id: string;
};
export type Update19ApiResponse = /** status 200 OK */ LessonGroupView;
export type Update19ApiArg = {
  id: string;
  lessonGroupUpdateRequest: LessonGroupUpdateRequest;
};
export type Retrieve5ApiResponse = /** status 200 OK */ InstitutionView;
export type Retrieve5ApiArg = {
  id: string;
};
export type UpateApiResponse = /** status 200 OK */ InstitutionView;
export type UpateApiArg = {
  id: string;
  institutionUpdateRequest: InstitutionUpdateRequest;
};
export type Retrieve6ApiResponse = /** status 200 OK */ FacultyView;
export type Retrieve6ApiArg = {
  id: string;
};
export type Delete13ApiResponse = unknown;
export type Delete13ApiArg = {
  id: string;
};
export type Update20ApiResponse = /** status 200 OK */ FacultyView;
export type Update20ApiArg = {
  id: string;
  facultyUpdateRequest: FacultyUpdateRequest;
};
export type Get12ApiResponse = /** status 200 OK */ EnrolledLessonItemView;
export type Get12ApiArg = {
  id: string;
};
export type Delete16ApiResponse = unknown;
export type Delete16ApiArg = {
  id: string;
};
export type Update21ApiResponse = /** status 200 OK */ EnrolledLessonItemView;
export type Update21ApiArg = {
  id: string;
  enrolledLessonItemUpdateRequest: EnrolledLessonItemUpdateRequest;
};
export type Retrieve7ApiResponse = /** status 200 OK */ DepartmentView;
export type Retrieve7ApiArg = {
  id: string;
};
export type Delete18ApiResponse = unknown;
export type Delete18ApiArg = {
  id: string;
};
export type Update22ApiResponse = /** status 200 OK */ DepartmentView;
export type Update22ApiArg = {
  id: string;
  departmentUpdateRequest: DepartmentUpdateRequest;
};
export type Get15ApiResponse = /** status 200 OK */ CourseView;
export type Get15ApiArg = {
  id: string;
};
export type Delete20ApiResponse = unknown;
export type Delete20ApiArg = {
  id: string;
};
export type Update23ApiResponse = /** status 200 OK */ CourseView;
export type Update23ApiArg = {
  id: string;
  courseUpdateRequest: CourseUpdateRequest;
};
export type UpdateAiStatusApiResponse = unknown;
export type UpdateAiStatusApiArg = {
  id: string;
  aiStatus: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
  aiError?: string;
};
export type RegenerateApiResponse =
  /** status 200 OK */ CourseGenerationRequestView;
export type RegenerateApiArg = {
  id: string;
};
export type UpdateProgressApiResponse = unknown;
export type UpdateProgressApiArg = {
  id: string;
  percentage: number;
  stage: string;
  message: string;
};
export type UpdateAiStatus1ApiResponse = unknown;
export type UpdateAiStatus1ApiArg = {
  id: string;
  aiStatus: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED" | "RETRYING";
  aiError?: string;
};
export type Get17ApiResponse = /** status 200 OK */ ApiTokenView;
export type Get17ApiArg = {
  id: string;
};
export type Delete22ApiResponse = unknown;
export type Delete22ApiArg = {
  id: string;
};
export type Update24ApiResponse = unknown;
export type Update24ApiArg = {
  id: string;
  apiTokenUpdateRequest: ApiTokenUpdateRequest;
};
export type Get18ApiResponse = /** status 200 OK */ StaffView;
export type Get18ApiArg = {
  id: string;
};
export type Update25ApiResponse = /** status 200 OK */ StaffView;
export type Update25ApiArg = {
  id: string;
  staffUpdateRequest: StaffUpdateRequest;
};
export type UnblockStudentApiResponse = /** status 200 OK */ string;
export type UnblockStudentApiArg = {
  studentId: string;
};
export type BlockStudentApiResponse = /** status 200 OK */ string;
export type BlockStudentApiArg = {
  studentId: string;
};
export type GetCurrentUserStreakStatusApiResponse =
  /** status 200 OK */ UserStreakStatusDto;
export type GetCurrentUserStreakStatusApiArg = void;
export type GetUserStreakHistoryApiResponse =
  /** status 200 OK */ StreakHistoryDto[];
export type GetUserStreakHistoryApiArg = void;
export type GetRecentStreakHistoryApiResponse =
  /** status 200 OK */ StreakHistoryDto[];
export type GetRecentStreakHistoryApiArg = {
  /** Number of days to look back */
  days?: number;
};
export type GetStreakHistoryInRangeApiResponse =
  /** status 200 OK */ StreakHistoryDto[];
export type GetStreakHistoryInRangeApiArg = {
  /** Start date (YYYY-MM-DD) */
  startDate: string;
  /** End date (YYYY-MM-DD) */
  endDate: string;
};
export type GetUserAchievementsApiResponse =
  /** status 200 OK */ StreakHistoryDto[];
export type GetUserAchievementsApiArg = void;
export type HasActivityForDateApiResponse = /** status 200 OK */ boolean;
export type HasActivityForDateApiArg = {
  /** Date to check (YYYY-MM-DD) */
  date: string;
};
export type GetTotalQuestionsApiResponse =
  /** status 200 OK */ QuestionStatisticsResponse;
export type GetTotalQuestionsApiArg = {
  examGroupId?: string;
  examId?: string;
  paperId?: string;
};
export type GetSchoolStatisticsApiResponse =
  /** status 200 OK */ StatisticsView;
export type GetSchoolStatisticsApiArg = {
  schoolId: string;
};
export type GetUploadedStudentsApiResponse =
  /** status 200 OK */ PaginatedUploadedStudentView;
export type GetUploadedStudentsApiArg = {
  schoolId: string;
  sort?: string;
  keyword?: string;
  page?: number;
  size?: number;
};
export type GetCashRewardsByStudentIdApiResponse =
  /** status 200 OK */ CashRewardDto[];
export type GetCashRewardsByStudentIdApiArg = {
  studentId: string;
};
export type GetAirtimeRewardsByStudentIdApiResponse =
  /** status 200 OK */ AirtimeRewardDto[];
export type GetAirtimeRewardsByStudentIdApiArg = {
  studentId: string;
};
export type GetAllCashRewardsApiResponse =
  /** status 200 OK */ PaginatedCashRewardView;
export type GetAllCashRewardsApiArg = {
  keyword?: string;
  page?: number;
  size?: number;
};
export type GetAllAirtimeRewardsApiResponse =
  /** status 200 OK */ PaginatedAirtimeRewardView;
export type GetAllAirtimeRewardsApiArg = {
  keyword?: string;
  page?: number;
  size?: number;
};
export type GetAllAirtimeRequestsApiResponse =
  /** status 200 OK */ PaginatedAirtimeRequestView;
export type GetAllAirtimeRequestsApiArg = {
  keyword?: string;
  statusFilter?: string;
  page?: number;
  size?: number;
};
export type GetRateLimitStatusApiResponse = /** status 200 OK */ RateLimit;
export type GetRateLimitStatusApiArg = {
  clientIp: string;
};
export type AllowRequestApiResponse = /** status 200 OK */ boolean;
export type AllowRequestApiArg = {
  clientIp: string;
  email: string;
};
export type GetSchoolRankingApiResponse = /** status 200 OK */ SchoolRankingDto;
export type GetSchoolRankingApiArg = {
  schoolId: string;
  userId?: string;
  page?: number;
  limit?: number;
};
export type GetGlobalRankingApiResponse = /** status 200 OK */ GlobalRankingDto;
export type GetGlobalRankingApiArg = {
  userId?: string;
  page?: number;
  limit?: number;
};
export type GetTotalTimeElapsedApiResponse =
  /** status 200 OK */ ParticipantTimeElapsedView;
export type GetTotalTimeElapsedApiArg = {
  studentId: string;
  quizathonId: string;
};
export type GetStudentQUizathonHistoryApiResponse =
  /** status 200 OK */ PaginatedQuizathonHistroyView;
export type GetStudentQUizathonHistoryApiArg = {
  studentId: string;
  keyword?: string;
  page?: number;
  size?: number;
};
export type GetCertificateApiResponse = /** status 200 OK */ CertificateDto;
export type GetCertificateApiArg = {
  participantId: string;
};
export type VerifyCertificateApiResponse = /** status 200 OK */ CertificateDto;
export type VerifyCertificateApiArg = {
  participantId: string;
};
export type List6ApiResponse =
  /** status 200 OK */ PaginatedQuizathonWaitlistView;
export type List6ApiArg = {
  studentId?: string;
  quizathonId: string;
  keyword?: string;
  page?: number;
  size?: number;
};
export type GetParticipantStatsApiResponse =
  /** status 200 OK */ ParticipantResultStatsView;
export type GetParticipantStatsApiArg = {
  studentId: string;
  quizathonId: string;
};
export type GetLeaderboardApiResponse =
  /** status 200 OK */ PaginatedScoreLeaderboardView;
export type GetLeaderboardApiArg = {
  studentId?: string;
  quizathonId: string;
  schoolId?: string;
  keyword?: string;
  page?: number;
  size?: number;
};
export type UniversityLeaderboardApiResponse =
  /** status 200 OK */ PaginatedSchoolLeaderboardView;
export type UniversityLeaderboardApiArg = {
  quizathonId: string;
  keyword?: string;
  page?: number;
  size?: number;
};
export type GetGeniusScoreLeaderboardApiResponse =
  /** status 200 OK */ PaginatedGeniusScoreRankingView;
export type GetGeniusScoreLeaderboardApiArg = {
  quizathonId: string;
  page?: number;
  size?: number;
  studentId?: string;
};
export type GetLeaderboardRankingsApiResponse =
  /** status 200 OK */ PaginatedAccuracyRankingView;
export type GetLeaderboardRankingsApiArg = {
  quizathonId: string;
  page?: number;
  size?: number;
  studentId?: string;
};
export type GetLeaderboard1ApiResponse =
  /** status 200 OK */ PaginatedDailyLeaderBoardView;
export type GetLeaderboard1ApiArg = {
  studentId?: string;
  quizathonId: string;
  date?: string;
  page?: number;
  size?: number;
};
export type GetActiveQuizathonApiResponse =
  /** status 200 OK */ SimpleQuizathonView[];
export type GetActiveQuizathonApiArg = void;
export type GetQuestionCountByYearApiResponse = /** status 200 OK */ {
  [key: string]: number;
};
export type GetQuestionCountByYearApiArg = {
  year?: number;
};
export type GetMyProfileVisitCountApiResponse =
  /** status 200 OK */ ProfileVisitCountResponse;
export type GetMyProfileVisitCountApiArg = void;
export type GetTopicsApiResponse = /** status 200 OK */ string[];
export type GetTopicsApiArg = {
  examGroupId: string;
  subjectId: string;
  years?: number[];
};
export type GetSubjectsApiResponse = /** status 200 OK */ SimpleSubjectView[];
export type GetSubjectsApiArg = {
  examGroupId?: string;
};
export type List9ApiResponse = /** status 200 OK */ PaginatedStudentResultView;
export type List9ApiArg = {
  keyword?: string;
  paperId?: string;
  examGroupId?: string;
  examId?: string;
  page?: number;
  size?: number;
};
export type Retrieve1ApiResponse = /** status 200 OK */ StudentResultView;
export type Retrieve1ApiArg = {
  id: string;
};
export type Retrieve2ApiResponse = /** status 200 OK */ StudentPracticeView;
export type Retrieve2ApiArg = {
  id: string;
};
export type GetTotalCorrectAnswersApiResponse = /** status 200 OK */ number;
export type GetTotalCorrectAnswersApiArg = {
  studentPaperId: string;
};
export type GetStudentAnswerSolutionsApiResponse =
  /** status 200 OK */ PaginatedStudentPaperSolutionWithAnswersView;
export type GetStudentAnswerSolutionsApiArg = {
  studentPaperId: string;
  page?: number;
  size?: number;
};
export type GetRecommendedPapersApiResponse =
  /** status 200 OK */ SimplePaperView[];
export type GetRecommendedPapersApiArg = {
  studentId: string;
  examGroupId?: string;
  subjectId?: string;
};
export type Retrieve3ApiResponse = /** status 200 OK */ StudentPaperView;
export type Retrieve3ApiArg = {
  id: string;
};
export type RetrieveTrackTimerApiResponse = /** status 200 OK */ TrackTimerView;
export type RetrieveTrackTimerApiArg = {
  id: string;
};
export type SolutionsApiResponse =
  /** status 200 OK */ PaginatedStudentPaperSolutionView;
export type SolutionsApiArg = {
  id: string;
  page?: number;
  size?: number;
};
export type RetrieveResultApiResponse = /** status 200 OK */ StudentResultView;
export type RetrieveResultApiArg = {
  id: string;
};
export type QuestionsApiResponse = /** status 200 OK */ PaginatedObject;
export type QuestionsApiArg = {
  id: string;
  page?: number;
  size?: number;
};
export type ListPracticesByPaperIdApiResponse =
  /** status 200 OK */ PaginatedStudentPaperSimpleView;
export type ListPracticesByPaperIdApiArg = {
  paperId: string;
  page?: number;
  size?: number;
};
export type GroupPracticesByCourseApiResponse =
  /** status 200 OK */ PracticeHistoryGroupView[];
export type GroupPracticesByCourseApiArg = {
  keyword?: string;
  examGroupId?: string;
  subjectId?: string;
  paperId?: string;
  page?: number;
  size?: number;
};
export type StudentQuizathonPapersApiResponse =
  /** status 200 OK */ PaginatedStudentPaperSimpleView;
export type StudentQuizathonPapersApiArg = {
  quizathonId: string;
  page?: number;
  size?: number;
};
export type TimeApiResponse = /** status 200 OK */ TimeStatisticsResponse;
export type TimeApiArg = {
  examGroupId?: string;
  date?: string;
  paperId?: string;
  subjectId?: string;
};
export type ScoreTotalApiResponse =
  /** status 200 OK */ ScoreTotalStatisticsResponse;
export type ScoreTotalApiArg = {
  examGroupId?: string;
  date?: string;
  paperId?: string;
  subjectId?: string;
};
export type ScoreBreakdownApiResponse =
  /** status 200 OK */ ScoreStatisticsResponse;
export type ScoreBreakdownApiArg = {
  examGroupId?: string;
  subjectId?: string;
};
export type GetQuestionCountByYear1ApiResponse = /** status 200 OK */ {
  [key: string]: number;
};
export type GetQuestionCountByYear1ApiArg = {
  year?: number;
};
export type GetPapersApiResponse =
  /** status 200 OK */ PaginatedSimplePaperView;
export type GetPapersApiArg = {
  keyword?: string;
  name?: string;
  examId?: string;
  examGroupId?: string;
  year?: number;
  subjectId?: string;
  curriculum?: "NUC" | "NBTE" | "NCCE" | "OTHERS";
  page?: number;
  size?: number;
};
export type GetExamsApiResponse = /** status 200 OK */ PaginatedExamView;
export type GetExamsApiArg = {
  name?: string;
  year?: number;
  examGroupId?: string;
  page?: number;
  size?: number;
};
export type GetExamGroupsApiResponse =
  /** status 200 OK */ PaginatedSimpleExamGroupView;
export type GetExamGroupsApiArg = {
  name?: string;
  page?: number;
  size?: number;
};
export type GetTotalPointsApiResponse = /** status 200 OK */ TotalPointsDto;
export type GetTotalPointsApiArg = {
  userId: string;
};
export type GetAllPointTypesApiResponse = /** status 200 OK */ PointTypeView[];
export type GetAllPointTypesApiArg = void;
export type GetOnboardingToursApiResponse =
  /** status 200 OK */ OnboardingTourResponse;
export type GetOnboardingToursApiArg = void;
export type GetMultimediaFileApiResponse = /** status 200 OK */ object;
export type GetMultimediaFileApiArg = {
  id: string;
};
export type DeleteMultimediaFileApiResponse = /** status 200 OK */ object;
export type DeleteMultimediaFileApiArg = {
  id: string;
};
export type GetMonthlyPracticeApiResponse =
  /** status 200 OK */ MonthlyPracticeDto;
export type GetMonthlyPracticeApiArg = {
  userId: string;
  year?: number;
};
export type List15ApiResponse = /** status 200 OK */ PaginatedLessonView;
export type List15ApiArg = {
  keyword?: string;
  lessonGroupId?: string;
  sortField?: "ID" | "LESSON_NUMBER" | "TITLE";
  sortOrder?: "ASC" | "DESC";
  offset?: number;
  size?: number;
};
export type CountApiResponse = /** status 200 OK */ number;
export type CountApiArg = {
  keyword?: string;
  lessonGroupId?: string;
};
export type List16ApiResponse = /** status 200 OK */ PaginatedLessonItemView;
export type List16ApiArg = {
  keyword?: string;
  lessonId?: string;
  lessonGroupId?: string;
  courseId?: string;
  type?: "VIDEO" | "ARTICLE" | "QUIZ" | "EXERCISE" | "FLASHCARD" | "UNKNOWN";
  sortField?: "ID" | "ITEM_NUMBER" | "TITLE";
  sortOrder?: "ASC" | "DESC";
  offset?: number;
  size?: number;
};
export type Count1ApiResponse = /** status 200 OK */ number;
export type Count1ApiArg = {
  keyword?: string;
  lessonId?: string;
  lessonGroupId?: string;
  courseId?: string;
  type?: "VIDEO" | "ARTICLE" | "QUIZ" | "EXERCISE" | "FLASHCARD" | "UNKNOWN";
};
export type List17ApiResponse = /** status 200 OK */ PaginatedLessonGroupView;
export type List17ApiArg = {
  courseId?: string;
  keyword?: string;
  groupNumber?: number;
  sortField?: "ID" | "NAME" | "GROUP_NUMBER";
  sortOrder?: "ASC" | "DESC";
  offset?: number;
  size?: number;
};
export type Count2ApiResponse = /** status 200 OK */ number;
export type Count2ApiArg = {
  courseId?: string;
  keyword?: string;
  groupNumber?: number;
};
export type Get8ApiResponse = /** status 200 OK */ KeypointView;
export type Get8ApiArg = {
  id: string;
};
export type Delete10ApiResponse = /** status 200 OK */ object;
export type Delete10ApiArg = {
  id: string;
};
export type KeyPointPapersApiResponse =
  /** status 200 OK */ KeypointSummaryView[];
export type KeyPointPapersApiArg = {
  keyword?: string;
  paperId?: string;
  studentId: string;
};
export type GetImageApiResponse = /** status 200 OK */ object;
export type GetImageApiArg = {
  id: string;
};
export type DeleteImageApiResponse = /** status 200 OK */ object;
export type DeleteImageApiArg = {
  id: string;
};
export type Get10ApiResponse = /** status 200 OK */ FolderView;
export type Get10ApiArg = {
  id: string;
};
export type Get11ApiResponse = /** status 200 OK */ FlashcardView;
export type Get11ApiArg = {
  id: string;
};
export type Delete12ApiResponse = /** status 200 OK */ object;
export type Delete12ApiArg = {
  id: string;
};
export type GetUsageByStudentApiResponse =
  /** status 200 OK */ FlashcardUsageView[];
export type GetUsageByStudentApiArg = {
  studentId: string;
};
export type CountActionsByStudentApiResponse = /** status 200 OK */ number;
export type CountActionsByStudentApiArg = {
  studentId: string;
  actionType: "TAP_TO_FLIP" | "SKIP" | "COMPLETE";
};
export type GetSessionByIdApiResponse =
  /** status 200 OK */ FlashcardSessionView;
export type GetSessionByIdApiArg = {
  sessionId: string;
};
export type GetSessionStatusApiResponse = /** status 200 OK */ string;
export type GetSessionStatusApiArg = {
  sessionId: string;
};
export type GetSessionsByStudentApiResponse =
  /** status 200 OK */ FlashcardSessionView[];
export type GetSessionsByStudentApiArg = {
  studentId: string;
};
export type GetSessionStatisticsApiResponse =
  /** status 200 OK */ FlashcardUsageStatisticsView;
export type GetSessionStatisticsApiArg = {
  studentId: string;
};
export type GetActiveSessionApiResponse =
  /** status 200 OK */ FlashcardSessionView;
export type GetActiveSessionApiArg = {
  studentId: string;
  flashcardId: string;
};
export type GetWeeklySummaryApiResponse = /** status 200 OK */ WeeklySummary;
export type GetWeeklySummaryApiArg = {
  studentId: string;
  weekStart?: string;
};
export type GetStudyTrendsApiResponse = /** status 200 OK */ DailyTrend[];
export type GetStudyTrendsApiArg = {
  studentId: string;
  days?: number;
};
export type GetStudyStreakApiResponse = /** status 200 OK */ StudyStreak;
export type GetStudyStreakApiArg = {
  studentId: string;
};
export type GetSessionHistoryApiResponse =
  /** status 200 OK */ FlashcardSessionView[];
export type GetSessionHistoryApiArg = {
  studentId: string;
  page?: number;
  size?: number;
};
export type GetDashboardOverviewApiResponse =
  /** status 200 OK */ FlashcardDashboardView;
export type GetDashboardOverviewApiArg = {
  studentId: string;
};
export type GetSessionOutcomesApiResponse =
  /** status 200 OK */ SessionOutcomes;
export type GetSessionOutcomesApiArg = {
  studentId: string;
};
export type GetAchievementsApiResponse = /** status 200 OK */ Achievement[];
export type GetAchievementsApiArg = {
  studentId: string;
};
export type GetTopPerformingStudentsApiResponse =
  /** status 200 OK */ StudentAnalytics[];
export type GetTopPerformingStudentsApiArg = {
  /** Number of students to return */
  limit?: number;
};
export type GetAtRiskStudentsApiResponse =
  /** status 200 OK */ StudentAnalytics[];
export type GetAtRiskStudentsApiArg = {
  /** Number of students to return */
  limit?: number;
};
export type GetRealTimeMetricsApiResponse =
  /** status 200 OK */ RealTimeMetrics;
export type GetRealTimeMetricsApiArg = void;
export type GetPerformanceMetricsApiResponse =
  /** status 200 OK */ PerformanceMetrics;
export type GetPerformanceMetricsApiArg = void;
export type GetSystemOverviewApiResponse = /** status 200 OK */ SystemOverview;
export type GetSystemOverviewApiArg = void;
export type GetInstitutionAnalyticsApiResponse =
  /** status 200 OK */ InstitutionAnalytics[];
export type GetInstitutionAnalyticsApiArg = void;
export type GetInstitutionAnalytics1ApiResponse =
  /** status 200 OK */ InstitutionAnalytics;
export type GetInstitutionAnalytics1ApiArg = {
  /** Institution ID */
  institutionId: string;
};
export type GetContentPerformanceAnalyticsApiResponse =
  /** status 200 OK */ ContentAnalytics[];
export type GetContentPerformanceAnalyticsApiArg = void;
export type GetComprehensiveDashboardApiResponse =
  /** status 200 OK */ FlashcardAdminDashboardView;
export type GetComprehensiveDashboardApiArg = void;
export type GetUsagePatternsApiResponse = /** status 200 OK */ UsagePatterns;
export type GetUsagePatternsApiArg = void;
export type GetTrendAnalysisApiResponse = /** status 200 OK */ TrendAnalysis;
export type GetTrendAnalysisApiArg = {
  /** Start date for analysis */
  startDate?: string;
  /** End date for analysis */
  endDate?: string;
};
export type GetSystemAlertsApiResponse = /** status 200 OK */ Alert[];
export type GetSystemAlertsApiArg = void;
export type GetFlaggedQuestionApiResponse =
  /** status 200 OK */ FlagQuestionView;
export type GetFlaggedQuestionApiArg = {
  id: string;
};
export type GetTrendingFlagsStatsApiResponse =
  /** status 200 OK */ TrendingFlagsView[];
export type GetTrendingFlagsStatsApiArg = {
  period: string;
};
export type GetFlaggedQuestionStatsApiResponse =
  /** status 200 OK */ FlaggedQuestionStatsView;
export type GetFlaggedQuestionStatsApiArg = void;
export type SuggestionApiResponse = /** status 200 OK */ SimpleQuestionView;
export type SuggestionApiArg = {
  flaggedQuestionId: string;
};
export type ListMineApiResponse =
  /** status 200 OK */ PaginatedSimpleEnrolledCourseView;
export type ListMineApiArg = {
  keyword?: string;
  courseId?: string;
  sortField?: "ID" | "COURSE_TITLE" | "CREATED_AT";
  status?: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  sortOrder?: "ASC" | "DESC";
  page?: number;
  size?: number;
};
export type TrackEmailOpenApiResponse = /** status 200 OK */ string[];
export type TrackEmailOpenApiArg = {
  messageId: string;
};
export type TrackEmailClickApiResponse = unknown;
export type TrackEmailClickApiArg = {
  messageId: string;
  url: string;
};
export type GetTopCampaignsApiResponse = /** status 200 OK */ TopCampaignData[];
export type GetTopCampaignsApiArg = {
  limit?: number;
};
export type GetUserEmailStatsApiResponse =
  /** status 200 OK */ EmailTrackingStats;
export type GetUserEmailStatsApiArg = {
  userEmail: string;
};
export type GetDashboardDataApiResponse =
  /** status 200 OK */ EmailDashboardData;
export type GetDashboardDataApiArg = {
  startDate?: string;
  endDate?: string;
  emailType?: string;
};
export type GetDocumentApiResponse = /** status 200 OK */ Document;
export type GetDocumentApiArg = {
  /** Document ID */
  documentId: string;
};
export type DeleteDocumentApiResponse = unknown;
export type DeleteDocumentApiArg = {
  /** Document ID */
  documentId: string;
};
export type GetUploadResultApiResponse =
  /** status 200 OK */ DocumentUploadResponse;
export type GetUploadResultApiArg = {
  /** Upload ID to get result for */
  uploadId: string;
};
export type GetUploadProgressApiResponse =
  /** status 200 OK */ DocumentUploadProgress;
export type GetUploadProgressApiArg = {
  /** Upload ID to check progress for */
  uploadId: string;
};
export type GetExams1ApiResponse = /** status 200 OK */ object;
export type GetExams1ApiArg = void;
export type List25ApiResponse =
  /** status 200 OK */ PaginatedTransactionSimpleView;
export type List25ApiArg = {
  from?: string;
  to?: string;
  username?: string;
  status?: "PENDING" | "SUCCESS" | "FAILED";
  studentId?: string;
  page?: number;
  size?: number;
};
export type VerifyApiResponse = /** status 200 OK */ TransactionSimpleView;
export type VerifyApiArg = {
  transactionId?: string;
  referenceId?: string;
  platform?: "TELCO" | "PAYSTACK" | "STRIPE" | "MTN_NIGERIA";
};
export type List26ApiResponse = /** status 200 OK */ {
  [key: string]: number;
};
export type List26ApiArg = {
  from?: string;
  to?: string;
  username?: string;
  studentId?: string;
};
export type List27ApiResponse =
  /** status 200 OK */ PaginatedTransactionSimpleView;
export type List27ApiArg = {
  from?: string;
  to?: string;
  status?: "PENDING" | "SUCCESS" | "FAILED";
  page?: number;
  size?: number;
};
export type Verify1ApiResponse = /** status 200 OK */ TransactionSimpleView;
export type Verify1ApiArg = {
  transactionId?: string;
  referenceId?: string;
  platform?: "TELCO" | "PAYSTACK" | "STRIPE" | "MTN_NIGERIA";
};
export type List28ApiResponse =
  /** status 200 OK */ PaginatedSubscriptionHistoryView;
export type List28ApiArg = {
  page?: number;
  size?: number;
};
export type StatusApiResponse = /** status 200 OK */ SubscriptionView;
export type StatusApiArg = void;
export type GetPlanLimitApiResponse = /** status 200 OK */ {
  [key: string]: string;
};
export type GetPlanLimitApiArg = {
  property:
    | "FLASHCARD"
    | "KEYPOINTS"
    | "PRACTICE_QUESTIONS"
    | "MONTHLY_QUIZATON"
    | "LEADERBOARD"
    | "QUIZATON_CERTIFICATE"
    | "STUDY_PAL";
};
export type GetSubscriptionApiResponse = /** status 200 OK */ SubscriptionView;
export type GetSubscriptionApiArg = void;
export type List29ApiResponse =
  /** status 200 OK */ PaginatedSubscriptionPackageView;
export type List29ApiArg = {
  institutionId: string;
  page?: number;
  size?: number;
};
export type List30ApiResponse = /** status 200 OK */ PlanView[];
export type List30ApiArg = {
  institutionId: string;
};
export type GetStudentReferralCodeApiResponse =
  /** status 200 OK */ UploadedStudentView;
export type GetStudentReferralCodeApiArg = {
  matriculationNumber: string;
};
export type ValidateStudentEmailApiResponse = /** status 200 OK */ {
  [key: string]: boolean;
};
export type ValidateStudentEmailApiArg = {
  email: string;
};
export type GoogleLoginApiResponse = /** status 200 OK */ string;
export type GoogleLoginApiArg = {
  platform:
    | "DISTINCTION_NG"
    | "DISTINCTION_APP"
    | "SCHOOLS_DISTINCTION_APP"
    | "DISTINCTION_ADMIN";
  callbackUrl: string;
};
export type GetSubmissionsApiResponse = /** status 200 OK */ SubmissionsView[];
export type GetSubmissionsApiArg = void;
export type GetStatisticsApiResponse =
  /** status 200 OK */ SubmissionStatisticsResponse;
export type GetStatisticsApiArg = {
  paperId?: string;
  userId?: string;
};
export type ListMine1ApiResponse =
  /** status 200 OK */ PaginatedSimpleCourseView;
export type ListMine1ApiArg = {
  keyword?: string;
  subjectId?: string;
  units?: number;
  sortField?:
    | "ID"
    | "TITLE"
    | "DATE_CREATED"
    | "CURRICULUM"
    | "COURSE_CODE"
    | "SUBJECT";
  sortOrder?: "ASC" | "DESC";
  aiStatus?: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
  offset?: number;
  size?: number;
};
export type CountMineApiResponse = /** status 200 OK */ number;
export type CountMineApiArg = {
  keyword?: string;
  subjectId?: string;
  units?: number;
  aiStatus?: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
};
export type Count3ApiResponse = /** status 200 OK */ number;
export type Count3ApiArg = {
  keyword?: string;
  subjectId?: string;
  units?: number;
  aiStatus?: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
};
export type GetByAiStatusApiResponse = /** status 200 OK */ CourseView[];
export type GetByAiStatusApiArg = {
  aiStatus: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
};
export type Get16ApiResponse = /** status 200 OK */ CourseGenerationRequestView;
export type Get16ApiArg = {
  id: string;
};
export type GetRequestsNeedingRetryApiResponse =
  /** status 200 OK */ CourseGenerationRequestView[];
export type GetRequestsNeedingRetryApiArg = void;
export type GetByProgressStageApiResponse =
  /** status 200 OK */ CourseGenerationRequestView[];
export type GetByProgressStageApiArg = {
  stage: string;
};
export type GetByProgressPercentageApiResponse =
  /** status 200 OK */ CourseGenerationRequestView[];
export type GetByProgressPercentageApiArg = {
  minPercentage: number;
  maxPercentage: number;
};
export type GetByAiStatus1ApiResponse =
  /** status 200 OK */ CourseGenerationRequestView[];
export type GetByAiStatus1ApiArg = {
  aiStatus: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED" | "RETRYING";
};
export type GetByAiJobIdApiResponse =
  /** status 200 OK */ CourseGenerationRequestView;
export type GetByAiJobIdApiArg = {
  aiJobId: string;
};
export type GetWelcomeMessageApiResponse =
  /** status 200 OK */ WelcomeMessageDto;
export type GetWelcomeMessageApiArg = {
  paperId: string;
};
export type GetChatBotAssistantApiResponse =
  /** status 200 OK */ ChatBotAssistantView;
export type GetChatBotAssistantApiArg = void;
export type GetBadgesApiResponse = /** status 200 OK */ BadgesDto;
export type GetBadgesApiArg = void;
export type List34ApiResponse = /** status 200 OK */ string[];
export type List34ApiArg = {
  key: string;
  term?: string;
  filter?: string;
  limit?: number;
};
export type GetWelcomeMessage1ApiResponse =
  /** status 200 OK */ WelcomeMessageDto;
export type GetWelcomeMessage1ApiArg = {
  paperName: string;
};
export type GetThreadsApiResponse = /** status 200 OK */ Thread[];
export type GetThreadsApiArg = void;
export type GetThreadApiResponse = /** status 200 OK */ Thread;
export type GetThreadApiArg = {
  threadId: string;
};
export type DeleteThread1ApiResponse = /** status 200 OK */ object;
export type DeleteThread1ApiArg = {
  threadId: string;
};
export type GetMessages1ApiResponse = /** status 200 OK */ Session[];
export type GetMessages1ApiArg = {
  threadId: string;
  limit?: number;
  order?: boolean;
};
export type GetChatBotAssistant1ApiResponse = /** status 200 OK */ Assistant;
export type GetChatBotAssistant1ApiArg = void;
export type ExportCourseAsScormApiResponse = /** status 200 OK */ string[];
export type ExportCourseAsScormApiArg = {
  courseId: string;
};
export type HealthCheckApiResponse = /** status 200 OK */ string;
export type HealthCheckApiArg = void;
export type GetStatusApiResponse =
  /** status 200 OK */ BulkCategorizationStatusResponse;
export type GetStatusApiArg = {
  /** Institution ID to check status for */
  institutionId: string;
};
export type GetProgressApiResponse =
  /** status 200 OK */ BulkCategorizationProgress;
export type GetProgressApiArg = {
  /** Institution ID to check progress for */
  institutionId: string;
};
export type List36ApiResponse = /** status 200 OK */ PaginatedStaffView;
export type List36ApiArg = {
  search?: string;
  schoolId?: string;
  role?: "ADMIN" | "SUPER_ADMIN";
  offset?: number;
  size?: number;
};
export type ListUsersApiResponse = /** status 200 OK */ PaginatedAdminUserView;
export type ListUsersApiArg = {
  keyword?: string;
  schoolId?: string;
  schoolType?: "FEDERAL" | "STATE" | "PRIVATE";
  page?: number;
  size?: number;
};
export type GetUserByIdApiResponse = /** status 200 OK */ AdminUserView;
export type GetUserByIdApiArg = {
  studentId: string;
};
export type GetUserProfileApiResponse = /** status 200 OK */ UserProfileDto;
export type GetUserProfileApiArg = {
  studentId: string;
};
export type StatisticsReferralApiResponse =
  /** status 200 OK */ ReferralStatisticsView;
export type StatisticsReferralApiArg = {
  studentId: string;
};
export type GetStudentReferralCode1ApiResponse = /** status 200 OK */ object;
export type GetStudentReferralCode1ApiArg = {
  studentId: string;
};
export type GetReferralsApiResponse =
  /** status 200 OK */ PaginatedReferralView;
export type GetReferralsApiArg = {
  studentId: string;
  keyword?: string;
  page?: number;
  size?: number;
};
export type GetPublicUserProfileApiResponse =
  /** status 200 OK */ PublicUserProfileDto;
export type GetPublicUserProfileApiArg = {
  username: string;
};
export type FilterReferralsApiResponse =
  /** status 200 OK */ PaginatedReferralAdminView;
export type FilterReferralsApiArg = {
  sort?: string;
  keyword?: string;
  page?: number;
  size?: number;
};
export type AdminReferralApiResponse =
  /** status 200 OK */ ReferralAdminStatisticsView;
export type AdminReferralApiArg = void;
export type DeleteDuplicatesApiResponse = /** status 200 OK */ object;
export type DeleteDuplicatesApiArg = void;
export type RemoveDuplicatesApiResponse = /** status 200 OK */ string;
export type RemoveDuplicatesApiArg = {
  questionId: string;
};
export type CancelSubscriptionApiResponse = /** status 200 OK */ boolean;
export type CancelSubscriptionApiArg = void;
export type DeleteThreadApiResponse = /** status 200 OK */ object;
export type DeleteThreadApiArg = {
  threadId: string;
};
export type Delete21ApiResponse = /** status 200 OK */ object;
export type Delete21ApiArg = {
  key: string;
  term?: string;
  value?: string;
};
export type TelcoView = {
  id?: string;
  sender?: number;
  platform?: "SMS" | "USSD" | "WAP" | "APP";
  planType?: "TRIAL" | "DAILY" | "WEEKLY" | "MONTHLY" | "QUARTERLY" | "YEARLY";
  network?: "MTN" | "AIRTEL" | "GL0" | "NINE_MOBILE";
  planCode?: number;
  confirmationMessage?: string;
};
export type TelcoRequest = {
  planType: "TRIAL" | "DAILY" | "WEEKLY" | "MONTHLY" | "QUARTERLY" | "YEARLY";
  network: "MTN" | "AIRTEL" | "GL0" | "NINE_MOBILE";
  planCode: number;
  confirmationMessage: string;
};
export type PlanView = {
  id?: string;
  type?: "TRIAL" | "DAILY" | "WEEKLY" | "MONTHLY" | "QUARTERLY" | "YEARLY";
  createdBy?: string;
  platform?: "TELCO" | "PAYSTACK" | "STRIPE" | "MTN_NIGERIA";
  price?: number;
  createdAt?: string;
};
export type SubscriptionPackageAddonView = {
  name?:
    | "FLASHCARD"
    | "KEYPOINTS"
    | "PRACTICE_QUESTIONS"
    | "MONTHLY_QUIZATON"
    | "LEADERBOARD"
    | "QUIZATON_CERTIFICATE"
    | "STUDY_PAL";
  value?: string;
  id?: string;
  duration?: string;
  durationType?: "DAILY" | "MONTHLY";
  plan?: PlanView;
};
export type SubscriptionPackagePlanView = {
  id?: string;
  plan?: PlanView;
  subscriptionCode?: string;
};
export type SubscriptionPackagePropertyView = {
  name?:
    | "FLASHCARD"
    | "KEYPOINTS"
    | "PRACTICE_QUESTIONS"
    | "MONTHLY_QUIZATON"
    | "LEADERBOARD"
    | "QUIZATON_CERTIFICATE"
    | "STUDY_PAL";
  value?: string;
  id?: string;
  duration?: string;
  durationType?: "DAILY" | "MONTHLY";
};
export type SubscriptionPackageView = {
  description?: string;
  name?: string;
  id?: string;
  code?: "BASIC_PLAN" | "STANDARD_PLAN" | "PREMIUM_PLAN";
  institutionId?: string;
  isActive?: boolean;
  addOn?: SubscriptionPackageAddonView[];
  packagePlan?: SubscriptionPackagePlanView[];
  propertyPlan?: SubscriptionPackagePropertyView[];
};
export type PlanRequest = {
  type: "TRIAL" | "DAILY" | "WEEKLY" | "MONTHLY" | "QUARTERLY" | "YEARLY";
  price: number;
  platform: "TELCO" | "PAYSTACK" | "STRIPE" | "MTN_NIGERIA";
};
export type SubscriptionPackagePlanRequest = {
  plan: PlanRequest;
  subscriptionCode: string;
};
export type SubscriptionPackagePropertyRequest = {
  name:
    | "FLASHCARD"
    | "KEYPOINTS"
    | "PRACTICE_QUESTIONS"
    | "MONTHLY_QUIZATON"
    | "LEADERBOARD"
    | "QUIZATON_CERTIFICATE"
    | "STUDY_PAL";
  value: string;
  duration: string;
  durationType: "DAILY" | "MONTHLY";
};
export type SubscriptionPackageRequest = {
  code: "BASIC_PLAN" | "STANDARD_PLAN" | "PREMIUM_PLAN";
  name: string;
  description: string;
  isActive?: boolean;
  packagePlan?: SubscriptionPackagePlanRequest[];
  properties?: SubscriptionPackagePropertyRequest[];
};
export type SubscriptionPackageAddonRequest = {
  subscriptionPackageId: string;
  plan: PlanRequest;
  name:
    | "FLASHCARD"
    | "KEYPOINTS"
    | "PRACTICE_QUESTIONS"
    | "MONTHLY_QUIZATON"
    | "LEADERBOARD"
    | "QUIZATON_CERTIFICATE"
    | "STUDY_PAL";
  value?: string;
  duration: string;
  durationType: "DAILY" | "MONTHLY";
};
export type Subject = {
  id?: string;
  name: string;
  description?: string;
  institutionId: string;
  curriculum: "NUC" | "NBTE" | "NCCE" | "OTHERS";
  createdBy: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
};
export type SubjectRequest = {
  name: string;
  description?: string;
  curriculum?: "NUC" | "NBTE" | "NCCE" | "OTHERS";
};
export type StreakNotificationSettingsDto = {
  completionNotificationEnabled?: boolean;
  missedDayNotificationEnabled?: boolean;
  endOfDayNudgeEnabled?: boolean;
  midStreakBoostEnabled?: boolean;
  monthlyRecapEnabled?: boolean;
  morningMotivationEnabled?: boolean;
  welcomeNotificationEnabled?: boolean;
};
export type MultimediaFileView = {
  contentType?: string;
  name?: string;
  id?: string;
};
export type SectionView = {
  id?: string;
  content?: string;
  title?: string;
  imageUrl?: string;
  multimediaFile?: MultimediaFileView;
};
export type SectionRequest = {
  title: string;
  paperId: string;
  content: string;
  imageUrl?: string;
  multimediaFileId?: string;
};
export type School = {
  id?: string;
  name: string;
  abbr?: string;
  state?: string;
  type?: "FEDERAL" | "STATE" | "PRIVATE";
  logo?: string;
  institutionId: string;
  curriculum?: "NUC" | "NBTE" | "NCCE" | "OTHERS";
  createdBy: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
};
export type SchoolView = {
  name?: string;
  id?: string;
};
export type DepartmentView = {
  name?: string;
  id?: string;
};
export type UploadedStudentView = {
  level?: string;
  id?: string;
  email?: string;
  createdBy?: string;
  institutionId?: string;
  firstName?: string;
  lastName?: string;
  otherName?: string;
  school?: SchoolView;
  matriculationNumber?: string;
  phoneNumber?: string;
  department?: DepartmentView;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
  enrolment?: boolean;
};
export type UploadedStudentDto = {
  email?: string;
  phoneNumber?: string;
  firstName: string;
  lastName?: string;
  otherName?: string;
  level?: string;
  department?: string;
  schoolId?: string;
  matriculationNumber?: string;
};
export type Quizathon = {
  id?: string;
  title: string;
  startAt: string;
  stopAt: string;
  isActive: boolean;
  maxParticipants: number;
  description?: string;
  price?: number;
  bannerUrl?: string;
  registrationMode?: "REGISTRATION" | "WAITLIST" | "CLOSED";
  isOpenForAllUsers?: boolean;
  institutionId: string;
  createdAt?: string;
  updatedAt?: string;
};
export type QuizathonRequest = {
  title?: string;
  startAt?: string;
  stopAt?: string;
  isActive?: boolean;
  maxParticipants?: number;
  description?: string;
  price?: number;
  bannerUrl?: string;
  isOpenForAllUsers?: boolean;
  registrationMode?: "REGISTRATION" | "WAITLIST" | "CLOSED";
};
export type Department = {
  id?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  institutionId: string;
};
export type SchoolInformation = {
  id?: string;
  institutionId: string;
  level?: string;
  studentId?: string;
  userInfo?: UserInfo;
  department?: Department;
  school?: School;
  matriculationNumber?: string;
  createdAt?: string;
  updatedAt?: string;
};
export type UserInfo = {
  studentId?: string;
  email: string;
  phoneNumber: string;
  institutionId: string;
  firstName?: string;
  lastName?: string;
  otherName?: string;
  username?: string;
  gender?: string;
  stateOfOrigin?: string;
  referralCode?: string;
  profileImage?: string;
  nin?: string;
  dateOfBirth?: string;
  schoolInformation?: SchoolInformation[];
  ninVerified?: boolean;
  blocked?: boolean;
};
export type Participant = {
  id?: string;
  userInfo: UserInfo;
  schoolInformation?: SchoolInformation;
  year: number;
  quizathon?: Quizathon;
  institutionId: string;
  createdAt?: string;
  updatedAt?: string;
};
export type ParticipantRequest = {
  schoolId: string;
  facultyId?: string;
  quizathonId: string;
  department?: string;
};
export type AnswerOptionView = {
  id?: string;
  text?: string;
  isCorrect?: boolean;
  imageUrl?: string;
};
export type QuestionView = {
  id?: string;
  type?: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "SHORT_TEXT" | "LONG_TEXT";
  text?: string;
  topic?: string;
  tags?: string[];
  difficulty?: "EASY" | "MEDIUM" | "HARD" | "RANDOM";
  section?: SectionView;
  imageUrl?: string;
  solution?: string;
  answerTexts?: string[];
  answerOptions?: AnswerOptionView[];
  questionNumber?: number;
  point?: number;
  aiCategorized?: boolean;
  aiCategorizationReason?: string;
};
export type AnswerOption = {
  id?: string;
  text: string;
  correct: boolean;
  imageUrl?: string;
};
export type QuestionUpdateRequest = {
  questionNumber?: number;
  type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "SHORT_TEXT" | "LONG_TEXT";
  difficulty: "EASY" | "MEDIUM" | "HARD" | "RANDOM";
  topic: string;
  point?: number;
  paperId: string;
  text: string;
  sectionId?: string;
  tags?: string[];
  imageUrl?: string;
  answerTexts?: string[];
  solution: string;
  answerOptions?: AnswerOption[];
};
export type PlanUpdateRequest = {
  price: number;
};
export type ExamGroupView = {
  name?: string;
  id?: string;
};
export type ExamView = {
  year?: number;
  name?: string;
  id?: string;
  examGroup?: ExamGroupView;
};
export type SubjectView = {
  name?: string;
  id?: string;
};
export type PaperView = {
  name?: string;
  id?: string;
  duration?: number;
  isActive?: boolean;
  exam?: ExamView;
  instruction?: string;
  curriculum?: "NUC" | "NBTE" | "NCCE" | "OTHERS";
  curriculumUrl?: string;
  subject?: SubjectView;
  createdAt?: string;
};
export type PaperRequest = {
  name: string;
  duration: number;
  instruction?: string;
  subjectId: string;
  examId: string;
  curriculum?: "NUC" | "NBTE" | "NCCE" | "OTHERS";
  curriculumUrl?: string;
  active?: boolean;
};
export type SimplePaperView = {
  name?: string;
  id?: string;
  isActive?: boolean;
};
export type PointView = {
  id?: string;
  title?: string;
  point?: string;
  createdAt?: string;
  updatedAt?: string;
};
export type KeypointView = {
  id?: string;
  title?: string;
  paper?: SimplePaperView;
  points?: PointView[];
  studentId?: string;
  createdAt?: string;
  updatedAt?: string;
};
export type UpdateKeyPointRequest = {
  newName: string;
};
export type FolderRequest = {
  name: string;
  parentId?: string;
};
export type CardView = {
  id?: string;
  answer?: string;
  question?: string;
  createdAt?: string;
  updatedAt?: string;
};
export type FlashcardView = {
  id?: string;
  title?: string;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  paper?: SimplePaperView;
  studentId?: string;
  createdAt?: string;
  updatedAt?: string;
  cards?: CardView[];
};
export type UpdateFlashcardRequest = {
  newName: string;
};
export type FlashcardSessionView = {
  id?: string;
  flashcardId?: string;
  studentId?: string;
  flashcardTitle?: string;
  flashcardDifficulty?: "EASY" | "MEDIUM" | "HARD";
  sessionStart?: string;
  sessionEnd?: string;
  totalCardsStudied?: number;
  cardsSkipped?: number;
  totalTimeSpentSeconds?: number;
  averageTimePerCardSeconds?: number;
  completionPercentage?: number;
  sessionStatus?: "ACTIVE" | "COMPLETED" | "PAUSED" | "ABANDONED";
  createdAt?: string;
  updatedAt?: string;
};
export type ExamGroup = {
  id?: string;
  name: string;
  description?: string;
  institutionId: string;
  imageUrl?: string;
  createdBy: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  active?: boolean;
};
export type Exam = {
  id?: string;
  name: string;
  description?: string;
  month: number;
  year: number;
  examGroup?: ExamGroup;
  institutionId: string;
  createdBy: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  active?: boolean;
};
export type ExamRequest = {
  name: string;
  description?: string;
  month: number;
  year: number;
  examGroupId: string;
  active?: boolean;
};
export type SimpleUserInfoView = {
  id?: string;
  firstName?: string;
  lastName?: string;
  otherName?: string;
};
export type SimpleCourseView = {
  description?: string;
  units?: number;
  id?: string;
  owner?: SimpleUserInfoView;
  title?: string;
  difficulty?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  curriculum?: "NUC" | "NBTE" | "NCCE" | "OTHERS";
  createdAt?: string;
  bannerUrl?: string;
  courseCode?: string;
  learningObjectives?: string[];
  coverImageUrl?: string;
  certificateUrl?: string;
  courseUrl?: string;
  accessLevel?: "PRIVATE" | "INVITE" | "PUBLIC";
  lessonGroupType?: "HOUR" | "DAY" | "WEEK" | "MONTH" | "TERM" | "SEMESTER";
};
export type EnrolledCourseView = {
  id?: string;
  status?: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  userId?: string;
  createdAt?: string;
  startDate?: string;
  completionDate?: string;
  course?: SimpleCourseView;
};
export type EnrolledCourseRequest = {
  courseId?: string;
  status?: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
};
export type CustomAnswerOptionView = {
  id?: string;
  text?: string;
  isCorrect?: boolean;
  imageUrl?: string;
};
export type CustomQuestionView = {
  id?: string;
  type?: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "SHORT_TEXT" | "LONG_TEXT";
  text?: string;
  topic?: string;
  status?: "APPROVED" | "DECLINED" | "PENDING";
  createdBy?: string;
  customTags?: string[];
  customAnswerTexts?: string[];
  section?: SectionView;
  imageUrl?: string;
  solution?: string;
  answerOptions?: CustomAnswerOptionView[];
};
export type CustomQuestionUpdateRequest = {
  type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "SHORT_TEXT" | "LONG_TEXT";
  topic: string;
  paperId: string;
  text: string;
  sectionId?: string;
  tags?: string[];
  imageUrl?: string;
  answerTexts?: string[];
  solution: string;
  answerOptions?: AnswerOption[];
};
export type UpdateUsernameRequest = {
  username?: string;
};
export type SimpleSchoolView = {
  name?: string;
  id?: string;
  state?: string;
  type?: "FEDERAL" | "STATE" | "PRIVATE";
  createdBy?: string;
  curriculum?: "NUC" | "NBTE" | "NCCE" | "OTHERS";
  logo?: string;
  abbr?: string;
  createdAt?: string;
  updatedAt?: string;
};
export type SchoolInformationView = {
  level?: string;
  id?: string;
  school?: SimpleSchoolView;
  matriculationNumber?: string;
  department?: DepartmentView;
  createdAt?: string;
  updatedAt?: string;
};
export type OnboardingTourResponse = {
  completedTours?: string[];
  skippedTours?: string[];
};
export type UserProfileDto = {
  studentId?: string;
  email?: string;
  phoneNumber?: string;
  institutionId?: string;
  firstName?: string;
  lastName?: string;
  otherName?: string;
  stateOfOrigin?: string;
  profileImage?: string;
  username?: string;
  gender?: string;
  nin?: string;
  isNinVerified?: boolean;
  dateOfBirth?: string;
  schoolInformationView?: SchoolInformationView;
  referralCode?: string;
  onboardingTour?: OnboardingTourResponse;
};
export type UserProfileNinRequest = {
  nin?: string;
};
export type SimpleTelcoView = {
  id?: string;
  planType?: "TRIAL" | "DAILY" | "WEEKLY" | "MONTHLY" | "QUARTERLY" | "YEARLY";
  network?: "MTN" | "AIRTEL" | "GL0" | "NINE_MOBILE";
};
export type PaginatedSimpleTelcoView = {
  count?: number;
  pages?: number;
  items?: SimpleTelcoView[];
};
export type PaginatedSubscriptionPackageView = {
  count?: number;
  pages?: number;
  items?: SubscriptionPackageView[];
};
export type SimpleSubjectView = {
  description?: string;
  name?: string;
  id?: string;
  curriculum?: "NUC" | "NBTE" | "NCCE" | "OTHERS";
};
export type ActivityRequest = {
  activityType?: string;
  correctAnswers?: number;
  totalQuestions?: number;
  timeSpentMinutes?: number;
};
export type SolutionRequest = {
  question: string;
  answers?: string[];
  sectionId?: string;
};
export type SimpleSectionView = {
  id?: string;
  content?: string;
  title?: string;
  imageUrl?: string;
};
export type PaginatedSimpleSectionView = {
  count?: number;
  pages?: number;
  items?: SimpleSectionView[];
};
export type PaginatedSimpleSchoolView = {
  count?: number;
  pages?: number;
  items?: SimpleSchoolView[];
};
export type ResendInviteDto = {
  studentEmail?: string;
  schoolName?: string;
  studentName?: string;
};
export type RetryRewardRequestDto = {
  requestId?: string;
};
export type AirtimeRewardDto = {
  id?: string;
  studentId?: string;
  phoneNumber?: string;
  network?: string;
  requestId?: string;
  amount?: number;
  requestedAt?: string;
  approved?: boolean;
  approvedAt?: string;
  message?: string;
  status?: string;
  balance?: number;
};
export type RewardRequestDto = {
  phoneNumber?: string;
  network?: string;
  amount?: number;
};
export type CashRewardDto = {
  id?: string;
  studentId?: string;
  accountNumber?: string;
  bankName?: string;
  approvedBy?: string;
  amount?: number;
  approved?: boolean;
  approvedAt?: string;
};
export type RewardApprovalDto = {
  accountNumber?: string;
  amount?: number;
  bankName?: string;
};
export type AirtimeStatus = {
  phoneNumber?: string;
  description?: string;
  status?: string;
  requestId?: string;
  discount?: string;
  value?: string;
};
export type UserRegistrationRequest = {
  email?: string;
  fullName?: string;
  phoneNo?: string;
};
export type QuizathonView = {
  description?: string;
  id?: string;
  title?: string;
  institutionId?: string;
  isActive?: boolean;
  price?: number;
  createdAt?: string;
  startAt?: string;
  stopAt?: string;
  registrationMode?: "REGISTRATION" | "WAITLIST" | "CLOSED";
  totalParticipants?: number;
  maxParticipants?: number;
  bannerUrl?: string;
  isOpenForAllUsers?: boolean;
  updatedAt?: string;
  totalSchools?: number;
};
export type PaginatedQuizathonView = {
  count?: number;
  pages?: number;
  items?: QuizathonView[];
};
export type UserInfoView = {
  email?: string;
  institutionId?: string;
  firstName?: string;
  lastName?: string;
  otherName?: string;
  studentId?: string;
  gender?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  referralCode?: string;
  nin?: string;
  stateOfOrigin?: string;
  profileImage?: string;
  isBlocked?: boolean;
  isNinVerified?: boolean;
};
export type SimpleQuizathonView = {
  description?: string;
  id?: string;
  title?: string;
  isActive?: boolean;
  price?: number;
  startAt?: string;
  stopAt?: string;
  registrationMode?: "REGISTRATION" | "WAITLIST" | "CLOSED";
  maxParticipants?: number;
  bannerUrl?: string;
  isOpenForAllUsers?: boolean;
};
export type SimpleParticipantView = {
  id?: string;
  userInfo?: UserInfoView;
  totalQuestions?: number;
  createdAt?: string;
  schoolInformation?: SchoolInformationView;
  quizathon?: SimpleQuizathonView;
  totalScores?: number;
  totalTimeSpent?: number;
  updatedAt?: string;
};
export type PaginatedSimpleParticipantView = {
  count?: number;
  pages?: number;
  items?: SimpleParticipantView[];
};
export type SimpleQuestionView = {
  id?: string;
  type?: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "SHORT_TEXT" | "LONG_TEXT";
  text?: string;
  topic?: string;
  tags?: string[];
  difficulty?: "EASY" | "MEDIUM" | "HARD" | "RANDOM";
  section?: SectionView;
  imageUrl?: string;
  answerOptions?: AnswerOptionView[];
  questionNumber?: number;
  point?: number;
  aiCategorized?: boolean;
  aiCategorizationReason?: string;
};
export type PaginatedSimpleQuestionView = {
  count?: number;
  pages?: number;
  items?: SimpleQuestionView[];
};
export type QuestionRequest = {
  questionNumber?: number;
  type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "SHORT_TEXT" | "LONG_TEXT";
  difficulty: "EASY" | "MEDIUM" | "HARD" | "RANDOM";
  topic: string;
  point?: number;
  paperId: string;
  text: string;
  sectionId?: string;
  tags?: string[];
  imageUrl?: string;
  answerTexts?: string[];
  solution: string;
  answerOptions?: AnswerOption[];
};
export type ProfileShareEventRequest = {
  eventType?: "PROFILE_SHARED" | "PROFILE_CLICKED";
  sharePlatform?:
    | "WHATSAPP"
    | "TELEGRAM"
    | "FACEBOOK"
    | "LINKEDIN"
    | "X"
    | "INSTAGRAM"
    | "COPY_LINK";
  deviceInfo?: string;
};
export type ProfileShareEventResponse = {
  message?: string;
  eventType?: "PROFILE_SHARED" | "PROFILE_CLICKED";
  sharePlatform?:
    | "WHATSAPP"
    | "TELEGRAM"
    | "FACEBOOK"
    | "LINKEDIN"
    | "X"
    | "INSTAGRAM"
    | "COPY_LINK";
};
export type SubjectSimpleView = {
  name?: string;
  id?: string;
};
export type StudentPracticeSimpleView = {
  name?: string;
  id?: string;
  score?: number;
  subject?: SubjectSimpleView;
  createdAt?: string;
  questionCount?: number;
  completed?: boolean;
};
export type PaginatedStudentPracticeSimpleView = {
  count?: number;
  pages?: number;
  items?: StudentPracticeSimpleView[];
};
export type StudentPracticeView = {
  id?: string;
  subject?: SubjectView;
  topics?: string[];
  examYears?: number[];
  questions?: QuestionView[];
};
export type StudentPracticeRequest = {
  groupId: string;
  examYears?: number[];
  topics?: string[];
  subjectId: string;
  questionCount?: number;
  paperId?: string;
};
export type ScoreBreakdown = {
  topic: string;
  questionCount: number;
  score: number;
};
export type StudentPracticeResultView = {
  id?: string;
  score?: number;
  createdAt?: string;
  questionCount?: number;
  scoreBreakdown?: ScoreBreakdown[];
};
export type StudentPracticeResultRequest = {
  score?: number;
  scoreBreakdown?: ScoreBreakdown[];
};
export type StudentResultSimpleView = {
  id?: string;
  score?: number;
  questionCount?: number;
};
export type PaperSimpleView = {
  name?: string;
  id?: string;
  duration?: number;
  subject?: SubjectSimpleView;
};
export type SimpleTrackTimerSimpleView = {
  startTime?: number;
  timeElapsed?: number;
};
export type StudentPaperSimpleView = {
  result?: StudentResultSimpleView;
  id?: string;
  status?: "NOT_STARTED" | "STARTED" | "COMPLETED";
  paper?: PaperSimpleView;
  trackTimer?: SimpleTrackTimerSimpleView;
  createdAt?: string;
  questionCount?: number;
  mode?: "LEARNING_MODE" | "REAL_MODE";
  timeElapsed?: number;
  updatedAt?: string;
};
export type PaginatedStudentPaperSimpleView = {
  count?: number;
  pages?: number;
  items?: StudentPaperSimpleView[];
};
export type StudentPaperView = {
  id?: string;
  status?: "NOT_STARTED" | "STARTED" | "COMPLETED";
  paper?: PaperView;
  mode?: "LEARNING_MODE" | "REAL_MODE";
  timeElapsed?: number;
};
export type StudentPaperRequest = {
  paperId: string;
  size: number;
  mode: "LEARNING_MODE" | "REAL_MODE";
  retakeStudentPaperId?: string;
  captcha?: string;
};
export type StudentResultView = {
  id?: string;
  score?: number;
  paper?: PaperView;
  questionCount?: number;
  scoreBreakdown?: ScoreBreakdown[];
  remark?: string;
};
export type SubmitPaperRequest = {
  timeElapsed: number;
};
export type StudentQuestionAnswerRequest = {
  questionId: string;
  answerOptionIds?: string[];
  answerText?: string;
};
export type StudentAnswerProgressRequest = {
  timeElapsed: number;
  studentQuestionAnswers: StudentQuestionAnswerRequest[];
  done?: boolean;
};
export type BookmarkView = {
  id?: string;
  questionId?: string;
};
export type BookmarkRequest = {
  questionId: string;
};
export type StudentAnswerView = {
  id?: string;
  questionId?: string;
  answerText?: string;
  answerIds?: string[];
  questionType?:
    | "SINGLE_CHOICE"
    | "MULTIPLE_CHOICE"
    | "SHORT_TEXT"
    | "LONG_TEXT";
};
export type StudentAnswerRequest = {
  questionId: string;
  answerOptionIds?: string[];
  answerText?: string;
  timeElapsed: number;
};
export type TrackTimerSimpleView = {
  startTime?: number;
  id?: string;
  timeElapsed?: number;
  studentPaperId?: string;
};
export type TracktimerRequest = {
  timeElapsed: number;
  studentPaperId: string;
};
export type RefreshTokenResponse = {
  accessToken?: string;
};
export type RefreshTokenRequest = {
  refreshToken: string;
};
export type UserPrivilegeResponse = {
  id?: string;
  name?: string;
};
export type UserRoleResponse = {
  adminLevel?: string;
  name?: string;
  privileges?: UserPrivilegeResponse[];
};
export type ContactResponse = {
  contact?: string;
  contactType?: "EMAIL" | "PHONE_NUMBER";
};
export type UserResponse = {
  id?: string;
  firstName?: string;
  lastName?: string;
  otherName?: string;
  createdAt?: string;
  product?: string;
  organisation?: string;
  email?: string;
  roles?: UserRoleResponse[];
  contacts?: ContactResponse[];
  blocked?: boolean;
  verified?: boolean;
};
export type LoginResponse = {
  accessToken?: string;
  refreshToken?: string;
  user?: UserResponse;
  captchaError?: string;
};
export type PasswordReset = {
  institutionId: string;
  userId: string;
  password: string;
  token: string;
};
export type PasswordResetRequest = {
  institutionId: string;
  username: string;
};
export type LoginRequest = {
  institutionId: string;
  username: string;
  password: string;
};
export type PaginatedSimplePaperView = {
  count?: number;
  pages?: number;
  items?: SimplePaperView[];
};
export type CourseGenerationRequestView = {
  id?: string;
  query?: string;
  retryCount?: number;
  difficulty?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  progressPercentage?: number;
  curriculum?: "NUC" | "NBTE" | "NCCE" | "OTHERS";
  aiError?: string;
  createdAt?: string;
  maxRetries?: number;
  lastRetryTime?: string;
  retryDelaySeconds?: number;
  ownerId?: string;
  aiJobId?: string;
  aiStatus?: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED" | "RETRYING";
  courseCode?: string;
  documentUrl?: string;
  progressStage?: string;
  aiModelVersion?: string;
  lastTriedAt?: string;
  progressMessage?: string;
  totalStages?: number;
  currentStage?: number;
  stageStartTime?: string;
  estimatedCompletionTime?: string;
};
export type PaperRatingView = {
  id?: string;
  userId?: string;
  rating?: number;
  createdAt?: string;
  paperName?: string;
};
export type PaperRatingRequest = {
  rating?: number;
  paperId: string;
};
export type MarkTourRequest = {
  tourName: string;
  status: "COMPLETED" | "SKIPPED";
};
export type PaginatedMultimediaFileView = {
  count?: number;
  pages?: number;
  items?: MultimediaFileView[];
};
export type MigrationRequest = {
  srcExamGroupId?: string;
  srcInstitution?: string;
  destInstitution?: string;
};
export type PaginatedKeypointView = {
  count?: number;
  pages?: number;
  items?: KeypointView[];
};
export type ResponseBodyEmitter = {
  timeout?: number;
};
export type InstitutionView = {
  name?: string;
  id?: string;
};
export type UserRequest = {
  firstName: string;
  lastName: string;
  otherName?: string;
  email?: string;
  phone: string;
  password: string;
};
export type InstitutionRequest = {
  id: string;
  name: string;
  user: UserRequest;
};
export type ImageView = {
  imagePath?: string;
  name?: string;
  id?: string;
  updatedAt?: string;
  folderId?: string;
  isPublic?: boolean;
  thumbnailPath?: string;
};
export type PaginatedImageView = {
  count?: number;
  pages?: number;
  items?: ImageView[];
};
export type FolderChildrenView = {
  name?: string;
  id?: string;
  parentId?: string;
};
export type FolderView = {
  children?: FolderChildrenView[];
  name?: string;
  id?: string;
  parentId?: string;
};
export type PaginatedFlashcardView = {
  count?: number;
  pages?: number;
  items?: FlashcardView[];
};
export type Folder = {
  id?: string;
  name: string;
  parent?: Folder;
  children?: Folder[];
  institutionId: string;
  createdBy: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
};
export type MultimediaFile = {
  id?: string;
  name: string;
  filePath: string;
  thumbnailPath?: string;
  folder?: Folder;
  contentType: string;
  size?: number;
  isPublic?: boolean;
  institutionId: string;
  createdBy: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
};
export type Section = {
  id?: string;
  title: string;
  content: string;
  imageUrl?: string;
  paper: Paper;
  multimediaFile?: MultimediaFile;
  institutionId: string;
  createdBy: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
};
export type Question = {
  id?: string;
  questionNumber?: number;
  type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "SHORT_TEXT" | "LONG_TEXT";
  difficulty?: "EASY" | "MEDIUM" | "HARD" | "RANDOM";
  topic?: string;
  point?: number;
  paper: Paper;
  tags?: string[];
  text: string;
  imageUrl?: string;
  section?: Section;
  answerOptions?: AnswerOption[];
  answerTexts?: string[];
  solution?: string;
  institutionId: string;
  createdBy: string;
  updatedBy?: string;
  aiCategorized?: boolean;
  aiCategorizationReason?: string;
  createdAt?: string;
  updatedAt?: string;
  reviewed?: boolean;
};
export type Paper = {
  id?: string;
  name: string;
  duration?: number;
  exam?: Exam;
  subject?: Subject;
  instruction?: string;
  questions?: Question[];
  curriculum: "NUC" | "NBTE" | "NCCE" | "OTHERS";
  curriculumUrl?: string;
  institutionId: string;
  createdBy: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  active?: boolean;
};
export type Flashcard = {
  id?: string;
  title: string;
  paper: Paper;
  cards?: Card[];
  studentId: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  curriculum?: "NUC" | "NBTE" | "NCCE" | "OTHERS";
  institutionId: string;
  createdAt?: string;
  updatedAt?: string;
  custom?: boolean;
};
export type Card = {
  id?: string;
  question: string;
  answer: string;
  flashcard: Flashcard;
  createdAt?: string;
  updatedAt?: string;
};
export type FlashcardUsageView = {
  id?: string;
  studentId?: string;
  card?: Card;
  actionType?: "TAP_TO_FLIP" | "SKIP" | "COMPLETE";
  timeSpentSeconds?: number;
  sessionId?: string;
  notes?: string;
  createdAt?: string;
};
export type FlashcardUsageRequest = {
  studentId: string;
  card?: Card;
  actionType: "TAP_TO_FLIP" | "SKIP" | "COMPLETE";
  timeSpentSeconds?: number;
  sessionId?: string;
  notes?: string;
};
export type FlashcardSessionRequest = {
  studentId: string;
  flashcardId?: string;
};
export type FlagQuestionSimpleView = {
  id?: string;
  topic?: string;
  questionId?: string;
  flagDate?: string;
  resolved?: boolean;
  flagCount?: number;
  duplicateCount?: number;
  paperName?: string;
};
export type PaginatedFlagQuestionSimpleView = {
  count?: number;
  pages?: number;
  items?: FlagQuestionSimpleView[];
};
export type QuestionIssueType = {
  type: "QUESTION" | "ANSWER" | "DUPLICATE" | "OTHER";
};
export type FlagQuestionView = {
  message?: string;
  id?: string;
  createdBy?: string;
  answerIssuePercentage?: number;
  questionIssuePercentage?: number;
  duplicateIssuePercentage?: number;
  resolved?: boolean;
  issues?: QuestionIssueType[];
  question?: QuestionView;
  createdAt?: string;
  flagCount?: number;
  duplicateCount?: number;
};
export type FlagQuestionRequest = {
  questionId: string;
  issueType: ("QUESTION" | "ANSWER" | "DUPLICATE" | "OTHER")[];
  message?: string;
};
export type ResolveFlagQuestionRequest = {
  resolved: boolean;
};
export type FacultyView = {
  name?: string;
  id?: string;
};
export type PaginatedFacultyView = {
  count?: number;
  pages?: number;
  items?: FacultyView[];
};
export type FacultyRequest = {
  name: string;
};
export type PaginatedExamView = {
  count?: number;
  pages?: number;
  items?: ExamView[];
};
export type SimpleExamGroupView = {
  description?: string;
  name?: string;
  id?: string;
  isActive?: boolean;
  imageUrl?: string;
  examCount?: number;
};
export type PaginatedSimpleExamGroupView = {
  count?: number;
  pages?: number;
  items?: SimpleExamGroupView[];
};
export type EvaluationRequest = {
  questionId: string;
  answer: string;
};
export type SimpleEnrolledLessonItemView = {
  id?: string;
  status?: "IN_PROGRESS" | "COMPLETED";
  startDate?: string;
  completionDate?: string;
  lessonItemId?: string;
};
export type PaginatedSimpleEnrolledLessonItemView = {
  count?: number;
  pages?: number;
  items?: SimpleEnrolledLessonItemView[];
};
export type LessonItemTitleView = {
  id?: string;
  type?: "VIDEO" | "ARTICLE" | "QUIZ" | "EXERCISE" | "FLASHCARD" | "UNKNOWN";
  title?: string;
  lessonId?: string;
  studyTimeSecs?: number;
  itemNumber?: number;
};
export type EnrolledLessonItemView = {
  id?: string;
  status?: "IN_PROGRESS" | "COMPLETED";
  userId?: string;
  startDate?: string;
  completionDate?: string;
  lessonItem?: LessonItemTitleView;
};
export type EnrolledLessonItemCreateRequest = {
  lessonItemId: string;
  status: "IN_PROGRESS" | "COMPLETED";
};
export type SimpleEnrolledCourseView = {
  id?: string;
  status?: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  userId?: string;
  createdAt?: string;
  startDate?: string;
  completionDate?: string;
  courseId?: string;
};
export type PaginatedSimpleEnrolledCourseView = {
  count?: number;
  pages?: number;
  items?: SimpleEnrolledCourseView[];
};
export type DocumentUploadResponse = {
  uploadId?: string;
  message?: string;
  status?: string;
  filename?: string;
  fileSize?: number;
  contentType?: string;
};
export type PlanDescription = {
  type: "TRIAL" | "DAILY" | "WEEKLY" | "MONTHLY" | "QUARTERLY" | "YEARLY";
  platform: "TELCO" | "PAYSTACK" | "STRIPE" | "MTN_NIGERIA";
};
export type Phone = {
  phoneNumber: string;
  network: "MTN" | "AIRTEL" | "GL0" | "NINE_MOBILE";
};
export type SubscriptionRequest = {
  planId?: string;
  planDescription?: PlanDescription;
  phone?: Phone;
};
export type PhoneRegisterRequest = {
  platform:
    | "DISTINCTION_NG"
    | "DISTINCTION_APP"
    | "SCHOOLS_DISTINCTION_APP"
    | "DISTINCTION_ADMIN";
  phoneNumber: string;
};
export type PhoneLoginRequest = {
  platform:
    | "DISTINCTION_NG"
    | "DISTINCTION_APP"
    | "SCHOOLS_DISTINCTION_APP"
    | "DISTINCTION_ADMIN";
  phoneNumber: string;
};
export type DistinctionResendVerification = {
  platform:
    | "DISTINCTION_NG"
    | "DISTINCTION_APP"
    | "SCHOOLS_DISTINCTION_APP"
    | "DISTINCTION_ADMIN";
  username: string;
};
export type DistinctionUserConfirmRequest = {
  platform:
    | "DISTINCTION_NG"
    | "DISTINCTION_APP"
    | "SCHOOLS_DISTINCTION_APP"
    | "DISTINCTION_ADMIN";
  userId: string;
  token: string;
};
export type DistinctionTokenLoginRequest = {
  platform:
    | "DISTINCTION_NG"
    | "DISTINCTION_APP"
    | "SCHOOLS_DISTINCTION_APP"
    | "DISTINCTION_ADMIN";
  token: string;
};
export type DistinctionRegistrationResponse = {
  id?: string;
  firstName?: string;
  lastName?: string;
  usedReferral?: string;
  referralError?: string;
  captchaError?: string;
};
export type DinstinctionRegistrationRequest = {
  firstName: string;
  lastName: string;
  otherName?: string;
  platform:
    | "DISTINCTION_NG"
    | "DISTINCTION_APP"
    | "SCHOOLS_DISTINCTION_APP"
    | "DISTINCTION_ADMIN";
  email: string;
  phone: string;
  password: string;
  referralCode?: string;
  captcha?: string;
};
export type DistinctionUploadedUserRegistrationResponse = {
  id?: string;
  firstName?: string;
  lastName?: string;
  usedReferral?: string;
  referralError?: string;
};
export type DistinctionUploadedUserRegistrationRequest = {
  firstName: string;
  lastName: string;
  otherName?: string;
  platform:
    | "DISTINCTION_NG"
    | "DISTINCTION_APP"
    | "SCHOOLS_DISTINCTION_APP"
    | "DISTINCTION_ADMIN";
  email: string;
  phone: string;
  password: string;
  matricNumber: string;
  schoolId?: string;
  department: string;
  referralCode?: string;
};
export type DistinctionPasswordReset = {
  platform:
    | "DISTINCTION_NG"
    | "DISTINCTION_APP"
    | "SCHOOLS_DISTINCTION_APP"
    | "DISTINCTION_ADMIN";
  userId: string;
  token: string;
  password: string;
};
export type DistinctionPasswordResetRequest = {
  platform:
    | "DISTINCTION_NG"
    | "DISTINCTION_APP"
    | "SCHOOLS_DISTINCTION_APP"
    | "DISTINCTION_ADMIN";
  username: string;
};
export type DistinctionLoginRequest = {
  platform:
    | "DISTINCTION_NG"
    | "DISTINCTION_APP"
    | "SCHOOLS_DISTINCTION_APP"
    | "DISTINCTION_ADMIN";
  username: string;
  password: string;
};
export type PaginatedDepartmentView = {
  count?: number;
  pages?: number;
  items?: DepartmentView[];
};
export type DepartmentRequest = {
  name: string;
};
export type SimpleCustomQuestionView = {
  id?: string;
  type?: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "SHORT_TEXT" | "LONG_TEXT";
  text?: string;
  topic?: string;
  status?: "APPROVED" | "DECLINED" | "PENDING";
  customTags?: string[];
  section?: SectionView;
  imageUrl?: string;
  createdAt?: string;
  paperName?: string;
};
export type PaginatedSimpleCustomQuestionView = {
  count?: number;
  pages?: number;
  items?: SimpleCustomQuestionView[];
};
export type CustomQuestionRequest = {
  type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "SHORT_TEXT" | "LONG_TEXT";
  topic: string;
  paperId: string;
  text: string;
  sectionId?: string;
  tags?: string[];
  imageUrl?: string;
  answerTexts?: string[];
  solution: string;
  answerOptions?: AnswerOption[];
};
export type CustomQuestionStatusRequest = {
  questionId: string;
  status: "APPROVED" | "DECLINED" | "PENDING";
};
export type PaginatedSimpleCourseView = {
  count?: number;
  pages?: number;
  items?: SimpleCourseView[];
};
export type CourseCreateRequest = {
  name: string;
  courseCode?: string;
  curriculum?: "NUC" | "NBTE" | "NCCE" | "OTHERS";
  difficulty?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  documentUrl?: string;
};
export type SimpleChatThreadView = {
  id?: string;
  title?: string;
  createdAt?: string;
  updatedAt?: string;
};
export type CustomMessageDto = {
  id?: string;
  role?: string;
  message?: string;
  assistantId?: string;
  threads?: SimpleChatThreadView;
};
export type ChatBotNewMessageRequest = {
  message: string;
  paperId?: string;
};
export type ChatRequest = {
  paperName?: string;
  topics?: string;
  curriculum?: string;
  useCase?:
    | "QUESTION_GENERATION"
    | "FLASHCARD_GENERATION"
    | "KEYPOINT_GENERATION"
    | "WELCOME_MESSAGE"
    | "TITLE_GEN"
    | "CHATBOT_RESPONSE"
    | "QA_SUGGESTION";
  prompt?: string;
  context?: string;
  paperId?: string;
};
export type ThreadDto = {
  id?: string;
  title?: string;
};
export type NewThreadRequest = {
  paperName?: string;
  topics?: string;
  curriculum?: string;
  useCase?:
    | "QUESTION_GENERATION"
    | "FLASHCARD_GENERATION"
    | "KEYPOINT_GENERATION"
    | "WELCOME_MESSAGE"
    | "TITLE_GEN"
    | "CHATBOT_RESPONSE"
    | "QA_SUGGESTION";
  prompt?: string;
  paperId?: string;
};
export type CategorizedQuestion = {
  category?: string;
  question_id?: string;
  reason?: string;
};
export type QuestionCategorizationResponse = {
  categorizedQuestions?: CategorizedQuestion[];
};
export type QuestionData = {
  question_id: string;
  question: string;
  options?: string[];
};
export type BulkCategorizationResponse = {
  message?: string;
  institutionId?: string;
  status?: string;
};
export type SimpleApiTokenView = {
  description?: string;
  name?: string;
  id?: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  isDisabled?: boolean;
};
export type ApiTokenView = {
  description?: string;
  name?: string;
  id?: string;
  token?: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  isDisabled?: boolean;
};
export type ApiTokenRequest = {
  name: string;
  description?: string;
};
export type RegisterStaffDto = {
  getId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  otherName?: string;
  gender?: "M" | "F";
  role?: "ADMIN" | "SUPER_ADMIN";
  school?: School;
  password?: string;
};
export type StaffRegistrationRequest = {
  firstName: string;
  lastName: string;
  otherName?: string;
  schoolId?: string;
  gender: "M" | "F";
  role: "ADMIN" | "SUPER_ADMIN";
  email: string;
  phone: string;
  platform:
    | "DISTINCTION_NG"
    | "DISTINCTION_APP"
    | "SCHOOLS_DISTINCTION_APP"
    | "DISTINCTION_ADMIN";
};
export type StaffView = {
  id?: string;
  email?: string;
  role?: "ADMIN" | "SUPER_ADMIN";
  firstName?: string;
  lastName?: string;
  otherName?: string;
  gender?: "M" | "F";
  school?: School;
  phoneNumber?: string;
};
export type StaffLoginResponse = {
  accessToken?: string;
  refreshToken?: string;
  user?: StaffView;
  hasResetPassword?: boolean;
};
export type StaffLoginRequest = {
  username: string;
  password: string;
  platform:
    | "DISTINCTION_NG"
    | "DISTINCTION_APP"
    | "SCHOOLS_DISTINCTION_APP"
    | "DISTINCTION_ADMIN";
};
export type VerifyNinDto = {
  isSuccessful?: boolean;
  errorMessage?: string;
};
export type ReferralDto = {
  id?: string;
  referrerId?: string;
  referralCode?: string;
  referredEmail?: string;
  referredName?: string;
  referredQuestionsAttempts?: number;
  createdAt?: string;
  usedAt?: string;
  totalClaimed?: number;
  totalUnclaimed?: number;
  totalUsed?: number;
  totalUnused?: number;
  used?: boolean;
  claimed?: boolean;
};
export type SimpleLessonItemView = {
  description?: string;
  id?: string;
  type?: "VIDEO" | "ARTICLE" | "QUIZ" | "EXERCISE" | "FLASHCARD" | "UNKNOWN";
  content?: string;
  title?: string;
  lessonId?: string;
  studyTimeSecs?: number;
  itemNumber?: number;
};
export type LessonView = {
  description?: string;
  id?: string;
  title?: string;
  lessonNumber?: number;
  lessonGroupId?: string;
  lessonItems?: SimpleLessonItemView[];
};
export type LessonUpdateRequest = {
  title?: string;
  description?: string;
};
export type LessonItemView = {
  description?: string;
  id?: string;
  type?: "VIDEO" | "ARTICLE" | "QUIZ" | "EXERCISE" | "FLASHCARD" | "UNKNOWN";
  content?: string;
  title?: string;
  lesson?: LessonView;
  studyTimeSecs?: number;
  itemNumber?: number;
};
export type LessonItemUpdateRequest = {
  title?: string;
  description?: string;
  content?: string;
};
export type LessonGroupView = {
  description?: string;
  name?: string;
  id?: string;
  course?: SimpleCourseView;
  groupNumber?: number;
  estimatedStudyTime?: string;
  lessons?: LessonView[];
};
export type LessonGroupUpdateRequest = {
  name?: string;
  description?: string;
  estimatedStudyTime?: string;
};
export type InstitutionUpdateRequest = {
  name?: string;
};
export type FacultyUpdateRequest = {
  name?: string;
};
export type EnrolledLessonItemUpdateRequest = {
  status: "IN_PROGRESS" | "COMPLETED";
};
export type DepartmentUpdateRequest = {
  name?: string;
};
export type CourseView = {
  description?: string;
  level?: string;
  units?: number;
  id?: string;
  owner?: SimpleUserInfoView;
  title?: string;
  tags?: string[];
  difficulty?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  curriculum?: "NUC" | "NBTE" | "NCCE" | "OTHERS";
  subject?: SimpleSubjectView;
  aiError?: string;
  createdAt?: string;
  bannerUrl?: string;
  aiJobId?: string;
  aiStatus?: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
  courseCode?: string;
  learningObjectives?: string[];
  lessonGroups?: LessonGroupView[];
  aiModelVersion?: string;
  coverImageUrl?: string;
  certificateUrl?: string;
  courseUrl?: string;
  accessLevel?: "PRIVATE" | "INVITE" | "PUBLIC";
  lessonGroupType?: "HOUR" | "DAY" | "WEEK" | "MONTH" | "TERM" | "SEMESTER";
};
export type CourseUpdateRequest = {
  title?: string;
  level?: string;
  subjectId?: string;
  tags?: string[];
  bannerUrl?: string;
  certificateUrl?: string;
  coverImageUrl?: string;
  courseCode?: string;
  description?: string;
  learningObjectives?: string[];
  units?: number;
  courseUrl?: string;
  accessLevel?: "PRIVATE" | "INVITE" | "PUBLIC";
};
export type ApiTokenUpdateRequest = {
  isDisabled?: boolean;
};
export type StaffUpdateRequest = {
  firstName: string;
  lastName: string;
  otherName?: string;
  schoolId?: string;
  gender: "M" | "F";
  role: "ADMIN" | "SUPER_ADMIN";
  email: string;
  phone: string;
  platform:
    | "DISTINCTION_NG"
    | "DISTINCTION_APP"
    | "SCHOOLS_DISTINCTION_APP"
    | "DISTINCTION_ADMIN";
};
export type UserStreakStatusDto = {
  currentStreak?: number;
  longestStreak?: number;
  streakActiveToday?: boolean;
  streakStartDate?: string;
};
export type StreakHistoryDto = {
  id?: string;
  studentId?: string;
  activityDate?: string;
  streakCount?: number;
  correctAnswers?: number;
  totalQuestions?: number;
  accuracyPercentage?: number;
  timeSpentMinutes?: number;
  activityType?: string;
  streakQualified?: boolean;
  streakContinued?: boolean;
  achievementNotes?: string;
  activityCompletedAt?: string;
  createdAt?: string;
};
export type QuestionStatisticsResponse = {
  totalQuestions?: number;
};
export type StatisticsView = {
  school?: School;
  totalStatusTrue?: number;
  totalStatusFalse?: number;
  totalEnrolmentTrue?: number;
  totalEnrolmentFalse?: number;
  totalUploadedStudents?: number;
};
export type PaginatedUploadedStudentView = {
  count?: number;
  pages?: number;
  items?: UploadedStudentView[];
};
export type AdminView = {
  email?: string;
  firstName?: string;
  lastName?: string;
  otherName?: string;
  phoneNumber?: string;
};
export type CashRewardView = {
  id?: string;
  userInfo?: UserInfoView;
  amount?: number;
  approved?: boolean;
  accountNumber?: string;
  admin?: AdminView;
  bankName?: string;
  approvedAt?: string;
};
export type PaginatedCashRewardView = {
  count?: number;
  pages?: number;
  items?: CashRewardView[];
};
export type AirtimeRewardRequestView = {
  message?: string;
  status?: string;
  phoneNumber?: string;
  approvedAmount?: number;
  network?: string;
  requestedAt?: string;
  requestedAmount?: number;
};
export type AirtimeRewardView = {
  id?: string;
  userInfo?: UserInfoView;
  status?: string;
  phoneNumber?: string;
  airtimeRewardRequest?: AirtimeRewardRequestView;
  approvedAmount?: number;
  network?: string;
  requestedAt?: string;
  approved?: boolean;
};
export type PaginatedAirtimeRewardView = {
  count?: number;
  pages?: number;
  items?: AirtimeRewardView[];
};
export type AirtimeRequestView = {
  message?: string;
  id?: string;
  userInfo?: UserInfoView;
  status?: string;
  transactionId?: string;
  phoneNumber?: string;
  approvedAmount?: number;
  network?: string;
  requestedAt?: string;
  requestedAmount?: number;
};
export type PaginatedAirtimeRequestView = {
  count?: number;
  pages?: number;
  items?: AirtimeRequestView[];
};
export type RateLimit = {
  id?: number;
  clientIp?: string;
  email?: string;
  endpoint?: string;
  timestamps?: string;
  backoffAttempts?: number;
  blockedUntil?: number;
  maxRequests?: number;
  timeWindowMinutes?: number;
  blockDurationMinutes?: number;
  blocked?: boolean;
  blockStartTime?: string;
  blockEndTime?: string;
};
export type UserRankDto = {
  rank?: number;
  userId?: string;
  username?: string;
  profileImage?: string;
  department?: Department;
  points?: number;
};
export type PaginationDto = {
  currentPage?: number;
  pages?: number;
  count?: number;
};
export type SchoolRankingDto = {
  schoolId?: string;
  schoolName?: string;
  ranking?: UserRankDto[];
  userRanking?: UserRankDto;
  pagination?: PaginationDto;
};
export type GlobalRankingDto = {
  ranking?: UserRankDto[];
  userRanking?: UserRankDto;
  pagination?: PaginationDto;
};
export type ParticipantTimeElapsedView = {
  timeElapsed?: number;
};
export type QuizathonHistroyView = {
  studentId?: string;
  quizathon?: QuizathonView;
};
export type PaginatedQuizathonHistroyView = {
  count?: number;
  pages?: number;
  items?: QuizathonHistroyView[];
};
export type CertificateDto = {
  participantId?: string;
  firstname?: string;
  lastname?: string;
  quizathonTitle?: string;
  quizathonDate?: string;
  position?: number;
  qrCode?: string;
};
export type QuizathonWaitlistView = {
  id?: string;
  userInfo?: UserInfoView;
  createdAt?: string;
  quizathon?: SimpleQuizathonView;
};
export type PaginatedQuizathonWaitlistView = {
  count?: number;
  pages?: number;
  items?: QuizathonWaitlistView[];
};
export type ParticipantResultStatsView = {
  timeElapsed?: number;
  questionsCount?: number;
};
export type ScoreLeaderboardView = {
  position?: number;
  email?: string;
  studentId?: string;
  schoolName?: string;
  totalScore?: number;
  accuracy?: number;
  participantName?: string;
  participantId?: string;
  totalAttemptedQuestions?: number;
  lastUpdatedAt?: string;
};
export type PaginatedScoreLeaderboardView = {
  count?: number;
  pages?: number;
  items?: ScoreLeaderboardView[];
};
export type SchoolLeaderboardView = {
  name?: string;
  totalScore?: number;
  quizathonId?: string;
  totalParticipants?: number;
};
export type PaginatedSchoolLeaderboardView = {
  count?: number;
  pages?: number;
  items?: SchoolLeaderboardView[];
};
export type GeniusScoreRankingView = {
  position?: number;
  email?: string;
  studentId?: string;
  schoolName?: string;
  totalScore?: number;
  accuracy?: number;
  geniusScore?: number;
  participantName?: string;
  participantId?: string;
  totalAttemptedQuestions?: number;
  lastUpdatedAt?: string;
};
export type PaginatedGeniusScoreRankingView = {
  count?: number;
  pages?: number;
  items?: GeniusScoreRankingView[];
};
export type AccuracyRankingView = {
  position?: number;
  email?: string;
  studentId?: string;
  schoolName?: string;
  totalScore?: number;
  accuracy?: number;
  participantName?: string;
  participantId?: string;
  totalAttemptedQuestions?: number;
  lastUpdatedAt?: string;
};
export type PaginatedAccuracyRankingView = {
  count?: number;
  pages?: number;
  items?: AccuracyRankingView[];
};
export type UserInfoMiniView = {
  firstName?: string;
  lastName?: string;
  studentId?: string;
  profileImage?: string;
};
export type DailyLeaderBoardView = {
  id?: string;
  userInfo?: UserInfoMiniView;
  createdAt?: string;
  schoolInformation?: SchoolInformationView;
  totalScores?: number;
  updatedAt?: string;
  totalQuestionsAttempted?: number;
};
export type PaginatedDailyLeaderBoardView = {
  count?: number;
  pages?: number;
  items?: DailyLeaderBoardView[];
};
export type ProfileVisitCountResponse = {
  totalVisitCount?: number;
  currentMonthVisitCount?: number;
  lastVisitDate?: string;
};
export type PaginatedStudentResultView = {
  count?: number;
  pages?: number;
  items?: StudentResultView[];
};
export type StudentPaperSolutionWithAnswersView = {
  questionId?: string;
  studentPaperId?: string;
  questionNumber?: number;
  questionText?: string;
  type?: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "SHORT_TEXT" | "LONG_TEXT";
  topic?: string;
  solution?: string;
  point?: number;
  tags?: string[];
  imageUrl?: string;
  answerOptions?: AnswerOptionView[];
  answerTexts?: string[];
  studentSelectedAnswerIds?: string[];
  isCorrect?: boolean;
};
export type PaginatedStudentPaperSolutionWithAnswersView = {
  count?: number;
  pages?: number;
  items?: StudentPaperSolutionWithAnswersView[];
};
export type TrackTimerView = {
  startTime?: number;
  id?: string;
  timeElapsed?: number;
  studentAnswers?: StudentAnswerView[];
};
export type StudentPaperSolutionView = {
  id?: string;
  type?: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "SHORT_TEXT" | "LONG_TEXT";
  text?: string;
  topic?: string;
  tags?: string[];
  section?: SectionView;
  imageUrl?: string;
  solution?: string;
  answerTexts?: string[];
  answerOptions?: AnswerOptionView[];
  questionNumber?: number;
  point?: number;
  studentPaperId?: string;
};
export type PaginatedStudentPaperSolutionView = {
  count?: number;
  pages?: number;
  items?: StudentPaperSolutionView[];
};
export type PaginatedObject = {
  count?: number;
  pages?: number;
  items?: object[];
};
export type PracticeHistoryGroupView = {
  paperId?: string;
  paperName?: string;
  updatedAt?: string;
  practiceCount?: number;
  totalQuestion?: number;
  totalScore?: number;
};
export type TimeStatisticsResponse = {
  totalTime?: number;
};
export type ScoreTotalStatisticsResponse = {
  totalScore?: number;
  totalQuestions?: number;
};
export type Breakdown = {
  score?: number;
  questionCount?: number;
};
export type ScoreStatisticsResponse = {
  score?: number;
  questionCount?: number;
  breakdown?: {
    [key: string]: Breakdown;
  };
};
export type TotalPointsDto = {
  userId?: string;
  totalPoints?: number;
};
export type PointTypeView = {
  description?: string;
  name?: string;
  id?: string;
  baseScore?: number;
};
export type MonthlyStatDto = {
  month?: string;
  questionsTaken?: number;
  timeSpent?: number;
};
export type MonthlyPracticeDto = {
  userId?: string;
  year?: number;
  monthlyStats?: MonthlyStatDto[];
};
export type PaginatedLessonView = {
  count?: number;
  pages?: number;
  items?: LessonView[];
};
export type PaginatedLessonItemView = {
  count?: number;
  pages?: number;
  items?: LessonItemView[];
};
export type PaginatedLessonGroupView = {
  count?: number;
  pages?: number;
  items?: LessonGroupView[];
};
export type KeypointSummaryView = {
  paperId?: string;
  paperName?: string;
  updatedAt?: string;
  keypointCount?: number;
};
export type FlashcardUsageStatisticsView = {
  totalSessions?: number;
  completedSessions?: number;
  totalCardsStudied?: number;
  totalTimeSpentSeconds?: number;
  averageSessionDurationSeconds?: number;
  completionRate?: number;
  totalSkippedCards?: number;
  averageTimePerCardSeconds?: number;
};
export type DailyTrend = {
  date?: string;
  cardsStudied?: number;
  timeSpentSeconds?: number;
  sessionsCount?: number;
  completionRate?: number;
};
export type WeeklySummary = {
  weekStart?: string;
  weekEnd?: string;
  totalSessions?: number;
  totalCardsStudied?: number;
  totalTimeSpentSeconds?: number;
  averageSessionDurationSeconds?: number;
  completionRate?: number;
  studyStreak?: number;
  dailyBreakdown?: DailyTrend[];
};
export type StudyStreak = {
  currentStreak?: number;
  longestStreak?: number;
  lastStudyDate?: string;
  activeToday?: boolean;
  daysUntilNextMilestone?: number;
  nextMilestone?: number;
};
export type OverviewMetrics = {
  totalSessions?: number;
  completedSessions?: number;
  totalCardsStudied?: number;
  totalCardsCompleted?: number;
  totalCardsSkipped?: number;
  totalTimeSpentSeconds?: number;
  averageSessionDurationSeconds?: number;
  completionRate?: number;
  formattedTotalTime?: string;
};
export type SessionOutcomes = {
  completedSessions?: number;
  pausedSessions?: number;
  abandonedSessions?: number;
  totalSessions?: number;
  completedPercentage?: number;
  pausedPercentage?: number;
  abandonedPercentage?: number;
};
export type Achievement = {
  id?: string;
  title?: string;
  description?: string;
  icon?: string;
  unlocked?: boolean;
  unlockedAt?: string;
  type?:
    | "FIRST_SESSION"
    | "WEEKLY_GOAL"
    | "STREAK_3_DAYS"
    | "STREAK_7_DAYS"
    | "STREAK_30_DAYS"
    | "COMPLETION_MASTER"
    | "TIME_DEDICATED"
    | "CONSISTENT_LEARNER";
  progress?: number;
  target?: number;
  progressPercentage?: number;
};
export type FlashcardDashboardView = {
  overview?: OverviewMetrics;
  trends?: DailyTrend[];
  outcomes?: SessionOutcomes;
  achievements?: Achievement[];
  weeklySummary?: WeeklySummary;
  streak?: StudyStreak;
};
export type StudentAnalytics = {
  studentId?: string;
  totalSessions?: number;
  totalCardsStudied?: number;
  averageSessionDurationSeconds?: number;
  completionRate?: number;
  studyStreak?: number;
  engagementScore?: number;
};
export type RealTimeMetrics = {
  activeSessions?: number;
  todaySessions?: number;
  systemHealthScore?: number;
  alerts?: string[];
};
export type PerformanceMetrics = {
  averageResponseTime?: number;
  errorRate?: number;
  totalRequests?: number;
  successfulRequests?: number;
  errorBreakdown?: {
    [key: string]: number;
  };
};
export type SystemOverview = {
  totalFlashcards?: number;
  totalSessions?: number;
  totalStudents?: number;
  activeSessions?: number;
  todaySessions?: number;
  todayCardsStudied?: number;
  todayTimeSpentSeconds?: number;
  weekSessions?: number;
  weekCardsStudied?: number;
  averageSessionDurationSeconds?: number;
  weekAverageSessionDurationSeconds?: number;
  overallCompletionRate?: number;
  todayCompletionRate?: number;
  engagementScore?: number;
  peakUsageHours?: number[];
};
export type InstitutionAnalytics = {
  institutionId?: string;
  totalFlashcards?: number;
  totalSessions?: number;
  totalStudents?: number;
  averageSessionDurationSeconds?: number;
  completionRate?: number;
  engagementScore?: number;
};
export type ContentAnalytics = {
  flashcardId?: string;
  flashcardTitle?: string;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  institutionId?: string;
  totalSessions?: number;
  totalCardsStudied?: number;
  averageSessionDurationSeconds?: number;
  completionRate?: number;
  engagementScore?: number;
};
export type UsagePatterns = {
  hourlyUsage?: {
    [key: string]: number;
  };
  dailyUsage?: {
    [key: string]: number;
  };
  sessionDurationDistribution?: {
    [key: string]: number;
  };
};
export type WeeklyTrend = {
  weekStart?: string;
  weekEnd?: string;
  sessionsCount?: number;
  cardsStudied?: number;
  timeSpentSeconds?: number;
  completionRate?: number;
  uniqueStudents?: number;
  averageSessionDuration?: number;
};
export type MonthlyTrend = {
  year?: number;
  month?: number;
  sessionsCount?: number;
  cardsStudied?: number;
  timeSpentSeconds?: number;
  completionRate?: number;
  uniqueStudents?: number;
  averageSessionDuration?: number;
};
export type TrendAnalysis = {
  dailyTrends?: DailyTrend[];
  weeklyTrends?: WeeklyTrend[];
  monthlyTrends?: MonthlyTrend[];
};
export type Alert = {
  id?: string;
  type?: string;
  message?: string;
  severity?: string;
  createdAt?: string;
  resolved?: boolean;
};
export type FlashcardAdminDashboardView = {
  systemOverview?: SystemOverview;
  institutionAnalytics?: InstitutionAnalytics[];
  topPerformers?: StudentAnalytics[];
  atRiskStudents?: StudentAnalytics[];
  contentAnalytics?: ContentAnalytics[];
  realTimeMetrics?: RealTimeMetrics;
  usagePatterns?: UsagePatterns;
  trendAnalysis?: TrendAnalysis;
  performanceMetrics?: PerformanceMetrics;
  alerts?: Alert[];
};
export type TrendingFlagsView = {
  count?: number;
  issueType?: QuestionIssueType;
  resolvedCount?: number;
};
export type FlaggedQuestionStatsView = {
  totalFlagged?: number;
  resolvedPercentage?: number;
  totalResolved?: number;
  totalPending?: number;
  pendingPercentage?: number;
  flaggedBySystem?: number;
  flaggedByUser?: number;
};
export type TopCampaignData = {
  campaignName?: string;
  emailType?: string;
  totalSent?: number;
  totalOpens?: number;
  totalClicks?: number;
  openRate?: number;
  clickRate?: number;
  engagementScore?: number;
};
export type EmailTrackingStats = {
  userEmail?: string;
  totalEmailsSent?: number;
  totalOpens?: number;
  totalClicks?: number;
  uniqueOpens?: number;
  uniqueClicks?: number;
  openRate?: number;
  clickRate?: number;
  averageEngagementScore?: number;
};
export type DailyStats = {
  date?: string;
  sentCount?: number;
  openCount?: number;
  clickCount?: number;
};
export type EmailTypeStats = {
  emailType?: string;
  sentCount?: number;
  openCount?: number;
  clickCount?: number;
};
export type EmailDashboardData = {
  totalEmailsSent?: number;
  totalDelivered?: number;
  totalOpens?: number;
  totalClicks?: number;
  uniqueOpens?: number;
  uniqueClicks?: number;
  totalBounces?: number;
  openRate?: number;
  clickThroughRate?: number;
  bounceRate?: number;
  deliveryRate?: number;
  dailyStats?: DailyStats[];
  emailTypeStats?: EmailTypeStats[];
};
export type Document = {
  id?: string;
  institutionId: string;
  filename: string;
  originalFilename: string;
  s3Url: string;
  s3Key: string;
  contentType: string;
  fileSize: number;
  isPublic?: boolean;
  createdBy: string;
  createdAt?: string;
  updatedAt?: string;
};
export type DocumentUploadProgress = {
  uploadId?: string;
  institutionId?: string;
  filename?: string;
  totalBytes?: number;
  uploadedBytes?: number;
  progressPercentage?: number;
  status?: string;
  message?: string;
  error?: string;
  startTime?: string;
  estimatedCompletion?: string;
  timestamp?: string;
};
export type TransactionSimpleView = {
  id?: string;
  status?: "PENDING" | "SUCCESS" | "FAILED";
  username?: string;
  studentId?: string;
  platform?: string;
  amount?: number;
  planType?: string;
  referenceId?: string;
  createdAt?: string;
};
export type PaginatedTransactionSimpleView = {
  count?: number;
  pages?: number;
  items?: TransactionSimpleView[];
};
export type SubscriptionPackageLiteView = {
  description?: string;
  name?: string;
  id?: string;
  code?: "BASIC_PLAN" | "STANDARD_PLAN" | "PREMIUM_PLAN";
  institutionId?: string;
  isActive?: boolean;
};
export type SubscriptionHistoryView = {
  id?: string;
  username?: string;
  addOn?: SubscriptionPackageAddonView;
  price?: number;
  planType?: string;
  subscriptionPackage?: SubscriptionPackageLiteView;
  createdAt?: string;
  endAt?: string;
  startAt?: string;
};
export type PaginatedSubscriptionHistoryView = {
  count?: number;
  pages?: number;
  items?: SubscriptionHistoryView[];
};
export type SubPackageView = {
  description?: string;
  name?: string;
  id?: string;
  code?: "BASIC_PLAN" | "STANDARD_PLAN" | "PREMIUM_PLAN";
  institutionId?: string;
  isActive?: boolean;
  addOn?: SubscriptionPackageAddonView[];
  packagePlan?: SubscriptionPackagePlanView[];
  propertyPlan?: SubscriptionPackagePropertyView[];
};
export type SubscriptionView = {
  id?: string;
  isActive?: boolean;
  studentId?: string;
  planType?: string;
  subscriptionPackage?: SubPackageView;
  endAt?: string;
  startAt?: string;
};
export type SubmissionsView = {
  createdBy?: string;
  paperId?: string;
  userId?: string;
  createdAt?: string;
  questionCount?: number;
  paperName?: string;
};
export type SubmissionStatisticsResponse = {
  totalQuestions?: number;
  pendingQuestions?: number;
  declinedQuestions?: number;
  approvedQuestions?: number;
};
export type WelcomeMessageDto = {
  welcomeMessage?: string;
  sampleQuestion1?: string;
  sampleQuestion2?: string;
  sampleQuestion3?: string;
};
export type ChatThreadView = {
  id?: string;
  title?: string;
  createdAt?: string;
  updatedAt?: string;
};
export type ChatBotAssistantView = {
  id?: string;
  studentId?: string;
  chatThreads?: ChatThreadView[];
  createdAt?: string;
};
export type BadgeDto = {
  name?: string;
  minPoints?: number;
  maxPoints?: number;
};
export type BadgesDto = {
  badges?: BadgeDto[];
};
export type Session = {
  id?: string;
  thread?: Thread;
  prompt?: string;
  response?: string;
  context?: string;
  createdAt?: string;
};
export type Thread = {
  id?: string;
  paperId?: string;
  title?: string;
  context?: string;
  sessions?: Session[];
  createdAt?: string;
  updatedAt?: string;
};
export type Assistant = {
  id?: string;
  userId?: string;
  knowledgeBaseId?: string;
  threads?: Thread[];
  createdAt?: string;
};
export type BulkCategorizationStatusResponse = {
  institutionId?: string;
  totalQuestions?: number;
  categorizedQuestions?: number;
  remainingQuestions?: number;
  progressPercentage?: number;
  estimatedTimeRemaining?: string;
};
export type BulkCategorizationProgress = {
  institutionId?: string;
  status?: string;
  totalQuestions?: number;
  categorizedQuestions?: number;
  remainingQuestions?: number;
  progressPercentage?: number;
};
export type PaginatedStaffView = {
  count?: number;
  pages?: number;
  items?: StaffView[];
};
export type AdminUserView = {
  level?: string;
  email?: string;
  institutionId?: string;
  firstName?: string;
  lastName?: string;
  otherName?: string;
  studentId?: string;
  schoolName?: string;
  gender?: string;
  matriculationNumber?: string;
  phoneNumber?: string;
  blocked?: boolean;
  schoolType?: "FEDERAL" | "STATE" | "PRIVATE";
  referralCode?: string;
  stateOfOrigin?: string;
  profileImage?: string;
  departmentName?: string;
};
export type PaginatedAdminUserView = {
  count?: number;
  pages?: number;
  items?: AdminUserView[];
};
export type ReferralStatisticsView = {
  correctQuestionsCount?: number;
  referrerId?: string;
  totalClaimed?: number;
  totalUnclaimed?: number;
  totalUsed?: number;
  totalUnused?: number;
  totalVerifiedUser?: number;
  totalEarnings?: number;
  totalReferrals?: number;
};
export type ReferralView = {
  id?: string;
  verified?: boolean;
  used?: boolean;
  kycVerified?: boolean;
  correctQuestionsCount?: number;
  referralCode?: string;
  claimed?: boolean;
  referrerId?: string;
  referredEmail?: string;
  referredName?: string;
  createdAt?: string;
  usedAt?: string;
  questionCount?: number;
};
export type PaginatedReferralView = {
  count?: number;
  pages?: number;
  items?: ReferralView[];
};
export type PublicUserProfileDto = {
  studentId?: string;
  firstName?: string;
  lastName?: string;
  otherName?: string;
  profileImage?: string;
  schoolName?: string;
  totalPracticedQuestion?: number;
  timeSpent?: number;
  accuracy?: number;
  currentStreak?: number;
  lastSeen?: string;
  globalRank?: number;
  totalPoints?: number;
  currentBadge?: BadgeDto;
  ninVerified?: boolean;
};
export type ReferralAdminView = {
  correctQuestionsCount?: number;
  referrerId?: string;
  questionCount?: number;
  totalClaimed?: number;
  totalUnclaimed?: number;
  totalVerifiedUser?: number;
  totalReferrals?: number;
  referrerFirstName?: string;
  referrerLastName?: string;
  referrerOtherName?: string;
};
export type PaginatedReferralAdminView = {
  count?: number;
  pages?: number;
  items?: ReferralAdminView[];
};
export type ReferralAdminStatisticsView = {
  totalVerifiedUser?: number;
  totalReferralCount?: number;
  totalApproved?: number;
  totalNotApproved?: number;
};
export const {
  useRetrieveQuery,
  useUpdateMutation,
  useDeleteTelcosByIdMutation,
  useUpdate1Mutation,
  useUpdateAddOnMutation,
  useUpdate2Mutation,
  useDelete1Mutation,
  useGetCurrentUserSettingsQuery,
  useUpdateCurrentUserSettingsMutation,
  useGetSectionsByIdQuery,
  useUpdate3Mutation,
  useDelete2Mutation,
  useGetSchoolQuery,
  useUpdate4Mutation,
  useDelete3Mutation,
  useUpdateStudentMutation,
  useGet1Query,
  useUpdate5Mutation,
  useDelete4Mutation,
  useGet2Query,
  useUpdate6Mutation,
  useDelete5Mutation,
  useGet3Query,
  useUpdate7Mutation,
  useDelete6Mutation,
  useRetrieve4Query,
  useUpdate8Mutation,
  useDelete8Mutation,
  useGet4Query,
  useUpdate9Mutation,
  useDelete9Mutation,
  useUpdate10Mutation,
  useUpdate11Mutation,
  useUpdate12Mutation,
  useUpdateSessionStatisticsMutation,
  useResumeSessionMutation,
  usePauseSessionMutation,
  useEndSessionMutation,
  useAbandonSessionMutation,
  useExamQuery,
  useUpdate13Mutation,
  useDelete14Mutation,
  useExamGroupQuery,
  useUpdate14Mutation,
  useDelete15Mutation,
  useGet13Query,
  useUpdate15Mutation,
  useDelete17Mutation,
  useGet14Query,
  useUpdate16Mutation,
  useDelete19Mutation,
  useUpdateUsernameMutation,
  useEditUserProfileNinMutation,
  useEditUserProfileMutation,
  useListQuery,
  useCreateMutation,
  useCallbackMutation,
  useList1Query,
  useCreate1Mutation,
  useCreateAddOnMutation,
  useList2Query,
  useCreate2Mutation,
  useTestEmailTemplateMutation,
  useRecordActivityMutation,
  useGetSolutionMutation,
  useGetAnswerMutation,
  useList3Query,
  useCreate3Mutation,
  useList4Query,
  useCreate4Mutation,
  useAddSingleStudentMutation,
  useValidateBulkUploadStudentDataMutation,
  useBulkUploadQuestionsDataMutation,
  useBulkUploadStudentDataMutation,
  useSendInviteMutation,
  useSendBulkInviteMutation,
  useRequestRewardRequestMutation,
  useRequestRewardMutation,
  useApproveRewardMutation,
  useAirtimeStatusCallbackMutation,
  useRegisterUserMutation,
  useBlockClientMutation,
  useList5Query,
  useCreate5Mutation,
  useJoinWaitlistMutation,
  useList7Query,
  useCreate6Mutation,
  useList8Query,
  useCreate7Mutation,
  useBulkUploadQuestionsData1Mutation,
  useTrackPublicProfileClickMutation,
  useTrackProfileShareEventMutation,
  useList10Query,
  useStartMutation,
  useSubmitResultMutation,
  useList11Query,
  useEnrollMutation,
  useSubmitMutation,
  useSaveProgressMutation,
  useList12Query,
  useAddMutation,
  useDelete7Mutation,
  useGetAnswersQuery,
  useAnswerMutation,
  useTrackTimerMutation,
  useRefreshTokenMutation,
  usePasswordResetMutation,
  usePasswordResetRequestMutation,
  useLoginMutation,
  useList13Query,
  useCreate8Mutation,
  useWebhookMutation,
  useList14Query,
  useCreate9Mutation,
  useGenerateCourseFromPaperMutation,
  useGenerateCoursesFromPapersMutation,
  useRatePaperMutation,
  useMarkTourMutation,
  useListMultimediaFilesQuery,
  usePutImageMutation,
  useCopyMutation,
  useList18Query,
  useCreate10Mutation,
  useCreateKeypointV3Mutation,
  useInferKnowledgeMutation,
  useInferKnowledgeWithStreamingMutation,
  useCreate11Mutation,
  useListImagesQuery,
  usePutImage1Mutation,
  useGet9Query,
  useCreate12Mutation,
  useDelete11Mutation,
  useList19Query,
  useCreate13Mutation,
  useGenerateFlashcardsV3Mutation,
  useInferKnowledge1Mutation,
  useInferKnowledgeWithStreaming1Mutation,
  useRecordUsageMutation,
  useStartSessionMutation,
  useListFlagQuestionQuery,
  useReportQuestionMutation,
  useResolveQuestionMutation,
  useList20Query,
  useCreate14Mutation,
  useList21Query,
  useCreate15Mutation,
  useList22Query,
  useCreate16Mutation,
  useGetEvaluationMutation,
  useList23Query,
  useCreate17Mutation,
  useList24Query,
  useCreate18Mutation,
  useUploadDocumentMutation,
  useSubscribeMutation,
  useRegisterMutation,
  useLogin1Mutation,
  useResendVerificationMutation,
  useConfirmMutation,
  useTokenLoginMutation,
  useRegister1Mutation,
  useRegisterUploadedStudentMutation,
  useRefreshToken1Mutation,
  usePasswordReset1Mutation,
  usePasswordResetRequest1Mutation,
  useLogin2Mutation,
  useList31Query,
  useCreate19Mutation,
  useList32Query,
  useCreate20Mutation,
  useUpdateCustomQuestionStatusMutation,
  useBulkUploadQuestionsData2Mutation,
  useList33Query,
  useGenerateMutation,
  useManualRetryMutation,
  useResetRetryCountMutation,
  useGetMessagesQuery,
  useChatMessageMutation,
  useNewChatMutation,
  useRefreshToken2Mutation,
  usePasswordReset2Mutation,
  usePasswordResetRequest2Mutation,
  useLogin3Mutation,
  useChatMessage1Mutation,
  useChatStreamMessageMutation,
  useNewThreadMutation,
  useCategorizeQuestionsMutation,
  useCategorizeQuestionMutation,
  useCategorizeAndPersistQuestionMutation,
  useCategorizeQuestionsByPaperMutation,
  useCategorizeAndPersistQuestionsByPaperMutation,
  useCategorizeQuestionsByIdsMutation,
  useCategorizeAndPersistQuestionsByIdsMutation,
  useStopBulkCategorizationMutation,
  useStartBulkCategorizationMutation,
  useList35Query,
  useCreate21Mutation,
  useBatchStreamingMutation,
  useInferKnowledge2Mutation,
  useInferKnowledgeStreamingMutation,
  useSaveMutation,
  useGenerateQuestions2Mutation,
  useCreate22Mutation,
  useResendVerification1Mutation,
  useConfirm1Mutation,
  useRegister2Mutation,
  usePasswordReset3Mutation,
  usePasswordResetRequest3Mutation,
  useLogin4Mutation,
  useVerifyProfileNinMutation,
  useCreateReferralMutation,
  useGet5Query,
  useUpdate17Mutation,
  useGet6Query,
  useUpdate18Mutation,
  useGet7Query,
  useUpdate19Mutation,
  useRetrieve5Query,
  useUpateMutation,
  useRetrieve6Query,
  useDelete13Mutation,
  useUpdate20Mutation,
  useGet12Query,
  useDelete16Mutation,
  useUpdate21Mutation,
  useRetrieve7Query,
  useDelete18Mutation,
  useUpdate22Mutation,
  useGet15Query,
  useDelete20Mutation,
  useUpdate23Mutation,
  useUpdateAiStatusMutation,
  useRegenerateMutation,
  useUpdateProgressMutation,
  useUpdateAiStatus1Mutation,
  useGet17Query,
  useDelete22Mutation,
  useUpdate24Mutation,
  useGet18Query,
  useUpdate25Mutation,
  useUnblockStudentMutation,
  useBlockStudentMutation,
  useGetCurrentUserStreakStatusQuery,
  useGetUserStreakHistoryQuery,
  useGetRecentStreakHistoryQuery,
  useGetStreakHistoryInRangeQuery,
  useGetUserAchievementsQuery,
  useHasActivityForDateQuery,
  useGetTotalQuestionsQuery,
  useGetSchoolStatisticsQuery,
  useGetUploadedStudentsQuery,
  useGetCashRewardsByStudentIdQuery,
  useGetAirtimeRewardsByStudentIdQuery,
  useGetAllCashRewardsQuery,
  useGetAllAirtimeRewardsQuery,
  useGetAllAirtimeRequestsQuery,
  useGetRateLimitStatusQuery,
  useAllowRequestQuery,
  useGetSchoolRankingQuery,
  useGetGlobalRankingQuery,
  useGetTotalTimeElapsedQuery,
  useGetStudentQUizathonHistoryQuery,
  useGetCertificateQuery,
  useVerifyCertificateQuery,
  useList6Query,
  useGetParticipantStatsQuery,
  useGetLeaderboardQuery,
  useUniversityLeaderboardQuery,
  useGetGeniusScoreLeaderboardQuery,
  useGetLeaderboardRankingsQuery,
  useGetLeaderboard1Query,
  useGetActiveQuizathonQuery,
  useGetQuestionCountByYearQuery,
  useGetMyProfileVisitCountQuery,
  useGetTopicsQuery,
  useGetSubjectsQuery,
  useList9Query,
  useRetrieve1Query,
  useRetrieve2Query,
  useGetTotalCorrectAnswersQuery,
  useGetStudentAnswerSolutionsQuery,
  useGetRecommendedPapersQuery,
  useRetrieve3Query,
  useRetrieveTrackTimerQuery,
  useSolutionsQuery,
  useRetrieveResultQuery,
  useQuestionsQuery,
  useListPracticesByPaperIdQuery,
  useGroupPracticesByCourseQuery,
  useStudentQuizathonPapersQuery,
  useTimeQuery,
  useScoreTotalQuery,
  useScoreBreakdownQuery,
  useGetQuestionCountByYear1Query,
  useGetPapersQuery,
  useGetExamsQuery,
  useGetExamGroupsQuery,
  useGetTotalPointsQuery,
  useGetAllPointTypesQuery,
  useGetOnboardingToursQuery,
  useGetMultimediaFileQuery,
  useDeleteMultimediaFileMutation,
  useGetMonthlyPracticeQuery,
  useList15Query,
  useCountQuery,
  useList16Query,
  useCount1Query,
  useList17Query,
  useCount2Query,
  useGet8Query,
  useDelete10Mutation,
  useKeyPointPapersQuery,
  useGetImageQuery,
  useDeleteImageMutation,
  useGet10Query,
  useGet11Query,
  useDelete12Mutation,
  useGetUsageByStudentQuery,
  useCountActionsByStudentQuery,
  useGetSessionByIdQuery,
  useGetSessionStatusQuery,
  useGetSessionsByStudentQuery,
  useGetSessionStatisticsQuery,
  useGetActiveSessionQuery,
  useGetWeeklySummaryQuery,
  useGetStudyTrendsQuery,
  useGetStudyStreakQuery,
  useGetSessionHistoryQuery,
  useGetDashboardOverviewQuery,
  useGetSessionOutcomesQuery,
  useGetAchievementsQuery,
  useGetTopPerformingStudentsQuery,
  useGetAtRiskStudentsQuery,
  useGetRealTimeMetricsQuery,
  useGetPerformanceMetricsQuery,
  useGetSystemOverviewQuery,
  useGetInstitutionAnalyticsQuery,
  useGetInstitutionAnalytics1Query,
  useGetContentPerformanceAnalyticsQuery,
  useGetComprehensiveDashboardQuery,
  useGetUsagePatternsQuery,
  useGetTrendAnalysisQuery,
  useGetSystemAlertsQuery,
  useGetFlaggedQuestionQuery,
  useGetTrendingFlagsStatsQuery,
  useGetFlaggedQuestionStatsQuery,
  useSuggestionQuery,
  useListMineQuery,
  useTrackEmailOpenQuery,
  useTrackEmailClickQuery,
  useGetTopCampaignsQuery,
  useGetUserEmailStatsQuery,
  useGetDashboardDataQuery,
  useGetDocumentQuery,
  useDeleteDocumentMutation,
  useGetUploadResultQuery,
  useGetUploadProgressQuery,
  useGetExams1Query,
  useList25Query,
  useVerifyQuery,
  useList26Query,
  useList27Query,
  useVerify1Query,
  useList28Query,
  useStatusQuery,
  useGetPlanLimitQuery,
  useGetSubscriptionQuery,
  useList29Query,
  useList30Query,
  useGetStudentReferralCodeQuery,
  useValidateStudentEmailQuery,
  useGoogleLoginQuery,
  useGetSubmissionsQuery,
  useGetStatisticsQuery,
  useListMine1Query,
  useCountMineQuery,
  useCount3Query,
  useGetByAiStatusQuery,
  useGet16Query,
  useGetRequestsNeedingRetryQuery,
  useGetByProgressStageQuery,
  useGetByProgressPercentageQuery,
  useGetByAiStatus1Query,
  useGetByAiJobIdQuery,
  useGetWelcomeMessageQuery,
  useGetChatBotAssistantQuery,
  useGetBadgesQuery,
  useList34Query,
  useGetWelcomeMessage1Query,
  useGetThreadsQuery,
  useGetThreadQuery,
  useDeleteThread1Mutation,
  useGetMessages1Query,
  useGetChatBotAssistant1Query,
  useExportCourseAsScormQuery,
  useHealthCheckQuery,
  useGetStatusQuery,
  useGetProgressQuery,
  useList36Query,
  useListUsersQuery,
  useGetUserByIdQuery,
  useGetUserProfileQuery,
  useStatisticsReferralQuery,
  useGetStudentReferralCode1Query,
  useGetReferralsQuery,
  useGetPublicUserProfileQuery,
  useFilterReferralsQuery,
  useAdminReferralQuery,
  useDeleteDuplicatesMutation,
  useRemoveDuplicatesMutation,
  useCancelSubscriptionMutation,
  useDeleteThreadMutation,
  useDelete21Mutation,
} = injectedRtkApi;
