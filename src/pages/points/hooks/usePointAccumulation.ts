import {
  BadgesDto,
  GlobalRankingDto,
  PointAccumulationSystemService,
  SchoolRankingDto,
  TotalPointsDto,
  UserRankDto,
} from 'generated/index';
import { useState } from 'react';
import { apiWrapper } from 'utils/http-client';

type GetSchoolRankPayload = {
  schoolId: string;
  userId?: string;
  page?: number;
  limit?: number;
};

type GetGlobalRankPayload = Omit<GetSchoolRankPayload, 'schoolId'>;

const usePointAccumulation = () => {
  const [totalPoints, setTotalPoints] = useState<TotalPointsDto | null>(null);
  const [badges, setBadges] = useState<BadgesDto | null>(null);
  const [schoolRanking, setSchoolRanking] = useState<SchoolRankingDto | null>(
    null
  );
  const [globalRanking, setGlobalRanking] = useState<GlobalRankingDto | null>(
    null
  );
  const [topInstitutionStudents, setTopInstitutionStudents] = useState<
    UserRankDto[] | []
  >([]);
  const [topDistinctionStudents, setTopDistinctionStudents] = useState<
    UserRankDto[] | []
  >([]);
  const [individualStat, setIndividualStat] = useState<UserRankDto | null>(
    null
  );

  const [isLoadingPoints, setIsLoadingPoints] = useState<boolean>(false);
  const [isLoadingBadges, setIsLoadingBadges] = useState<boolean>(false);
  const [isLoadingRanking, setIsLoadingRanking] = useState<boolean>(false);
  const [isLoadingTopStudents, setIsLoadingTopStudents] =
    useState<boolean>(false);
  const [isLoadingStat, setIsLoadingStat] = useState<boolean>(false);

  const getTotalPoints = async (userId: string) => {
    setIsLoadingPoints(true);
    try {
      const data = await apiWrapper(() =>
        PointAccumulationSystemService.getTotalPoints({ userId })
      );
      setTotalPoints(data);
      setIsLoadingPoints(false);
    } catch (error) {
      setIsLoadingPoints(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const getBadges = async () => {
    setIsLoadingBadges(true);
    try {
      const data = await apiWrapper(() =>
        PointAccumulationSystemService.getBadges()
      );
      setBadges(data);
      setIsLoadingBadges(false);
    } catch (error) {
      setIsLoadingBadges(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const getSchoolRanking = async (payload: GetSchoolRankPayload) => {
    setIsLoadingRanking(true);
    try {
      const data = await apiWrapper(() =>
        PointAccumulationSystemService.getSchoolRanking({ ...payload })
      );
      setSchoolRanking(data);
      setIsLoadingRanking(false);
    } catch (error) {
      setIsLoadingRanking(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const getSchoolTopStudents = async (schoolId: string) => {
    setIsLoadingTopStudents(true);
    try {
      const data = await apiWrapper(() =>
        PointAccumulationSystemService.getSchoolRanking({ limit: 3, schoolId })
      );
      setTopInstitutionStudents(data.ranking ?? []);
      setIsLoadingTopStudents(false);
    } catch (error) {
      setIsLoadingTopStudents(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const getGlobalRanking = async (payload: GetGlobalRankPayload) => {
    setIsLoadingRanking(true);
    try {
      const data = await apiWrapper(() =>
        PointAccumulationSystemService.getGlobalRanking({ ...payload })
      );
      setGlobalRanking(data);
      setIsLoadingRanking(false);
    } catch (error) {
      setIsLoadingRanking(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const getDistinctionTopStudents = async () => {
    setIsLoadingTopStudents(true);
    try {
      const data = await apiWrapper(() =>
        PointAccumulationSystemService.getGlobalRanking({ limit: 3 })
      );
      setTopDistinctionStudents(data.ranking ?? []);
      setIsLoadingTopStudents(false);
    } catch (error) {
      setIsLoadingTopStudents(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const getIndividualStat = async (
    payload: GetGlobalRankPayload & {
      schoolId?: string;
    },
    useGlobalRanking = false
  ) => {
    setIsLoadingStat(true);
    try {
      const data = await apiWrapper(() =>
        useGlobalRanking
          ? PointAccumulationSystemService.getGlobalRanking({
              userId: payload.userId,
            })
          : PointAccumulationSystemService.getSchoolRanking({
              ...payload,
              schoolId: payload.schoolId as string,
              limit: 1,
            })
      );
      setIndividualStat((data?.ranking ?? [])[0] ?? null);
      setIsLoadingStat(false);
    } catch (error) {
      setIsLoadingStat(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return {
    totalPoints,
    isLoadingPoints,
    getTotalPoints,
    getBadges,
    badges,
    isLoadingBadges,
    schoolRanking,
    isLoadingRanking,
    getSchoolRanking,
    globalRanking,
    getGlobalRanking,
    getSchoolTopStudents,
    topInstitutionStudents,
    isLoadingTopStudents,
    getDistinctionTopStudents,
    topDistinctionStudents,
    getIndividualStat,
    individualStat,
    isLoadingStat,
  };
};

export default usePointAccumulation;
