import { useState, useEffect, useCallback, useRef } from 'react';
import { useAppDispatch } from '../../store/store';
import { setTimer, usePracticeTimer } from './useTimerSlice';

interface UseCountdownTimerProps {
  initialTime: number; // Initial time in minutes
  onTimerEnd?: () => void;
  onEveryMinute?: (timeLeft: number) => void;
}

const useCountdownTimer = ({
  initialTime,
  onTimerEnd,
  onEveryMinute,
}: UseCountdownTimerProps) => {
  const dispatch = useAppDispatch();
  const storedTime = usePracticeTimer();
  const initialTimeInSeconds = initialTime * 60;

  const startTimeRef = useRef<number | null>(null);
  const endTimeRef = useRef<number | null>(null);
  // Add a ref to track if timer end callback has been called
  const timerEndCalledRef = useRef<boolean>(false);
  const lastMinuteRef = useRef<number>(initialTime);

  const [timeLeft, setTimeLeft] = useState<number>(() =>
    typeof storedTime === 'number' && !isNaN(storedTime)
      ? storedTime
      : initialTimeInSeconds
  );
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    dispatch(setTimer({ time: timeLeft }));
  }, [timeLeft, dispatch]);

  const startTimer = useCallback(() => {
    if (!isRunning) {
      const now = Date.now();
      startTimeRef.current = now;
      endTimeRef.current = now + timeLeft * 1000;
      setIsRunning(true);
      timerEndCalledRef.current = false;
    }
  }, [isRunning, timeLeft]);

  const pauseTimer = useCallback(() => {
    if (isRunning) {
      setIsRunning(false);
      startTimeRef.current = null;
      endTimeRef.current = null;
    }
  }, [isRunning]);

  const resetTimer = useCallback(() => {
    setTimeLeft(initialTimeInSeconds);
    setElapsedTime(0);
    setIsRunning(false);
    startTimeRef.current = null;
    endTimeRef.current = null;
    timerEndCalledRef.current = false;
    lastMinuteRef.current = initialTime;
    dispatch(setTimer({ time: initialTimeInSeconds }));
  }, [initialTimeInSeconds, dispatch, initialTime]);

  useEffect(() => {
    if (!isRunning) return;

    let frameId: number;

    const updateTimer = () => {
      const now = Date.now();

      if (startTimeRef.current && endTimeRef.current) {
        const newElapsedTime = Math.floor((now - startTimeRef.current) / 1000);
        const newTimeLeft = Math.max(
          0,
          Math.floor((endTimeRef.current - now) / 1000)
        );

        if (newElapsedTime !== elapsedTime) {
          setElapsedTime(newElapsedTime);
        }

        if (newTimeLeft !== timeLeft) {
          setTimeLeft(newTimeLeft);

          // Minute callback
          const currentMinute = Math.floor(newTimeLeft / 60);
          if (
            onEveryMinute &&
            currentMinute !== lastMinuteRef.current &&
            currentMinute >= 0
          ) {
            onEveryMinute(currentMinute);
            lastMinuteRef.current = currentMinute;
          }

          // Ensure onTimerEnd is called only once
          if (newTimeLeft <= 0 && onTimerEnd) {
            timerEndCalledRef.current = true;
            onTimerEnd();
            setIsRunning(false);
            return;
          }
        }
      }

      frameId = requestAnimationFrame(updateTimer);
    };

    frameId = requestAnimationFrame(updateTimer);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isRunning, timeLeft, elapsedTime, onTimerEnd, onEveryMinute]);

  // Time calculations remain the same
  const hoursLeft = Math.floor(timeLeft / 3600) || 0;
  const minutesLeft = Math.floor((timeLeft % 3600) / 60) || 0;
  const secondsLeft = timeLeft % 60 || 0;

  const hoursElapsed = Math.floor(elapsedTime / 3600) || 0;
  const minutesElapsed = Math.floor((elapsedTime % 3600) / 60) + 1 || 0;
  const secondsElapsed = elapsedTime % 60 || 0;

  return {
    timeLeft,
    elapsedTime,
    hoursLeft,
    minutesLeft,
    secondsLeft,
    hoursElapsed,
    minutesElapsed,
    secondsElapsed,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
  };
};

export default useCountdownTimer;
