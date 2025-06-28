/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// NEW RTK QUERY IMPORTS
import { useEnhancedResendVerificationMutation } from '../../store/enhancedApi';

import { Text, Spacer } from '@flexisaf/flexibull2';

import AuthPagesContainer from '../../components/auth/authPagesContainer';
import { VerifyAccountWrapper } from '../../styles/auth/auth.styles';
import fontSize from '../../utils/typography';

import {
  PrimaryButton,
  SecondaryButton,
} from '../../styles/common/buttons.styles';

// NEW RTK QUERY TYPINGS
import { DistinctionResendVerification } from '../../store/result';
import { PLATFORM as platform } from '../../utils/constants';

interface LocationState {
  username: string;
}

const VerifyAccount = () => {
  const navigate = useNavigate();
  const { username = null } = (useLocation().state as LocationState) || {};

  // NEW RTK QUERY HOOK
  const [resendVerification, { isLoading }] =
    useEnhancedResendVerificationMutation();

  useEffect(() => {
    if (!username) return navigate('/login');
  }, []);

  const handleResendClick = async () => {
    if (username) {
      try {
        const verificationData: {
          distinctionResendVerification: DistinctionResendVerification;
        } = {
          distinctionResendVerification: {
            username,
            platform,
          },
        };

        await resendVerification(verificationData).unwrap();
      } catch (error) {
        console.error('Resend verification failed:', error);
      }
    }
  };

  return (
    <AuthPagesContainer>
      {username && (
        <VerifyAccountWrapper>
          <img src="/mailbox-icon.svg" alt="mailbox icon" />
          <Spacer space="24px" />
          <Text {...fontSize.h5} bold>
            Please check your mailbox
          </Text>
          <Spacer space="10px" />
          <Text style={{ textAlign: 'center' }}>
            A verification link has been sent to your mailbox
          </Text>
          <Spacer space="48px" />

          <PrimaryButton
            progress={isLoading}
            style={{ width: '100%' }}
            onClick={handleResendClick}
          >
            Resend Verification Email
          </PrimaryButton>
          <Spacer space="20px" />

          <SecondaryButton
            onClick={() => navigate('/login')}
            style={{ width: '100%' }}
          >
            Go to Login
          </SecondaryButton>
        </VerifyAccountWrapper>
      )}
    </AuthPagesContainer>
  );
};

export default VerifyAccount;
