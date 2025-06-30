import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

// NEW RTK QUERY IMPORTS
import { useEnhancedLogin2Mutation } from '../../store/enhancedApi';
// DIRECT SERVICE IMPORTS
import { httpGetGoogleAuthorize } from '../../services/auth';

import {
  Text,
  Input,
  Checkbox,
  Spacer,
  Modal,
  Box,
} from '@flexisaf/flexibull2';

// NEW RTK QUERY TYPINGS
import { DistinctionLoginRequest } from '../../store/result';

import AuthPagesContainer from '../../components/auth/authPagesContainer';
import ForgotPasswordModal from '../../components/auth/forgotPasswordModal.components';
import VerificationModal from '../../components/auth/ResendVerificationModal';

import { Liner } from '../../styles/common/liner.styles';
import {
  FormContainer,
  AuthWithGoogle,
  ForgotPasswordModalBody,
} from '../../styles/auth/auth.styles';
import { PrimaryButton } from '../../styles/common/buttons.styles';

import Theme from '../../utils/theme';
import fontSize from '../../utils/typography';
import 'react-phone-input-2/lib/style.css';
import styled from 'styled-components';
import { setAuth, setNeedsVerification } from './authSlice';
import {
  setLocalAccessToken,
  setLocalRefreshToken,
  setLocalUser,
  formattedDate,
  formattedTime,
} from '../../utils/helpers';
import useDataLayer from 'hooks/tagManager/useDataLayer';
import { Notify } from '@flexisaf/flexibull2';

interface ForgotPasswrodModal {
  show: boolean;
  data: null | string;
}

const getDefaultLoginInformation = () => ({
  email: '',
  password: '',
  phone: '',
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pushEvent } = useDataLayer();

  // NEW RTK QUERY HOOKS
  const [login, { isLoading }] = useEnhancedLogin2Mutation();

  // Google login state
  const [loadingGoogleAuth, setLoadingGoogleAuth] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [forgotPasswordModal, setForgotPasswordModal] =
    useState<ForgotPasswrodModal>({
      show: false,
      data: null,
    });

  // Get verification state from Redux
  const userNeedVerification = useSelector(
    (state: any) => state.currentUser?.needsVerification
  );

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      ...getDefaultLoginInformation(),
    },
  });

  // NEW RTK QUERY LOGIN HANDLER
  const handleLogin = async (userCreds: {
    username: string;
    password: string;
  }) => {
    try {
      const loginRequest: DistinctionLoginRequest = {
        platform: 'SCHOOLS_DISTINCTION_APP',
        username: userCreds.username,
        password: userCreds.password,
      };

      const result = await login({
        distinctionLoginRequest: loginRequest,
      }).unwrap();
      console.log('login response', result);
      if (result.user) {
        // Transform the API response to match our UserProfileDTO interface
        const currentUser = {
          studentId: result.user.id || '',
          firstName: result.user.firstName || '',
          lastName: result.user.lastName || '',
          email: result.user.email || '',
          otherName: result.user.otherName || undefined,
        };

        // Store user data in localStorage (for backward compatibility)
        setLocalUser(JSON.stringify(currentUser));

        // Update Redux state with tokens and user data
        dispatch(setAuth({ user: result }));

        // Analytics tracking
        pushEvent('trackAuthentication', {
          user_id: result.user.id,
          authType: 'login',
          authMethod: 'password',
          date: formattedDate,
          time: formattedTime,
        });

        // Navigate to home
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error('Login failed:', err);

      // Handle specific error cases
      if (
        err?.data?.message?.includes('not verified') ||
        err?.data?.message?.includes('verification')
      ) {
        dispatch(setNeedsVerification(true));
      } else {
        // Show generic error message
        Notify('Invalid credentials', {
          status: 'error',
        });
      }
    }
  };

  const handleGoogleLogin = async () => {
    setLoadingGoogleAuth(true);

    try {
      const response = await httpGetGoogleAuthorize({
        callbackUrl: `${window.location.origin}/auth-token-verify`,
      });

      if (response.success && response.raw) {
        // The API returns a URL that we need to redirect to
        window.location.href = response.raw as string;
      } else {
        console.error('Google login failed:', response.message);
        setLoadingGoogleAuth(false);
        Notify('Google login failed', {
          status: 'error',
        });
      }

      // Analytics tracking
      pushEvent('trackAuthentication', {
        authType: 'login',
        authMethod: 'googleAuth',
        date: formattedDate,
        time: formattedTime,
      });
    } catch (error) {
      console.error('Google login failed:', error);
      setLoadingGoogleAuth(false);
      Notify('Google login failed', {
        status: 'error',
      });
    }
  };

  const handleClose = () => {
    setForgotPasswordModal({
      show: false,
      data: null,
    });
    document.body.style.overflow = 'auto';
  };

  const handleCloseResendVerification = () => {
    dispatch(setNeedsVerification(false));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit((v) => {
        handleLogin({
          username: v.email,
          password: v.password,
        });
      })();
    }
  };

  return (
    <AuthPagesContainer>
      <>
        <div style={{ width: '100%' }}>
          <Text {...fontSize.h5} style={{ textAlign: 'center' }} block bold>
            Login Your Account
          </Text>
          <Spacer space="5px" />
          <Text size="11px" style={{ textAlign: 'center' }} block>
            Start practising for your upcoming exams
          </Text>
          <Spacer space="20px" />
          <AuthWithGoogle
            onClick={handleGoogleLogin}
            progress={loadingGoogleAuth}
          >
            <img
              alt="google signin"
              src="/images/google-logo.png"
              style={{ height: '20px' }}
            />
            <Text size="12px">Continue with Google</Text>
          </AuthWithGoogle>
        </div>
        <Spacer space="24px" />
        <Liner borderstyle="dashed" />
        <Spacer space="24px" />
        <FormContainer>
          <Box>
            <LabelStyle>
              <span className="activeEmail"> Email </span>
            </LabelStyle>
            <InputWithRef
              type="text"
              spaceTop
              style={{ backgroundColor: '#F7F7FF', marginTop: '5px' }}
              block
              placeholder="Ex: jane@example.com"
              value={watch('email') as string}
              {...register('email', {
                required: 'Email is required',
              })}
              onKeyDown={handleKeyDown}
              onChange={({
                target: { value },
              }: {
                target: { value: string };
              }) => {
                if (/^\+\d*$/.test(value)) {
                  // Remove the plus symbol
                  const cleanedValue = value.replace(/\+/, '');
                  setValue('email', cleanedValue);
                } else {
                  // Handle other cases or set the value as is
                  setValue('email', value);
                }
              }}
            />
          </Box>

          <InputWithRef
            type={showPassword ? 'text' : 'password'}
            required
            spaceTop
            style={{ backgroundColor: '#F7F7FF' }}
            block
            label="Password"
            placeholder="Enter Password"
            value={watch('password') as string}
            {...register('password', {
              required: 'Password is required',
            })}
            error={errors.password?.message as string | undefined}
            onKeyDown={handleKeyDown}
            onChange={({ target: { value } }: { target: { value: string } }) =>
              setValue('password', value)
            }
          />
        </FormContainer>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              size="16px"
              style={{ margin: '0px', padding: '0px' }}
              spaceRight="0px"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setShowPassword(e.target.checked)
              }
              checked={showPassword}
            />
            <Text size="12px">Show Password</Text>
          </div>
          <Text
            color={Theme.PrimaryColor}
            size="12px"
            style={{ cursor: 'pointer' }}
            onClick={() =>
              setForgotPasswordModal({
                show: true,
                data: watch('email') || '',
              })
            }
          >
            Forgot Password
          </Text>
        </div>
        <Spacer space="24px" />

        <PrimaryButton
          style={{ width: '100%' }}
          progress={isLoading}
          onClick={handleSubmit((v) => {
            handleLogin({
              username: v.email,
              password: v.password,
            });
          })}
        >
          Login my account
        </PrimaryButton>
        <Spacer space="10px" />

        <Text size="12px" style={{ textAlign: 'center' }} block>
          Don't have an account?{' '}
          <Link to="/register">
            <Text color={Theme.PrimaryColor} style={{ cursor: 'pointer' }} bold>
              Register
            </Text>
          </Link>
        </Text>
      </>
      <Modal open={forgotPasswordModal.show} center={false} outerclick>
        <ForgotPasswordModalBody>
          <ForgotPasswordModal
            data={forgotPasswordModal.data}
            handleClose={handleClose}
          />
        </ForgotPasswordModalBody>
      </Modal>

      <Modal open={userNeedVerification} outerclick>
        <ForgotPasswordModalBody>
          <VerificationModal
            activeEmail={watch('email')}
            handleClose={handleCloseResendVerification}
          />
        </ForgotPasswordModalBody>
      </Modal>
    </AuthPagesContainer>
  );
};

export default Login;

const LabelStyle = styled.label`
  text-transform: none;
  position: relative;
  font-weight: 700;
  display: block;
  font-size: 0.9em;
  margin-bottom: 10px;
  bottom: 5px;
  border-bottom: 1px solid #cbd5e4;
  padding-bottom: 10px;

  .activePhone {
    cursor: pointer;
    border-bottom: 2px solid #1d4ed8;
    margin-left: 15px;
    padding-bottom: 10px;
    transition: all 0.5s;
  }
  .activeEmail {
    cursor: pointer;
    border-bottom: 2px solid #1d4ed8;
    padding-bottom: 10px;
    transition: all 0.5s;
  }
  .notactive {
    cursor: pointer;
    transition: all 0.5s;
    &:hover {
      opacity: 0.5;
    }
  }
`;

// Create a forwardRef wrapper for the Input component
const InputWithRef = React.forwardRef<HTMLInputElement, any>((props, ref) => (
  <Input {...props} ref={ref} />
));

InputWithRef.displayName = 'InputWithRef';
