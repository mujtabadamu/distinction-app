import { Box, Spacer } from '@flexisaf/flexibull2';
import {
  SectionSubTitle,
  SectionTitle,
} from '../../../styles/landing/featuresSection.styles';
import { motion } from 'framer-motion';
import { defaultVariant } from '../../../styles/common/animationVariants.motion';
import { ANIMATE_ONCE } from '../../../utils/constants';
import {
  FaqAnswer,
  FaqQuestion,
  FaqsWrapper,
} from '../../../styles/landing/faqsSection.styles';
import { Container } from '../styles';
import styled from 'styled-components';

const QuizathonFaq = () => {
  return (
    <Container>
      <Box style={{ textAlign: 'center' }} className="container-faq">
        <SectionTitle>FAQs</SectionTitle>
        <SectionSubTitle>Frequently Asked Questions</SectionSubTitle>
        <motion.div
          variants={defaultVariant}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: ANIMATE_ONCE, amount: 'some' }}
        >
          <Box>
            <FaqsWrapper>
              {quizathonFaq.map((faq) => {
                return (
                  <FaqQuestion key={faq?.id} label={faq?.question}>
                    <FaqAnswer>{faq?.answer()}</FaqAnswer>
                  </FaqQuestion>
                );
              })}
            </FaqsWrapper>
          </Box>
        </motion.div>
      </Box>
      <Spacer space="90" />
    </Container>
  );
};

const quizathonFaq = [
  {
    id: 1,
    question: 'Can I take multiple quizzes in one day?',
    answer: () => (
      <>
        Yes, as long as each quiz is from a different course. You can only
        attempt <Bold>each course once</Bold>.
      </>
    ),
  },
  {
    id: 2,
    question: 'What determines my rank?',
    answer: () => (
      <>
        Your <Bold>total score</Bold> is the primary factor. Accuracy is tracked
        and rewarded with special bonuses.
      </>
    ),
  },
  {
    id: 3,
    question: 'Can I participate on any day, or must I be active every day?',
    answer: () => (
      <>
        You can join any day, but to improve your chances of winning top prizes,
        consistent daily participation is highly recommended.
      </>
    ),
  },
  {
    id: 4,
    question: 'What happens in case of a tie?',
    answer: () => (
      <AnswerText>
        If multiple participants have the same score at the end of the
        Quizathon, the following rules apply:
        <ListContainer>
          <ListItem>
            {' '}
            • Consistency → Who participated every single day
          </ListItem>
          <ListItem>
            • First Submission Rule → If consistency is equal, who submitted
            first will be announced winner
          </ListItem>
        </ListContainer>
      </AnswerText>
    ),
  },
  {
    id: 5,
    question: "Is there any reward if I don't make the top ranks?",
    answer: () => (
      <>
        Yes! All participants will receive digital certificates, and even if you
        don't make it to the top, your consistent participation can earn you
        other recognition like the <Italic>Master of Consistency</Italic>.
      </>
    ),
  },
  {
    id: 6,
    question: 'Can I win multiple daily top scorer prizes?',
    answer: () => (
      <>
        Only twice. After two wins, you'll be ineligible for future daily top
        scorer rewards during this Quizathon.
      </>
    ),
  },
  {
    id: 7,
    question: 'How can I stay updated during the event?',
    answer: () => (
      <>
        <ListContainer>
          <ListItem>
            • Follow the daily updates on{' '}
            <Bold>
              {' '}
              <a
                href="https://t.me/+GynlxtHOXDBhMjI8"
                target="_blank"
                rel="noopener noreferrer"
              >
                Distinction Telegram group
              </a>
            </Bold>
            ,{' '}
          </ListItem>
          <ListItem>
            • Join the{' '}
            <Bold>
              {' '}
              <a
                href="https://t.me/+GynlxtHOXDBhMjI8"
                target="_blank"
                rel="noopener noreferrer"
              >
                Distinction Telegram group
              </a>
            </Bold>{' '}
            for real-time announcements and support.
          </ListItem>
        </ListContainer>
      </>
    ),
  },
  {
    id: 8,
    question: 'Can I share my progress on social media?',
    answer: () => (
      <>
        Absolutely! Use hashtags like <Bold>#RaceToMastery</Bold> and{' '}
        <Bold>#DistinctionQuizathon</Bold> to show your journey.
      </>
    ),
  },
  {
    id: 9,
    question: 'How are winners determined?',
    answer: () => (
      <>
        Winners are ranked based on <Bold>percentage accuracy</Bold> within the
        allotted time.
      </>
    ),
  },
  {
    id: 10,
    question: 'What happens in case of a tie?',
    answer: () => (
      <AnswerText>
        If two or more participants have the same accuracy, the following
        criteria apply:
        <ListContainer>
          <ListItem>
            • <Bold>Total Questions Answered</Bold> – Higher number of attempted
            questions ranks higher.
          </ListItem>
          <ListItem>
            • <Bold>Completion Time</Bold> – If still tied, the one who
            completed in less time ranks higher.
          </ListItem>
        </ListContainer>
      </AnswerText>
    ),
  },
  {
    id: 11,
    question: 'How will winners be announced?',
    answer: () => (
      <>
        Winners will be announced on the <Bold>Distinction platform</Bold> and
        through official communication channels within <Bold>72 hours</Bold>{' '}
        after the event.
      </>
    ),
  },
  {
    id: 12,
    question: 'Why is the number of questions limited to 200?',
    answer: () => (
      <>
        To ensure fairness and promote <Bold>accuracy over speed</Bold>, the
        200-question limit helps reduce fatigue and maintain a level playing
        field for all participants.
      </>
    ),
  },
];

const Bold = styled.span`
  font-weight: bold;
`;

const Italic = styled.span`
  font-style: italic;
`;

const ListContainer = styled.ul`
  margin-left: 20px;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const ListItem = styled.li`
  margin-bottom: 4px;
`;

const AnswerText = styled.div`
  display: flex;
  flex-direction: column;
`;
export default QuizathonFaq;
