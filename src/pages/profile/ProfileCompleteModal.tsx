import { useEffect, useMemo } from 'react';
import useProfile from 'pages/profile/hooks/useProfile';
import { useUserSlice } from 'pages/auth/userSlice';
import {
  Box,
  Button,
  Modal,
  ModalBody,
  Text,
  Input,
  Select,
  Spacer,
  Grid,
} from '@flexisaf/flexibull2';
import { IoPerson } from 'react-icons/io5';
import useQuizathon from 'pages/quizathon/hooks/useQuizathon';
import { getStates } from 'country-state-picker';
import Theme from 'utils/theme';
import { useForm, Controller } from 'react-hook-form';
import { OptionI } from './editProfile';
import { getLevelOptionsByCurriculum } from 'utils/constants';

interface ProfileCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
}
type ProfileDataI = {
  institution: OptionI | null;
  phoneNumber: string;
  department: string;
  level: OptionI | null;
  matriculationNumber: string;
  stateOfOrigin: OptionI | null;
  gender: OptionI | null;
  dateOfBirth: string;
};

const ProfileCompleteModal = ({
  isOpen,
  onClose,
}: ProfileCompleteModalProps) => {
  const user = useUserSlice();
  const { profileData, editProfile, isEditingProfile } = useProfile();
  const { schoolList, getSchoolList } = useQuizathon();
  const studentId = user?.studentId as string;

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileDataI>({
    defaultValues: {
      gender: null,
      phoneNumber: '',
      institution: null,
      department: '',
      level: null,
      matriculationNumber: '',
      stateOfOrigin: null,
      dateOfBirth: '',
    },
  });

  // Get the selected institution's curriculum
  const selectedInstitution = schoolList?.items?.find(
    (school) => school.id === watch('institution')?.value
  );
  const institutionCurriculum = selectedInstitution?.curriculum;

  // Generate level options based on curriculum
  const getLevelOptions = useMemo(() => {
    return getLevelOptionsByCurriculum(institutionCurriculum || '');
  }, [institutionCurriculum]);

  useEffect(() => {
    if (studentId) {
      getSchoolList();
    }
  }, [studentId]);

  // Set form values when profileData or schoolList changes
  useEffect(() => {
    if (profileData) {
      const schoolId = profileData.schoolInformationView?.school?.id || '';
      const schoolName = profileData.schoolInformationView?.school?.name || '';
      setValue(
        'institution',
        schoolId && schoolName ? { label: schoolName, value: schoolId } : null
      );
      setValue(
        'gender',
        profileData.gender
          ? { label: profileData.gender, value: profileData.gender }
          : null
      );
      setValue('phoneNumber', profileData.phoneNumber || '');
      setValue(
        'department',
        profileData.schoolInformationView?.department?.name || ''
      );
      // Find the selected institution and its curriculum
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
              label: profileData.stateOfOrigin,
              value: profileData.stateOfOrigin,
            }
          : null
      );
      setValue(
        'matriculationNumber',
        profileData.schoolInformationView?.matriculationNumber || ''
      );
      setValue('dateOfBirth', profileData.dateOfBirth || '');
    }
  }, [profileData, setValue, schoolList]);

  const onSubmit = (data: any) => {
    const payload = {
      firstName: profileData?.firstName as string,
      lastName: profileData?.lastName as string,
      gender: data.gender.value,
      phoneNumber: data.phoneNumber,
      schoolId: data.institution.value,
      department: data.department,
      level: data.level.value,
      matriculationNumber: data.matriculationNumber,
      stateOfOrigin: data.stateOfOrigin.value,
      dateOfBirth: data.dateOfBirth,
      email: profileData?.email as string,
      studentId: profileData?.studentId as string,
      nin: profileData?.nin || '',
      formData: {},
    };

    editProfile(payload, () => {
      onClose();
    });
  };

  return (
    <Modal onClose={onClose} open={isOpen}>
      <ModalBody
        style={{
          maxWidth: '600px',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        }}
        width="90%"
        data-testid="profile-complete-modal"
      >
        <Box pad="1.5rem">
          <Box
            className="flex items-center flex-col gap-3"
            style={{ textAlign: 'center' }}
          >
            <IoPerson size={40} color={Theme.PrimaryColor} />
            <Text
              style={{
                fontWeight: '700',
                fontSize: '28px',
                marginBottom: '4px',
              }}
            >
              Complete Your Profile
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: '#666',
                marginBottom: '4px',
              }}
            >
              Please complete your profile information to access all features
            </Text>
          </Box>
          <Spacer space="40px" />

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid default="1fr 1fr" sm="1fr" gap="1rem">
              <Box>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: 'Gender is required' }}
                  render={({ field }) => (
                    <Select
                      spaceBottom
                      label="Gender"
                      value={field.value}
                      onChange={field.onChange}
                      options={[
                        { label: 'Male', value: 'Male' },
                        { label: 'Female', value: 'Female' },
                      ]}
                      required
                      style={{ width: '100%' }}
                      error={errors.gender?.message}
                    />
                  )}
                />
              </Box>
              <Box>
                <Controller
                  name="phoneNumber"
                  control={control}
                  rules={{ required: 'Phone Number is required' }}
                  render={({ field }) => (
                    <Input
                      spaceBottom
                      label="Phone Number"
                      placeholder="e.g. 08012345678"
                      {...field}
                      maxLength={11}
                      required
                      style={{ width: '100%' }}
                      error={errors.phoneNumber?.message}
                    />
                  )}
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
                  onChange={(value: OptionI) => {
                    setValue('institution', value);
                    setValue('level', null);
                  }}
                  options={
                    schoolList?.items?.map((item) => ({
                      label: item.name,
                      value: item.id,
                    })) || []
                  }
                  error={errors.institution?.message}
                />
              </Box>
              <Box>
                <Controller
                  name="department"
                  control={control}
                  rules={{ required: 'Department is required' }}
                  render={({ field }) => (
                    <Input
                      spaceBottom
                      label="Department"
                      placeholder="Enter your department"
                      {...field}
                      required
                      style={{ width: '100%' }}
                      error={errors.department?.message}
                    />
                  )}
                />
              </Box>
              <Box>
                <Controller
                  name="level"
                  control={control}
                  rules={{ required: 'Level is required' }}
                  render={({ field }) => (
                    <Select
                      spaceBottom
                      label="Level"
                      value={field.value}
                      onChange={field.onChange}
                      options={getLevelOptions}
                      required
                      style={{ width: '100%' }}
                      error={errors.level?.message}
                    />
                  )}
                />
              </Box>
              <Box>
                <Controller
                  name="matriculationNumber"
                  control={control}
                  rules={{ required: 'Matriculation Number is required' }}
                  render={({ field }) => (
                    <Input
                      spaceBottom
                      label="Matriculation Number"
                      placeholder="Enter your matric number"
                      {...field}
                      required
                      style={{ width: '100%' }}
                      error={errors.matriculationNumber?.message}
                    />
                  )}
                />
              </Box>
              <Box>
                <Controller
                  name="stateOfOrigin"
                  control={control}
                  rules={{ required: 'State of Origin is required' }}
                  render={({ field }) => (
                    <Select
                      spaceBottom
                      label="State of Origin"
                      value={field.value}
                      onChange={field.onChange}
                      options={[...getStates('ng')].map((item) => ({
                        label: item,
                        value: item,
                      }))}
                      required
                      style={{ width: '100%' }}
                      error={errors.stateOfOrigin?.message}
                    />
                  )}
                />
              </Box>
              <Box>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  rules={{
                    required: 'Date of Birth is required',
                    validate: (value) => {
                      const today = new Date();
                      today.setFullYear(today.getFullYear() - 16);
                      return (
                        (value && new Date(value) <= today) ||
                        'Minimum age is 16'
                      );
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      spaceBottom
                      label="Date of Birth"
                      type="date"
                      {...field}
                      required
                      style={{ width: '100%' }}
                      error={errors.dateOfBirth?.message}
                    />
                  )}
                />
              </Box>
            </Grid>
            <Spacer space="20px" />

            <Box align="right">
              <Button
                progress={isEditingProfile}
                disabled={isEditingProfile}
                color={Theme.PrimaryColor}
                onClick={handleSubmit(onSubmit)}
              >
                Update Profile
              </Button>
            </Box>
          </form>
          <Spacer space="40px" />
        </Box>
      </ModalBody>
    </Modal>
  );
};

export default ProfileCompleteModal;
