import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// NEW RTK QUERY IMPORTS
import { useEnhancedRegisterMutation } from '../../store/enhancedApi';
// DIRECT SERVICE IMPORTS
import { httpGetGoogleAuthorize } from '../../services/auth';

import { Text, Input, Checkbox, Spacer, Grid, Box } from '@flexisaf/flexibull2';

// NEW RTK QUERY TYPINGS
import { DinstinctionRegistrationRequest } from '../../store/result';

import AuthPagesContainer from '../../components/auth/authPagesContainer';

import { Liner } from '../../styles/common/liner.styles';
import { FormContainer, AuthWithGoogle } from '../../styles/auth/auth.styles';
import { PrimaryButton } from '../../styles/common/buttons.styles';

import {
  isValidEmail,
  formattedDate,
  formattedTime,
} from '../../utils/helpers';

import Theme from '../../utils/theme';
import fontSize from '../../utils/typography';
import PasswordValidation from '../../components/custom/passwordValidation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import useAuth from './hooks/useAuth';
import { SpinnerIcon } from 'pages/referrals';
import { useDebounce } from 'use-debounce';
import ReCAPTCHA from 'react-google-recaptcha';
import { recaptchaConfig } from 'utils/constants';
import useDataLayer from '../../hooks/tagManager/useDataLayer';
import { Notify } from '@flexisaf/flexibull2';

interface IRegisterInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  referralCode: string;
}

const getDefaultRegisterInformation = () => ({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  referralCode: '',
});

const Register = () => {
  const navigate = useNavigate();
  const { pushEvent } = useDataLayer();

  // NEW RTK QUERY HOOKS
  const [register, { isLoading }] = useEnhancedRegisterMutation();

  // Google registration state
  const [loadingGoogleAuth, setLoadingGoogleAuth] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [hasReferralCode, setHasReferralCode] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const {
    register: registerField,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    setError,
    clearErrors,
  } = useForm<IRegisterInfo>({
    defaultValues: {
      ...getDefaultRegisterInformation(),
    },
  });

  const { validateEmail, isValidatingEmail } = useAuth();

  const email = watch('email');

  const showIcon = email && (isValidEmail(email) || isEmailValid !== null);

  const [debouncedEmail] = useDebounce(email, 400);

  const onCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  // NEW RTK QUERY REGISTRATION HANDLER
  const handleRegister = async (userCreds: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    referralCode?: string;
    captcha: string;
  }) => {
    try {
      const registrationRequest: DinstinctionRegistrationRequest = {
        firstName: userCreds.firstName,
        lastName: userCreds.lastName,
        email: userCreds.email,
        phone: userCreds.phone,
        password: userCreds.password,
        platform: 'SCHOOLS_DISTINCTION_APP',
        referralCode: userCreds.referralCode,
        captcha: userCreds.captcha,
      };

      const result = await register({
        dinstinctionRegistrationRequest: registrationRequest,
      }).unwrap();

      // Analytics tracking
      pushEvent('trackAuthentication', {
        userId: result?.id,
        authType: 'register',
        authMethod: 'password',
        date: formattedDate,
        time: formattedTime,
      });

      // Navigate to verification page
      navigate('/verify', {
        state: {
          username: watch('email'),
        },
      });
    } catch (err: any) {
      console.error('Registration failed:', err);

      // Handle specific error cases
      if (err?.data?.message?.includes('email already exists')) {
        Notify('Email already exists. Please use a different email or login.', {
          status: 'error',
        });
      } else if (err?.data?.message?.includes('invalid captcha')) {
        Notify('Invalid captcha. Please try again.', {
          status: 'error',
        });
      } else {
        // Show generic error message
        Notify('Registration failed. Please try again.', {
          status: 'error',
        });
      }
    }
  };

  const handleGoogleRegister = async () => {
    setLoadingGoogleAuth(true);

    try {
      const response = await httpGetGoogleAuthorize({
        callbackUrl: `${window.location.origin}/auth-token-verify`,
      });

      if (response.success && response.raw) {
        // The API returns a URL that we need to redirect to
        window.location.href = response.raw as string;
      } else {
        console.error('Google registration failed:', response.message);
        setLoadingGoogleAuth(false);
        Notify('Google registration failed', {
          status: 'error',
        });
      }

      // Analytics tracking
      pushEvent('trackAuthentication', {
        authType: 'register',
        authMethod: 'googleAuth',
        date: formattedDate,
        time: formattedTime,
      });
    } catch (error) {
      console.error('Google registration failed:', error);
      setLoadingGoogleAuth(false);
      Notify('Google registration failed', {
        status: 'error',
      });
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('ref');
    if (code) {
      setValue('referralCode', code);
      setHasReferralCode(true);
    }
  }, [location, setValue]);

  useEffect(() => {
    const validateEmailIfCompleted = async () => {
      if (isValidEmail(debouncedEmail)) {
        const res = await validateEmail(debouncedEmail);
        setIsEmailValid(!!res?.status);

        if (!res?.status) {
          setError('email', {
            type: 'manual',
            message: 'This email is not valid, please use a valid email',
          });
        } else {
          clearErrors('email');
        }
      } else {
        setIsEmailValid(null);
        clearErrors('email');
      }
    };

    validateEmailIfCompleted();
  }, [debouncedEmail, setError, clearErrors]);

  return (
    <AuthPagesContainer>
      <>
        <div style={{ width: '100%' }}>
          <Text {...fontSize.h5} style={{ textAlign: 'center' }} block bold>
            Create Your Account
          </Text>
          <Spacer space="5px" />
          <Text size="11px" style={{ textAlign: 'center' }} block>
            Start practising for your upcoming exams
          </Text>
          <Spacer space="20px" />

          {!hasReferralCode && (
            <>
              <AuthWithGoogle
                onClick={handleGoogleRegister}
                progress={loadingGoogleAuth}
              >
                <img
                  alt="google signin"
                  src="/images/google-logo.png"
                  style={{ height: '20px' }}
                />
                <Text size="12px">Continue with Google</Text>
              </AuthWithGoogle>
              <Spacer space="24px" />
              <Liner borderstyle="dashed" />
              <Spacer space="24px" />
            </>
          )}
        </div>

        <FormContainer>
          <Grid default="1fr 1fr" gap="24px" responsive={false}>
            <Input
              type="text"
              required
              style={{ backgroundColor: '#F7F7FF' }}
              spaceTop
              block
              label="First name"
              placeholder="Ex: Jane"
              value={watch('firstName') as string}
              {...registerField('firstName', {
                required: 'First name is required',
              })}
              error={errors.firstName?.message as string | undefined}
              onChange={({
                target: { value },
              }: {
                target: { value: string };
              }) => setValue('firstName', value)}
            />

            <Input
              type="text"
              required
              style={{ backgroundColor: '#F7F7FF' }}
              spaceTop
              block
              label="Last name"
              placeholder="Ex: Doe"
              value={watch('lastName') as string}
              {...registerField('lastName', {
                required: 'Last name is required',
              })}
              error={errors.lastName?.message as string | undefined}
              onChange={({
                target: { value },
              }: {
                target: { value: string };
              }) => setValue('lastName', value)}
            />
          </Grid>
          <Box relative>
            <Input
              type="email"
              required
              spaceTop
              style={{ backgroundColor: '#F7F7FF' }}
              block
              label="Email Address"
              placeholder="Ex: jane@example.com"
              value={watch('email') as string}
              {...registerField('email', {
                required: 'Email is required',
                validate: (val) => {
                  if (!isValidEmail(val)) {
                    return 'Please enter a valid email';
                  }
                  if (isEmailValid === false) {
                    return 'This email is not valid, please use a valid email';
                  }
                },
              })}
              error={errors.email?.message}
              onChange={({
                target: { value },
              }: {
                target: { value: string };
              }) => setValue('email', value)}
            />
            {showIcon && (
              <Box
                style={{
                  position: 'absolute',
                  right: '-20px',
                  top: '33px',
                }}
              >
                {isValidatingEmail ? (
                  <SpinnerIcon color="#007bff" size={15} />
                ) : null}
              </Box>
            )}
          </Box>

          <Box relative>
            <span
              style={{
                position: 'absolute',
                right: 0,
                top: '-3px',
                color: '#6B7280',
                fontSize: '14px',
              }}
            >
              Optional
            </span>
            <Input
              type="text"
              style={{ backgroundColor: '#F7F7FF' }}
              spaceTop
              block
              label="Referral code "
              placeholder="12345"
              value={watch('referralCode') as string}
              {...registerField('referralCode', {})}
              onChange={({
                target: { value },
              }: {
                target: { value: string };
              }) => setValue('referralCode', value)}
            />
          </Box>

          <PhoneInput
            country={'ng'}
            placeholder="Ex: 080 000 0123"
            value={watch('phone') as string}
            {...registerField('phone', {
              required: 'Phone number is required',
            })}
            onChange={(value) => setValue('phone', value)}
            inputStyle={{
              backgroundColor: 'transparent',
              width: '100%',
              height: '40px',
              border: '1px solid #CBD5E4',
            }}
            buttonStyle={{
              border: '1px solid #CBD5E4',
            }}
            dropdownStyle={{
              backgroundColor: 'none',
              padding: '0px 10px',
              border: ' 1px solid #CBD5E4',
            }}
          />
          {errors.phone && (
            <Text
              color="#fb5e9a"
              style={{
                fontStyle: 'italic',
                lineHeight: 0,
                paddingBottom: '5px',
                marginTop: '-5px',
              }}
            >
              {errors.phone?.message as string | undefined}
            </Text>
          )}

          <PasswordValidation<IRegisterInfo>
            watch={watch}
            register={registerField}
            getValues={getValues}
            setValue={setValue}
            fieldErrors={errors}
            showPassword={showPassword}
            field="password"
            type="password"
            label="New Password"
            placeholder="Min. 8 characters"
          />
          <Input
            type={showPassword ? 'text' : 'password'}
            required
            spaceTop
            style={{ backgroundColor: '#F7F7FF' }}
            block
            label="Confirm Password"
            placeholder="Retype password"
            value={watch('confirmPassword') as string}
            {...registerField('confirmPassword', {
              validate: (val) => {
                if (watch('password') !== val) {
                  return 'Passwords do not match';
                }
              },
              required: 'Confirm Password is required',
            })}
            error={errors.confirmPassword?.message as string | undefined}
            onChange={({ target: { value } }: { target: { value: string } }) =>
              setValue('confirmPassword', value)
            }
          />
        </FormContainer>
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
        <ReCAPTCHA
          sitekey={recaptchaConfig.RECAPTCHA_SITE_KEY as string}
          onChange={onCaptchaChange}
        />
        <Spacer space="5px" />
        <Text block style={{ margin: '5px 0px' }}>
          By creating an account, you agree to our{' '}
          <a
            href="/terms"
            target="__blank"
            style={{
              color: 'blue',
              textDecoration: 'underline',
              textAlign: 'justify',
            }}
          >
            Terms and Conditions
          </a>
          . You may receive SMS notifications from us and can opt out at any
          time.
        </Text>
        <Spacer space="10px" />
        <PrimaryButton
          style={{ width: '100%' }}
          progress={isLoading}
          disabled={!captchaToken}
          onClick={handleSubmit((v) => {
            handleRegister({
              captcha: captchaToken as string,
              ...v,
            });
          })}
        >
          Create my account
        </PrimaryButton>
        <Spacer space="10px" />

        <Text size="12px" style={{ textAlign: 'center' }} block>
          Already have an account?{' '}
          <Link to="/login">
            <Text color={Theme.PrimaryColor} style={{ cursor: 'pointer' }} bold>
              Login
            </Text>
          </Link>
        </Text>
      </>
    </AuthPagesContainer>
  );
};

export default Register;
