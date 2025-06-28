import React, { useEffect, useMemo, useState } from 'react';
import { Box, Modal, ModalBody } from '@flexisaf/flexibull2';
// import { Switch } from 'antd';
import styled from 'styled-components';
import SubscriptionCard from './SubscriptionCard';
import useSubscriptionBilling from '../hooks/useSubscriptionBilling';

import {
  SubscriptionPackagePlanView,
  SubscriptionPackageView,
} from 'generated/index';
import { PLAN_FEATURES } from './billingPlans';
import SectionLoader from 'components/custom/sectionLoader';
import { UNDISCOUNTED_PRICES } from './billingPlans';

interface SubscriptionPlansProps {
  onClose: () => void;
  openModal: boolean;
}

export const transformSubscriptionData = (
  subscriptionPackages: SubscriptionPackageView[] | undefined,
  isYearly: boolean
) => {
  if (!subscriptionPackages || !Array.isArray(subscriptionPackages)) return [];

  const planVisualProperties = {
    BASIC_PLAN: {
      priceColor: '#000',
      bgColor: '#fff',
      featureIconColor: '#1D4ED8',
      textColor: '#000',
      isPopular: false,
      planIcon: '#D1D1D6',
    },
    STANDARD_PLAN: {
      priceColor: '#fff',
      bgColor: '#1D4ED8',
      featureIconColor: '#fff',
      textColor: '#fff',
      isPopular: true,
      planIcon: '#fff',
    },
    PREMIUM_PLAN: {
      priceColor: '#000',
      bgColor: '#fff',
      featureIconColor: '#1D4ED8',
      textColor: '#000',
      isPopular: false,
      planIcon: '#198155',
    },
  };

  const getPriceInfo = (
    packagePlan: SubscriptionPackagePlanView[],
    planCode: string
  ) => {
    if (!packagePlan || !packagePlan.length)
      return {
        price: 0,
        originalPrice: 0,
        discountPercentage: 0,
        isDiscounted: false,
      };

    const billingPeriod = isYearly ? 'YEARLY' : 'MONTHLY';
    const matchingPlan = packagePlan.find(
      (plan) => plan.plan?.type?.toUpperCase() === billingPeriod
    );

    const currentPrice = matchingPlan?.plan?.price || 0;

    const originalPrice =
      UNDISCOUNTED_PRICES[planCode]?.[billingPeriod] ?? currentPrice;

    const isDiscounted = originalPrice > currentPrice;
    const discountPercentage = isDiscounted
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : 0;

    return {
      price: currentPrice,
      originalPrice,
      discountPercentage,
      isDiscounted,
    };
  };

  const transformedData = subscriptionPackages.map(
    (plan: SubscriptionPackageView) => {
      const { price, originalPrice, discountPercentage, isDiscounted } =
        getPriceInfo(plan.packagePlan || [], plan.code as string);
      const visualProps =
        planVisualProperties[plan.code as keyof typeof planVisualProperties];

      let features = plan?.propertyPlan
        ?.map((prop) => {
          if (prop.value === '0' || prop.value === null) return null;

          let text;
          switch (prop.name) {
            case 'KEYPOINTS':
              text = `Generate up to ${
                prop.value
              } keypoints/${prop?.durationType?.toLowerCase()}`;
              break;
            case 'FLASHCARD':
              text = `Generate up to ${
                prop.value
              } flashcards/${prop?.durationType?.toLowerCase()}`;
              break;
            case 'STUDY_PAL':
              text = `Use study pal to generate ${
                prop.value
              } prompts/${prop?.durationType?.toLowerCase()}`;
              break;
            case 'PRACTICE_QUESTIONS':
              text = `Practice ${
                prop.value
              } questions/${prop?.durationType?.toLowerCase()}`;
              break;
            case 'QUIZATON_CERTIFICATE':
              text = `Certificate generation for ₦${prop.value}`;
              break;
            default:
              text = `${prop.name}: ${
                prop.value
              } per ${prop?.durationType?.toLowerCase()}`;
          }

          return {
            text,
          };
        })
        .filter((feature): feature is { text: string } => feature !== null);

      // Override dynamic premium package features
      if (plan.code === 'PREMIUM_PLAN') {
        features = PLAN_FEATURES.PREMIUM_PLAN;
      } else {
        features?.push(
          ...PLAN_FEATURES[plan.code as keyof typeof PLAN_FEATURES]
        );
      }

      return {
        ...plan,
        planCode: plan.code,
        title: plan.name ?? 'Subscription Plan',
        price: price === 0 ? '₦0' : `₦${price.toLocaleString()}`,
        originalPrice: `₦${originalPrice.toLocaleString()}`,
        isDiscounted,
        discountPercentage,
        ...visualProps,
        features,
        subscriptionCode: plan?.packagePlan?.find(
          (p) =>
            p.plan?.type?.toUpperCase() === (isYearly ? 'YEARLY' : 'MONTHLY')
        )?.subscriptionCode,
        packagePlan: plan.packagePlan?.filter(
          (p) =>
            p.plan?.type?.toUpperCase() === (isYearly ? 'YEARLY' : 'MONTHLY')
        ),
      };
    }
  );

  const planOrder: Record<string, number> = {
    BASIC_PLAN: 1,
    STANDARD_PLAN: 2,
    PREMIUM_PLAN: 3,
  };

  return transformedData.sort((a, b) => {
    const orderA = planOrder[a.planCode || ''] || 99;
    const orderB = planOrder[b.planCode || ''] || 99;
    return orderA - orderB;
  });
};
const SubscriptionPlansModal: React.FC<SubscriptionPlansProps> = ({
  onClose,
  openModal,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isYearly, setIsYearly] = useState(false);
  const {
    loadingPlans,
    subscriptionPackages,
    getSubscriptionPackages,
    getActivePlan,
    activePlan,
    loadingActivePlan,
  } = useSubscriptionBilling();

  useEffect(() => {
    if (!openModal) return;
    getSubscriptionPackages();
    getActivePlan();
  }, [openModal]);

  const transformedPlans = useMemo(() => {
    return transformSubscriptionData(subscriptionPackages, isYearly);
  }, [subscriptionPackages, isYearly]);

  return (
    <Modal onClose={onClose} open={openModal} outerclick>
      <ModalBody style={{ maxWidth: '1200px' }} width="90%">
        <Box>
          {loadingPlans || loadingActivePlan ? (
            <SectionLoader />
          ) : (
            <>
              {/* <ToggleContainer>
                <Text>Monthly</Text>
                <Switch
                  checked={isYearly}
                  onChange={() => setIsYearly(!isYearly)}
                />
              </ToggleContainer> */}
              <PricingContainer>
                {transformedPlans?.map((plan) => (
                  <SubscriptionCard
                    {...plan}
                    planCode={plan.code || ''}
                    onClose={onClose}
                    activePlan={activePlan?.subscriptionPackage?.code}
                    isYearly={isYearly}
                    isDiscounted={plan.isDiscounted}
                    originalPrice={plan.originalPrice}
                    discountPercentage={plan.discountPercentage}
                  />
                ))}
              </PricingContainer>
            </>
          )}
        </Box>
      </ModalBody>
    </Modal>
  );
};

export default SubscriptionPlansModal;

const PricingContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax('min-content', 1fr));
  gap: 1rem;
  padding: 40px 10px;
  margin: 0 auto;
  justify-items: center;

  @media (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 40px;
    margin: 0 auto;

    & > * {
      flex: 0 1 340px;
      margin: 0.5rem;
    }
  }

  & > *:last-child:nth-child(odd) {
    grid-column-end: -1;
    grid-column-start: 1;

    @media (min-width: 768px) {
      margin-left: auto;
      margin-right: auto;
    }
  }
`;

// const ToggleContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 1rem;
//   margin-bottom: 2rem;
// `;
