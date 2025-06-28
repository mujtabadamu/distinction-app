import { Notify } from '@flexisaf/flexibull2';
import {
  DistinctionPortalPlansService,
  DistinctionPortalSubscriptionsService,
  SubscriptionPackageView,
  SubscriptionView,
  PaginatedSubscriptionHistoryView,
  DistinctionPortalTransactionsService,
} from 'generated/index';
import { useState } from 'react';
import { DistinctionFeatureProperty, PLATFORM } from 'utils/constants';
import { handleError } from 'utils/errorHandlers';
import { apiWrapper } from 'utils/http-client';

type SubscriptionHistoryPayload = {
  page?: number;
  size?: number;
};

export type DistinctionFeature = {
  property: DistinctionFeatureProperty;
};
const useSubscriptionBilling = () => {
  const [loadingPlans, setLoadingPlans] = useState<boolean>(false);
  const [loadingActivePlan, setLoadingActivePlan] = useState<boolean>(false);
  const [loadingHistory, setLoadingHistory] = useState<boolean>(false);
  const [loadingFeatureLimit, setLoadingFeatureLimit] =
    useState<boolean>(false);
  const [isCancellingSubscription, setIsCancellingSubscription] =
    useState<boolean>(false);
  const [isVerifyingSubscription, setIsVerifyingSubscription] =
    useState<boolean>(false);

  const [subscriptionPackages, setSubscriptionPackages] = useState<
    SubscriptionPackageView[] | undefined
  >(undefined);
  const [activePlan, setActivePlan] = useState<SubscriptionView | null>(null);
  const [subscriptionHistory, setSubscriptionHistory] =
    useState<PaginatedSubscriptionHistoryView | null>(null);

  const getSubscriptionPackages = async () => {
    setLoadingPlans(true);
    try {
      const data = await apiWrapper(() =>
        DistinctionPortalPlansService.list28({
          institutionId: PLATFORM,
        })
      );
      setSubscriptionPackages(data.items);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      setLoadingPlans(false);
    }
  };

  const getActivePlan = async () => {
    setLoadingActivePlan(true);
    try {
      const data = await apiWrapper(() =>
        DistinctionPortalSubscriptionsService.getSubscription()
      );
      setActivePlan(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      setLoadingActivePlan(false);
    }
  };

  const getSubscriptionHistory = async (
    payload: SubscriptionHistoryPayload
  ) => {
    setLoadingHistory(true);
    try {
      const data = await apiWrapper(() =>
        DistinctionPortalSubscriptionsService.list27({ ...payload })
      );

      setSubscriptionHistory(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      setLoadingHistory(false);
    }
  };

  const getFeatureLimit = async (payload: DistinctionFeature) => {
    setLoadingFeatureLimit(true);
    try {
      const data = await apiWrapper(() =>
        DistinctionPortalSubscriptionsService.getPlanLimit({ ...payload })
      );
      return {
        success: true,
        balance: data.balance,
      };
    } catch (error) {
      handleError(error);
      return {
        success: false,
      };
    } finally {
      setLoadingFeatureLimit(false);
    }
  };

  const cancelSubscription = async (cb: () => void) => {
    setIsCancellingSubscription(true);
    try {
      await apiWrapper(() =>
        DistinctionPortalSubscriptionsService.cancelSubscription()
      );
      Notify('Subscription cancelled successfully', { status: 'success' });
      cb();
    } catch (error) {
      handleError(error);
    } finally {
      setIsCancellingSubscription(false);
    }
  };

  const verifySubscription = async (
    payload: {
      transactionId?: string;
      referenceId?: string;
    },
    callback: () => void
  ) => {
    setIsVerifyingSubscription(true);
    try {
      await apiWrapper(() =>
        DistinctionPortalTransactionsService.verify1({
          platform: 'PAYSTACK',
          ...payload,
        })
      );
      callback();
    } catch (error) {
      handleError(error);
    } finally {
      setIsVerifyingSubscription(false);
    }
  };

  return {
    subscriptionPackages,
    loadingPlans,
    getSubscriptionPackages,
    loadingActivePlan,
    activePlan,
    getActivePlan,
    getSubscriptionHistory,
    loadingHistory,
    subscriptionHistory,
    getFeatureLimit,
    loadingFeatureLimit,
    cancelSubscription,
    isCancellingSubscription,
    isVerifyingSubscription,
    verifySubscription,
  };
};

export default useSubscriptionBilling;
