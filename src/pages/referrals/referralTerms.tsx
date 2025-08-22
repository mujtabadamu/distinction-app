import {
  Modal,
  ModalBody,
  ModalClose,
  ModalFooter,
  Box,
  Button,
} from '@flexisaf/flexibull2';
import styled from 'styled-components';

interface TermsAndConditionsI {
  isOpen: boolean;
  onClose: () => void;
}

const DistinctionReferralTerms = ({ isOpen, onClose }: TermsAndConditionsI) => {
  return (
    <Modal onClose={onClose} open={isOpen} outerclick>
      <ModalBody style={{ maxWidth: '800px' }} width="90%">
        <ModalClose onClick={onClose}>&times;</ModalClose>
        <Box pad="2rem">
          <Title>Distinction Referral Program: How It Works</Title>

          <h2
            style={{
              textAlign: 'center',
              fontSize: 'large',
            }}
          >
            <strong>Overview</strong>
          </h2>
          <p>
            Welcome to the Distinction Referral Program! This program allows you
            to earn airtime by referring your fellow university students to join
            the Distinction platform. Below is a detailed explanation of how the
            referral process works and the terms and conditions that apply.
          </p>

          <h3
            style={{
              textAlign: 'center',
              fontSize: 'large',
            }}
          >
            <strong>How to Refer Friends</strong>
          </h3>
          <List>
            <ListItem>
              <strong>Access Your Referral Code:</strong>
              <List>
                <ListItem>Log in to your Distinction account.</ListItem>
                <ListItem>
                  Navigate to the "Referrals" section on your dashboard.
                </ListItem>
                <ListItem>
                  Your unique referral code will be displayed. You can copy this
                  code or share it directly via social media channels.
                </ListItem>
              </List>
            </ListItem>
            <ListItem>
              <strong>Share Your Referral Code:</strong>
              <p>
                Share your referral code with your friends and classmates who
                are university students. They must use this code when signing up
                on the Distinction platform.
              </p>
            </ListItem>
            <ListItem>
              <strong>Referral Sign-Up:</strong>
              <List>
                <ListItem>
                  When your friend uses your referral code during the sign-up
                  process, their registration will be tracked under your
                  referral.
                </ListItem>
                <ListItem>
                  Your friend must complete their registration and begin using
                  the platform (e.g., answering questions, participating in
                  quizzes) for the referral to be valid.
                </ListItem>
              </List>
            </ListItem>
            <ListItem>
              <strong>Earn Airtime:</strong>
              <List>
                <ListItem>
                  Once your friend's studentship is verified, and they have met
                  the required usage criteria, you will earn airtime.
                </ListItem>
                <ListItem>
                  Airtime is credited on a monthly basis, so you'll see your
                  rewards accumulate and be credited to your registered phone
                  number.
                </ListItem>
              </List>
            </ListItem>
          </List>

          <h2
            style={{
              textAlign: 'center',
              fontSize: 'large',
            }}
          >
            <strong>Terms and Conditions</strong>
          </h2>
          <List>
            <ListItem>
              <strong>Referrer Eligibility:</strong>
              <List>
                <ListItem>
                  You must be a registered user on the Distinction platform and
                  a verified university student to participate in the referral
                  program.
                </ListItem>
                <ListItem>
                  The referral program is open only to students attending
                  accredited universities in Nigeria.
                </ListItem>
                <ListItem>
                  The person you refer (referee) must also be a verified
                  university student.
                </ListItem>
                <ListItem>
                  They must not have previously signed up on the Distinction
                  platform. Referrals are only valid for new sign-ups.
                </ListItem>
              </List>
            </ListItem>
            <ListItem>
              <strong>Referral Validation:</strong>
              <List>
                <ListItem>
                  Both the referrer and the referee must be verified as
                  university students for the referral to be valid. Distinction
                  will verify the studentship of each user through their
                  university registration details.
                </ListItem>
                <ListItem>
                  Inaccurate or fraudulent information provided during sign-up
                  may result in the referral being invalidated.
                </ListItem>
              </List>
            </ListItem>
            <ListItem>
              <strong> Platform Engagement:</strong>
              <List>
                <ListItem>
                  The referee must complete their registration and actively use
                  the Distinction platform by engaging in activities such as
                  answering questions, participating in quizzes, and more.
                </ListItem>
                <ListItem>
                  The referee must attain a minimum of 50 correct answers from
                  their practice for the referrer to be able to claim the reward
                  for that referral
                </ListItem>
                <ListItem>
                  Only referrals that meet these engagement criteria will be
                  rewarded with airtime.
                </ListItem>
              </List>
            </ListItem>
            <ListItem>
              <strong> Airtime Disbursement - Payout Schedule:</strong>
              <List>
                <ListItem>
                  You can request airtime for validated referrals at any time on
                  your dashboard.
                </ListItem>
              </List>
            </ListItem>
            <ListItem>
              <strong> Airtime Amount:</strong>
              <List>
                <ListItem>
                  For each successful referral, the referrer will receive 100
                  Naira in airtime.
                </ListItem>
                <ListItem>
                  Airtime is non-transferable and cannot be exchanged for cash
                  or other forms of credit.
                </ListItem>
              </List>
            </ListItem>
          </List>

          <h2
            style={{
              textAlign: 'center',
              fontSize: 'large',
            }}
          >
            <strong>General Terms</strong>
          </h2>
          <List>
            <ListItem>
              <strong>Fair Use Policy:</strong>
              <List>
                <ListItem>
                  Distinction reserves the right to investigate any referral
                  activity that appears to be fraudulent or in violation of the
                  program’s terms and conditions.
                </ListItem>
                <ListItem>
                  Any abuse of the referral program, including but not limited
                  to creating multiple accounts to claim airtime, may result in
                  disqualification from the program and forfeiture of earned
                  airtime.
                </ListItem>
              </List>
            </ListItem>
            <ListItem>
              <strong>Program Changes:</strong>
              <List>
                <ListItem>
                  Distinction reserves the right to modify or terminate the
                  referral program at any time without prior notice. However,
                  any changes will not affect airtime that has already been
                  earned.
                </ListItem>
                <Box>
                  If you have any questions or need support regarding the
                  referral program, please contact us via {''}
                  <a href="mailto:distinction@flexisaf.com">
                    distinction@flexisaf.com
                  </a>
                </Box>
              </List>
            </ListItem>
          </List>
          <h2
            style={{
              textAlign: 'center',
              fontSize: 'large',
            }}
          >
            <strong>Distinction Referral System FAQs</strong>
          </h2>
          <FAQItem>
            <FAQQuestion>
              1. What is the Distinction Referral System?
            </FAQQuestion>
            <FAQAnswer>
              The Distinction Referral System is a program that allows you to
              earn airtime by referring your friends and classmates to join the
              Distinction platform. When they sign up using your unique referral
              code and their studentship is verified, you’ll receive 100 Naira
              in airtime for each successful referral.
            </FAQAnswer>
            <FAQQuestion>2. How do I access my referral code?</FAQQuestion>
            <FAQAnswer>
              To access your referral code, log in to your Distinction account,
              navigate to the “Referrals” section on your dashboard, and you
              will find your unique referral code. You can copy this code or
              share it directly via social media channels.
            </FAQAnswer>
          </FAQItem>
          <FAQQuestion>3. Who can I refer?</FAQQuestion>
          <FAQAnswer>
            You can refer any of your friends or classmates who are university
            students in Nigeria and have not yet signed up on the Distinction
            platform. Only new users who are verified as university students
            will count as valid referrals.
          </FAQAnswer>
          <FAQQuestion>4. How do I earn airtime through referrals?</FAQQuestion>
          <FAQAnswer>
            Once you share your referral code and your friend uses it to sign up
            on Distinction, they must complete their registration and engage
            with the platform. After their studentship is verified and they meet
            the usage criteria, you will earn 100 Naira in airtime for that
            referral.
          </FAQAnswer>
          <FAQQuestion>5. When will I receive my airtime?</FAQQuestion>
          <FAQAnswer>
            Airtime is credited on a monthly basis. All valid referrals made
            within a month will be reviewed, and airtime will be credited to
            your registered phone number in the following month.
          </FAQAnswer>
          <FAQQuestion>
            6. What if my referral doesn’t sign up immediately?
          </FAQQuestion>
          <FAQAnswer>
            Your referral code will remain valid until your friend signs up.
            However, they must use your referral code during their sign-up
            process for you to receive credit for the referral.
          </FAQAnswer>
          <FAQQuestion>
            7. Is there a limit to how many people I can refer?
          </FAQQuestion>
          <FAQAnswer>
            No, there is no limit to the number of people you can refer. The
            more friends you refer, the more airtime you can earn!
          </FAQAnswer>
          <FAQQuestion>
            8. Can I refer someone who has already signed up on Distinction?
          </FAQQuestion>
          <FAQAnswer>
            No, the referral program only applies to new users. If your friend
            has already signed up on Distinction, they will not be counted as a
            valid referral.
          </FAQAnswer>
          <FAQQuestion>
            9. What if my referral doesn’t complete their registration?
          </FAQQuestion>
          <FAQAnswer>
            For you to earn airtime, your referral must complete their
            registration, be verified as a university student, and actively use
            the platform. If they do not meet these criteria, the referral will
            not be considered valid.
          </FAQAnswer>
          <FAQQuestion>
            10. How will I know if my referral was successful?
          </FAQQuestion>
          <FAQAnswer>
            You can track the status of your referrals in the “Referrals”
            section of your dashboard. It will show you details such as whether
            your referral has signed up, their verification status, and whether
            airtime has been credited.
          </FAQAnswer>
          <FAQQuestion>
            11. What happens if I suspect someone is abusing the referral
            system?
          </FAQQuestion>
          <FAQAnswer>
            Distinction has a Fair Use Policy in place to prevent abuse of the
            referral system. If you suspect any fraudulent activity, please
            contact our support team immediately at{' '}
            <a href="mailto:distinction@flexisaf.com">
              distinction@flexisaf.com
            </a>
          </FAQAnswer>
          <FAQQuestion>
            12. Can I exchange my airtime for cash or other rewards?
          </FAQQuestion>
          <FAQAnswer>
            No, airtime earned through the referral system is non-transferable
            and cannot be exchanged for cash or other forms of credit.
          </FAQAnswer>
          <FAQQuestion>
            13. What happens if my friend and I are not verified as students?
          </FAQQuestion>
          <FAQAnswer>
            Both the referrer and the referee must be verified as university
            students for the referral to be valid. If verification fails, no
            airtime will be credited.
          </FAQAnswer>
          <FAQQuestion>
            14. Is there a minimum threshold for airtime payout?
          </FAQQuestion>
          <FAQAnswer>
            Yes, there may be a minimum threshold for airtime payout. If the
            minimum threshold is not met, the earned airtime will roll over to
            the next disbursement period.
          </FAQAnswer>
          <FAQQuestion>
            15. Can Distinction modify the referral program?
          </FAQQuestion>
          <FAQAnswer>
            Yes, Distinction reserves the right to modify or terminate the
            referral program at any time. Any changes will be communicated to
            users, but they will not affect airtime that has already been
            earned.
          </FAQAnswer>
          <FAQQuestion>
            16. Who can I contact if I have more questions?
          </FAQQuestion>
          <FAQAnswer>
            If you have any further questions or need assistance, please contact
            our customer support team at{' '}
            <a href="mailto:distinction@flexisaf.com">
              distinction@flexisaf.com
            </a>
          </FAQAnswer>
        </Box>

        <ModalFooter>
          <Box pad="20px">
            <Button pale onClick={onClose}>
              Close
            </Button>
          </Box>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

const Title = styled.h1`
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
`;

const List = styled.ol`
  padding-left: 20px;
  list-style: decimal;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  &:first-of-type {
    margin-top: 10px;
  }
`;

const FAQItem = styled.div`
  margin-bottom: 20px;
`;

const FAQQuestion = styled.p`
  font-weight: bold;
`;

const FAQAnswer = styled.p`
  margin-left: 20px;
  a {
    color: blue;
    text-decoration: underline;
  }
`;

export default DistinctionReferralTerms;
