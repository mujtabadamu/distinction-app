import { Drawer, Empty, Row, Col, Space, Typography } from 'antd';
import { Box } from '@flexisaf/flexibull2';
import { QuestionBox } from '../custom/wrapper';
import { QuestionAnswerMap } from '../../typings/studentPaper';
import useQuestionBookmark from '../../hooks/bookmarks/useQuestionBookmark';
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import { Question } from 'store/result';
import BookmarkTag from './bookmarkTag';

interface IDrawers {
  showSolutionDrawer: boolean;
  showQuestionsDrawer: boolean;
  setShowSolutionDrawer: (x: boolean) => void;
  setShowQuestionsDrawer: (x: boolean) => void;
  questions: Question[] | undefined;
  handleButtonClick: (x: string) => void;
  questionAnswerMap: QuestionAnswerMap;
  activeQuestionNumber: number;
  studentPaperId: string;
}

const Drawers = ({
  showQuestionsDrawer,
  showSolutionDrawer,
  setShowQuestionsDrawer,
  setShowSolutionDrawer,
  questions,
  handleButtonClick,
  questionAnswerMap,
  activeQuestionNumber,
  studentPaperId,
}: IDrawers) => {
  const currentQuestion = questions && questions[activeQuestionNumber - 1];

  const filterExactAnswerAttempted = Object.values(questionAnswerMap).filter(
    (answer) => {
      const match = questions?.find((q) => q.id === answer.questionId);
      return match != null;
    }
  );

  const { bookmarks } = useQuestionBookmark();

  return (
    <>
      <Drawer
        title="Solution"
        placement="left"
        open={showSolutionDrawer}
        onClose={() => setShowSolutionDrawer(false)}
        key={'left'}
      >
        {currentQuestion?.solution ? (
          <MathJaxContext>
            <MathContent content={currentQuestion?.solution || ''} />
          </MathJaxContext>
        ) : (
          <Empty description="No solution available for this question."></Empty>
        )}
      </Drawer>
      <Drawer
        title="Questions"
        placement="right"
        open={showQuestionsDrawer}
        onClose={() => setShowQuestionsDrawer(false)}
        key={'right'}
      >
        <Space direction="vertical" size={10} style={{ width: '100%' }}>
          {/* <p>List of questions</p> */}
          <Typography.Title level={5}>List of questions</Typography.Title>
          <Typography.Text>
            {filterExactAnswerAttempted.length} answered <br />
            {questions &&
              questions.length - filterExactAnswerAttempted.length}{' '}
            remaining
          </Typography.Text>

          <Typography.Text></Typography.Text>
          <Row gutter={20}>
            {questions?.map((q, i) => {
              const isAttempted = Object.values(questionAnswerMap).find(
                (obj) => obj.questionId === q.id
              );
              const questionBookmark = bookmarks.filter(
                (bookmark) =>
                  bookmark.questionId === q.id &&
                  bookmark.studentPaperId === studentPaperId
              );

              const isBookmarked = questionBookmark.length > 0;
              return (
                <Col key={q.id} span={6}>
                  <QuestionBox
                    answered={!!isAttempted}
                    onClick={() => {
                      handleButtonClick(String(i + 1));
                      setShowQuestionsDrawer(false);
                    }}
                  >
                    {i + 1}
                    {isBookmarked && <BookmarkTag />}
                  </QuestionBox>
                </Col>
              );
            })}
          </Row>
        </Space>
      </Drawer>
    </>
  );
};

export const MathContent: React.FC<{ content: string }> = ({ content }) => {
  const mathJaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mathJaxRef.current && (window as any).MathJax) {
      (window as any).MathJax.typeset([mathJaxRef.current]);
    }
  }, [content]);

  if (!content) return null;

  // Preprocess content to remove punctuation after LaTeX
  const preprocessContent = (text: string) => {
    return text.replace(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)[\s.,;:!?]+/g, '$1 ');
  };

  const processedContent = preprocessContent(content);

  return (
    <Box ref={mathJaxRef}>
      <StyledMathJax>{processedContent}</StyledMathJax>
    </Box>
  );
};
const StyledMathJax = styled(MathJax)`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 3px;
  mjx-container[jax='CHTML'][display='true'] {
    display: inline;
    margin: 0;
  }
`;

export default Drawers;
