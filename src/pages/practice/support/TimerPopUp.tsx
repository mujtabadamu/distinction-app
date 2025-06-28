import React, { useEffect, useState, useRef } from 'react';
import { Box, Text, Spacer } from '@flexisaf/flexibull2';
import styled from 'styled-components';
import { useTimer } from 'react-timer-hook';
import Theme from 'utils/theme';
import { IoIosClose } from 'react-icons/io';

interface TimerPopUpI {
  onFinish: () => void;
  timeLeft: string;
}

const TimerPopUp = ({ onFinish, timeLeft }: TimerPopUpI) => {
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const hasFinished = useRef(false);
  const userDismissedWarning = useRef(false);

  const { minutes, hours } = useTimer({
    autoStart: true,
    expiryTimestamp: new Date(timeLeft),
    onExpire: () => {
      if (!hasFinished.current) {
        onFinish();
        hasFinished.current = true;
      }
    },
  });

  const handleCloseWarning = () => {
    setShowWarning(false);
    userDismissedWarning.current = true;
  };

  useEffect(() => {
    if (hours === 0 && minutes < 31 && !userDismissedWarning.current) {
      setShowWarning(true);
    }

    if (hours === 0 && minutes < 1 && !hasFinished.current) {
      setShowWarning(true); // Force show warning for final minute
      userDismissedWarning.current = false; // Reset dismissal for final warning
      onFinish();
      hasFinished.current = true;
    }

    return () => {
      if (hours === 0 && minutes >= 31) {
        setShowWarning(false);
        userDismissedWarning.current = false;
      }
    };
  }, [minutes, hours, onFinish]);

  return (
    <>
      {showWarning && (
        <QuizTimerWarning>
          <Box className="popup-container">
            <Box className="popup-content">
              <button className="close-btn" onClick={handleCloseWarning}>
                <IoIosClose size="1.5rem" />
              </button>
              <Text block bold>
                Quizathon ending soon
              </Text>
              <Spacer space={12} />
              {hours === 0 && minutes < 1 ? (
                <Text color={Theme.PrimaryRed}>Time up, submitting paper</Text>
              ) : (
                <Text>
                  Auto-submit in{' '}
                  <Text color={Theme.PrimaryRed}>{minutes} </Text>
                  mins if not submitted
                </Text>
              )}
            </Box>
          </Box>
        </QuizTimerWarning>
      )}
    </>
  );
};

export default TimerPopUp;

const QuizTimerWarning = styled.div`
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 290px;

  & .popup-content {
    background: #f7f7ff;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    border: 1px solid #f3f2f2;
  }

  & .close-btn {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 12px;
    background: none;
    border: none;
    padding: 5px;
    cursor: pointer;
  }
`;
