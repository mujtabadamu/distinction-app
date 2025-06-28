import { Notify } from '@flexisaf/flexibull2';
import {
  CertificateDto,
  PaginatedAccuracyRankingView,
  PaginatedSchoolLeaderboardView,
  PaginatedScoreLeaderboardView,
  PaginatedSimpleSchoolView,
  PaginatedStudentPaperSimpleView,
  ParticipantResultStatsView,
  ParticipantTimeElapsedView,
  PortalStudentPapersService,
  QuizathonService,
  QuizathonView,
  PaginatedQuizathonView,
  SchoolsService,
  ScoreLeaderboardView,
  SimpleParticipantView,
  SimpleQuizathonView,
  ParticipantRequest,
  PaginatedDailyLeaderBoardView,
  Quizathon,
} from 'generated/index';
import { useState, useMemo } from 'react';
import { handleError } from 'utils/errorHandlers';
import { apiWrapper } from 'utils/http-client';
import {
  getActiveQuizathonUtil,
  quizathonInProgress,
  quizathonEnded,
  quizathonStarted,
} from 'utils/quizathon';

type GetParticipantStatsPayload = {
  studentId: string;
  quizathonId?: string;
};
type GetParticipantpayload = {
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

const useQuizathon = () => {
  const [isLoadingSchools, setIsLoadingSchools] = useState<boolean>(false);
  const [isSubmittingInfo, setIsSubmittingInfo] = useState<boolean>(false);
  const [isLoadingParticipant, setIsLoadingParticipant] =
    useState<boolean>(false);
  const [isLoadingParticipantStats, setIsLoadingParticipantStats] =
    useState<boolean>(false);
  const [isLoadingActiveQuizathon, setIsLoadingActiveQuizathon] =
    useState<boolean>(true);
  const [isLoadingAllActiveQuizathon, setIsLoadingAllActiveQuizathon] =
    useState<boolean>(true);
  const [isLoadingPapersTaken, setIsLoadingPapersTaken] =
    useState<boolean>(false);
  const [isLoadingQuizathonElapsedTime, setIsLoadingQuizathonElapsedTime] =
    useState<boolean>(true);
  const [isLoadingRanking, setIsLoadingRanking] = useState<boolean>(false);
  const [isLoadingQuizathonHistory, setIsLoadingQuizathonHistory] =
    useState<boolean>(false);
  const [isLoadingQuizathon, setIsLoadingQuizathon] = useState<boolean>(false);
  const [isLoadingLeaderBoard, setIsLoadingLeaderBoard] =
    useState<boolean>(false);
  const [isLoadingSchoolLeaderboard, setIsLoadingSchoolLeaderboard] =
    useState<boolean>(false);
  const [isGeneratingCertificate, setIsGeneratingCertificate] =
    useState<boolean>(false);
  const [isLoadingSingleLeaderBoard, setIsLoadingSingleLeaderBoard] =
    useState<boolean>(false);
  const [isLoadingDailyLeaderBoard, setIsLoadingDailyLeaderBoard] =
    useState<boolean>(false);

  const [certificateData, setCertificateData] = useState<CertificateDto | null>(
    null
  );
  const [dailyLeaderBoard, setDailyLeaderBoard] =
    useState<PaginatedDailyLeaderBoardView | null>(null);
  const [schoolLeaderboard, setSchoolLeaderboard] =
    useState<PaginatedSchoolLeaderboardView | null>(null);
  const [leaderBoardData, setLeaderBoardData] =
    useState<PaginatedScoreLeaderboardView | null>(null);

  const [singleLeaderBoardData, setSingleLeaderBoardData] = useState<
    ScoreLeaderboardView | undefined
  >(undefined);

  const [quizathonHistory, setQuizathonHistory] =
    useState<PaginatedQuizathonView | null>(null);
  const [singleQuizathon, setSingleQuizathon] = useState<Quizathon | null>(
    null
  );
  const [schoolList, setSchoolList] =
    useState<PaginatedSimpleSchoolView | null>(null);
  const [participantDetails, setParticipantDetails] = useState<
    SimpleParticipantView | undefined
  >(undefined);
  const [participantStats, setParticipantStats] =
    useState<ParticipantResultStatsView | null>(null);
  const [activeQuizathon, setActiveQuizathon] = useState<
    QuizathonView | undefined
  >(undefined);

  const [allActiveQuizathon, setAllActiveQuizathon] = useState<
    SimpleQuizathonView[] | undefined
  >(undefined);
  const [papersTaken, setPapersTaken] =
    useState<PaginatedStudentPaperSimpleView | null>(null);
  const [quizathonElapsedTime, setQuizathonElapsedTime] =
    useState<ParticipantTimeElapsedView | null>(null);
  const [rankingData, setRankingData] =
    useState<PaginatedAccuracyRankingView | null>(null);

  const getSchoolList = async () => {
    setIsLoadingSchools(true);
    try {
      const data = await apiWrapper(() => SchoolsService.list4({ size: -1 }));
      setSchoolList(data);
      setIsLoadingSchools(false);
    } catch (error) {
      setIsLoadingSchools(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const submitStudentInfo = async (
    payload: ParticipantRequest,
    callback: () => void
  ) => {
    setIsSubmittingInfo(true);
    try {
      await apiWrapper(() =>
        QuizathonService.create6({
          requestBody: payload,
        })
      );
      Notify('Registered successfully', { status: 'success' });
      setIsSubmittingInfo(false);
      callback();
    } catch (error) {
      setIsSubmittingInfo(false);
      handleError(error);
    }
  };

  const editStudentInfo = async (
    participantId: string,
    payload: ParticipantRequest,
    callback: () => void
  ) => {
    setIsSubmittingInfo(true);
    try {
      await apiWrapper(() =>
        QuizathonService.update6({
          id: participantId,
          requestBody: payload,
        })
      );
      setIsSubmittingInfo(false);
      callback();
    } catch (error) {
      setIsSubmittingInfo(false);
      handleError(error);
    }
  };

  const getParticipant = async (payload: GetParticipantpayload) => {
    setIsLoadingParticipant(true);
    try {
      const data = await apiWrapper(() => QuizathonService.list6(payload));
      setParticipantDetails(data.items?.[0]);
      setIsLoadingParticipant(false);
    } catch (error) {
      setIsLoadingParticipant(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const getLeaderboard = async (payload: GetLeaderBoardPayload) => {
    setIsLoadingLeaderBoard(true);
    try {
      const data = await apiWrapper(() =>
        QuizathonService.getLeaderboard({ ...payload })
      );
      setLeaderBoardData(data);
      setIsLoadingLeaderBoard(false);
    } catch (error) {
      setIsLoadingLeaderBoard(false);
      handleError(error);
    }
  };

  // pass flag to switch between accuracy and score leaderboard
  const getIndividualLeaderboardStat = async (
    payload: GetLeaderBoardPayload,
    useAccuracy = false
  ) => {
    setIsLoadingSingleLeaderBoard(true);
    try {
      const data = await apiWrapper(() =>
        useAccuracy
          ? QuizathonService.getLeaderboardRankings({ ...payload })
          : QuizathonService.getLeaderboard({ ...payload })
      );
      setSingleLeaderBoardData(data.items?.[0]);
      setIsLoadingSingleLeaderBoard(false);
    } catch (error) {
      setIsLoadingSingleLeaderBoard(false);
      handleError(error);
    }
  };

  const getParticipantStats = async (payload: GetParticipantStatsPayload) => {
    setIsLoadingParticipantStats(true);
    try {
      const data = await apiWrapper(() =>
        QuizathonService.getParticipantStats({
          ...payload,
          quizathonId: activeQuizathon?.id ?? '',
        })
      );
      setParticipantStats(data);
      setIsLoadingParticipantStats(false);
    } catch (error) {
      setIsLoadingParticipantStats(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const getActiveQuizathon = async () => {
    setIsLoadingActiveQuizathon(true);
    try {
      const data = await apiWrapper(() =>
        QuizathonService.getActiveQuizathon()
      );
      const activeQuizathon = getActiveQuizathonUtil(data ?? []);
      setActiveQuizathon(activeQuizathon);
      setIsLoadingActiveQuizathon(false);
    } catch (error) {
      setIsLoadingActiveQuizathon(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const getAllActiveQuizathon = async () => {
    setIsLoadingAllActiveQuizathon(true);
    try {
      const data = await apiWrapper(() =>
        QuizathonService.getActiveQuizathon()
      );
      setAllActiveQuizathon(data);
      setIsLoadingAllActiveQuizathon(false);
    } catch (error) {
      setIsLoadingAllActiveQuizathon(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };
  const getQuizathonPapersTaken = async () => {
    if (!activeQuizathon?.id) return;
    setIsLoadingPapersTaken(true);
    try {
      const data = await apiWrapper(() =>
        PortalStudentPapersService.studentQuizathonPapers({
          size: 50,
          quizathonId: activeQuizathon?.id ?? '',
        })
      );
      setIsLoadingPapersTaken(false);
      setPapersTaken(data);
    } catch (error) {
      setIsLoadingPapersTaken(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const getQuizathonElapsedTime = async (
    studentId: string,
    quizathonId: string
  ) => {
    setIsLoadingQuizathonElapsedTime(true);
    try {
      const data = await apiWrapper(() =>
        QuizathonService.getTotalTimeElapsed({ studentId, quizathonId })
      );
      setQuizathonElapsedTime(data);
      setIsLoadingQuizathonElapsedTime(false);
    } catch (error) {
      setIsLoadingQuizathonElapsedTime(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const getQuizathonHistory = async (payload: GetHistoryPayload) => {
    setIsLoadingQuizathonHistory(true);
    try {
      const data = await apiWrapper(() =>
        QuizathonService.list5({
          ...payload,
        })
      );
      setQuizathonHistory(data);
      setIsLoadingQuizathonHistory(false);
    } catch (error) {
      setIsLoadingQuizathonHistory(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const getSingleQuizathon = async (id: string) => {
    setIsLoadingQuizathon(true);
    try {
      const data = await apiWrapper(() => QuizathonService.get1({ id }));
      setSingleQuizathon(data);
      setIsLoadingQuizathon(false);
    } catch (error) {
      setIsLoadingQuizathon(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };
  const getSchoolLeaderboard = async (payload: GetLeaderBoardPayload) => {
    setIsLoadingSchoolLeaderboard(true);
    try {
      const data = await apiWrapper(() =>
        QuizathonService.universityLeaderboard({ ...payload })
      );
      setSchoolLeaderboard(data);
      setIsLoadingSchoolLeaderboard(false);
    } catch (error) {
      setIsLoadingSchoolLeaderboard(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const generateCertificate = async (participantId: string) => {
    setIsGeneratingCertificate(true);
    try {
      const data = await apiWrapper(() =>
        QuizathonService.getCertificate({ participantId })
      );
      setCertificateData(data);
      setIsGeneratingCertificate(false);
    } catch (error) {
      setIsGeneratingCertificate(false);
      handleError(error);
    }
  };

  const verifyCertificate = async (participantId: string) => {
    setIsGeneratingCertificate(true);
    try {
      const data = await apiWrapper(() =>
        QuizathonService.verifyCertificate({ participantId })
      );
      setCertificateData(data);
      setIsGeneratingCertificate(false);
    } catch (error) {
      setIsGeneratingCertificate(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const getAccuracyLeaderboard = async (
    payload: Omit<GetLeaderBoardPayload, 'keyword' | 'schoolId'>
  ) => {
    setIsLoadingRanking(true);
    try {
      const data = await apiWrapper(() =>
        QuizathonService.getLeaderboardRankings({ ...payload })
      );
      setRankingData(data);
      setIsLoadingRanking(false);
    } catch (error) {
      setIsLoadingRanking(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const getQuizathonDailyLeaderBoard = async (
    payload: GetLoaderBoardDailyPayload
  ) => {
    setIsLoadingDailyLeaderBoard(true);
    try {
      const data = await apiWrapper(() =>
        QuizathonService.getLeaderboard1(payload)
      );
      setDailyLeaderBoard(data);
      setIsLoadingDailyLeaderBoard(false);
    } catch (error) {
      setIsLoadingDailyLeaderBoard(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

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
  return {
    getSchoolList,
    schoolList,
    isLoadingSchools,
    submitStudentInfo,
    isSubmittingInfo,
    participantDetails,
    isLoadingParticipant,
    getParticipant,
    isLoadingParticipantStats,
    getParticipantStats,
    participantStats,
    editStudentInfo,
    getActiveQuizathon,
    getAllActiveQuizathon,
    allActiveQuizathon,
    isLoadingAllActiveQuizathon,
    activeQuizathon,
    isLoadingActiveQuizathon,
    getQuizathonPapersTaken,
    isLoadingPapersTaken,
    papersTaken,
    quizathonElapsedTime,
    isLoadingQuizathonElapsedTime,
    getQuizathonElapsedTime,
    getAccuracyLeaderboard,
    rankingData,
    isLoadingRanking,
    isLoadingQuizathonHistory,
    quizathonHistory,
    getQuizathonHistory,
    getLeaderboard,
    isLoadingLeaderBoard,
    leaderBoardData,
    isLoadingSchoolLeaderboard,
    schoolLeaderboard,
    getSchoolLeaderboard,
    isGeneratingCertificate,
    certificateData,
    generateCertificate,
    verifyCertificate,
    isLoadingSingleLeaderBoard,
    singleLeaderBoardData,
    getIndividualLeaderboardStat,
    dailyLeaderBoard,
    isLoadingDailyLeaderBoard,
    getQuizathonDailyLeaderBoard,
    isQuizathonInProgress,
    hasQuizathonStarted,
    hasQuizathonEnded,
    getSingleQuizathon,
    isLoadingQuizathon,
    singleQuizathon,
  };
};

export default useQuizathon;
