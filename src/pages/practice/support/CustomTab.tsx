import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { StudentPaperQuestion } from 'redux/studentPapers/typings';
import { QuestionAnswerMap } from 'redux/studentPapers/typings';
import { AnswerOptionChoice } from 'redux/studentPapers/typings';
import QuestionWrapper from './QuestionWrapper';
import devices from 'utils/devices';
import { Virtuoso } from 'react-virtuoso';

type QuestionType =
  | 'SINGLE_CHOICE'
  | 'MULTIPLE_CHOICE'
  | 'LONG_TEXT'
  | 'SHORT_TEXT';
interface Props {
  questions: StudentPaperQuestion[];
  activeQuestionNumber: number;
  questionAnswerMap: QuestionAnswerMap;
  onTabClick: (questionNumber: string) => void;
  onTouchStart: (event: React.TouchEvent) => void;
  onTouchMove: (event: React.TouchEvent) => void;
  onTouchEnd: (event: React.TouchEvent) => void;
  totalQuestions: number;
  mode: Mode;
  studentPaperId: string | undefined;
  duration: number | undefined;
  answerOption: any;
  onSelectAnswerOption: (
    question: number,
    answerOption: AnswerOptionChoice,
    quetionType: QuestionType
  ) => void;
  setShowQuestionsDrawer: (show: boolean) => void;
  isGoingBack: boolean;
}

const CustomTab = ({
  questions,
  activeQuestionNumber,
  questionAnswerMap,
  onTabClick,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  totalQuestions,
  mode,
  studentPaperId,
  duration,
  answerOption,
  onSelectAnswerOption,
  setShowQuestionsDrawer,
  isGoingBack,
}: Props) => {
  // const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleDropdownMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 500);
  }, []);

  const handleDropdownMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(true);
  }, []);

  //removed animation for now until there i a better alternative
  // useEffect(() => {
  //   const container = scrollContainerRef.current;
  //   if (container) {
  //     const activeTab = container.children[
  //       activeQuestionNumber - 1
  //     ] as HTMLElement;
  //     if (activeTab) {
  //       const containerWidth = container.offsetWidth;
  //       const tabLeft = activeTab.offsetLeft;
  //       const tabWidth = activeTab.offsetWidth;

  //       container.scrollTo({
  //         left: tabLeft - containerWidth / 2 + tabWidth / 2,
  //         behavior: 'smooth',
  //       });
  //     }
  //   }
  // }, [activeQuestionNumber]);
  const TabItem = (index: number) => {
    const question = questions[index];
    if (!question) return null;

    const questionNum = index + 1;
    const isAttempted = !!Object.values(questionAnswerMap).find(
      (obj) => obj.questionId === question.id
    );
    const isActive = questionNum === activeQuestionNumber;

    return (
      <TabItemWrapper>
        <Tab
          onClick={() => onTabClick(String(questionNum))}
          isActive={isActive}
          isAttempted={isAttempted}
        >
          {questionNum}
        </Tab>
      </TabItemWrapper>
    );
  };
  const DropdownItem = (index: number) => {
    const question = questions[index];
    if (!question) return null;

    const questionNum = index + 1;
    const isAttempted = !!Object.values(questionAnswerMap).find(
      (obj) => obj.questionId === question.id
    );
    const isActive = questionNum === activeQuestionNumber;

    return (
      <DropdownItemButton
        isActive={isActive}
        isAttempted={isAttempted}
        onClick={() => {
          onTabClick(String(questionNum));
          setIsVisible(false);
        }}
      >
        {questionNum}
      </DropdownItemButton>
    );
  };

  return (
    <Container>
      <TopSection>
        <VirtuosoContainer>
          <Virtuoso
            style={{ height: '56px', bottom: '-9px' }}
            totalCount={questions.length}
            itemContent={TabItem}
            horizontalDirection
            scrollSeekConfiguration={{
              enter: (velocity) => Math.abs(velocity) > 200,
              exit: (velocity) => Math.abs(velocity) < 30,
            }}
          />
        </VirtuosoContainer>

        <DropdownContainer
          onMouseLeave={handleDropdownMouseLeave}
          onMouseEnter={handleDropdownMouseEnter}
          ref={dropdownRef}
        >
          <DropdownButton
            onMouseEnter={() => setIsVisible(true)}
            onClick={() => setIsVisible(!isVisible)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
            </svg>
          </DropdownButton>

          <DropdownContent isVisible={isVisible}>
            <Virtuoso
              style={{ height: '235px' }}
              totalCount={questions.length}
              itemContent={DropdownItem}
              components={{
                ScrollSeekPlaceholder: () => <DropdownItemPlaceholder />,
              }}
              scrollSeekConfiguration={{
                enter: (velocity) => Math.abs(velocity) > 200,
                exit: (velocity) => Math.abs(velocity) < 30,
              }}
            />
          </DropdownContent>
        </DropdownContainer>
      </TopSection>

      <QuestionContainer
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <QuestionWrapper
          activeQuestionNumber={activeQuestionNumber}
          setShowQuestionsDrawer={setShowQuestionsDrawer}
          question={questions[activeQuestionNumber - 1]}
          isBack={isGoingBack}
          mode={mode}
          totalQuestions={totalQuestions}
          onSelectAnswerOption={onSelectAnswerOption}
          answerOption={answerOption}
          studentPaperId={studentPaperId || ''}
          duration={duration || 0}
        />
      </QuestionContainer>
    </Container>
  );
};

export default React.memo(CustomTab);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
  position: relative;
  margin-bottom: 1rem;
`;

const Tab = styled.button<{ isActive: boolean; isAttempted: boolean }>`
  display: flex;
  align-items: center;
  margin: 0 0 0 32px;
  justify-content: center;
  width: 100px;
  font-weight: 500;
  height: 48px;
  font-size: 0.9rem;
  position: relative;
  transition: all 0.2s;
  background: none;
  cursor: pointer;

  &:first-child {
    margin-left: 0;
  }

  color: ${(props) =>
    props.isActive || props.isAttempted ? '#1d4ed8' : 'rgba(0, 0, 0, 0.88)'};
  border: none;

  &::after {
    content: '';
    position: absolute;
    bottom: -0.4rem;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${(props) =>
      props.isActive ? '#1d4ed8' : 'transparent'};
    transition: all 0.2s;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  bottom: -10px;
  display: none;
  @media ${devices.tablet} {
    display: block;
  }
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  color: rgba(0, 0, 0, 0.88);
  width: 50px;
  height: 50px;
  justify-content: center;
  margin: 0 auto;
  background-color: white;
  box-shadow: -3px 0 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  border: none;

  &:hover {
    color: #1d4ed8;
  }
`;

const DropdownContent = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  right: 10px;
  width: 119px;
  max-height: 235px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
  z-index: 1000;
`;

const QuestionContainer = styled.div`
  flex: 1;
`;
const VirtuosoContainer = styled.div`
  flex: 1;
  overflow-x: auto;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  [data-virtuoso-scroller] {
    padding: 0 !important;
    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none;
  }
`;

const TabItemWrapper = styled.div`
  display: inline-block;
  padding: 0 2rem;
  &:first-child {
    padding-left: 0;
  }
`;

const DropdownItemButton = styled.button<{
  isActive: boolean;
  isAttempted: boolean;
}>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem;
  justify-content: center;
  font-weight: 400;
  font-size: 1rem;
  border: none;
  background: ${(props) => (props.isActive ? '#f3f4f6' : 'transparent')};
  color: ${(props) =>
    props.isActive || props.isAttempted ? '#1d4ed8' : 'rgba(0, 0, 0, 0.88)'};
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const DropdownItemPlaceholder = styled.div`
  width: 100%;
  height: 40px;
  background-color: #f3f4f6;
  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }
  animation: pulse 1.5s ease-in-out infinite;
`;
