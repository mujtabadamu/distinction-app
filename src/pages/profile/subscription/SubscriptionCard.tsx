import React from 'react';
import { Text, Spacer, Notify } from '@flexisaf/flexibull2';
import styled from 'styled-components';
import { IoCopy } from 'react-icons/io5';
import { IoCheckmark } from 'react-icons/io5';
import { Price, FeaturesList, FeatureItem } from '../styles';
import { PaystackButton } from 'react-paystack';
import useProfile from '../hooks/useProfile';
import { PAYSTACK_PB_KEY } from 'utils/constants';
import { SubscriptionPackageView } from 'generated/index';
import useSubscriptionBilling from '../hooks/useSubscriptionBilling';

interface SubscriptionCardProps extends SubscriptionPackageView {
  planCode: string;
  title: string;
  price: string | number;
  features:
    | {
        text: string;
      }[]
    | undefined;
  isPopular: boolean;
  bgColor?: string;
  textColor?: string;
  priceColor?: string;
  featureIconColor?: string;
  planIcon?: string;
  subscriptionCode: string | undefined;
  onClose: () => void;
  activePlan: 'BASIC_PLAN' | 'STANDARD_PLAN' | 'PREMIUM_PLAN' | undefined;
  isYearly: boolean;
  isDiscounted?: boolean;
  originalPrice?: string | number;
  discountPercentage?: number;
}

interface PlanCardProps {
  bgColor?: string;
  textColor?: string;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  planCode,
  title,
  price,
  features,
  isPopular,
  bgColor,
  textColor,
  priceColor,
  planIcon,
  subscriptionCode,
  activePlan,
  isYearly,
  isDiscounted,
  originalPrice,
  discountPercentage,
  ...props
}) => {
  const { profileData } = useProfile();
  const { verifySubscription } = useSubscriptionBilling();
  const numericPrice =
    typeof price === 'string'
      ? parseFloat(price.replace(/₦/g, '').replace(/,/g, '')) * 100
      : Number(price) * 100;

  const config: any = {
    reference: `${planCode}_${new Date().getTime()}`,
    email: profileData?.email || '',
    amount: numericPrice,
    publicKey: PAYSTACK_PB_KEY,
    currency: 'NGN' as const,
    metadata: {
      plan_id: props.packagePlan?.[0]?.plan?.id,
      email: profileData?.email,
      student_id: profileData?.studentId,
      institution_id: 'schools',
      phone_number: profileData?.phoneNumber,
      billing_period: isYearly ? 'YEARLY' : 'MONTHLY',
      custom_fields: [
        {
          display_name: 'Plan ID',
          variable_name: 'plan_id',
          value: props.id || '',
        },
        {
          display_name: 'Plan Name',
          variable_name: 'plan_name',
          value: title,
        },
        {
          display_name: 'Email',
          variable_name: 'email',
          value: profileData?.email || '',
        },
        {
          display_name: 'Phone Number',
          variable_name: 'phone_number',
          value: profileData?.phoneNumber || '',
        },
        {
          display_name: 'Student ID',
          variable_name: 'student_id',
          value: profileData?.studentId || '',
        },
        {
          display_name: 'Institution ID',
          variable_name: 'institution_id',
          value: 'schools',
        },
      ],
    },
    onSuccess: () => {
      onPaystackSuccess();
    },
    onClose: () => {
      handleClose();
    },
  };

  if (subscriptionCode && !isDiscounted) {
    config.plan = subscriptionCode;
  }

  function handleClose() {
    props.onClose();
  }

  function onPaystackSuccess() {
    try {
      verifySubscription(
        {
          referenceId: config.reference,
        },
        () => {
          handleClose();
          Notify('Subscription successful', { status: 'success' });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      );
    } catch (error) {
      Notify(
        'Subscription recorded but there was an error updating your profile',
        { status: 'error' }
      );
    }
  }

  const isActivePlan = activePlan === planCode;

  const isSubscribable =
    planCode.toUpperCase() !== 'BASIC_PLAN' && !isActivePlan;

  const getButtonText = () => {
    if (isActivePlan) return 'Current Plan';
    if (planCode.toUpperCase() === 'BASIC_PLAN') return 'Default Plan';
    return 'Subscribe';
  };

  return (
    <PlanCard bgColor={bgColor} textColor={textColor}>
      <TagsContainer>
        {isDiscounted && discountPercentage && (
          <DiscountBadge>{discountPercentage}% OFF</DiscountBadge>
        )}
        {!!isPopular && <PopularTag>Popular Plan</PopularTag>}
      </TagsContainer>
      <IoCopy size={24} color={planIcon} />
      <Spacer space={12} />
      <Title>{title}</Title>
      <Price priceColor={priceColor} subTextColor={textColor}>
        {isDiscounted && <OriginalPrice>{originalPrice}</OriginalPrice>}
        {price} <span>{isYearly ? 'yearly' : 'monthly'}</span>
      </Price>
      <Spacer space={12} />
      <SubscribeButton
        planCode={planCode}
        isSubscribable={isSubscribable}
        disabled={!isSubscribable}
        {...config}
      >
        {getButtonText()}
      </SubscribeButton>

      <Spacer space={24} />
      <Text uppercase bold color={textColor} size="0.7rem">
        Available Features
      </Text>
      <Spacer space={8} />
      <FeaturesList>
        {features?.map((feature, index) => (
          <FeatureItem key={index}>
            <IoCheckmark
              size={14}
              color={
                planCode.toLowerCase() === 'standard_plan' ? '#fff' : '#1D4ED8'
              }
            />
            <span>{feature.text}</span>
          </FeatureItem>
        ))}
      </FeaturesList>
    </PlanCard>
  );
};

export default SubscriptionCard;

const PlanCard = styled.div<PlanCardProps>`
  background: ${(props) => props.bgColor || 'white'};
  border-radius: 1rem;
  padding: 10px 20px;
  max-width: 340px;
  border: 1px solid #e5e5ea;
  color: ${(props) => props.textColor || 'black'};
  position: relative;
`;

const TagsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  position: absolute;
  top: 10px;
  right: 10px;
  width: calc(100% - 20px);
`;

const PopularTag = styled.div`
  background: #f7960e;
  color: white;
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 8px;
`;

const DiscountBadge = styled.div`
  background: #198155;
  color: white;
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 8px;
  font-weight: bold;
  margin-left: auto;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: #999;
  margin-right: 10px;
  font-size: 16px;
`;

const Title = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`;

const SubscribeButton = styled(PaystackButton)<{
  planCode: string;
  isSubscribable: boolean;
  disabled: boolean;
}>`
  padding: 1rem;
  background: ${(props) =>
    props.planCode?.toLowerCase() === 'standard_plan' ? '#fff' : '#1D4ED8'};
  color: ${(props) =>
    props.planCode?.toLowerCase() === 'standard_plan' ? '#1D4ED8' : '#fff'};
  cursor: ${(props) => (props.isSubscribable ? 'pointer' : 'default')};
  width: 100%;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  border-radius: 8px;
`;
