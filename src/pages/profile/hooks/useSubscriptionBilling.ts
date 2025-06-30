// import { Notify } from '@flexisaf/flexibull2';
import {
  useEnhancedGetActivePlanQuery,
  useEnhancedGetSubscriptionPackagesQuery,
  useEnhancedGetSubscriptionHistoryQuery,
  useEnhancedGetFeatureLimitQuery,
  useEnhancedCancelSubscriptionMutation,
} from 'store/enhancedApi';
import { useState } from 'react';
import { DistinctionFeatureProperty, PLATFORM } from 'utils/constants';
import { handleError } from 'utils/errorHandlers';

export type DistinctionFeature = {
  property: DistinctionFeatureProperty;
};
const useSubscriptionBilling = () => {
  // Subscription Packages
  const {
    data: subscriptionPackagesData,
    isLoading: loadingPlans,
    refetch: refetchSubscriptionPackages,
  } = useEnhancedGetSubscriptionPackagesQuery({ institutionId: PLATFORM });

  // Active Plan
  const {
    data: activePlan,
    isLoading: loadingActivePlan,
    refetch: refetchActivePlan,
  } = useEnhancedGetActivePlanQuery();

  // Subscription History
  const [historyParams, setHistoryParams] = useState({ page: 1, size: 10 });
  const {
    data: subscriptionHistory,
    isLoading: loadingHistory,
    // refetch: refetchSubscriptionHistory,
  } = useEnhancedGetSubscriptionHistoryQuery(historyParams);

  // Feature Limit
  const [featurePayload, setFeaturePayload] =
    useState<DistinctionFeature | null>(null);
  const {
    data: featureLimitData,
    isLoading: loadingFeatureLimit,
    isSuccess: isSuccessFeatureLimit,
    // refetch: refetchFeatureLimit,
  } = useEnhancedGetFeatureLimitQuery(featurePayload as any, {
    skip: !featurePayload,
  });

  const getFeatureLimit = (payload: DistinctionFeature) => {
    setFeaturePayload(payload);
  };

  // Cancel Subscription
  const [cancelSubscription, { isLoading: isCancellingSubscription }] =
    useEnhancedCancelSubscriptionMutation();

  return {
    subscriptionPackages: subscriptionPackagesData?.items,
    loadingPlans,
    refetchSubscriptionPackages,
    loadingActivePlan,
    activePlan,
    refetchActivePlan,
    getSubscriptionHistory: setHistoryParams,
    loadingHistory,
    subscriptionHistory,
    getFeatureLimit,
    featureLimitData,
    isSuccessFeatureLimit,
    loadingFeatureLimit,
    cancelSubscription,
    isCancellingSubscription,
  };
};

export default useSubscriptionBilling;
