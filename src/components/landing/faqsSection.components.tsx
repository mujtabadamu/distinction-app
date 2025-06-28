import ContentContainer from './contentContainer';
import { motion } from 'framer-motion';

import {
  SectionWrapper,
  SectionTitle,
  SectionSubTitle,
} from '../../styles/landing/featuresSection.styles';

import {
  FaqsWrapper,
  FaqQuestion,
  FaqAnswer,
} from '../../styles/landing/faqsSection.styles';
import { defaultVariant } from '../../styles/common/animationVariants.motion';
import { ANIMATE_ONCE } from '../../utils/constants';

const FaqsSection = () => {
  return (
    <ContentContainer>
      <SectionWrapper>
        <SectionTitle>FAQs</SectionTitle>
        <SectionSubTitle>Frequently Asked Questions</SectionSubTitle>

        <motion.div
          variants={defaultVariant}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: ANIMATE_ONCE, amount: 'some' }}
        >
          <FaqsWrapper>
            {faqs.map((faq) => (
              <FaqQuestion key={faq.id} label={faq.question}>
                <FaqAnswer>{faq.answer}</FaqAnswer>
              </FaqQuestion>
            ))}
          </FaqsWrapper>
        </motion.div>
      </SectionWrapper>
    </ContentContainer>
  );
};

export default FaqsSection;

const faqs = [
  {
    id: 1,
    question: 'Can I take multiple quizzes in one day?',
    answer:
      'Yes, as long as each quiz is from a different course. You can only attempt each course once.',
  },
  {
    id: 2,
    question: 'What determines my rank?',
    answer:
      'Your total score is the primary factor. Accuracy is tracked and rewarded with special bonuses.',
  },
  {
    id: 3,
    question: 'Can I participate on any day, or must I be active every day?',
    answer:
      'You can join any day, but to improve your chances of winning top prizes, consistent daily participation is highly recommended.',
  },
  {
    id: 4,
    question: 'What happens in case of a tie?',
    answer:
      'If multiple participants have the same score at the end of the Quizathon, the following rules applies:\n\n- Consistency → Who participated every single day\n- First Submission Rule → If consistency is equal, who submitted first will be announced winner\n\nIf two or more participants have the same accuracy, the tie will be broken using the following criteria:\n\n- Total Questions Answered – The participant who attempted more questions will rank higher.\n- Completion Time – If still tied, the participant who completed their attempts in less time will rank higher.',
  },
  {
    id: 5,
    question: "Is there any reward if I don't make the top ranks?",
    answer:
      "Yes! All participants will receive digital certificates, and even if you don't make it to the top, your consistent participation can earn you other recognition like the Master of Consistency.",
  },
  {
    id: 6,
    question: 'Can I win multiple daily top scorer prizes?',
    answer:
      "Only twice. After two wins, you'll be ineligible for future daily top scorer rewards during this Quizathon.",
  },
  {
    id: 7,
    question: 'How can I stay updated during the event?',
    answer:
      '- Follow the daily updates on Telegram, Instagram, and Twitter.\n- Join the Distinction Telegram group for real-time announcements and support.',
  },
  {
    id: 8,
    question: 'Can I share my progress on social media?',
    answer:
      'Absolutely! Use hashtags like #RaceToMastery and #DistinctionQuizathon to show your journey.',
  },
];
