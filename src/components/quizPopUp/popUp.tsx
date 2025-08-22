import { ChangeEvent } from 'react';
import {
  Box,
  Grid,
  Text,
  Button,
  Modal,
  ModalBody,
  ModalClose,
  Select,
  Input,
  Spacer,
} from '@flexisaf/flexibull2';
import PopUpIcon from '../../assets/popup_icon.svg';
import { useState, useEffect } from 'react';
import { useAuthSlice } from 'pages/auth/authSlice';
import useQuizathon from 'pages/quizathon/hooks/useQuizathon';
import { getLocalItem, setLocalItem } from 'utils/helpers';
import { useForm } from 'react-hook-form';
import { capitalizeFirstLetterOFEachWord } from 'utils/helpers';

export type OptionI = {
  label: string;
  value: string;
};

export type InstitutionI = {
  school: OptionI | null;
  department: string;
  faculty?: OptionI | null;
};

const QuizathonPopUp = () => {
  const [isParticipating, setIsParticipating] = useState<boolean>(false);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm<InstitutionI>({
    defaultValues: {
      school: null,
      department: '',
    },
  });
  const { user } = useAuthSlice();
  const {
    schoolList,
    submitStudentInfo,
    isSubmittingInfo,
    getSchoolList,
    getActiveQuizathon,
    // getParticipant,
    activeQuizathon,
    participantDetails,
    isLoadingParticipant,
  } = useQuizathon({
    studentId: user?.user?.id || undefined,
  });

  const userId = user?.user?.id;
  const quizathonId = activeQuizathon?.id;
  const currentTimeStamp = new Date();
  const hasEnded =
    new Date(activeQuizathon?.stopAt as string).getTime() <=
    currentTimeStamp.getTime();

  const closePopUp = () => {
    setLocalItem('popUp', JSON.stringify({ showPopUp: true }));
    setShowPopUp(false);
    reset();
  };

  const onSubmit = (data: InstitutionI) => {
    const payload = {
      schoolId: data.school?.value || '',
      department: data.department,
      quizathonId: activeQuizathon?.id ?? '',
    };
    submitStudentInfo(payload, closePopUp);
  };

  useEffect(() => {
    const popUpObj = JSON.parse(getLocalItem('popUp') || '{}');
    if (popUpObj.showPopUp) return;
    if (!activeQuizathon || hasEnded) return;
    if (!participantDetails) {
      setShowPopUp(true);
    } else {
      setShowPopUp(false);
      setLocalItem('popUp', JSON.stringify({ showPopUp: true }));
    }
  }, [participantDetails, user, activeQuizathon, hasEnded]);

  useEffect(() => {
    getSchoolList();
    getActiveQuizathon();
  }, []);

  if (isLoadingParticipant || !user || !activeQuizathon) return null;
  return (
    <Modal onClose={closePopUp} open={showPopUp}>
      <ModalBody style={{ maxWidth: '570px' }} width="90%" bgColor="#fff">
        {isParticipating && (
          <ModalClose onClick={closePopUp}>&times;</ModalClose>
        )}
        <Box pad="3.5rem 2rem">
          {!isParticipating && (
            <Grid default="1fr" gap="20px" style={{ placeItems: 'center' }}>
              <img src={PopUpIcon} />
              <Text size="0.9rem" bold>
                Are you participating in the {activeQuizathon.title} ?
              </Text>
              <Box width="100%">
                <Grid default="auto auto" columnGap="40px">
                  <Button
                    block
                    onClick={() => setIsParticipating(!isParticipating)}
                  >
                    Yes
                  </Button>
                  <Button block pale onClick={closePopUp}>
                    No
                  </Button>
                </Grid>
              </Box>
            </Grid>
          )}

          {isParticipating && (
            <Grid default="1fr" gap="20px">
              <Box>
                <Text bold size="1rem">
                  Let's Find Your School
                </Text>
                <Spacer space={5} />
                <Text size="1rem">Choose Institution</Text>
              </Box>

              <Select
                block
                placeholder="Select Institution"
                required
                isLoading={false}
                value={watch('school')}
                {...register('school', {
                  required: 'Please select your institution',
                })}
                error={errors.school?.message}
                onChange={(value: OptionI) => setValue('school', value)}
                options={schoolList?.items?.map((item) => {
                  return {
                    label: item.name,
                    value: item.id,
                  };
                })}
              />

              <Input
                block
                required
                placeholder="Department e.g Accounting"
                isLoading={false}
                value={watch('department')}
                {...register('department', {
                  required: 'Please enter your department name',
                })}
                error={errors?.department?.message}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const value = capitalizeFirstLetterOFEachWord(e.target.value);
                  setValue('department', value);
                }}
              />
              <Box width="100%">
                <Grid default="auto auto" columnGap="40px">
                  <Box />
                  <Button
                    block
                    progress={isSubmittingInfo}
                    onClick={handleSubmit((data) => onSubmit(data))}
                  >
                    Proceed
                  </Button>
                </Grid>
              </Box>
            </Grid>
          )}
        </Box>
      </ModalBody>
    </Modal>
  );
};

export default QuizathonPopUp;
