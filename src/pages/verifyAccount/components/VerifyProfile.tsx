import { ChangeEvent } from 'react';
import { Box, Text, Spacer, Input, Button, Grid } from '@flexisaf/flexibull2';
import { Liner } from 'styles/common/liner.styles';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Screen, InstitutionProfile, Boxicon, ProfileDetails } from '../styles';
import { Link } from 'react-router-dom';
import Theme from 'utils/theme';
import InfoBanner from 'components/infoBanner/InfoBanner';
import useDataLayer from 'hooks/tagManager/useDataLayer';
import PasswordValidation from 'components/custom/passwordValidation';
import { isValidEmail, formattedDate, formattedTime } from 'utils/helpers';
import { UploadedStudentView } from 'generated/index';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { capitalizeFirstLetter } from 'utils/helpers';
import {
  DistinctionUploadedUserRegistrationRequest,
  DistinctionUploadedUserRegistrationResponse,
} from 'generated/index';
import { PLATFORM, PlatformType } from 'utils/constants';

export type IRegister = {
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
};
interface Props {
  isRegisteringUser: boolean;
  RegisterBulkUploadedUser: (
    payload: DistinctionUploadedUserRegistrationRequest,
    callback: (response: DistinctionUploadedUserRegistrationResponse) => void
  ) => void;
  steps: number;
  setActiveEmail: (x: string) => void;
  setSteps: (x: number) => void;
  studentValidated: UploadedStudentView | null;
}

const VerifyProfile = ({
  steps,
  RegisterBulkUploadedUser,
  isRegisteringUser,
  setSteps,
  studentValidated,
  setActiveEmail,
}: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<IRegister>({
    defaultValues: {
      email: studentValidated?.email || '',
      password: '',
      confirmPassword: '',
      phone: studentValidated?.phoneNumber || '',
    },
  });
  const { pushEvent } = useDataLayer();
  const [showPass, setShowPass] = useState<boolean>(false);
  const [confirmPass, setConfirmPass] = useState<boolean>(false);

  const onSubmit = (data: IRegister) => {
    const { phone, email, password } = data;
    setActiveEmail(email);
    const payload = {
      email,
      password,
      firstName: studentValidated?.firstName as string,
      lastName: studentValidated?.lastName as string,
      phone,
      schoolId: studentValidated?.school?.id,
      matricNumber: studentValidated?.matriculationNumber as string,
      department: studentValidated?.department?.name as string,
      platform: PLATFORM as PlatformType,
    };
    RegisterBulkUploadedUser(payload, (response) => {
      pushEvent('trackAuthentication', {
        userId: response?.id,
        authType: 'register',
        authMethod: 'password',
        date: formattedDate,
        time: formattedTime,
      });
      setSteps(steps + 1);
    });
  };

  return (
    <Screen maxWidth="680px">
      <Text style={{ fontWeight: '500' }} size="1.1rem">
        Verify Profile
      </Text>
      <Spacer space="10" />
      <Text style={{ fontWeight: '400', color: '#454545' }}>
        Confirm If this is your profile before you proceed, or else{' '}
        <Link to="/register">
          <Text
            color={Theme.PrimaryColor}
            style={{ cursor: 'pointer', fontWeight: 'bold' }}
            bold
          >
            sign up here.
          </Text>
        </Link>
      </Text>
      <Spacer space="17" />
      <Liner color="#EDEDED" />
      <Spacer space="20" />
      <InstitutionProfile>
        <Text bold size="1.1rem">
          Reg.No:{' '}
          <Text color={Theme.PrimaryColor}>
            {studentValidated?.matriculationNumber?.toUpperCase()}
          </Text>
        </Text>
        <Spacer space="25" />
        <Text className="title">{`${capitalizeFirstLetter(
          studentValidated?.firstName ?? ''
        )} ${capitalizeFirstLetter(studentValidated?.lastName ?? '')}`}</Text>
        <Spacer space="5" />
        <ProfileDetails>
          <Text className="course">{studentValidated?.school?.name}</Text>
          <div className="dot" />
          <Text className="course">{studentValidated?.department?.name}</Text>
          <div className="dot" />
          <Text className="course">{`${studentValidated?.level} Level`}</Text>
        </ProfileDetails>
      </InstitutionProfile>
      <Spacer space="20" />
      <Liner color="#EDEDED" />
      <Spacer space="20" />
      <InfoBanner
        bgColor="#E7E7FF"
        infoTitle=""
        infoText={
          <>
            <Text size="1rem">
              Ensure that your email is correct and active
            </Text>
          </>
        }
        icon="saf-information"
      />
      <Spacer space="30" />
      <Input
        block
        label="Email Address"
        required
        placeholder="Enter your email"
        type="text"
        isLoading={false}
        value={watch('email') as string}
        {...register('email', {
          required: 'Email is required',
          validate: (val) => {
            if (!isValidEmail(val)) {
              return 'Please enter a valid email';
            }
          },
        })}
        error={errors.email?.message as string | undefined}
        onChange={({ target: { value } }: { target: { value: string } }) =>
          setValue('email', value)
        }
      />
      <Spacer space="30" />
      <PhoneInput
        country={'ng'}
        placeholder="Ex: 080 000 0123"
        value={watch('phone') as string}
        {...register('phone', {
          required: 'Phone number is required',
        })}
        onChange={(value: string) => setValue('phone', value)}
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
      <Spacer space="30" />
      <Box style={{ position: 'relative' }}>
        <PasswordValidation<IRegister>
          watch={watch}
          register={register}
          iconRight={null}
          getValues={getValues}
          setValue={setValue}
          fieldErrors={errors}
          showPassword={showPass}
          field="password"
          type="password"
          label="New Password"
          placeholder="Min. 8 characters"
        />
        <Boxicon top="33px" onClick={() => setShowPass((prev) => !prev)}>
          <i className={showPass ? 'saf-eye' : 'saf-eye-slash'} />
        </Boxicon>
      </Box>
      <Spacer space="50" />
      <Box style={{ position: 'relative' }}>
        <Input
          block
          label="Confirm Password"
          required
          iconRight={null}
          placeholder="Confirm your password"
          type={confirmPass ? 'text' : 'password'}
          isLoading={false}
          value={watch('confirmPassword')}
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) =>
              value === watch('password') || 'Passwords do not match',
          })}
          error={errors?.confirmPassword?.message}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setValue('confirmPassword', value);
          }}
        />
        <Boxicon top="15px" onClick={() => setConfirmPass((prev) => !prev)}>
          <i className={confirmPass ? 'saf-eye' : 'saf-eye-slash'} />
        </Boxicon>
      </Box>
      <Spacer space="30" />
      <Grid default="1fr 1fr">
        <Box />
        <Button
          progress={isRegisteringUser}
          onClick={handleSubmit((data) => onSubmit(data))}
        >
          Submit
        </Button>
      </Grid>
    </Screen>
  );
};

export default VerifyProfile;
