import { Text, Button, Spacer, Box } from '@flexisaf/flexibull2';

import AuthPagesContainer from '../../components/auth/authPagesContainer';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

// NEW RTK QUERY IMPORTS
import { useEnhancedConfirmEmailMutation } from '../../store/enhancedApi';

import SectionLoader from '../../components/custom/sectionLoader';

import UserVerified from '../../assets/images/verified.svg';
import UserNotVerified from '../../assets/images/not-verified.svg';

// NEW RTK QUERY TYPINGS
import { DistinctionUserConfirmRequest } from '../../store/result';
import { PLATFORM as platform } from '../../utils/constants';

const EmailConfirm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') as string;
  const userId = searchParams.get('user') as string;

  const [isVerified, setIsVerified] = useState(false);
  const [failedVerification, setFailedVerification] = useState(false);

  // NEW RTK QUERY HOOK
  const [confirmEmail, { isLoading }] = useEnhancedConfirmEmailMutation();

  useEffect(() => {
    if (!token || !userId) {
      setFailedVerification(true);
      return;
    }

    const handleConfirmEmail = async () => {
      try {
        const confirmData: {
          distinctionUserConfirmRequest: DistinctionUserConfirmRequest;
        } = {
          distinctionUserConfirmRequest: {
            userId,
            token,
            platform,
          },
        };

        await confirmEmail(confirmData).unwrap();
        setIsVerified(true);
        setFailedVerification(false);
      } catch (error) {
        console.error('Email confirmation failed:', error);
        setIsVerified(false);
        setFailedVerification(true);
      }
    };

    handleConfirmEmail();
  }, [token, userId, confirmEmail]);

  if (isVerified) {
    return (
      <AuthPagesContainer>
        <Box width="100%" height="100%">
          <Box width="100%" align="center">
            <img src={UserVerified} alt="verified" />
            <Box margin="30px auto" maxWidth="300px">
              <Text block bold size="18px">
                Verification Successful
              </Text>
              <Spacer space="15px" />
              <Text block>
                {' '}
                Your email account has been verified successfully, Login to your
                account to continue.
              </Text>
              <Spacer space="30px" />
              <Button onClick={() => navigate('/login')} width={150} bold>
                Log in
              </Button>
            </Box>
          </Box>
        </Box>
      </AuthPagesContainer>
    );
  }

  if (failedVerification) {
    return (
      <AuthPagesContainer>
        <Box width="100%" height="100%">
          <Box width="100%" align="center">
            <img src={UserNotVerified} alt="Not verified" />
            <Box margin="30px auto" maxWidth="300px">
              <Text block bold size="18px">
                Unable to verify user
              </Text>
              <Spacer space="15px" />
              <Text block>
                {' '}
                Your email account could not be verified, you can contact your
                account admin or support for more enquiries.
              </Text>
              <Spacer space="30px" />
              <Button onClick={() => navigate('/login')} width={150} bold>
                Back to home
              </Button>
            </Box>
          </Box>
        </Box>
      </AuthPagesContainer>
    );
  }

  return (
    <AuthPagesContainer>
      <SectionLoader />
    </AuthPagesContainer>
  );
};

export default EmailConfirm;
