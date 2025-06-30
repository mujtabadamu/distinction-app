import {
  Box,
  Spacer,
  Button,
  Grid,
  Input,
  Notify,
  PageTitle,
  Select,
} from '@flexisaf/flexibull2';
import { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import useQuizathon from 'pages/quizathon/hooks/useQuizathon';
import { useNavigate } from 'react-router-dom';
import useProfile from 'pages/profile/hooks/useProfile';
import SectionLoader from 'components/custom/sectionLoader';
import { capitalizeFirstLetterOFEachWord } from 'utils/helpers';
import { getStates } from 'country-state-picker';
import { getLevelOptionsByCurriculum } from 'utils/constants';

import useSubscriptionBilling from './hooks/useSubscriptionBilling';
import ProfileHeaderSection from './components/profileHeaderSection';

export type OptionI = {
  label: string;
  value: string;
};
type OptionLevel = {
  label: string;
  value: string;
};

const getDefaultValues = () => ({
  firstName: '',
  lastName: '',
  otherName: '',
  email: '',
  institution: null,
  gender: null,
  phoneNumber: '',
  department: '',
  level: null,
  stateOfOrigin: null,
  matriculationNumber: '',
  nin: '',
  dateOfBirth: '',
});

export type ProfileI = {
  firstName: string;
  lastName: string;
  otherName: string;
  email: string;
  institution: OptionI | null;
  phoneNumber: string;
  department: string;
  level: OptionLevel | null;
  matriculationNumber: string;
  stateOfOrigin: OptionI | null;
  gender: OptionI | null;
  nin: string;
  dateOfBirth: string;
};

const EditProfile = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<ProfileI>({
    defaultValues: {
      ...getDefaultValues(),
    },
  });
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { profileData, isLoadingProfile, editProfile, isEditingProfile } =
    useProfile();
  const { schoolList, getSchoolList } = useQuizathon();
  const { activePlan } = useSubscriptionBilling();

  // Get the selected institution's curriculum
  const selectedInstitution = schoolList?.items?.find(
    (school) => school.id === watch('institution')?.value
  );
  const institutionCurriculum = selectedInstitution?.curriculum;

  // Memoize level options
  const getLevelOptions = useMemo(() => {
    return getLevelOptionsByCurriculum(institutionCurriculum || '');
  }, [institutionCurriculum]);

  const onSubmit = (data: ProfileI) => {
    const formData = {
      profileImage: selectedFile ?? undefined,
    };

    const payload = {
      ...data,
      department: capitalizeFirstLetterOFEachWord(data?.department),
      email: profileData?.email as string,
      studentId: profileData?.studentId as string,
      gender: '',
      schoolId: data?.institution?.value as string,
      level: data?.level?.value as string,
      stateOfOrigin: data?.stateOfOrigin?.value as string,
      dateOfBirth: data?.dateOfBirth as string,
      formData,
    };
    editProfile(payload, () => {
      navigate('/profile');
    });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    const file = e.target.files?.[0];
    if (!file) return;

    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validImageTypes.includes(file.type)) {
      Notify('Invalid file type. Please upload an image (jpg, jpeg, png).', {
        status: 'error',
      });
      return;
    }

    const uploadLimit = file.size / 1024 / 1024 < 2.5;
    if (!uploadLimit) {
      Notify('File must not exceed 2.5MB', { status: 'error' });
      return;
    }
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    getSchoolList();
    // getActivePlan();
  }, []);

  useEffect(() => {
    if (profileData) {
      setValue('firstName', profileData.firstName || '');
      setValue('lastName', profileData.lastName || '');
      setValue('otherName', profileData.otherName || '');
      setValue('email', profileData.email || '');
      setValue(
        'institution',
        profileData.schoolInformationView?.school
          ? {
              label: profileData.schoolInformationView.school.name as string,
              value: profileData.schoolInformationView.school.id as string,
            }
          : null
      );
      setValue(
        'gender',
        profileData.gender
          ? {
              label: profileData.gender as string,
              value: profileData.gender as string,
            }
          : null
      );
      setValue('phoneNumber', profileData.phoneNumber || '');
      setValue(
        'department',
        profileData.schoolInformationView?.department?.name || ''
      );
      const selectedInstitution = schoolList?.items?.find(
        (school) => school.id === profileData.schoolInformationView?.school?.id
      );
      const institutionCurriculum = selectedInstitution?.curriculum;
      const levelOptions = getLevelOptionsByCurriculum(
        institutionCurriculum || ''
      );
      const currentLevel = profileData.schoolInformationView?.level || '';
      const levelOption = levelOptions.find(
        (opt) => opt.value === currentLevel
      );

      setValue('level', levelOption || null);

      setValue(
        'stateOfOrigin',
        profileData.stateOfOrigin
          ? {
              label: profileData.stateOfOrigin ?? '',
              value: profileData.stateOfOrigin ?? '',
            }
          : null
      );
      setValue(
        'matriculationNumber',
        profileData.schoolInformationView?.matriculationNumber || ''
      );
      setValue('nin', profileData.nin ?? '');
      setValue('dateOfBirth', profileData.dateOfBirth ?? '');
      setSelectedImage(profileData.profileImage || '');
    }
  }, [profileData, setValue, schoolList]);

  if (isLoadingProfile) return <SectionLoader />;
  return (
    <>
      <Box pad="1.5rem">
        <PageTitle>Profile</PageTitle>
        <ProfileHeaderSection
          activePlan={activePlan}
          profileData={profileData}
          showEditButton={false}
          handleFile={handleFile}
          selectedImage={selectedImage}
          isLoading={isLoadingProfile}
        />

        <Spacer space="60px" />
        <Box>
          <Grid default="1fr 1fr 1fr" sm="1fr" md="1fr 1fr" gap="1rem">
            <Box>
              <Input
                spaceTop
                spaceBottom
                required
                type="text"
                label="First Name"
                disabled={!!profileData?.isNinVerified}
                placeholder="-- / --"
                error={errors.firstName?.message}
                style={{ width: '100%', marginTop: '0' }}
                value={watch('firstName')}
                {...register('firstName', {
                  required: 'First Name is required',
                })}
                onChange={({
                  target: { value },
                }: {
                  target: { value: string };
                }) => setValue('firstName', value)}
              />
            </Box>
            <Box>
              <Input
                spaceTop
                spaceBottom
                label="Other Name"
                disabled={!!profileData?.isNinVerified}
                placeholder="-- / --"
                type="text"
                style={{ width: '100%', marginTop: '0' }}
                value={watch('otherName')}
                {...register('otherName')}
                onChange={({
                  target: { value },
                }: {
                  target: { value: string };
                }) => setValue('otherName', value)}
              />
            </Box>
            <Box>
              <Input
                spaceTop
                spaceBottom
                required
                disabled={!!profileData?.isNinVerified}
                type="text"
                label="Last Name"
                placeholder="-- / --"
                style={{ width: '100%', marginTop: '0' }}
                value={watch('lastName')}
                {...register('lastName', { required: 'Last Name is required' })}
                onChange={({
                  target: { value },
                }: {
                  target: { value: string };
                }) => setValue('lastName', value)}
                error={errors.lastName?.message}
              />
            </Box>
            <Box>
              <Input
                spaceTop
                spaceBottom
                required
                type="email"
                disabled
                label="Email Address"
                placeholder="-- / --"
                style={{ width: '100%', marginTop: '0' }}
                value={watch('email')}
              />
            </Box>
            <Box>
              <Select
                block
                spaceBottom
                label="Gender"
                placeholder="Select Gender"
                required
                disabled={!!profileData?.isNinVerified}
                value={watch('gender')}
                {...register('gender', {
                  required: 'Please select your gender',
                })}
                error={errors.gender?.message}
                onChange={(value: OptionI) => setValue('gender', value)}
                options={[
                  { label: 'Male', value: 'Male' },
                  { label: 'Female', value: 'Female' },
                ].map((item) => {
                  return {
                    label: item.label,
                    value: item.value,
                  };
                })}
              />
            </Box>
            <Box>
              <Input
                spaceTop
                spaceBottom
                required
                type="text"
                label="Phone Number"
                placeholder="-- / --"
                style={{ width: '100%', marginTop: '0' }}
                maxLength={11}
                value={watch('phoneNumber')}
                {...register('phoneNumber', {
                  required: 'Phone number is required',
                })}
                onChange={({
                  target: { value },
                }: {
                  target: { value: string };
                }) => setValue('phoneNumber', value)}
                error={errors.phoneNumber?.message}
              />
            </Box>
            <Box>
              <Select
                block
                spaceBottom
                label="Institution"
                placeholder="Select Institution"
                required
                isLoading={false}
                value={watch('institution')}
                {...register('institution', {
                  required: 'Institution is required',
                })}
                error={errors.institution?.message}
                onChange={(value: OptionI) => {
                  setValue('institution', value);
                  setValue('level', null);
                }}
                options={schoolList?.items?.map((item) => {
                  return {
                    label: item.name,
                    value: item.id,
                  };
                })}
              />
            </Box>

            <Box>
              <Input
                spaceTop
                spaceBottom
                required
                type="text"
                label="Department"
                placeholder="-- / --"
                style={{ width: '100%', marginTop: '0' }}
                value={watch('department')}
                {...register('department', {
                  required: 'Department is required',
                })}
                onChange={({
                  target: { value },
                }: {
                  target: { value: string };
                }) => setValue('department', value)}
                error={errors.department?.message}
              />
            </Box>
            <Box>
              <Select
                block
                spaceBottom
                label="Level"
                placeholder="Select Level"
                required
                value={watch('level')}
                {...register('level', {
                  required: 'Level is required',
                })}
                error={errors.level?.message}
                onChange={(value: OptionLevel) => setValue('level', value)}
                options={getLevelOptions}
                style={{ width: '100%', marginTop: '0' }}
              />
            </Box>

            <Box>
              <Input
                spaceTop
                spaceBottom
                required
                type="text"
                style={{ width: '100%', marginTop: '0' }}
                label="Matriculation Number"
                placeholder="-- / --"
                value={watch('matriculationNumber')}
                {...register('matriculationNumber', {
                  required: 'Matriculation number is required',
                })}
                onChange={({
                  target: { value },
                }: {
                  target: { value: string };
                }) => setValue('matriculationNumber', value)}
                error={errors.matriculationNumber?.message}
              />
            </Box>
            <Box>
              <Input
                spaceTop
                spaceBottom
                required
                type="date"
                disabled={!!profileData?.isNinVerified}
                style={{ width: '100%', marginTop: '0' }}
                label="Date of birth"
                value={watch('dateOfBirth')}
                {...register('dateOfBirth', {
                  required: 'Date of Birth is required',
                  validate: (value) => {
                    const today = new Date();
                    today.setFullYear(today.getFullYear() - 16);
                    return (
                      (value && new Date(value) <= today) || 'Minimum age is 16'
                    );
                  },
                })}
                error={errors.dateOfBirth?.message}
                onChange={({
                  target: { value },
                }: React.ChangeEvent<HTMLInputElement>) =>
                  setValue('dateOfBirth', value)
                }
              />
            </Box>

            <Box>
              <Select
                block
                label="State Of Origin"
                placeholder="Select state"
                required
                error={errors.stateOfOrigin?.message}
                value={watch('stateOfOrigin')}
                {...register('stateOfOrigin', {
                  required: 'State of Origin is required',
                })}
                onChange={(value: OptionI) => setValue('stateOfOrigin', value)}
                options={[...getStates('ng')].map((item) => {
                  return {
                    label: item,
                    value: item,
                  };
                })}
              />
            </Box>
          </Grid>
          <Spacer space="20px" />
        </Box>
        <Grid default="1fr 1fr">
          <Box />
          <Box align="right">
            <Button
              onClick={() => navigate(-1)}
              style={{ background: 'white', color: 'black' }}
              spaceRight
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit((data) => onSubmit(data))}
              progress={isEditingProfile}
            >
              Update Profile
            </Button>
          </Box>
        </Grid>
        <Spacer space="80px" />
      </Box>
    </>
  );
};

export default EditProfile;
