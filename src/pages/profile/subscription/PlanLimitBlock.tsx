import React, { useEffect, useState } from 'react';
import { Box, Modal, ModalBody, Notify } from '@flexisaf/flexibull2';
import { FaCrown } from 'react-icons/fa';
import styled from 'styled-components';
import { PaystackButton } from 'react-paystack';
import { DistinctionFeatureProperty, PAYSTACK_PB_KEY } from 'utils/constants';
import useSubscriptionBilling from '../hooks/useSubscriptionBilling';
import useProfile from '../hooks/useProfile';
import { capitalizeFirstLetter } from 'utils/helpers';
import { useNavigate } from 'react-router-dom';

interface PlanLimitProps {
  isOpen: boolean;
  closeModal: () => void;
  feature: DistinctionFeatureProperty;
  togglePlansModal: () => void;
  showDailyPlan?: boolean;
  enableOuterClick?: boolean;
}

const featureDescriptions: Record<DistinctionFeatureProperty, string> = {
  [DistinctionFeatureProperty.FLASHCARD]:
    "You've reached your plan limit for flashcards. Upgrade to Premium for unlimited access to flashcards and other learning tools or subscribe for daily unlimited access to flashcards.",
  [DistinctionFeatureProperty.KEYPOINTS]:
    "You've reached your plan limit for key points access. Premium users enjoy unlimited key points extraction.",
  [DistinctionFeatureProperty.PRACTICE_QUESTIONS]:
    "You've reached your practice questions limit. Premium users get unlimited practice questions to enhance their learning.",
  [DistinctionFeatureProperty.MONTHLY_QUIZATON]:
    "You currently don't have access to Monthly Quizathon due to your plan restrictions. Upgrade to Premium for unlimited free access or pay the monthly access fee to participate in Quizathon challenges.",
  [DistinctionFeatureProperty.LEADERBOARD]:
    "You've reached your leaderboard access limit. Premium users get full access to leaderboard rankings and achievements.",
  [DistinctionFeatureProperty.QUIZATON_CERTIFICATE]:
    "You don't have access to certificate downloads with your current plan. Upgrade to Premium for unlimited free downloads or pay a fee per certificate download.",
  [DistinctionFeatureProperty.STUDY_PAL]:
    "You've reached your Study Pal limit. Get unlimited access with Premium or subscribe for daily unlimited access.",
};

const PlanLimitBlock: React.FC<PlanLimitProps> = ({
  isOpen,
  closeModal,
  feature,
  togglePlansModal,
  enableOuterClick = true,
  showDailyPlan = true,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const description = featureDescriptions[feature];

  const {
    getActivePlan,
    activePlan,
    getSubscriptionPackages,
    subscriptionPackages,
  } = useSubscriptionBilling();
  const { profileData } = useProfile();
  const navigate = useNavigate();

  const findAddOnForFeature = () => {
    if (!subscriptionPackages || !activePlan) return null;

    // Find the current active subscription
    const currentPackage = subscriptionPackages.find(
      (pkg) => pkg.code === activePlan?.subscriptionPackage?.code
    );

    if (!currentPackage) return null;

    // Find add-on that matches the feature
    return currentPackage?.addOn?.find((addon) => addon.name === feature);
  };

  const addOn = findAddOnForFeature();

  const onPaystackSuccess = async () => {
    try {
      closeModal();

      setTimeout(() => {
        window.location.reload();
      }, 2000);

      Notify('Add-on purchase successful', { status: 'success' });
    } catch (error) {
      Notify('Payment recorded but there was an error updating your profile', {
        status: 'error',
      });
    }
  };

  const getDailyPlanConfig = () => {
    if (!addOn || !addOn.plan) return null;
    if (!addOn.plan.price) return null;

    const price = (addOn?.plan?.price || 0) * 100;

    return {
      reference: `${feature}_${new Date().getTime()}`,
      email: profileData?.email || '',
      amount: price,
      publicKey: PAYSTACK_PB_KEY,
      currency: 'NGN' as const,
      metadata: {
        plan_id: addOn.plan.id,
        addon_name: addOn.name,
        email: profileData?.email,
        student_id: profileData?.studentId,
        institution_id: 'schools',
        phone_number: profileData?.phoneNumber,
        custom_fields: [
          {
            display_name: 'Add-on Plan ID',
            variable_name: 'plan_id',
            value: addOn.id || '',
          },
          {
            display_name: 'Add-on Name',
            variable_name: 'addon_name',
            value: addOn.name,
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
      onSuccess: () => onPaystackSuccess(),
      onClose: () => closeModal(),
    };
  };

  const paymentConfig = getDailyPlanConfig();
  const addonPrice = addOn?.plan?.price;

  const getAddOnButtonText = () => {
    if (loading) return 'Loading...';
    if (!addOn) return 'Add-on Not Available';
    return ` ${capitalizeFirstLetter(feature).replace(
      /_/g,
      ' '
    )} (₦${addonPrice})`;
  };

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      Promise.all([getActivePlan(), getSubscriptionPackages()]).finally(() =>
        setLoading(false)
      );
    }
  }, [isOpen]);

  return (
    <Modal open={isOpen} onClose={closeModal} outerclick={enableOuterClick}>
      <ModalBody style={{ maxWidth: '400px' }} width="90%">
        <Box pad="1.3rem" align="center">
          <IconWrapper>
            <FaCrown color="#ca8a03" size={32} />
          </IconWrapper>

          <Title>Plan Limit Reached</Title>

          <Description>{description}</Description>

          <UpgradeButton onClick={togglePlansModal}>
            Upgrade to premium
          </UpgradeButton>

          {showDailyPlan && paymentConfig ? (
            <AddonButton
              {...paymentConfig}
              className="addon-payment-button"
              disabled={loading || !addOn}
            >
              {getAddOnButtonText()}
            </AddonButton>
          ) : (
            <HomeButton onClick={() => navigate('/dashboard')}>
              Go to Home
            </HomeButton>
          )}
        </Box>
      </ModalBody>
    </Modal>
  );
};
export default PlanLimitBlock;

const IconWrapper = styled.div`
  background: #fef3c7;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const Description = styled.p`
  color: #4b5563;
  margin-bottom: 24px;
`;

const UpgradeButton = styled.button`
  width: 100%;
  background: linear-gradient(to right, #7c3aed, #4f46e5);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s;
  margin-bottom: 12px;

  &:hover {
    background: linear-gradient(to right, #6d28d9, #4338ca);
  }
`;

const AddonButton = styled(PaystackButton)<{ disabled: boolean }>`
  width: 100%;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s;
  background: ${(props) =>
    props.disabled ? '#d1d5db' : 'linear-gradient(to right, #7c3aed, #4f46e5)'};

  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  border: none;

  &:hover {
    background: linear-gradient(to right, #6d28d9, #4338ca);
  }
`;

const HomeButton = styled.button`
  width: 100%;
  background: #4b5563;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s;
  border: none;

  &:hover {
    background: #374151;
  }
`;
