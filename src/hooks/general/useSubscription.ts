import usePaginationWrapper from 'hooks/general/usePaginationWrapper';
import { useEffect, useState } from 'react';
import { PLATFORM } from 'utils/constants';
import { handleError } from 'utils/errorHandlers';
import {
  useEnhancedGetActivePlanQuery,
  useEnhancedGetSubscriptionPackagesQuery,
  useEnhancedGetSubscriptionHistoryQuery,
  useEnhancedCancelSubscriptionMutation,
  useEnhancedSubscribeMutation,
} from '../../store/enhancedApi';
import { SubscriptionRequest } from '../../generated/models/SubscriptionRequest';

//TODO Remove component after integration of payment
const useSubscription = () => {
  const { page, setPage, limit, setLimit } = usePaginationWrapper({});

  // Enhanced RTK Query hooks
  const {
    data: subscriptionStatus,
    isLoading: loadingSubscriptionStatus,
    refetch: refetchStatus,
  } = useEnhancedGetActivePlanQuery();

  const {
    data: subscriptionPlansData,
    isLoading: loadingPlans,
    refetch: refetchPlans,
  } = useEnhancedGetSubscriptionPackagesQuery({
    institutionId: PLATFORM,
  });

  const {
    data: subscriptionHistory,
    isLoading: loadingHistory,
    refetch: refetchHistory,
  } = useEnhancedGetSubscriptionHistoryQuery({
    page: page,
    size: limit,
  });

  const [cancelSubscription, { isLoading: isCancelling }] =
    useEnhancedCancelSubscriptionMutation();
  const [subscribePlanMutation, { isLoading: isSubscribing }] =
    useEnhancedSubscribeMutation();

  const getStatus = async () => {
    try {
      await refetchStatus();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const getSubscriptionHistory = async () => {
    try {
      await refetchHistory();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const getSubscriptionPlans = async () => {
    try {
      await refetchPlans();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const subscribePlan = async (
    payload: SubscriptionRequest,
    callback: (result: any) => void
  ) => {
    try {
      const result = await subscribePlanMutation({
        subscriptionRequest: payload,
      });
      callback(result);
    } catch (error) {
      handleError(error);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      await cancelSubscription();
      // Refetch status after cancellation
      await refetchStatus();
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    // The enhanced hooks automatically fetch data, so we don't need to call getStatus here
    // But we can keep it for manual refetch if needed
  }, []);

  return {
    loadingSubscriptionStatus,
    subscriptionStatus,
    loadingHistory,
    getSubscriptionHistory,
    subscriptionHistory,
    page,
    setPage,
    limit,
    setLimit,
    loadingPlans,
    subscriptionPlans: subscriptionPlansData?.items,
    getSubscriptionPlans,
    subscribePlan,
    isSubscribingPlan: isSubscribing,
    handleCancelSubscription,
    isCancelling,
  };
};

export default useSubscription;
