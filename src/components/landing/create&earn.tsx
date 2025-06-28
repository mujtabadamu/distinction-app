import { Box } from '@flexisaf/flexibull2';
import { Desc2 } from '../../styles/landing/heroSection.styles';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { defaultVariant } from '../../styles/common/animationVariants.motion';
import { ANIMATE_ONCE } from '../../utils/constants';
import devices from '../../utils/devices';
import { useNavigate } from 'react-router-dom';
import Theme from 'utils/theme';

export default function Create_and_Earn() {
  const navigate = useNavigate();
  return (
    <motion.div
      variants={defaultVariant}
      whileInView="visible"
      initial="hidden"
      exit={{ opacity: 0 }}
      viewport={{ once: ANIMATE_ONCE, amount: 'some' }}
    >
      <Box
        background={Theme.PrimaryColor}
        pad="4rem 3rem"
        display="flex"
        style={{ color: '#fff', justifyContent: 'center' }}
      >
        <Box maxWidth="800px" align="center">
          <Title style={{ marginBottom: '14px' }}>
            Join the Distinction Quizathon!
          </Title>
          <Desc2 style={{ fontSize: '1.2rem' }}>
            Get ready to compete in the Distinction Quizathon! Test your
            knowledge, speed, and smarts in a thrilling academic challenge. Open
            to all university students across Nigeria, this event is your chance
            to win big and showcase your skills. <br />
            Ready to Race to Academic Mastery? Don’t miss out—spots are limited!
          </Desc2>

          <Box align="center" margin="1rem 0 0">
            <Earnbtn onClick={() => navigate('/quizathon')}>Learn more</Earnbtn>
          </Box>
          {/* <Button onClick={() => navigate('/quizathon')}></Button> */}
        </Box>
      </Box>
    </motion.div>
    // <FlexWrap
    //   variants={defaultVariant}
    //   whileInView="visible"
    //   initial="hidden"
    //   exit={{ opacity: 0 }}
    //   viewport={{ once: ANIMATE_ONCE, amount: 'some' }}
    // >
    //   <EarnImage />
    //   <CardFlex>
    //     <h2 style={{fontWeight: '400', margin: '0'}}>Do you know that you can</h2>
    //     <Title>Create & Earn?</Title>
    //     <Desc2>
    //       Introducing a unique opportunity where you can generate income by uploading questions
    //       to the Distinction platform. Your valuable contributions not only enrich the learning
    //       experience but also create a pathway to financial rewards.
    //     </Desc2>
    //     <Earnbtn onClick={() => navigate('/create-and-earn')}>Earn With Us</Earnbtn>
    //   </CardFlex>
    // </FlexWrap>
  );
}

export const FlexWrap = styled(motion.div)`
  display: grid;
  gap: 20px;
  position: relative;
  justify-content: center;
  background-color: #1d4ed8;
  margin-top: 2rem;
  color: #ffffff;
  padding: 3rem;
  width: 100vw;

  @media ${devices.tablet} {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1024px) {
    justify-content: flex-end;
  }
`;
export const CardFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;

  @media ${devices.tablet} {
    align-items: flex-start;
    grid-column-start: 2;
    grid-column-end: 3;
  }
`;

export const Earnbtn = styled.button`
  border-radius: 3px;
  border: none;
  font-size: 0.8rem;
  font-weight: 600;
  width: fit-content;
  padding: 0 15px;
  height: 40px;
  background-color: #ffffff;
  color: #1d4ed8;
  cursor: pointer;
  transition: all 0.3s ease-out;

  &:hover {
    background-color: #e9e9e9;
  }
`;

export const Title = styled.h1`
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0;

  @media ${devices.laptop} {
    font-size: 2rem;
  }

  @media ${devices.laptopM} {
    font-size: 2.5rem;
  }
`;
