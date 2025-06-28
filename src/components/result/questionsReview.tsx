import { useState } from 'react';
import parse from 'html-react-parser';
import { Spacer } from '@flexisaf/flexibull2';
import {
  Collapse,
  Row,
  Col,
  Typography,
  Drawer,
  Empty,
  Pagination,
} from 'antd';
import styled from 'styled-components';
import devices from '../../utils/devices';
import Theme, { Colors } from '../../utils/theme';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { MathJaxContext } from 'better-react-mathjax';
import { MathContent } from 'components/practice/drawers';
import {
  PaginatedStudentPaperSolutionWithAnswersView,
  StudentPaperSolutionWithAnswersView,
} from 'generated/index';

const { Panel } = Collapse;
interface Props {
  studentPaperQuestion: PaginatedStudentPaperSolutionWithAnswersView | null;
}

const QuestionsReview = ({ studentPaperQuestion }: Props) => {
  const practiceQuestions = studentPaperQuestion?.items || [];
  const [showSolution, setShowSolution] = useState(false);
  const [currentQuestion, setCurrentQuestion] =
    useState<StudentPaperSolutionWithAnswersView | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  const indexOfLastPage = currentPage * postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;
  const currentPost = practiceQuestions?.slice(
    indexOfFirstPage,
    indexOfLastPage
  );

  const isAnsweredCorrectly = (
    question: StudentPaperSolutionWithAnswersView
  ): boolean => {
    if (
      !question.studentSelectedAnswerIds ||
      question.studentSelectedAnswerIds.length === 0
    ) {
      return false;
    }

    const correctAnswerIds =
      question.answerOptions
        ?.filter((option) => option.isCorrect)
        .map((option) => option.id) || [];

    const selectedCorrectly =
      question.studentSelectedAnswerIds.every((id) =>
        correctAnswerIds.includes(id)
      ) &&
      correctAnswerIds.every((id) =>
        question?.studentSelectedAnswerIds?.includes(id as string)
      );

    return selectedCorrectly;
  };
  const hasAttemptedQuestion = (
    question: StudentPaperSolutionWithAnswersView
  ): boolean => {
    return (question?.studentSelectedAnswerIds?.length ?? 0) > 0;
  };

  return (
    <Row gutter={10}>
      <Col span={24}>
        <Collapse bordered={false} expandIconPosition="end" ghost accordion>
          {currentPost?.map((question) => {
            const hasAttempted = hasAttemptedQuestion(question);
            const isCorrect = isAnsweredCorrectly(question);

            return (
              <Panel
                header={
                  <QuestionInfo
                    hasAttempted={hasAttempted}
                    correct={isCorrect}
                    question={question?.questionText as string}
                  />
                }
                key={question?.questionId as string}
                style={{
                  borderBottom: `1px solid ${Theme.PrimaryBorderColor}`,
                }}
              >
                <div style={{ marginTop: '-2.2rem' }}>
                  {question.answerOptions?.map((option) => {
                    const isUserChoice =
                      question.studentSelectedAnswerIds?.includes(
                        option?.id as string
                      );

                    const isUserChoiceCorrect =
                      isUserChoice && option.isCorrect;

                    return (
                      <QuestionOption
                        key={option.id}
                        correct={option.isCorrect}
                        isUserChoice={isUserChoice}
                        isUserChoiceCorrect={isUserChoiceCorrect}
                      >
                        <span className="label">
                          {parse(option.text as string)}
                        </span>
                        {option.isCorrect && (
                          <span
                            className="viewSolutionButton"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              setCurrentQuestion(question);
                              setShowSolution(true);
                            }}
                          >
                            View Solution
                          </span>
                        )}
                      </QuestionOption>
                    );
                  })}
                </div>
              </Panel>
            );
          })}
        </Collapse>
        <Spacer space="15px" />
        <Pagination
          current={currentPage}
          onChange={(pageNumber) => {
            setCurrentPage(pageNumber);
          }}
          total={practiceQuestions?.length}
        />
      </Col>
      <Drawer
        title="Solution"
        placement="left"
        open={showSolution}
        onClose={() => setShowSolution(false)}
        key={'solution'}
      >
        {currentQuestion?.solution ? (
          <MathJaxContext>
            <MathContent content={currentQuestion?.solution || ''} />
          </MathJaxContext>
        ) : (
          <Empty description="No solution available for this question."></Empty>
        )}
      </Drawer>
      <div style={{ width: '100%', height: '15vh' }} />
    </Row>
  );
};

export default QuestionsReview;

interface IQuestionInfo {
  correct: boolean;
  question: string;
  hasAttempted: boolean;
}

const QuestionInfo = ({ correct, question, hasAttempted }: IQuestionInfo) => {
  return (
    <div>
      <Typography.Text
        style={{
          color: `${
            !hasAttempted
              ? Theme.Incorrect
              : correct
              ? Theme.Correct
              : Theme.Incorrect
          }`,
          fontSize: '.7rem',
          display: 'flex',
          alignItems: 'center',
          gap: '.5rem',
        }}
      >
        {hasAttempted ? correct ? <FaCheck /> : <FaTimes /> : <FaTimes />}
        {!hasAttempted ? 'Not Attempted' : correct ? 'Correct' : 'Incorrect'}
      </Typography.Text>
      <Typography.Paragraph
        ellipsis={{
          rows: 2,
          expandable: false,
        }}
        style={{ width: '90%', fontSize: '.8rem', color: Colors.Grey700 }}
      >
        <MathJaxContext>
          <MathContent content={question} />
        </MathJaxContext>
      </Typography.Paragraph>
    </div>
  );
};

const QuestionOption = styled.div<{
  correct?: boolean;
  isUserChoice?: boolean;
  isUserChoiceCorrect?: boolean;
}>`
  width: 80%;
  background-color: ${(props) =>
    props?.isUserChoiceCorrect
      ? '#f0fff0'
      : props?.correct
      ? 'white'
      : 'white'};
  padding: 0.6rem 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  border-radius: 5px;
  border: 1px solid
    ${(props) =>
      props?.isUserChoiceCorrect
        ? Theme.Correct
        : props?.correct
        ? Theme.PrimaryColor
        : props?.isUserChoice
        ? Theme.Incorrect
        : Theme.PrimaryBorderColor};

  & .label {
    font-size: 0.8rem;
    color: ${(props) =>
      props?.isUserChoiceCorrect
        ? Theme.Correct
        : props?.isUserChoice && !props?.correct
        ? Theme.Incorrect
        : 'inherit'};
  }

  & .viewSolutionButton {
    font-size: 0.7rem;
    font-weight: 500;
    cursor: pointer;
    color: ${Theme.PrimaryColor};
  }

  @media ${devices.laptop} {
    width: 60%;
    padding: 0.8rem 1rem;
    margin-top: 1rem;
  }
`;
