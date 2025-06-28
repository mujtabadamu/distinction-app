import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import type { StatisticProps } from 'antd';
import { AnswerOptionChoice } from '../../redux/studentPapers/typings';
import {
  setPaperResult,
  clearQuestionAnserMap,
  resetStudentPapersState,
} from '../../redux/studentPapers/reducer';
import { resetStudentPracticeState } from '../../redux/studentPractice/reducer';
import useStudentPaperPost from '../studentPapers/useCreateStudentPaper';
import { successNotifier } from '../../utils/helpers';
import { ExtendedStudentPaperView } from 'pages/practice';
import usePracticeSync from './usePracticeSync';
import {
  clearQuestionAnswers,
  setQuestionAnswer,
  useQuestionAnswerArray,
  useQuestionAnswerMap,
} from './usePracticeSlice';
import useCountdownTimer from './useCountdownTimer';
import { resetTimerState, usePracticeTimer } from './useTimerSlice';

const usePracticeScreenState = ({
  paperDetails,
}: { paperDetails?: ExtendedStudentPaperView } = {}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Refs for time tracking
  const initialTimeRef = useRef<number | null>(null);
  const timeSetRef = useRef(false);
  const { isSaving, handleSaveProgress, trackTimer } = usePracticeSync();
  const savedAnswers = useQuestionAnswerMap();
  const savedAnswersInArray = useQuestionAnswerArray();
  const [showSolutionDrawer, setShowSolutionDrawer] = useState(false);
  const [showQuestionsDrawer, setShowQuestionsDrawer] = useState(false);
  const [activeQuestionNumber, setActiveQuestionNumber] = useState(1);
  const [isGoingBack, setIsGoingBack] = useState(false);
  const { studentPaper } = useStudentPaperPost();
  // const [timerStarted, setTimerStarted] = useState(false);
  const storedTimer = usePracticeTimer();
  const {
    isRunning,
    startTimer,
    timeLeft,
    hoursLeft,
    minutesLeft,
    secondsLeft,
    minutesElapsed,
    resetTimer,
  } = useCountdownTimer({
    initialTime: storedTimer,
    onEveryMinute: () => {
      afterEveryMinute();
    },
    onTimerEnd: () => {
      timerEnded();
    },
  });

  const afterEveryMinute = () => {
    handleSubmit(false, minutesElapsed);
    if (studentPaper) {
      trackTimer({
        timeElapsed: minutesElapsed,
        studentPaperId: studentPaper?.id,
      });
    }
  };
  const timerEnded = () => {
    handleSubmit(true, minutesElapsed);
    if (studentPaper) {
      trackTimer({
        timeElapsed: minutesElapsed,
        studentPaperId: studentPaper?.id,
      });
    }
  };
  const answersRef = useRef(savedAnswersInArray);
  // Initialize customTime with proper time tracking
  const [customTime, setCustomTime] = useState<{
    minutes: string;
  }>(() => {
    if (paperDetails?.timeLeftInMins) {
      const minutes = String(paperDetails.timeLeftInMins);
      initialTimeRef.current = Number(minutes) * 60 * 1000;
      timeSetRef.current = true;

      return { minutes };
    }
    const storedCustomTime = localStorage.getItem('customTime');
    const parsed = storedCustomTime
      ? JSON.parse(storedCustomTime)
      : { minutes: '' };
    if (parsed.minutes) {
      initialTimeRef.current = Number(parsed.minutes) * 60 * 1000;
      timeSetRef.current = true;
    }

    return parsed;
  });
  // Effect to handle time updates
  useEffect(() => {
    if (customTime.minutes && !timeSetRef.current) {
      initialTimeRef.current = Number(customTime.minutes) * 60 * 1000;
      timeSetRef.current = true;
    }
  }, [customTime.minutes]);

  const handleBack = useCallback((key?: number) => {
    if (typeof key === 'number') {
      setActiveQuestionNumber(key);
    } else {
      setActiveQuestionNumber((prev) => prev - 1);
    }
    setIsGoingBack(true);
  }, []);

  const onSelectAnswerOption = (
    question: number,
    answerOption: AnswerOptionChoice,
    questionType:
      | 'SINGLE_CHOICE'
      | 'MULTIPLE_CHOICE'
      | 'LONG_TEXT'
      | 'SHORT_TEXT'
  ) => {
    if (!answerOption) return;
    dispatch(setQuestionAnswer({ question, answerOption, questionType }));
  };

  // Update the ref whenever savedAnswersInArray changes
  useEffect(() => {
    answersRef.current = savedAnswersInArray;
  }, [savedAnswersInArray]);

  const restoreQuestionAnswerMap = (
    question: number,
    answerOption: AnswerOptionChoice,
    questionType:
      | 'SINGLE_CHOICE'
      | 'MULTIPLE_CHOICE'
      | 'LONG_TEXT'
      | 'SHORT_TEXT'
  ) => {
    if (!answerOption) return;
    dispatch(setQuestionAnswer({ question, answerOption, questionType }));
  };

  const clearCustomTime = useCallback(() => {
    localStorage.setItem('customTime', JSON.stringify({ minutes: '' }));
    initialTimeRef.current = null;
    timeSetRef.current = false;
  }, []);

  const reset = useCallback(() => {
    dispatch(clearQuestionAnserMap());
    dispatch(setPaperResult(null));
    dispatch(resetStudentPapersState());
    dispatch(resetStudentPracticeState());
    dispatch(clearQuestionAnswers());
    dispatch(resetTimerState());
    localStorage.setItem('timeLeft', String(0));
    localStorage.removeItem('tabSwitches');
    clearCustomTime();

    initialTimeRef.current = null;
    timeSetRef.current = false;
  }, [dispatch, clearCustomTime]);

  // handle submit
  const handleSubmit = useCallback(
    async (isDone: boolean, currentTimeElapsed: number) => {
      if (isSaving || !studentPaper) {
        return;
      }
      // Create payload with the latest answers
      const payload = {
        timeElapsed:
          studentPaper.mode === 'LEARNING_MODE' ? 0 : currentTimeElapsed,
        studentQuestionAnswers: answersRef.current,
        done: isDone,
      };
      try {
        await handleSaveProgress(studentPaper.id, payload);

        // Navigate if done
        if (isDone) {
          navigate('/result', {
            replace: true,
            state: { paperDetails: studentPaper.paper },
          });
          localStorage.removeItem('tabSwitches');
        }
      } catch (error) {
        console.error('Error saving progress:', error);
        // Handle error if needed
      }
    },
    [isSaving, studentPaper, handleSaveProgress, navigate, paperDetails]
  );

  const submitPaper = useCallback(() => {
    handleSubmit(true, Math.floor(timeLeft / 60));
  }, [handleSubmit]);

  const handleNext = useCallback((key?: number) => {
    if (typeof key === 'number') {
      setActiveQuestionNumber(key);
    } else {
      setActiveQuestionNumber((prev) => prev + 1);
    }
    setIsGoingBack(false);
  }, []);

  const handleTabClick = useCallback(
    (key: string) => {
      const transformedKey = Number(key);
      if (transformedKey > activeQuestionNumber) {
        handleNext(transformedKey);
      }
      if (transformedKey < activeQuestionNumber) {
        handleBack(transformedKey);
      }
    },
    [activeQuestionNumber, handleNext, handleBack]
  );

  const onFinish = useCallback(
    (cb?: () => void) => {
      successNotifier(
        'You are out of time and your exam has been submitted successfully.'
      );
      handleSubmit(true, Math.floor(timeLeft / 60));
      cb?.();
    },
    [handleSubmit]
  );

  return {
    showSolutionDrawer,
    showQuestionsDrawer,
    setShowSolutionDrawer,
    setShowQuestionsDrawer,
    activeQuestionNumber,
    setActiveQuestionNumber,
    setIsGoingBack,
    handleBack,
    handleNext,
    handleTabClick,
    isGoingBack,
    onFinish,
    handleSubmit,
    savedAnswers,
    onSelectAnswerOption,
    reset,
    submittingPaper: isSaving,
    submitPaper,
    customTime,
    setCustomTime,
    clearCustomTime,
    restoreQuestionAnswerMap,
    minutesElapsed,
    startTimer,
    resetTimer,
    isRunning,
    timeLeft,
    hoursLeft,
    minutesLeft,
    secondsLeft,
  };
};

export default usePracticeScreenState;
