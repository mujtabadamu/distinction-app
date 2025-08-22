import {
  PaginatedReferralView,
  ReferralStatisticsView,
  AirtimeRewardDto,
  RewardRequestDto,
} from '../../../store/result';
import { useState } from 'react';
import { handleError } from 'utils/errorHandlers';
import { Notify } from '@flexisaf/flexibull2';
import usePaginationWrapper from 'hooks/general/usePaginationWrapper';
import {
  useEnhancedCreateReferralMutation,
  useEnhancedGetReferralStatisticsQuery,
  useEnhancedGetStudentReferralCodeQuery,
  useEnhancedGetReferralsQuery,
  useEnhancedRequestRewardMutation,
  useEnhancedGetAirtimeRewardsByStudentIdQuery,
} from '../../../store/enhancedApi';

const useReferrals = (studentId: string) => {
  const [requestError, setRequestError] = useState<string | null>('');
  const [airtimeSuccess, setAirtimeSuccess] = useState<AirtimeRewardDto | null>(
    null
  );

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

  // RTK Query hooks
  const [createReferral, { isLoading: isSendingInvitation }] =
    useEnhancedCreateReferralMutation();
  const [requestReward, { isLoading: isLoadingRewardRequest }] =
    useEnhancedRequestRewardMutation();

  // Query hooks
  const { data: referrals, isLoading: isLoadingReferrals } =
    useEnhancedGetReferralsQuery(
      {
        studentId,
        page: page - 1,
        size: limit,
        ...(searchText ? { keyword: debouncedSearchText } : {}),
      },
      { skip: !studentId }
    );

  const { data: referralStats, isLoading: isLoadingReferralStats } =
    useEnhancedGetReferralStatisticsQuery({ studentId }, { skip: !studentId });

  const { data: referralCode, isLoading: isLoadingReferralCode } =
    useEnhancedGetStudentReferralCodeQuery({ studentId }, { skip: !studentId });

  const { data: paymentHistory, isLoading: isLoadingPaymentHistory } =
    useEnhancedGetAirtimeRewardsByStudentIdQuery(
      { studentId },
      { skip: !studentId }
    );

  const sendInvite = async (referredEmail: string) => {
    try {
      await createReferral({ referredEmail }).unwrap();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      handleError(error);
    }
  };

  const handleRequestReward = async (
    payload: RewardRequestDto,
    callback: () => void
  ) => {
    setRequestError(null);
    try {
      const res = await requestReward({ requestBody: payload }).unwrap();
      setAirtimeSuccess(res);
      callback();
    } catch (error: any) {
      setRequestError(error);
      if (error instanceof Error) {
        console.error(error.message);
      }
      handleError(error);
    }
  };

  return {
    isLoadingReferrals,
    referrals,
    setSearchText,
    page,
    setPage,
    pageOptions,
    setOffset,
    limit,
    setLimit,
    isLoadingReferralCode,
    referralCode,
    referralStats,
    isLoadingReferralStats,
    isLoadingRewardRequest,
    handleRequestReward,
    sendInvite,
    isSendingInvitation,
    requestError,
    airtimeSuccess,
    paymentHistory,
    isLoadingPaymentHistory,
  };
};

export default useReferrals;
