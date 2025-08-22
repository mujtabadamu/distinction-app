import { Notify } from '@flexisaf/flexibull2';
import { ParticipantRequest } from 'generated/index';
import { useMemo } from 'react';
import { handleError } from 'utils/errorHandlers';
import {
  getActiveQuizathonUtil,
  quizathonInProgress,
  quizathonEnded,
  quizathonStarted,
} from 'utils/quizathon';
import {
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
} from 'store/enhancedApi';

// Type definitions for the enhanced hook
type GetParticipantStatsPayload = {
  studentId: string;
  quizathonId?: string;
};

type GetParticipantPayload = {
  studentId: string;
  quizathonId: string;
};

type GetHistoryPayload = {
  studentId: string;
  keyword?: string;
  page?: number;
  size?: number;
};

type GetLeaderBoardPayload = {
  studentId?: string;
  quizathonId?: string;
  schoolId?: string;
  keyword?: string;
  page?: number;
  size?: number;
};

type GetLoaderBoardDailyPayload = {
  studentId?: string;
  quizathonId?: string;
  date?: string;
  page?: number;
  size?: number;
};

type SchoolListParams = {
  name?: string;
  abbr?: string;
  curriculum?: 'NUC' | 'NBTE' | 'NCCE' | 'OTHERS';
  page?: number;
  size?: number;
};

const useQuizathon = ({
  quizathonId,
  studentId,
  keyword,
  status,
  page,
  size,
}: {
  quizathonId?: string;
  studentId?: string;
  keyword?: string;
  status?: boolean;
  page?: number;
  size?: number;
} = {}) => {
  // RTK Query hooks for all quizathon operations

  const {
    data: schoolList,
    isLoading: isLoadingSchools,
    refetch: getSchoolList,
  } = useEnhancedGetSchoolListQuery({ size: -1 });

  const [submitStudentInfo, { isLoading: isSubmittingInfo }] =
    useEnhancedSubmitStudentInfoMutation();

  const [editStudentInfo, { isLoading: isEditingStudentInfo }] =
    useEnhancedEditStudentInfoMutation();

  const {
    data: participantDetails,
    isLoading: isLoadingParticipant,
    // refetch: getParticipant,
  } = useEnhancedGetParticipantQuery(
    {
      quizathonId: quizathonId || '',
      studentId: studentId || '',
    },
    {
      skip: !quizathonId || !studentId,
    }
  );

  const {
    data: leaderBoardData,
    isLoading: isLoadingLeaderBoard,
    refetch: getLeaderboard,
  } = useEnhancedGetLeaderboardQuery(
    {
      studentId,
      quizathonId,
    },
    {
      skip: !studentId || !quizathonId,
    }
  );

  const {
    data: singleLeaderBoardData,
    isLoading: isLoadingSingleLeaderBoard,
    // refetch: getIndividualLeaderboardStat,
  } = useEnhancedGetIndividualLeaderboardStatQuery(
    {
      params: {
        studentId,
        quizathonId,
        page: page ? page - 1 : undefined,
        size,
        keyword,
      },
      useAccuracy: false,
    },
    {
      skip: !quizathonId || !studentId,
    }
  );

  const {
    data: participantStats,
    isLoading: isLoadingParticipantStats,
    // refetch: getParticipantStats,
  } = useEnhancedGetParticipantStatsQuery(
    {
      studentId: studentId || '',
      quizathonId: quizathonId || '',
    },
    {
      skip: !studentId || !quizathonId,
    }
  );

  const {
    data: allActiveQuizathon,
    isLoading: isLoadingAllActiveQuizathon,
    refetch: getAllActiveQuizathon,
  } = useEnhancedGetAllActiveQuizathonQuery();

  const {
    data: activeQuizathonData,
    isLoading: isLoadingActiveQuizathon,
    refetch: getActiveQuizathon,
  } = useEnhancedGetActiveQuizathonQuery();

  const {
    data: papersTaken,
    isLoading: isLoadingPapersTaken,
    refetch: getQuizathonPapersTaken,
  } = useEnhancedGetQuizathonPapersTakenQuery(
    {
      quizathonId: quizathonId || '',
      size: 50,
    },
    {
      skip: !quizathonId,
    }
  );

  const {
    data: quizathonElapsedTime,
    isLoading: isLoadingQuizathonElapsedTime,
    // refetch: getQuizathonElapsedTime,
  } = useEnhancedGetQuizathonElapsedTimeQuery(
    {
      studentId: studentId || '',
      quizathonId: quizathonId || '',
    },
    {
      skip: !studentId || !quizathonId,
    }
  );

  const {
    data: quizathonHistory,
    isLoading: isLoadingQuizathonHistory,
    // refetch: getQuizathonHistory,
  } = useEnhancedGetQuizathonHistoryQuery(
    {
      status,
      page: page ? page - 1 : undefined,
      size,
      studentId: studentId || '',
      ...(keyword?.trim() && {
        keyword: keyword.trim(),
      }),
    },
    {
      skip: false,
    }
  );

  const {
    data: singleQuizathon,
    isLoading: isLoadingQuizathon,
    // refetch: getSingleQuizathon,
  } = useEnhancedGetSingleQuizathonQuery(quizathonId || '', {
    skip: !quizathonId,
  });

  const {
    data: schoolLeaderboard,
    isLoading: isLoadingSchoolLeaderboard,
    // refetch: getSchoolLeaderboard,
  } = useEnhancedGetSchoolLeaderboardQuery(
    {
      quizathonId,
      page: page ? page - 1 : undefined,
      size,
    },
    {
      skip: !quizathonId,
    }
  );

  const [generateCertificate, { isLoading: isGeneratingCertificate }] =
    useEnhancedGenerateCertificateMutation();

  const [verifyCertificate, { isLoading: isVerifyingCertificate }] =
    useEnhancedVerifyCertificateMutation();

  const {
    data: rankingData,
    isLoading: isLoadingRanking,
    // refetch: getAccuracyLeaderboard,
  } = useEnhancedGetAccuracyLeaderboardQuery(
    {
      quizathonId,
      studentId,
    },
    {
      skip: !quizathonId,
    }
  );

  const {
    data: geniusLeaderboardData,
    isLoading: isLoadingGeniusLeaderboard,
    // refetch: getGeniusLeaderboard,
  } = useEnhancedGetGeniusLeaderboardQuery(
    {
      quizathonId,
      studentId,
    },
    {
      skip: !quizathonId,
    }
  );

  const {
    data: dailyLeaderBoard,
    isLoading: isLoadingDailyLeaderBoard,
    // refetch: getQuizathonDailyLeaderBoard,
  } = useEnhancedGetQuizathonDailyLeaderBoardQuery(
    {
      studentId,
      quizathonId,
    },
    {
      skip: !studentId || !quizathonId,
    }
  );

  // Computed values
  const activeQuizathon = useMemo(() => {
    if (activeQuizathonData) {
      return getActiveQuizathonUtil(activeQuizathonData);
    }
    return undefined;
  }, [activeQuizathonData]);

  const isQuizathonInProgress = useMemo(
    () => quizathonInProgress(activeQuizathon),
    [activeQuizathon]
  );

  const hasQuizathonStarted = useMemo(
    () => quizathonStarted(activeQuizathon),
    [activeQuizathon]
  );

  const hasQuizathonEnded = useMemo(
    () => quizathonEnded(activeQuizathon),
    [activeQuizathon]
  );

  // Enhanced wrapper functions with proper error handling and notifications
  const handleSubmitStudentInfo = async (
    payload: ParticipantRequest,
    callback: () => void
  ) => {
    try {
      await submitStudentInfo(payload).unwrap();
      Notify('Registered successfully', { status: 'success' });
      callback();
    } catch (error) {
      handleError(error);
    }
  };

  const handleEditStudentInfo = async (
    participantId: string,
    payload: ParticipantRequest,
    callback: () => void
  ) => {
    try {
      await editStudentInfo({
        id: participantId,
        participantRequest: payload,
      }).unwrap();
      callback();
    } catch (error) {
      handleError(error);
    }
  };

  const handleGetLeaderboard = async (payload: GetLeaderBoardPayload) => {
    try {
      if (quizathonId) {
        await getLeaderboard();
      }
    } catch (error) {
      handleError(error);
    }
  };

  // const handleGetIndividualLeaderboardStat = async (
  //   payload: GetLeaderBoardPayload,
  //   useAccuracy = false
  // ) => {
  //   try {
  //     if (quizathonId) {
  //       await getIndividualLeaderboardStat();
  //     }
  //   } catch (error) {
  //     handleError(error);
  //   }
  // };

  const handleGetActiveQuizathon = async () => {
    try {
      await getActiveQuizathon();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const handleGetAllActiveQuizathon = async () => {
    try {
      await getAllActiveQuizathon();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const handleGetQuizathonPapersTaken = async () => {
    if (!activeQuizathon?.id) return;
    try {
      await getQuizathonPapersTaken();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const handleGenerateCertificate = async (participantId: string) => {
    try {
      await generateCertificate(participantId).unwrap();
    } catch (error) {
      handleError(error);
    }
  };

  const handleVerifyCertificate = async (participantId: string) => {
    try {
      await verifyCertificate(participantId).unwrap();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return {
    // School list
    getSchoolList,
    schoolList,
    isLoadingSchools,

    // Student info
    submitStudentInfo: handleSubmitStudentInfo,
    isSubmittingInfo,
    editStudentInfo: handleEditStudentInfo,
    isEditingStudentInfo,

    // Participant
    participantDetails: participantDetails?.items?.[0],
    isLoadingParticipant,

    // Leaderboard
    getLeaderboard: handleGetLeaderboard,
    leaderBoardData,
    isLoadingLeaderBoard,
    // getIndividualLeaderboardStat: handleGetIndividualLeaderboardStat,
    singleLeaderBoardData,
    isLoadingSingleLeaderBoard,

    // Participant stats
    participantStats,
    isLoadingParticipantStats,

    // Quizathon data
    getActiveQuizathon: handleGetActiveQuizathon,
    activeQuizathon,
    isLoadingActiveQuizathon,
    getAllActiveQuizathon: handleGetAllActiveQuizathon,
    allActiveQuizathon,
    isLoadingAllActiveQuizathon,

    // Papers taken
    getQuizathonPapersTaken: handleGetQuizathonPapersTaken,
    papersTaken,
    isLoadingPapersTaken,

    // Elapsed time
    quizathonElapsedTime,
    isLoadingQuizathonElapsedTime,

    // History
    quizathonHistory,
    isLoadingQuizathonHistory,

    // Single quizathon
    singleQuizathon,
    isLoadingQuizathon,

    // School leaderboard
    schoolLeaderboard,
    isLoadingSchoolLeaderboard,

    // Certificate
    generateCertificate: handleGenerateCertificate,
    verifyCertificate: handleVerifyCertificate,
    isGeneratingCertificate: isGeneratingCertificate || isVerifyingCertificate,

    // Accuracy leaderboard
    rankingData,
    isLoadingRanking,

    // Genius leaderboard
    geniusLeaderboardData,
    isLoadingGeniusLeaderboard,

    // Daily leaderboard
    dailyLeaderBoard,
    isLoadingDailyLeaderBoard,

    // Computed states
    isQuizathonInProgress,
    hasQuizathonStarted,
    hasQuizathonEnded,
  };
};

export type LeaderboardType = 'accuracy' | 'score' | 'genius';

export default useQuizathon;
