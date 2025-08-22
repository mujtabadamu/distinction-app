import React from 'react';
import { Text, Box, Button, Spacer } from '@flexisaf/flexibull2';
import { Section } from '../../styles/landing/contentContainer.styles';
import Theme from '../../utils/theme';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { RiTimeLine, RiCommunityLine } from 'react-icons/ri';
import { GiPayMoney, GiTeacher } from 'react-icons/gi';
import {
  SectionSubTitle,
  SectionTitle,
} from '../../styles/landing/featuresSection.styles';
import Footer from '../../components/landing/footer.components';
import { motion } from 'framer-motion';
import { defaultVariant } from '../../styles/common/animationVariants.motion';
import { ANIMATE_ONCE } from '../../utils/constants';
import {
  FaqAnswer,
  FaqQuestion,
  FaqsWrapper,
} from '../../styles/landing/faqsSection.styles';
import { IoBookSharp } from 'react-icons/io5';
import {
  Container,
  Title,
  FlexBox,
  Card,
  // CreateEarnImage,
} from '../../styles/createAndEarn/createAndEarn,style';
// import EarnImg from '../../assets/portrait-cheery-young-african-man-removebg-preview.png';
const CreateAndEarn = () => {
  return (
    <>
      <Container>
        <Box
          style={{
            textAlign: 'center',
            marginTop: '20px',
          }}
        >
          <Title>
            <Text color={Theme.PrimaryDark}>
              Create and Earn with Distinction
            </Text>
          </Title>
        </Box>
        <FlexBox>
          <Box style={{ width: '50%', height: '100%' }}>
            <img
              src="/images/pexels-karolina-grabowska-6328945.jpg"
              width={'100%'}
              style={{ height: '100%' }}
            />
          </Box>

          <Box>
            <SectionTitle>Empower. Educate. Earn</SectionTitle>
            <Text>
              Welcome to Distinction’s "Create and Earn" initiative – where your
              knowledge opens doors to endless possibilities! Are you an
              educator, a subject matter expert, or just passionate about
              teaching? Here’s your chance to create engaging quizzes and
              practice exams that help students excel, and earn revenue for your
              contribution. Transform your expertise into a rewarding experience
              with Distinction.
            </Text>
            <Spacer space="10" />
            <Box>
              <Button
                onClick={() => {
                  window.open(
                    'https://docs.google.com/forms/d/e/1FAIpQLScPX_HX3SceprQhC8gZ3mUHESbdnQSaWBzCal5gqZno5gAmog/viewform',
                    '_blank'
                  );
                }}
              >
                Get Started
              </Button>
            </Box>
          </Box>
        </FlexBox>
        <Spacer space="40" />

        <Section id="works">
          <SectionTitle>
            <Text>
              How the <Text color={Theme.PrimaryColor}>Create and Earn </Text>
              Initiative Works
            </Text>
          </SectionTitle>
          <motion.div
            variants={defaultVariant}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: ANIMATE_ONCE, amount: 'some' }}
          >
            <Box className="boxWrapper">
              <Card>
                <strong>Create Content</strong>
                Use our intuitive AI tool to create standardized quizzes and
                practice exams based on your expertise.
              </Card>
              <Card>
                <strong>Publish</strong> Upload your content to the Distinction
                platform where thousands of students can access it.
              </Card>
              <Card>
                <strong>Earn</strong> Receive a share of the revenue every time
                a student practices with your content.
              </Card>
            </Box>
          </motion.div>
        </Section>
        <Spacer space="90" />

        <Section id="benefits">
          <SectionTitle>
            Your Knowledge, Your Impact, Your Earnings
          </SectionTitle>
          <motion.div
            variants={defaultVariant}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: ANIMATE_ONCE, amount: 'some' }}
          >
            <ul>
              <li>
                <FaMoneyCheckAlt />
                Monetize Your Expertise: Convert your subject knowledge into a
                steady income stream.
              </li>
              <li>
                <RiTimeLine />
                Create content at your convenience, from anywhere at any time.
              </li>
              <li>
                <GiPayMoney />
                Contribute to the success of students worldwide.
              </li>
              <li>
                <RiCommunityLine />
                Become part of an innovative community of educators and content
                creators.
              </li>
            </ul>
          </motion.div>
        </Section>
        <Section id="guidelines">
          <SectionTitle>Who Can Create and What to Create?</SectionTitle>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: '80px',
            }}
          >
            <Card>
              <Box>
                <GiTeacher />
              </Box>

              <Text>
                <strong>Eligibility Criteria</strong>
                Ideal for teachers, educators, tutors, and subject experts.
              </Text>
            </Card>

            <Card>
              <Box>
                <IoBookSharp />
              </Box>
              <Text>
                <strong>Content Guidelines</strong>
                We’re looking for original, accurate, and curriculum-aligned
                educational content
              </Text>
            </Card>
          </Box>
        </Section>
        <Box style={{ textAlign: 'center' }}>
          <SectionTitle>FAQs</SectionTitle>
          <SectionSubTitle>Frequently Asked Questions</SectionSubTitle>

          <motion.div
            variants={defaultVariant}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: ANIMATE_ONCE, amount: 'some' }}
          >
            <FaqsWrapper>
              {faqs.map((faq) => {
                return (
                  <FaqQuestion key={faq?.id} label={faq?.question}>
                    <FaqAnswer>{faq?.answer}</FaqAnswer>
                  </FaqQuestion>
                );
              })}
            </FaqsWrapper>
          </motion.div>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default CreateAndEarn;

const faqs = [
  {
    id: 1,
    question: "What is the 'Create and Earn' initiative?",
    answer:
      "The 'Create and Earn' initiative by Distinction allows educators, subject matter experts, and enthusiasts to create and publish quizzes and exams on our platform. Creators earn revenue based on the usage of their content by students.",
  },
  {
    id: 2,
    question: "Who is eligible to participate in 'Create and Earn'?",
    answer:
      'Anyone with expertise in a particular subject area can participate. This includes teachers, tutors, subject matter experts, or anyone passionate about education and capable of creating quality educational content.',
  },
  {
    id: 3,
    question: 'How do I create content for Distinction?',
    answer:
      'You can create content using our AI-driven tools that guide you through the process of crafting questions and answers. Simply input your curriculum knowledge and the tool will help generate high-quality, curriculum-aligned questions.',
  },
  {
    id: 4,
    question: 'How is the content quality ensured?',
    answer:
      'All submitted content undergoes a rigorous review process by our team of education experts to ensure accuracy, relevance, and alignment with educational standards.',
  },
  {
    id: 5,
    question: 'How much can I earn from my content?',
    answer:
      'Earnings are based on the usage of your content. The more students practice with your quizzes and exams, the more you earn. We provide a transparent revenue-sharing model, with creators earning a portion of the revenue generated from their content.',
  },
  {
    id: 6,
    question: 'How and when will I receive my earnings?',
    answer:
      'Earnings are calculated monthly and disbursed through bank transfers or other agreed-upon payment methods. Payment details and schedules are provided upon successful enrollment in the program.',
  },
  {
    id: 7,
    question: 'Is there a limit to how much content I can create?',
    answer:
      'No, there is no limit. You are encouraged to create as much high-quality content as possible to maximize your earning potential.',
  },
  {
    id: 8,
    question: 'Can I track the performance of my content?',
    answer:
      'Yes, we provide creators with access to a dashboard where they can track the usage of their content, including how many students have accessed it and the revenue earned.',
  },
  {
    id: 9,
    question: 'What happens if my content is not approved?',
    answer:
      'If your content does not meet our guidelines, it will not be published. However, we will provide feedback and suggestions for improvement, and you are welcome to revise and resubmit your content.',
  },
  {
    id: 10,
    question:
      "Are there any costs involved in joining the 'Create and Earn' initiative?",
    answer:
      'There are no upfront costs for joining the initiative. We aim to foster a community of creators without financial barriers.',
  },
];
