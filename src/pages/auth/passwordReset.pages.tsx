import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Text, Input, Checkbox, Spacer } from '@flexisaf/flexibull2';

// NEW RTK QUERY IMPORTS
import { useEnhancedPasswordResetMutation } from '../../store/enhancedApi';

import AuthPagesContainer from '../../components/auth/authPagesContainer';

import { Liner } from '../../styles/common/liner.styles';
import { FormContainer } from '../../styles/auth/auth.styles';
import { PrimaryButton } from '../../styles/common/buttons.styles';
import PasswordValidation from '../../components/custom/passwordValidation';

import fontSize from '../../utils/typography';
import { successNotifier } from '../../utils/helpers';

// NEW RTK QUERY TYPINGS
import { DistinctionPasswordReset } from '../../store/result';
import { PLATFORM as platform } from '../../utils/constants';

interface IResetValues {
  password: string;
  confirmPassword: string;
}

const getDefaultPasswordResetInformation = () => ({
  password: '',
  confirmPassword: '',
});

const PasswordReset = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const userId = searchParams.get('user');

  // NEW RTK QUERY HOOK
  const [passwordReset, { isLoading: isReseting }] =
    useEnhancedPasswordResetMutation();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    reset,
  } = useForm<IResetValues>({
    defaultValues: {
      ...getDefaultPasswordResetInformation(),
    },
  });

  useEffect(() => {
    if (!userId || !token) {
      navigate('/login');
    }
  }, [token, userId]);

  return (
    <AuthPagesContainer>
      <>
        <div style={{ width: '100%' }}>
          <Text {...fontSize.h5} style={{ textAlign: 'center' }} block bold>
            Reset your password
          </Text>
          <Spacer space="5px" />
          <Text size="11px" style={{ textAlign: 'center' }} block>
            You're one step away from recovering your account
          </Text>
          <Spacer space="20px" />
        </div>
        <Spacer space="24px" />
        <Liner borderstyle="dashed" />
        <Spacer space="24px" />
        <FormContainer>
          <PasswordValidation<IResetValues>
            watch={watch}
            register={register}
            getValues={getValues}
            setValue={setValue}
            fieldErrors={errors}
            showPassword={showPassword}
            field="password"
            type="password"
            label="New Password"
            placeholder="Enter New Password"
          />

          <Input
            type={showPassword ? 'text' : 'password'}
            required
            spaceTop
            style={{ backgroundColor: '#F7F7FF' }}
            block
            label="Confirm New Password"
            placeholder="Enter Confirm Password"
            value={watch('confirmPassword') as string}
            {...register('confirmPassword', {
              required: 'Password is required',
              validate: (val) => {
                if (watch('password') !== val) {
                  return 'Passwords do not match';
                }
              },
            })}
            error={errors.confirmPassword?.message as string | undefined}
            onChange={({ target: { value } }: { target: { value: string } }) =>
              setValue('confirmPassword', value)
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
        </div>
        <Spacer space="24px" />

        <PrimaryButton
          style={{ width: '100%' }}
          progress={isReseting}
          onClick={handleSubmit(async (v) => {
            try {
              const resetData: {
                distinctionPasswordReset: DistinctionPasswordReset;
              } = {
                distinctionPasswordReset: {
                  password: v.password,
                  token: token || '',
                  userId: userId || '',
                  platform,
                },
              };

              await passwordReset(resetData).unwrap();
              navigate('/login');
              successNotifier('Password changed successfully');
            } catch (error) {
              console.error('Password reset failed:', error);
              reset();
            }
          })}
        >
          Change Password
        </PrimaryButton>
      </>
    </AuthPagesContainer>
  );
};

export default PasswordReset;
