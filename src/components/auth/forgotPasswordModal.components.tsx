import { useEffect, useState } from 'react';
import React from 'react';

// NEW RTK QUERY IMPORTS
import { useEnhancedPasswordResetRequestMutation } from '../../store/enhancedApi';

import { Box, Grid, Input, Text, Spacer } from '@flexisaf/flexibull2';
import { useForm } from 'react-hook-form';
import { ModalHeaderText } from '../../styles/subscribe/subscribe.styles';

import { isValidEmail } from '../../utils/helpers';

import {
  PrimaryButton,
  SecondaryButton,
} from '../../styles/common/buttons.styles';
import Theme from '../../utils/theme';

// NEW RTK QUERY TYPINGS
import { DistinctionPasswordResetRequest } from '../../store/result';
import { PLATFORM as platform } from '../../utils/constants';

const getDefaultValues = () => ({
  email: '',
});

interface Props {
  handleClose: () => void;
  data: string | null;
}

// Create a forwardRef wrapper for the Input component
const InputWithRef = React.forwardRef<HTMLInputElement, any>((props, ref) => (
  <Input {...props} ref={ref} />
));

InputWithRef.displayName = 'InputWithRef';

const ForgotPasswordModal = ({ handleClose, data }: Props) => {
  const [resetRequestSuccess, setResetRequestSuccess] = useState(false);

  // NEW RTK QUERY HOOK
  const [passwordResetRequest, { isLoading: isRequestingPasswordReset }] =
    useEnhancedPasswordResetRequestMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      ...getDefaultValues(),
      email: data || '',
    },
  });

  useEffect(() => {
    if (data) {
      setValue('email', data);
    } else {
      reset();
    }
  }, [data]);

  return (
    <Box>
      <Grid default="auto max-content" reponsize={false} className="bb">
        <Box pad="24px 32px">
          <ModalHeaderText block bold>
            Reset Password
          </ModalHeaderText>
          <Spacer space="10px" />
          {!resetRequestSuccess && (
            <Text>
              You are about to reset your password, please enter your email
              address on your account to continue or cancel to go back.
            </Text>
          )}
        </Box>
      </Grid>

      <Box pad="32px">
        {resetRequestSuccess ? (
          <Box>
            <Text bold block>
              Check your email
            </Text>
            <Spacer space="10px" />
            <Text>
              You have successfully requested to reset your password. If the
              email exists, a reset link has been sent to the email.
            </Text>
          </Box>
        ) : (
          <Grid default="1fr" gap="24px">
            <InputWithRef
              spaceTop
              label="Email Address"
              required
              type="email"
              placeholder="Ex: jane@example.com"
              value={watch('email')}
              {...register('email', {
                required: 'Email is required',
                validate: (val) => {
                  if (!isValidEmail(val)) {
                    return 'Please enter a valid email';
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
          </Grid>
        )}
      </Box>

      <Box pad="32px">
        <Grid default="auto max-content" responsive={false} className="bt">
          <Box>
            <SecondaryButton
              onClick={() => {
                setResetRequestSuccess(false);
                handleClose();
              }}
              // pale
              color="rgba(0,0,0,0.0)"
              fontColor={Theme.PrimaryGrey}
            >
              Close
            </SecondaryButton>
          </Box>
          <Box>
            <PrimaryButton
              progress={isRequestingPasswordReset}
              disabled={resetRequestSuccess === true}
              onClick={handleSubmit(async (v) => {
                try {
                  const resetRequestData: {
                    distinctionPasswordResetRequest: DistinctionPasswordResetRequest;
                  } = {
                    distinctionPasswordResetRequest: {
                      username: v.email.trim(),
                      platform,
                    },
                  };

                  await passwordResetRequest(resetRequestData).unwrap();
                  setResetRequestSuccess(true);
                } catch (error) {
                  console.error('Password reset request failed:', error);
                  setValue('email', '');
                }
              })}
            >
              Reset Password
            </PrimaryButton>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default ForgotPasswordModal;
