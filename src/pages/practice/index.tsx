import React, { useEffect, useState, useCallback, useRef } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import CustomTab from './support/CustomTab';
import {
  Layout,
  Spacer,
  EmptyState,
  Text,
  DropDown,
  Notify,
} from '@flexisaf/flexibull2';
import { Typography } from 'antd';

import {
  Container,
  TopWrapper,
  TopInfo,
  PracticeInfo,
  TopTag,
  BottomWrapper,
  BottomControls,
  LeftText,
  ButtonsContainer,
  MenuWrapper,
} from '../../styles/practice/practice.styles';
import Drawers from '../../components/practice/drawers';
import { HiMenu } from 'react-icons/hi';
import Theme from '../../utils/theme';
import { PrimaryButton } from '../../styles/common/buttons.styles';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import useStudentPaperPost from '../../hooks/studentPapers/useCreateStudentPaper';
import useStudentPaperQuestionsGet from '../../hooks/studentPapers/useStudentPaperQuestionsGet';

import usePracticeScreenState from '../../hooks/practice/usePracticeScreenState';
import SectionLoader from '../../components/custom/sectionLoader';
import {
  errorNotifier,
  successNotifier,
  formattedDate,
  formattedTime,
} from '../../utils/helpers';
import { Question } from '../../generated/index';
import QuitExamModal from './modals/QuitExam';
import useDataLayer from '../../hooks/tagManager/useDataLayer';
import { useAuthSlice } from '../../pages/auth/authSlice';
import PreSubmitPopup from './modals/PreSubmitPopup';
import { useBlocker } from '../../hooks/general/useBlocker';
import TimerPopUp from './support/TimerPopUp';
import QuestionTimer from './support/QuestionTimer';
import useQuizathon from '../../pages/quizathon/hooks/useQuizathon';
import usePracticeSync from '../../hooks/practice/usePracticeSync';
import { StudentPaperSimpleView } from '../../generated/index';
import TabVisibilityTracker from './support/TabVisibilityTracker';

export interface ExtendedStudentPaperView extends StudentPaperSimpleView {
  timeLeftInMins: number;
}
interface PracticeScreenState {
  mode: Mode;
  questionNumber: number;
  paperId?: string;
  paperDetails?: ExtendedStudentPaperView;
  type?: 'Continue' | 'Re-take';
}

const PracticePage = () => {
  const { pushEvent } = useDataLayer();
  const navigate = useNavigate();
  const location = useLocation();
  const { user: loginResponse } = useAuthSlice();
  const user = loginResponse?.user;

  // Extract location state
  const { mode, questionNumber, paperId, paperDetails, type } =
    location.state as PracticeScreenState;

  const [touchEnd, setTouchEnd] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const minSwipeDistance = 50;

  // Component state
  const [online, setOnline] = useState(true);
  const [preSubmitPopup, setPreSubmitPopup] = useState(false);
  const [quitExamModal, setQuitExamModal] = useState({
    show: false,
    data: null,
  });
  const [submitExamClicked, setSubmitExamClicked] = useState(false);
  const [hasInitialTracking, setHasInitialTracking] = useState(false);

  // Refs
  // const timeElapsedRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Custom hooks
  const { studentPaper: studentPaperHook } = useStudentPaperPost();
  const { getActiveQuizathon, activeQuizathon, isQuizathonInProgress } =
    useQuizathon({
      studentId: user?.id || undefined,
    });
  const { trackTimer, retrieveTrackedDetails, retrievedDetails } =
    usePracticeSync();
  const {
    gettingStudentPaperQuestions,
    studentPaperQuestions: studentPaperQuestionsHook,
  } = useStudentPaperQuestionsGet({
    id: studentPaperHook?.id || (paperId as string),
    page: 0,
    size: questionNumber,
  });

  // Use the hook data for student paper and questions
  const studentPaper = studentPaperHook;
  const studentPaperQuestions = studentPaperQuestionsHook;
  const {
    activeQuestionNumber,
    isGoingBack,
    handleBack,
    handleNext,
    handleTabClick,
    onFinish,
    handleSubmit,
    showQuestionsDrawer,
    setShowQuestionsDrawer,
    showSolutionDrawer,
    setShowSolutionDrawer,
    savedAnswers,
    onSelectAnswerOption,
    submittingPaper,
    restoreQuestionAnswerMap,
    timeLeft,
    minutesElapsed,
    isRunning,
    startTimer,
    resetTimer,
    hoursLeft,
    minutesLeft,
    secondsLeft,
  } = usePracticeScreenState({ paperDetails });

  // Derived state
  const practiceQuestions = studentPaperQuestions?.items.map(
    (item) => item.question
  );

  const practiceQuestionsWithSolution = practiceQuestions?.map((q) => ({
    ...q,
  })) as Question[];

  const attemptedQuestions = Object.values(savedAnswers).map((obj) => obj);

  const questionsLoaded = practiceQuestions && practiceQuestions.length > 0;
  const studentPaperId = studentPaper?.id || paperId;

  const clearTrackingInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const initializeTracking = async () => {
    if (!studentPaperId || !questionsLoaded || !online) return;

    try {
      // For Continue type, retrieve existing details
      if (type === 'Continue') {
        await retrieveTrackedDetails(studentPaperId);
        setHasInitialTracking(true);
        startTimer();
      }

      // For all other types aside from continue, do initial tracking
      if (!type || type !== 'Continue') {
        // instead of using the initial elapase time why not contiue from the existing remaining time
        await trackTimer({
          timeElapsed: Math.ceil(timeLeft / 60),
          studentPaperId,
        });
        setHasInitialTracking(true);
      }

      // Only set up continuous tracking for real mode
      if (mode === 'real') {
        if (!navigator.onLine || !studentPaperId) {
          return;
        }
        await trackTimer({
          timeElapsed: Math.ceil(timeLeft / 60),
          studentPaperId,
        });
      }
    } catch (error) {
      console.error('Failed to initialize practice tracking:', error);
    }
  };

  const isOnline = useCallback(() => {
    if (navigator.onLine) {
      setOnline(true);
      successNotifier(
        'You are online, and your answers are syncing automatically'
      );
    } else {
      setOnline(false);
      errorNotifier(
        'You are offline, your answers will resume syncing when you come back online'
      );
    }
  }, []);

  const handleQuitExam = () => {
    resetTimer();

    handleQuitModalClose();
    pushEvent('trackQuitExam', {
      userId: user?.id ?? '',
      attemptedQuestionsBeforeQuit: Object.keys(savedAnswers).length,
      date: formattedDate,
      time: formattedTime,
      timeSpent: minutesElapsed, // convert the time from sec to min
    });
    navigate('/dashboard');
  };

  const handleQuitModalClose = () => {
    setQuitExamModal({
      show: false,
      data: null,
    });
    document.body.style.overflow = 'auto';
  };
  // Question navigation
  const navigateQuestions = () => {
    const storedAudios = localStorage.getItem('audios');
    if (storedAudios) {
      localStorage.removeItem('audios');
    }

    const isLearningMode = mode === 'learning';
    const isRealMode = mode === 'real';

    if (activeQuestionNumber === practiceQuestions?.length) {
      if (
        (isLearningMode || isRealMode) &&
        attemptedQuestions.length !== practiceQuestions.length
      ) {
        setPreSubmitPopup(true);
      } else {
        return handleSubmitPaper();
      }
    } else {
      handleNext();
    }
  };

  const closePreSubmitModal = useCallback(() => {
    setPreSubmitPopup(false);
    document.body.style.overflow = 'auto';
  }, []);

  const handlePopupSubmit = async () => {
    clearTrackingInterval();
    return handleSubmit(true, minutesElapsed);
  };

  const handleSubmitPaper = async () => {
    clearTrackingInterval();
    return handleSubmit(true, minutesElapsed);
  };

  const onInstantSubmit = () => {
    clearTrackingInterval();
    return handleSubmit(true, minutesElapsed);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    // Store initial X and Y coordinates
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
    setTouchEnd(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const touchMoveX = e.touches[0].clientX;
    const touchMoveY = e.touches[0].clientY;

    // Calculate the absolute difference between start and move positions
    const deltaX = Math.abs(touchMoveX - touchStartX);
    const deltaY = Math.abs(touchMoveY - touchStartY);

    // Prevent default only if vertical movement is more significant
    if (deltaY > deltaX) {
      e.preventDefault();
    }

    setTouchEnd(touchMoveX);
  };

  const onTouchEnd = () => {
    if (!touchStartX || !touchEnd) return;

    const distance = touchStartX - touchEnd;

    // Add a check for minimum movement to trigger a swipe
    const isSignificantSwipe = Math.abs(distance) > minSwipeDistance;

    if (isSignificantSwipe) {
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;

      if (isLeftSwipe) {
        navigateQuestions();
      }

      if (isRightSwipe) {
        if (activeQuestionNumber - 1 === 0) return;
        handleBack();
      }
    }
  };

  // Show warning dialog on exit attempt
  useBlocker(!!questionsLoaded);

  //fetch quizathon details
  useEffect(() => {
    getActiveQuizathon();
  }, []);

  // initialize practice tracking
  useEffect(() => {
    if (
      !hasInitialTracking &&
      questionsLoaded &&
      (studentPaper?.id || paperId) &&
      online
    ) {
      initializeTracking();
    }
  }, [questionsLoaded, studentPaper?.id, paperId, online, hasInitialTracking]);

  // Handle student paper creation success
  useEffect(() => {
    if (studentPaper?.id && !studentPaperQuestions) {
      // Student paper was created successfully, but questions haven't been fetched yet
      // The useStudentPaperQuestionsGet hook will automatically fetch questions
      console.log('Student paper created successfully:', studentPaper.id);
    }
  }, [studentPaper?.id, studentPaperQuestions]);

  // Restore saved practice data for continue practice
  useEffect(() => {
    // Restore any saved answers from retrievedDetails
    if (retrievedDetails && retrievedDetails.studentAnswers?.length) {
      const questionOrderMap: Record<string, string> = {};
      practiceQuestions?.forEach((question, index) => {
        questionOrderMap[question.id] = (index + 1).toString();
      });

      // Transform all answers at once
      retrievedDetails.studentAnswers.forEach((answer) => {
        if (!answer.questionId) return;

        const question = practiceQuestions?.find(
          (q) => q.id === answer.questionId
        );
        if (!question) return;

        const questionNumber = questionOrderMap[answer.questionId];
        if (!questionNumber) return;

        restoreQuestionAnswerMap(
          parseInt(questionNumber),
          {
            answerOptionIds: answer.answerIds || [],
            questionId: answer.questionId,
          },
          question.type
        );
      });
    }
  }, [retrievedDetails]);

  //Analytics
  useEffect(() => {
    if (submitExamClicked) {
      pushEvent('trackSubmitExam', {
        userId: user?.id,
        totalQuestionAttempted: Object.keys(savedAnswers).length,
        date: formattedDate,
        time: formattedTime,
        timeSpent: Math.ceil(timeLeft / 60), // convert the time from sec to min
      });
    }
  }, [submitExamClicked]);

  useEffect(() => {
    if (Object.keys(savedAnswers).length === 5)
      pushEvent('trackAtleastFiveQuestions', {
        userId: user?.id ?? '',
        numberOfQuestion: Object.keys(savedAnswers).length,
        date: formattedDate,
        time: formattedTime,
      });
  }, [savedAnswers]);

  useEffect(() => {
    if (Object.keys(savedAnswers).length >= 30)
      pushEvent('trackThirtyOrMoreQuestions', {
        userId: user?.id ?? '',
        student_email: user?.email ?? '',
        numberOfQuestion: Object.keys(savedAnswers).length,
        date: formattedDate,
        time: formattedTime,
      });
  }, [savedAnswers]);

  // offline sync
  useEffect(() => {
    window.addEventListener('online', isOnline);
    window.addEventListener('offline', isOnline);

    return () => {
      window.removeEventListener('online', isOnline);
      window.removeEventListener('offline', isOnline);
    };
  }, []);

  //initialize practice timer
  useEffect(() => {
    if (practiceQuestions && practiceQuestions?.length > 0 && !isRunning) {
      if (mode === 'real') {
        startTimer();
      }
    }
  }, [practiceQuestions, isRunning]);

  useEffect(() => {
    if (mode === 'real') return;
    if (online) {
      const interval = setInterval(() => {
        handleSubmit(false, 0);
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [online, timeLeft]);

  if (gettingStudentPaperQuestions) return <SectionLoader />;
  return (
    <Layout theme={Theme}>
      {practiceQuestions?.length === 0 || !practiceQuestions ? (
        <EmptyState
          title="Oh no, questions are not available yet for your selection"
          info="We are working round the clock to provide more questions for you to practice. Please hang tight"
          action={
            <PrimaryButton
              onClick={() => {
                navigate('/dashboard');
              }}
            >
              Back to home
            </PrimaryButton>
          }
        />
      ) : (
        <Container>
          <TopWrapper>
            <TopInfo>
              <PracticeInfo>
                <div className="tags">
                  <TopTag>{mode} Mode</TopTag>
                  <TopTag
                    color={online ? Theme.PrimaryColor : Theme.PrimaryRed}
                  >
                    {online ? 'Online' : 'Offline'}
                  </TopTag>
                </div>
                <Text>
                  {studentPaper?.paper?.name} /{' '}
                  {/* {studentPaper?.paper.exam.name} /{' '} */}
                  {studentPaper?.paper?.subject?.name}
                </Text>
                {isQuizathonInProgress && (
                  <TabVisibilityTracker limit={3} onSubmit={onInstantSubmit} />
                )}
              </PracticeInfo>

              <DropDown
                label={
                  <MenuWrapper>
                    <HiMenu className="menu-icon" />
                  </MenuWrapper>
                }
                menuAlign="bottom right"
                trigger="click"
                menuList={[
                  {
                    onClick: () =>
                      setQuitExamModal({
                        show: true,
                        data: null,
                      }),
                    label: <Text color={Theme.PrimaryRed}>Quit Exam</Text>,
                  },
                ]}
              />
            </TopInfo>
            <Spacer space="12px" />

            <CustomTab
              questions={practiceQuestions}
              activeQuestionNumber={activeQuestionNumber}
              questionAnswerMap={savedAnswers}
              onTabClick={handleTabClick}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              answerOption={savedAnswers[activeQuestionNumber]}
              onTouchEnd={onTouchEnd}
              mode={mode}
              totalQuestions={practiceQuestions.length}
              studentPaperId={studentPaper?.id}
              duration={studentPaper?.paper?.duration}
              onSelectAnswerOption={onSelectAnswerOption}
              setShowQuestionsDrawer={setShowQuestionsDrawer}
              isGoingBack={isGoingBack}
            />
          </TopWrapper>
          <BottomWrapper>
            <BottomControls>
              <LeftText>
                {mode === 'learning' && (
                  <Typography.Text
                    style={{ color: Theme.PrimaryColor, cursor: 'pointer' }}
                    onClick={() => {
                      const answer = savedAnswers[activeQuestionNumber];
                      // For MCQ/SCQ, check answerOptionIds; for text, check answerText
                      const hasAnswered =
                        answer &&
                        ((answer.answerOptionIds &&
                          answer.answerOptionIds.length > 0) ||
                          (answer.answerText &&
                            answer.answerText.trim() !== ''));
                      if (hasAnswered) {
                        setShowSolutionDrawer(true);
                      } else {
                        Notify(
                          'Please select an answer before viewing the solution.',
                          {
                            status: 'info',
                          }
                        );
                      }
                    }}
                  >
                    Show Solution
                  </Typography.Text>
                )}
                {mode === 'real' && timeLeft !== null && (
                  <QuestionTimer
                    hours={hoursLeft}
                    minutes={minutesLeft}
                    seconds={secondsLeft}
                    onExpireCallback={() => onFinish(resetTimer)}
                    // onTimeChange={onTimeChange}
                  />
                )}
              </LeftText>

              <ButtonsContainer>
                <PrimaryButton
                  onClick={handleBack}
                  disabled={activeQuestionNumber - 1 === 0}
                >
                  <FaChevronLeft />
                </PrimaryButton>
                <PrimaryButton
                  progress={
                    submittingPaper &&
                    activeQuestionNumber === practiceQuestions.length
                  }
                  onClick={navigateQuestions}
                >
                  {activeQuestionNumber === practiceQuestions.length ? (
                    <>
                      Finish Exam <FaChevronRight />
                    </>
                  ) : (
                    <>
                      <FaChevronRight />
                    </>
                  )}
                </PrimaryButton>
              </ButtonsContainer>
            </BottomControls>
          </BottomWrapper>
        </Container>
      )}
      <Drawers
        setShowQuestionsDrawer={setShowQuestionsDrawer}
        showQuestionsDrawer={showQuestionsDrawer}
        setShowSolutionDrawer={setShowSolutionDrawer}
        showSolutionDrawer={showSolutionDrawer}
        questions={practiceQuestionsWithSolution}
        handleButtonClick={handleTabClick}
        questionAnswerMap={savedAnswers}
        activeQuestionNumber={activeQuestionNumber}
        studentPaperId={studentPaperId as string}
        studentPaper={studentPaper}
      />
      {isQuizathonInProgress && (
        <TimerPopUp
          timeLeft={activeQuizathon?.stopAt as string}
          onFinish={onInstantSubmit}
        />
      )}
      {quitExamModal.show && (
        <QuitExamModal
          isOpen={quitExamModal.show}
          onQuit={handleQuitExam}
          isLoading={submittingPaper}
          onClose={handleQuitModalClose}
          onQuitAndSumit={() => {
            setSubmitExamClicked(true);
            handleQuitModalClose();
            return onInstantSubmit();
          }}
        />
      )}
      <PreSubmitPopup
        open={preSubmitPopup}
        onClose={closePreSubmitModal}
        totalUnAnswered={
          (practiceQuestions?.length ?? 0) - attemptedQuestions.length
        }
        handleSubmit={handlePopupSubmit}
        isSubmitting={submittingPaper}
      />
    </Layout>
  );
};

export default PracticePage;
