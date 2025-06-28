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
import { useDispatch, useSelector } from 'react-redux';
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
import { selectCurrentUser } from '../../redux/auth/selectors';
import useExamGroupsGet from '../../hooks/examGroups/useExamGroupsGet';
import useStudentPaperPost from '../../hooks/studentPapers/useCreateStudentPaper';
import Skeleton from 'react-loading-skeleton';
import { selectExamGroupItem } from '../../redux/papers/typings';
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

const NewPractice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pushEvent } = useDataLayer();

  const { loadingExamGroups } = useExamGroupsGet();
  const [openTime, setOpenTime] = useState<boolean>(false);
  const [practiceLimit, setPracticeLimit] = useState<number>(50);
  const { customTime, setCustomTime } = usePracticeScreenState();
  const { createStudentPaper, isCreatingStudentPaper } = useStudentPaperPost();
  const { getFeatureLimit } = useSubscriptionBilling();

  const {
    getActiveQuizathon,
    activeQuizathon,
    getQuizathonPapersTaken,
    papersTaken,
    quizathonElapsedTime,
    getQuizathonElapsedTime,
    isQuizathonInProgress,
  } = useQuizathon();

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
  const defaultQuestionNumber = isQuizathonActive
    ? 200
    : practiceLimit > 50
    ? 50
    : practiceLimit;

  const [selectedExamGroup, setSelectedExamGroup] =
    useState<null | selectExamGroupItem>(null);
  const [captcha, setCaptcha] = useState<string | null>(null);
  const [useDefault, setUseDefault] =
    useState<DefaultNumberOfQuestions>('default');
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(
    defaultQuestionNumber
  );
  const [howToPractice, setHowToPractice] = useState<boolean>(false);
  const [selectedExam, setSelectedExam] = useState<null | {
    value: string;
    label: number;
  }>(null);
  const [showPaperTakenMessage, setShowPaperTakenMessage] =
    useState<boolean>(false);

  const user = useSelector(selectCurrentUser);
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
  const handleStartPractice = () => {
    if (isQuizathonActive && !captcha) {
      return Notify('Please complete the captcha to proceed.', {
        status: 'error',
      });
    }
    if (isQuizathonActive && numberOfQuestions < defaultQuestionNumber)
      return Notify(
        `${defaultQuestionNumber} questions is the minimum required for quizathon`,
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
    createStudentPaper({
      paperId: selectedExamGroup?.id || '',
      size: numberOfQuestions,
      ...(isQuizathonActive && captcha && { captcha }),
      mode: selectedMode === 'real' ? 'REAL_MODE' : 'LEARNING_MODE',
      callback: () => {
        navigate('/practice', {
          state: {
            mode: selectedMode,
            questionNumber: numberOfQuestions,
          },
        });
      },
    });
  };
  useEffect(() => {
    //clear all previous practice data before starting new one

    reset();
  }, []);

  useEffect(() => {
    setNumberOfQuestions(defaultQuestionNumber);
  }, [isQuizathonActive]);

  useEffect(() => {
    if (startPracticeClicked) {
      pushEvent('trackStartExam', {
        userId: user?.id,
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
    getQuizathonElapsedTime(user?.id as string, activeQuizathon.id as string);
  }, [activeQuizathon]);

  useEffect(() => {
    const CheckPracticeLimit = async () => {
      const payload = {
        property: DistinctionFeatureProperty.PRACTICE_QUESTIONS,
      };
      const result = await getFeatureLimit(payload);
      if (result.success) {
        setPracticeLimit(Number(result.balance));

        if (Number(result.balance) === 0) {
          planLimitHandler.onOpen();
        }
      }
      return;
    };

    CheckPracticeLimit();
  }, []);

  // Check if tour should be shown
  useEffect(() => {
    if (loadingExamGroups) return;
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
  }, [loadingExamGroups]);

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
          {loadingExamGroups ? (
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
                      defaultQuestionNumber={defaultQuestionNumber}
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
