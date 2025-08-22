import React, { useEffect, useState } from 'react';
import { Spacer, Text, TextArea, Box } from '@flexisaf/flexibull2';
import parse from 'html-react-parser';
import { Typography } from 'antd';
import {
  StudentPaperQuestion,
  AnswerOptionChoice,
  BookmarksDb,
} from '../../../typings/studentPaper';
import { Question as QuestionType } from '../../../redux/studentPractice/typings';
import { Liner } from '../../../styles/common/liner.styles';
import {
  ContentContainer,
  MiddleWrapper,
  OptionsWrapper,
  Question,
  QuestionInfoBox,
  QuestionNumber,
  QuestionOptionsWrapper,
  ViewQuestions,
  SectionWrapper,
  QuestionTypePill,
} from '../../../styles/practice/practice.styles';
import Theme from '../../../utils/theme';
import { FaBookOpen } from 'react-icons/fa';
import BookmarkQuestion from '../../../components/practice/bookmark';
import QuestionFeedbackModal from '../modals/QuestionFeedback';
import useQuestionBookmark from '../../../hooks/bookmarks/useQuestionBookmark';
import useAudioGet from '../../../hooks/general/useAudioGet';
import Skeleton from 'react-loading-skeleton';
import useGetSectionImage from '../../../hooks/general/useSectionGetImage';
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import { MathContent } from 'components/practice/drawers';

interface MiddleProps {
  activeQuestionNumber: number;
  isBack: boolean;
  question: StudentPaperQuestion | QuestionType;
  totalQuestions: number;
  setShowQuestionsDrawer: (x: boolean) => void;
  onSelectAnswerOption: (
    x: number,
    y: AnswerOptionChoice,
    z: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'LONG_TEXT' | 'SHORT_TEXT'
  ) => void;
  answerOption: AnswerOptionChoice;
  studentPaperId: string;
  mode: Mode;
  duration: number;
}

const QuestionWrapper = ({
  activeQuestionNumber,
  question,
  totalQuestions,
  setShowQuestionsDrawer,
  onSelectAnswerOption,
  studentPaperId,
  answerOption,
  mode,
}: // duration,
MiddleProps) => {
  const { loadingAudio, audio } = useAudioGet({
    id: question.section?.multimediaFile?.id || null,
  });
  const [showMore, setShowMore] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [answerText, setAnswerText] = useState(answerOption?.answerText || '');

  const {
    bookmarks = [],
    bookmarkQuestion,
    removeQuestionBookmark,
  } = useQuestionBookmark();

  const handleBookmark = (question: StudentPaperQuestion | QuestionType) => {
    const bookmarkExist = bookmarks.filter(
      (bookmark: BookmarksDb) => bookmark.questionId === question.id
    );
    const bookmarkData = {
      questionId: question.id,
      studentPaperId,
    };

    if (bookmarkExist.length > 0) {
      removeQuestionBookmark(bookmarkData);
    } else {
      bookmarkQuestion(bookmarkData);
    }
  };

  const questionBookmark = bookmarks.filter(
    (bookmark: BookmarksDb) =>
      bookmark.questionId === question.id &&
      bookmark.studentPaperId === studentPaperId
  );

  const isBookmarked = questionBookmark.length > 0;

  const [audios, setAudios] = useState<string[]>([]);
  const findPlayedAudio = audios.find((child) => child === audio.audioId);

  const AddAudioId = (audioId: string | null) => {
    if (audioId) {
      const updatedAudios = [...audios, audioId];
      setAudios(updatedAudios);
      localStorage.setItem('audios', JSON.stringify(updatedAudios));
    }
  };
  const { imageSrc, imageLoad, errorImage } = useGetSectionImage({
    id: question?.section?.imageUrl,
  });

  useEffect(() => {
    const storedAudios = localStorage.getItem('audios');
    if (storedAudios) {
      setAudios(JSON.parse(storedAudios));
    }
  }, []);
  const handleOptionSelection = (optionId: string) => {
    // Make sure we're working with a copy of the array, not a reference
    let answerOptionIds: string[] = [...(answerOption?.answerOptionIds || [])];

    if (question.type === 'MULTIPLE_CHOICE') {
      if (answerOptionIds.includes(optionId)) {
        // Remove the option if it's already selected
        answerOptionIds = answerOptionIds.filter(
          (selectedOption) => selectedOption !== optionId
        );
      } else {
        // Add the option if it's not selected
        answerOptionIds = [...answerOptionIds, optionId];
      }
    } else if (question.type === 'SINGLE_CHOICE') {
      // For single choice, we always replace with the new selection
      answerOptionIds = [optionId];
    }

    const updatedAnswer = {
      answerOptionIds,
      questionId: question.id,
    };

    onSelectAnswerOption(activeQuestionNumber, updatedAnswer, question.type);
  };
  const renderOption = (option: any) => {
    const isSelected = answerOption?.answerOptionIds.includes(option.id);

    return (
      <label
        key={option.id}
        style={{
          cursor: 'pointer',
          padding: '10px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <input
          type={question.type === 'MULTIPLE_CHOICE' ? 'checkbox' : 'radio'}
          checked={isSelected}
          onChange={() => handleOptionSelection(option.id)}
          onClick={(e) => e.stopPropagation()}
          data-testid={`option-${option.id}`}
          style={{ marginRight: '10px' }}
        />
        <MathJax>{parse(option.text.trim())}</MathJax>
      </label>
    );
  };

  return (
    <MiddleWrapper>
      <ContentContainer>
        <QuestionInfoBox>
          <BookmarkQuestion
            bookmarked={isBookmarked}
            onChange={() => {
              handleBookmark(question);
            }}
          />

          <QuestionNumber>
            {activeQuestionNumber} of {totalQuestions}
          </QuestionNumber>
          <ViewQuestions onClick={() => setShowQuestionsDrawer(true)}>
            View questions
          </ViewQuestions>
        </QuestionInfoBox>
        <Spacer space="20px" />
        <Liner color="#E0E0E0" />
        <Spacer space="20px" />
        {question?.section && (
          <SectionWrapper showMore={showMore}>
            <Text block className="title">
              {question?.section?.title}
            </Text>
            {question?.section?.imageUrl &&
              (imageLoad ? (
                <>
                  <Text>Image is loading...</Text>
                </>
              ) : errorImage ? (
                <Text color="red">{errorImage}</Text>
              ) : (
                <img
                  src={imageSrc}
                  alt={question?.section?.title}
                  width={'100%'}
                  style={{ margin: '15px auto' }}
                />
              ))}
            <Text>{parse(question?.section?.content)}</Text>
            {loadingAudio && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Text>Audio is loading, please wait.</Text>
                <Skeleton
                  count={1}
                  baseColor="#d0d5d933"
                  highlightColor="#c2cad133"
                  width={200}
                  height={30}
                />
              </div>
            )}

            {findPlayedAudio ? (
              <div style={{ margin: '20px 0px' }}>
                <Text color={Theme.PrimaryColor} margin="30px">
                  Audio has been played
                </Text>
              </div>
            ) : (
              audio.audioUrl && (
                <>
                  <audio
                    controls
                    controlsList="nodownload nofullscreen noremoteplayback"
                    onEnded={() => {
                      AddAudioId(audio.audioId);
                    }}
                  >
                    <source src={audio.audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </>
              )
            )}

            <div
              className="show-more-buttion"
              onClick={() => setShowMore((prev) => !prev)}
              style={{
                display:
                  question?.section && question.section.content.length > 10
                    ? ''
                    : 'none',
              }}
            >
              <Text color={Theme.PrimaryColor} size="12px">
                {showMore ? 'Show Less' : 'Show More'}
              </Text>
            </div>
          </SectionWrapper>
        )}
        <MathJaxContext>
          <QuestionOptionsWrapper key={activeQuestionNumber}>
            {mode === 'learning' && (
              <Text
                size="12px"
                style={{ alignItems: 'center', display: 'flex', gap: '5px' }}
              >
                <FaBookOpen size="14px" /> {question?.topic}
              </Text>
            )}
            <Question>
              <MathContent content={question.text} />
            </Question>

            <OptionsWrapper>
              {question.type === 'MULTIPLE_CHOICE' && (
                <Box display="flex" style={{ alignItems: 'center' }}>
                  <Text className="select-option-text">
                    Select All That Apply{' '}
                  </Text>
                  <QuestionTypePill isMultipleChoice={true}>
                    Multiple Choice
                  </QuestionTypePill>
                </Box>
              )}
              {question.type === 'SINGLE_CHOICE' && (
                <Box display="flex" style={{ alignItems: 'center' }}>
                  <Text className="select-option-text">
                    Select The Correct Option
                  </Text>
                  <QuestionTypePill isMultipleChoice={false}>
                    Single Choice
                  </QuestionTypePill>
                </Box>
              )}
              {question.type === 'SHORT_TEXT' && (
                <Text>Type in a short answer (Short Text)</Text>
              )}
              {question.type === 'LONG_TEXT' && (
                <Text>Type in a long answer (Long Text)</Text>
              )}
              {(question.type === 'MULTIPLE_CHOICE' ||
                question.type === 'SINGLE_CHOICE') && (
                <>
                  {question.answerOptions.map((option) => renderOption(option))}
                </>
              )}

              {question.type === 'LONG_TEXT' && (
                <div>
                  <TextArea
                    name="description"
                    height="100px"
                    block
                    placeholder=""
                    value={answerText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setAnswerText(e.target.value);
                    }}
                  />
                </div>
              )}
              {question.type === 'SHORT_TEXT' && (
                <div>
                  <TextArea
                    name="description"
                    height="10px"
                    block
                    placeholder=""
                    value={answerText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setAnswerText(e.target.value);
                    }}
                  />
                </div>
              )}
            </OptionsWrapper>

            <div style={{ marginTop: '20px' }}>
              <Typography.Text
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
                onClick={() => setFeedbackModal(!feedbackModal)}
              >
                <i
                  className="saf-flag"
                  style={{ color: Theme.PrimaryRed, fontSize: '16px' }}
                />{' '}
                Report question
              </Typography.Text>
            </div>
            <div style={{ width: '100%', height: '15vh' }} />
          </QuestionOptionsWrapper>
        </MathJaxContext>
      </ContentContainer>
      {feedbackModal && (
        <QuestionFeedbackModal
          isOpen={feedbackModal}
          data={question}
          onClose={() => {
            setFeedbackModal(!feedbackModal);
            document.body.style.overflow = 'auto';
          }}
        />
      )}
    </MiddleWrapper>
  );
};

export default React.memo(QuestionWrapper);
