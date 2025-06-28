import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Text,
  Checkbox,
  Spacer,
  TextArea,
} from '@flexisaf/flexibull2';
import Theme from '../../../utils/theme';
import styled from 'styled-components';
import devices from '../../../utils/devices';
import { StudentPaperQuestion } from '../../../redux/studentPapers/typings';
import { Question } from '../../../redux/studentPractice/typings';
import { errorNotifier, successNotifier } from '../../../utils/helpers';
import useQuestionFlagCreate from '../../../hooks/flagQuestion/useQuestionFlagCreate';

interface FeedbackProps {
  onClose: () => void;
  isOpen: boolean;
  data: StudentPaperQuestion | Question;
}

const QuestionFeedbackModal = ({ onClose, isOpen, data }: FeedbackProps) => {
  const { isCreatingFlag, createQuestionFlag } = useQuestionFlagCreate();
  const [questionIssueCheck, setSQuestionIssueCheck] = useState(false);
  const [answerIssueCheck, setAnswerIssueCheck] = useState(false);
  const [showOthers, setShowOthers] = useState(false);
  const [issueType, setIssueType] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const addIssue = (issue: string) => {
    setIssueType([...issueType, issue]);
  };

  const removeIssue = (issue: string) => {
    const filtered = issueType.filter((item) => item !== issue);
    setIssueType(filtered);
  };

  useEffect(() => {
    if (issueType.includes('OTHER')) return;
    if (showOthers && message !== '') {
      addIssue('OTHER');
    }
  }, [showOthers, message]);

  const submitFeedback = () => {
    if (!answerIssueCheck && !questionIssueCheck && !message) return;
    const payload = {
      data: {
        questionId: data.id,
        issueType,
        message,
      },
      onSuccess: () => {
        successNotifier('Your report has been submitted successfully.');
        onClose();
      },
      onFailure: () => {
        errorNotifier(
          'An error occurred submitting report. Please try again later or contact support.'
        );
      },
    };
    createQuestionFlag(payload);
  };

  return (
    <Modal onClose={onClose} open={isOpen} outerclick>
      <ModalBody width="90%" style={{ maxWidth: '540px' }}>
        <Box pad="2rem">
          <Box align="center">
            <h2>What went wrong?</h2>
            <p style={{ opacity: '0.8' }}>
              Your feedback will help us create a better experience
            </p>
          </Box>
          <Box>
            <Option>
              <Checkbox
                size="16px"
                style={{ margin: '0px', padding: '0px' }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSQuestionIssueCheck(e.target.checked);
                  e.target.checked
                    ? addIssue(e.target.value)
                    : removeIssue(e.target.value);
                }}
                checked={questionIssueCheck}
                value="QUESTION"
              />
              <Text>There is an issue with the question</Text>
            </Option>
            <Option>
              <Checkbox
                size="16px"
                style={{ margin: '0px', padding: '0px' }}
                spaceRight="0px"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setAnswerIssueCheck(e.target.checked);
                  e.target.checked
                    ? addIssue(e.target.value)
                    : removeIssue(e.target.value);
                }}
                checked={answerIssueCheck}
                value="ANSWER"
              />
              <Text>There is an issue with the answer options</Text>
            </Option>
          </Box>
          {!showOthers && (
            <Box display="flex" style={{ justifyContent: 'center' }}>
              <OtherOption onClick={() => setShowOthers((prev) => !prev)}>
                <Text color={Theme.PrimaryColor}>Others</Text>
              </OtherOption>
            </Box>
          )}
          <Spacer space="14px" />
          {showOthers && (
            <>
              <p style={{ opacity: '0.8' }}>Tell us what happened</p>
              <OtherOptionContent>
                <TextArea
                  name="description"
                  height="100px"
                  block
                  placeholder=""
                  value={message}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setMessage(e.target.value);
                  }}
                />
              </OtherOptionContent>
            </>
          )}
        </Box>
        <ModalFooter>
          <FooterContent>
            <Button pale onClick={onClose}>
              <Text>Dismiss</Text>
            </Button>
            <Button progress={isCreatingFlag} onClick={submitFeedback}>
              Submit feedback
            </Button>
          </FooterContent>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

export default QuestionFeedbackModal;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
`;

const OtherOption = styled.div`
  width: fit-content;
  cursor: pointer;
  opacity: 1;
`;

const OtherOptionContent = styled.div`
  @media ${devices.mobileS} {
    max-width: 100%;
  }
  @media ${devices.laptop} {
    max-width: 50%;
  }
`;
