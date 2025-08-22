import { useState, useEffect } from 'react';

import {
  Layout,
  Spacer,
  Text,
  Box,
  EmptyState,
  Notify,
} from '@flexisaf/flexibull2';
import Theme from '../../utils/theme';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Header,
  Content,
  ContentBox,
} from '../../styles/dashboard/dashboard.styles';
import { PrimaryButton } from '../../styles/common/buttons.styles';
import SelectExamGroup from './components/selectExamgroup';
// import useExamGroupsGet from '../../hooks/examGroups/useExamGroupsGet';
import useStudentPaperPost from '../../hooks/studentPapers/useCreateStudentPaper';
import { useAppDispatch } from '../../store/store';
import Skeleton from 'react-loading-skeleton';
import useDataLayer from '../../hooks/tagManager/useDataLayer';
import { formattedDate, formattedTime } from '../../utils/helpers';
import HowtoPractice from './components/HowToPractice';
import useQuizathon from 'pages/quizathon/hooks/useQuizathon';
import usePracticeScreenState from 'hooks/practice/usePracticeScreenState';
import { setTimer } from 'hooks/practice/useTimerSlice';
import { DistinctionFeatureProperty } from 'utils/constants';
import useSubscriptionBilling from 'pages/profile/hooks/useSubscriptionBilling';
import PlanLimitBlock from 'pages/profile/subscription/PlanLimitBlock';
import SubscriptionPlansModal from 'pages/profile/subscription/SubscriptionPlansModal';
import useDisclosure from 'hooks/general/useDisclosure';
import FeatureTour from 'components/onboarding/FeatureTour';
import { Step } from 'react-joyride';
import { useAuthSlice } from 'pages/auth/authSlice';

// Type for exam group item - aligned with distinction-app
interface selectExamGroupItem {
  createdat: string;
  exam: {
    examGroupName: string;
    name: string;
    year: number;
    examGroupId: string;
  };
  subjectId: string;
  id: string;
  instruction: string;
  isActive: boolean;
  name: string;
  averageRating: number;
  subjectName: string;
  label?: string;
  value?: string;
}

// Type for default number of questions
type DefaultNumberOfQuestions = 'default' | 'custom';

const NewPractice = () => {
  const { user } = useAuthSlice();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pushEvent } = useDataLayer();

  // const { loadingExamGroups } = useExamGroupsGet();
  const [openTime, setOpenTime] = useState<boolean>(false);
  const [practiceLimit, setPracticeLimit] = useState<number>(50);
  const { customTime, setCustomTime } = usePracticeScreenState();
  const { createStudentPaper: createStudentPaperHook, isCreatingStudentPaper } =
    useStudentPaperPost();
  const { getFeatureLimit, isSuccessFeatureLimit, featureLimitData } =
    useSubscriptionBilling();

  const {
    getActiveQuizathon,
    activeQuizathon,
    getQuizathonPapersTaken,
    papersTaken,
    isLoadingPapersTaken,
    quizathonElapsedTime,
    isQuizathonInProgress,
  } = useQuizathon({
    // Only pass studentId if user exists
    studentId: user?.user?.id || undefined,
  });

  const planLimitHandler = useDisclosure();
  const subscriptionPlanHandler = useDisclosure();
  const [showTour, setShowTour] = useState(false);
  // NewPractice tour steps
  const newPracticeTourSteps: Step[] = [
    {
      target: '[data-tour="practice"]',
      content: 'Set up your session the way you want to study.',
      placement: 'bottom',
      disableBeacon: true,
    },
    {
      target: '[data-tour="select-department"]',
      content:
        'Set up your study path, start by selecting your curriculum, department, and course.',
      placement: 'bottom',
    },
    {
      target: '[data-tour="recommended-courses"]',
      content: 'Not sure where to start? Try one of our recommended courses.',
      placement: 'top',
    },
    {
      target: '[data-tour="how-to-practice"]',
      content: "Now let's fine-tune how you'll practice:",
      placement: 'top',
    },
    {
      target: '[data-tour="practice-type"]',
      content:
        'Pick Timed to simulate real exams or Untimed to study comfortably.',
      placement: 'top',
    },
    {
      target: '[data-tour="select-questions"]',
      content: "Decide how many questions you'd like to practice.",
      placement: 'top',
    },
    {
      target: '[data-tour="start-practice"]',
      content: 'Hit Start Practice to begin learning.',
      placement: 'top',
    },
  ];

  const isQuizathonActive = isQuizathonInProgress;
  const getDefaultQuestionNumber = (
    isQuizathonActive: boolean,
    practiceLimit: number
  ) => {
    if (isQuizathonActive) return 200;
    if (practiceLimit > 50) return 50;
    return practiceLimit;
  };

  const [selectedExamGroup, setSelectedExamGroup] =
    useState<null | selectExamGroupItem>(null);
  const [captcha, setCaptcha] = useState<string | null>(null);
  const [useDefault, setUseDefault] =
    useState<DefaultNumberOfQuestions>('default');
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(
    getDefaultQuestionNumber(isQuizathonActive, practiceLimit)
  );
  const [howToPractice, setHowToPractice] = useState<boolean>(false);
  const [selectedExam, setSelectedExam] = useState<null | {
    value: string;
    label: number;
  }>(null);
  const [showPaperTakenMessage, setShowPaperTakenMessage] =
    useState<boolean>(false);

  const [startPracticeClicked, setStartPracticeClicked] = useState(false);

  const { reset } = usePracticeScreenState();

  const selectedMode =
    openTime && customTime.minutes !== '' ? 'real' : 'learning';

  const timeElapsedCheck =
    isQuizathonActive &&
    quizathonElapsedTime?.timeElapsed != null &&
    quizathonElapsedTime.timeElapsed >= 285;

  const onCaptchaChange = (token: string | null) => {
    setCaptcha(token);
  };

  const onProceedToNext = () => {
    const paperExist = papersTaken?.items?.some(
      (paperTaken) => paperTaken.paper?.id === selectedExamGroup?.id
    );

    if (paperExist && isQuizathonActive) {
      setShowPaperTakenMessage(true);
    } else {
      setHowToPractice(true);
    }
  };
  const handleStartPractice = async () => {
    if (isQuizathonActive && !captcha) {
      return Notify('Please complete the captcha to proceed.', {
        status: 'error',
      });
    }
    if (
      isQuizathonActive &&
      numberOfQuestions <
        getDefaultQuestionNumber(isQuizathonActive, practiceLimit)
    )
      return Notify(
        `${getDefaultQuestionNumber(
          isQuizathonActive,
          practiceLimit
        )} questions is the minimum required for quizathon`,
        {
          status: 'error',
        }
      );
    if (
      openTime &&
      (!customTime.minutes ||
        customTime.minutes === '' ||
        customTime.minutes === '0')
    ) {
      return Notify('You have to provide a custom time to proceed.', {
        status: 'error',
      });
    }
    if (parseFloat(customTime.minutes) < 1) {
      return Notify('Timer must be at least 1 minute to proceed.', {
        status: 'error',
      });
    }
    if (selectedMode === 'real') {
      dispatch(setTimer({ time: Number(customTime.minutes) * 60 }));
    }
    setStartPracticeClicked(true);
    try {
      await createStudentPaperHook({
        paperId: selectedExamGroup?.id || '',
        size: numberOfQuestions,
        ...(isQuizathonActive && captcha && { captcha }),
        mode: selectedMode === 'real' ? 'REAL_MODE' : 'LEARNING_MODE',
        callback: () => {
          console.log('Callback called, navigating to practice page');
          navigate('/practice', {
            state: {
              mode: selectedMode,
              questionNumber: numberOfQuestions,
            },
          });
        },
      });
    } catch (error) {
      console.error('Error in handleStartPractice:', error);
    }
  };
  useEffect(() => {
    //clear all previous practice data before starting new one

    reset();
  }, []);

  useEffect(() => {
    setNumberOfQuestions(
      getDefaultQuestionNumber(isQuizathonActive, practiceLimit)
    );
  }, [isQuizathonActive, practiceLimit]);

  useEffect(() => {
    if (startPracticeClicked) {
      pushEvent('trackStartExam', {
        userId: user?.user?.id,
        mode: selectedMode,
        date: formattedDate,
        time: formattedTime,
        exam: selectedExamGroup?.name,
        year: selectedExam?.label,
      }); // analytics
    }
  }, [startPracticeClicked]);

  useEffect(() => {
    if (!selectedExamGroup) return;
    setSelectedExam(null);
  }, [selectedExamGroup]);

  useEffect(() => {
    getActiveQuizathon();
    getQuizathonPapersTaken();
  }, []);

  useEffect(() => {
    if (!activeQuizathon) return;
    // The quizathonElapsedTime is automatically fetched by the RTK Query hook
    // No need to manually call getQuizathonElapsedTime
  }, [activeQuizathon]);

  useEffect(() => {
    const CheckPracticeLimit = async () => {
      const payload = {
        property: DistinctionFeatureProperty.PRACTICE_QUESTIONS,
      };
      try {
        getFeatureLimit(payload);
        // The RTK Query will handle the async operation
        // We'll check the result in a separate useEffect
      } catch (error) {
        console.error('Error checking practice limit:', error);
      }
    };

    CheckPracticeLimit();
  }, []);

  // Handle feature limit result
  useEffect(() => {
    if (isSuccessFeatureLimit && featureLimitData) {
      const balance = Number(featureLimitData?.balance);
      if (balance === 0) {
        planLimitHandler.onOpen();
      }
    }
  }, [isSuccessFeatureLimit, featureLimitData]);

  // Check if tour should be shown
  useEffect(() => {
    if (isLoadingPapersTaken) return;
    const progress = sessionStorage.getItem('newPractice_onboarding');
    if (!progress) {
      setShowTour(true);
    } else {
      try {
        const parsed = JSON.parse(progress);
        if (
          !parsed ||
          parsed.tourVersion !== '1.0' ||
          parsed.lastCompletedStep < newPracticeTourSteps.length - 1
        ) {
          setShowTour(true);
        }
      } catch (e) {
        setShowTour(true);
      }
    }
  }, [isLoadingPapersTaken]);

  const handleTourComplete = () => {
    setShowTour(false);
  };

  if (timeElapsedCheck)
    return (
      <Box pad="20px">
        <EmptyState
          title="Time limit exceeded"
          info="You've reached the maximum of 300 minutes allowed for this quizathon. Please click the button below and enjoy other features of the app"
          action={
            <PrimaryButton onClick={() => navigate('/dashboard')}>
              Dashboard
            </PrimaryButton>
          }
          style={{ width: '100%' }}
        />
      </Box>
    );

  if (showPaperTakenMessage)
    return (
      <Box pad="20px">
        <EmptyState
          title="Oops, You have already taken this course"
          info="You're only allowed to take a course once for the quizathon. Please select another course"
          action={
            <PrimaryButton onClick={() => setShowPaperTakenMessage(false)}>
              Select course
            </PrimaryButton>
          }
          style={{ width: '100%' }}
        />
      </Box>
    );

  return (
    <Layout theme={Theme}>
      <FeatureTour
        tourKey="newPractice"
        tourVersion="1.0"
        steps={newPracticeTourSteps}
        run={showTour}
        onComplete={handleTourComplete}
      />

      <Container>
        <Header>
          <div onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
            <i className="saf-arrow-left-2" />
            <Text>Back</Text>
          </div>
        </Header>

        <Content>
          {isLoadingPapersTaken ? (
            <Skeleton
              count={1}
              baseColor="#d0d5d933"
              highlightColor="#c2cad133"
              width="100%"
              height="100%"
            />
          ) : (
            <ContentBox>
              <Spacer space="50px" />
              <Box>
                <SelectExamGroup
                  setSelectedExamGroup={setSelectedExamGroup}
                  selectedExamGroup={selectedExamGroup}
                  onProceedToNext={onProceedToNext}
                />
              </Box>
              <Box>
                {howToPractice && (
                  <motion.div>
                    <HowtoPractice
                      howToPractice={howToPractice}
                      setHowToPractice={setHowToPractice}
                      selectedExamGroupId={selectedExamGroup?.id ?? ''}
                      useDefault={useDefault}
                      setUseDefault={setUseDefault}
                      numberOfQuestions={numberOfQuestions}
                      openTime={openTime}
                      setOpenTime={setOpenTime}
                      customTime={customTime}
                      setCustomTime={setCustomTime}
                      setNumberOfQuestions={setNumberOfQuestions}
                      defaultQuestionNumber={getDefaultQuestionNumber(
                        isQuizathonActive,
                        practiceLimit
                      )}
                      isQuizathonInProgress={isQuizathonActive}
                      practiceLimit={practiceLimit}
                      handleStartPractice={handleStartPractice}
                      isCreatingStudentPaper={isCreatingStudentPaper}
                      openSubscriptionPlans={subscriptionPlanHandler.onOpen}
                      onCaptchaChange={onCaptchaChange}
                    />
                  </motion.div>
                )}
              </Box>
            </ContentBox>
          )}
        </Content>

        <PlanLimitBlock
          isOpen={planLimitHandler.isOpen}
          closeModal={planLimitHandler.onClose}
          feature={DistinctionFeatureProperty.PRACTICE_QUESTIONS}
          togglePlansModal={() => {
            planLimitHandler.onClose();
            subscriptionPlanHandler.onOpen();
          }}
          enableOuterClick={false}
          showDailyPlan={false}
        />
        <SubscriptionPlansModal
          onClose={subscriptionPlanHandler.onClose}
          openModal={subscriptionPlanHandler.isOpen}
        />
      </Container>
    </Layout>
  );
};

export default NewPractice;
