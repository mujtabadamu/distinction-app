import React, { useEffect, useCallback, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEnhancedTokenLoginMutation } from '../../store/enhancedApi';
import {
  setLocalAccessToken,
  setLocalRefreshToken,
  setLocalUser,
} from '../../utils/helpers';
import { PLATFORM } from '../../utils/constants';
import AuthPagesContainer from '../../components/auth/authPagesContainer';
import NotFound from '../../components/custom/notFound';
import SectionLoader from '../../components/custom/sectionLoader';

const GoogleAuthVerify = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(false);
  const token = searchParams.get('transfer_code');

  const [tokenLogin, { isLoading }] = useEnhancedTokenLoginMutation();

  const loginWithToken = useCallback(async () => {
    if (token) {
      try {
        const response = await tokenLogin({
          distinctionTokenLoginRequest: {
            token,
            platform: PLATFORM,
          },
        }).unwrap();

        // Store tokens and user data
        if (response.accessToken) {
          setLocalAccessToken(response.accessToken);
        }
        if (response.refreshToken) {
          setLocalRefreshToken(response.refreshToken);
        }
        if (response.user) {
          setLocalUser(JSON.stringify(response.user));
        }

        // Navigate to home on success
        navigate('/home');
      } catch (error) {
        console.error('Token login error:', error);
        setError(true);
      }
    }
  }, [token, tokenLogin, navigate]);

  useEffect(() => {
    if (token) {
      loginWithToken();
    } else {
      setError(true);
    }
  }, [token, loginWithToken]);

  return (
    <AuthPagesContainer>
      <>
        {error ? (
          <div style={{ width: '100%' }}>
            <NotFound
              title="No user found"
              info="It seems you tried to login with an email that is not on our platform. Please register then try again"
              link="register"
              buttonText="Go to register"
            />
          </div>
        ) : (
          <SectionLoader />
        )}
      </>
    </AuthPagesContainer>
  );
};

export default GoogleAuthVerify;
