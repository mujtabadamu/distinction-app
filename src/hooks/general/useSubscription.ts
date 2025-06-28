import usePaginationWrapper from 'hooks/general/usePaginationWrapper';
import { useEffect, useState } from 'react';
import { PLATFORM } from 'utils/constants';
import { handleError } from 'utils/errorHandlers';
import {
  DistinctionPortalPlansService,
  DistinctionPortalSubscriptionsService,
  SubscriptionPackageView,
} from '../../generated';
import { PaginatedSubscriptionHistoryView } from '../../generated/models/PaginatedSubscriptionHistoryView';
import { SubscriptionRequest } from '../../generated/models/SubscriptionRequest';
import { SubscriptionView } from '../../generated/models/SubscriptionView';
import { apiWrapper } from '../../utils/http-client';
//TODO Remove component after integration of payment
const useSubscription = () => {
  const [loadingSubscriptionStatus, setLoadingSubscriptionStatus] =
    useState<boolean>(false);
  const [subscriptionStatus, setSubscriptionStatus] =
    useState<SubscriptionView | null>(null);
  const [loadingHistory, setLoadingHistory] = useState<boolean>(false);
  const [subscriptionHistory, setSubscriptionHistory] =
    useState<PaginatedSubscriptionHistoryView | null>(null);
  const [loadingPlans, setLoadingPlans] = useState<boolean>(false);
  const [subscriptionPlans, setSubscriptionPlans] = useState<
    SubscriptionPackageView[] | undefined
  >(undefined);
  const [isSubscribingPlan, setIsSubscribingPlan] = useState<boolean>(false);

  const { page, setPage, limit, setLimit } = usePaginationWrapper({});

  const getStatus = async () => {
    setLoadingSubscriptionStatus(true);
    try {
      const data = await apiWrapper(() =>
        DistinctionPortalSubscriptionsService.status()
      );
      setLoadingSubscriptionStatus(false);
      setSubscriptionStatus(data);
    } catch (error) {
      setLoadingSubscriptionStatus(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const getSubscriptionHistory = async () => {
    setLoadingHistory(true);
    try {
      const data = await apiWrapper(() =>
        DistinctionPortalSubscriptionsService.list27({ page: 0, size: limit })
      );
      setLoadingHistory(false);
      setSubscriptionHistory(data);
    } catch (error) {
      setLoadingHistory(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const getSubscriptionPlans = async () => {
    setLoadingPlans(true);
    try {
      const data = await DistinctionPortalPlansService.list28({
        institutionId: PLATFORM,
      });
      setSubscriptionPlans(data.items);
      setLoadingPlans(false);
    } catch (error) {
      setLoadingPlans(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const subscribePlan = async (
    payload: SubscriptionRequest,
    callback: (result: any) => void
  ) => {
    setIsSubscribingPlan(true);
    try {
      const data = await apiWrapper(() =>
        DistinctionPortalSubscriptionsService.subscribe({
          requestBody: payload,
        })
      );
      callback(data);
    } catch (error) {
      setIsSubscribingPlan(false);
      handleError(error);
    }
  };

  useEffect(() => {
    getStatus();
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
    subscriptionPlans,
    getSubscriptionPlans,
    subscribePlan,
    isSubscribingPlan,
  };
};

export default useSubscription;
