import {
  DistinctionProfileService,
  DistinctionRewardService,
  PaginatedReferralView,
  ReferralStatisticsView,
  // RewardRequestDTO,
} from 'generated/index';
import usePaginationWrapper from 'hooks/general/usePaginationWrapper';
import { useState, useCallback, useEffect } from 'react';
import { handleError } from 'utils/errorHandlers';
import { apiWrapper } from 'utils/http-client';
import { Notify } from '@flexisaf/flexibull2';
import { AirtimeRewardDTO } from 'generated/index';

const useReferrals = (studentId: string) => {
  const [isLoadingReferrals, setIsLoadingReferrals] = useState<boolean>(false);
  const [referrals, setReferrals] = useState<PaginatedReferralView | null>(
    null
  );
  const [isLoadingReferralCode, setIsLoadingReferralCode] =
    useState<boolean>(false);
  const [referralCode, setReferralCode] = useState<any>(null);
  const [isLoadingReferralStats, setIsLoadingReferralStats] =
    useState<boolean>(false);
  const [referralStats, setReferralStats] =
    useState<ReferralStatisticsView | null>(null);
  const [isLoadingRewardRequest, setIsLoadingRewardRequest] =
    useState<boolean>(false);
  const [isSendingInvitation, setIsSendingInvitation] =
    useState<boolean>(false);
  const [requestError, setRequestError] = useState<string | null>('');
  const [airtimeSuccess, setAirtimeSuccess] = useState<AirtimeRewardDTO | null>(
    null
  );
  const [paymentHistory, setPaymentHistory] = useState<
    AirtimeRewardDTO[] | null
  >(null);
  const [isLoadingPaymentHistory, setIsLoadingPaymentHistory] =
    useState<boolean>(false);
  const {
    limit,
    searchText,
    page,
    setPage,
    debouncedSearchText,
    setLimit,
    setSearchText,
    pageOptions,
    setOffset,
  } = usePaginationWrapper({ defaultLimit: 10 });

  const sendInvite = async (referredEmail: string) => {
    setIsSendingInvitation(true);
    try {
      await DistinctionProfileService.createReferral({
        referredEmail,
      });
      setIsSendingInvitation(false);
      Notify('Invitation sent successfully', { status: 'success' });
    } catch (error) {
      setIsSendingInvitation(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
      handleError(error);
    }
  };

  const requestReward = async (payload: any, callback: () => void) => {
    setIsLoadingRewardRequest(true);
    setRequestError(null);
    try {
      const res = await apiWrapper(() =>
        DistinctionRewardService.requestReward({ requestBody: payload })
      );
      setAirtimeSuccess(res);
      setIsLoadingRewardRequest(false);
      Notify('Reward Claimed Successfully', { status: 'success' });
      callback();
    } catch (error: any) {
      setIsLoadingRewardRequest(false);
      setRequestError(error);
      if (error instanceof Error) {
        console.error(error.message);
      }
      handleError(error);
    }
  };

  const getReferralStats = async (studentId: string) => {
    setIsLoadingReferralStats(true);
    try {
      const data = await apiWrapper(() =>
        DistinctionProfileService.statisticsReferral({ studentId })
      );
      setReferralStats(data);
      setIsLoadingReferralStats(false);
    } catch (error) {
      setIsLoadingReferralStats(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const getReferralCode = async (studentId: string) => {
    setIsLoadingReferralCode(true);
    try {
      const data = await apiWrapper(() =>
        DistinctionProfileService.getStudentReferralCode1({ studentId })
      );
      setReferralCode(data);
      setIsLoadingReferralCode(false);
    } catch (error) {
      setIsLoadingReferralCode(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const getReferrals = useCallback(
    async (studentId: string) => {
      setIsLoadingReferrals(true);
      try {
        const data = await apiWrapper(() =>
          DistinctionProfileService.getReferrals({
            studentId,
            page: page - 1,
            size: limit,
            ...(searchText ? { keyword: debouncedSearchText } : {}),
          })
        );
        setReferrals(data);
        setIsLoadingReferrals(false);
      } catch (error) {
        setIsLoadingReferrals(false);
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    },
    [page, limit, searchText, debouncedSearchText]
  );

  const getPaymentHistory = async (studentId: string) => {
    setIsLoadingPaymentHistory(true);
    try {
      const data = await apiWrapper(() =>
        DistinctionRewardService.getAirtimeRewardsByStudentId({ studentId })
      );
      setPaymentHistory(data);
      setIsLoadingPaymentHistory(false);
    } catch (error) {
      setIsLoadingPaymentHistory(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (!studentId) return;
    getReferrals(studentId);
  }, [page, limit, debouncedSearchText, studentId]);

  return {
    isLoadingReferrals,
    getReferrals,
    referrals,
    setSearchText,
    page,
    setPage,
    pageOptions,
    setOffset,
    limit,
    setLimit,
    isLoadingReferralCode,
    getReferralCode,
    referralCode,
    referralStats,
    isLoadingReferralStats,
    getReferralStats,
    isLoadingRewardRequest,
    requestReward,
    sendInvite,
    isSendingInvitation,
    requestError,
    airtimeSuccess,
    paymentHistory,
    isLoadingPaymentHistory,
    getPaymentHistory,
  };
};

export default useReferrals;
