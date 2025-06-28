import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ContentContainer from './contentContainer';
import {
  SectionWrapper,
  TextWrapper,
  TitleWrapper2,
  Desc2,
  ButtonsWrapper,
  HeroImage,
  // ExamsWrapper,
  // ExamCard,
  // ExamLogo,
  // StatsDiv,
  // Stat,
} from '../../styles/landing/heroSection.styles';
import { Text } from '@flexisaf/flexibull2';
import Theme from '../../utils/theme';

import {
  PrimaryButton,
  // SecondaryButton,
} from '../../styles/common/buttons.styles';
import { defaultVariant } from '../../styles/common/animationVariants.motion';
import { ANIMATE_ONCE } from '../../utils/constants';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <>
      <ContentContainer>
        <SectionWrapper>
          <HeroImage />

          <TextWrapper
            variants={defaultVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: ANIMATE_ONCE, amount: 'some' }}
          >
            <TitleWrapper2>
              <Text color={Theme.PrimaryDark}>Introducing</Text> <br />
              <Header>Distinction!</Header> 
            </TitleWrapper2>

            <Desc2>
              Are you ready to elevate your academic journey to new heights? Look no further. Designed specifically 
              for students seeking to unlock their full potential and ace their university examinations. 
              Distinction is your key to success!
            </Desc2>
            {/* <StatsDiv>
              <Stat>
                <span className="metric">Practice</span>
                <span className="desc">Unlimited Questions</span>
              </Stat>
              <Stat>
                <span className="metric">Prepare</span>
                <span className="desc">With Simulations</span>
              </Stat>
              <Stat>
                <span className="metric">Ace</span>
                <span className="desc">With Distinction</span>
              </Stat>
            </StatsDiv> */}
            {/* <ExamsWrapper>
              <ExamCard>
                <ExamLogo src="/images/satlogo.png" />
              </ExamCard>
              <ExamCard>
                <ExamLogo src="/images/ieltslogo.png" />
              </ExamCard>
              <ExamCard>
                <ExamLogo src="/images/mcatlogo.png" />
              </ExamCard>
            </ExamsWrapper> */}

            <ButtonsWrapper>
              {/* <SecondaryButton
                onClick={() =>
                  window.open(
                    'https://docs.google.com/forms/d/e/1FAIpQLSfTclesD7UpsjP1jf5iABa19BygsqcM8O8rWd9s2RhUIMlV1g/viewform',
                    '_blank'
                  )
                }
              >
                Give Feedback
              </SecondaryButton> */}
              <PrimaryButton onClick={() => navigate('/login')}>
                Get Started
              </PrimaryButton>
              <img
                src="/try-for-free.svg"
                alt="try for free"
                style={{ position: 'absolute', top: '20%', right: '-100px' }}
              />
            </ButtonsWrapper>
          </TextWrapper>
        </SectionWrapper>
      </ContentContainer>
    </>
  );
};

export const Header = styled.h1`
  /* font-size: 2rem;  */
  font-weight: 800; 
  margin: 0;

  @media (min-width: 1024px) {
    font-size: 5rem /* 90px */;
    margin-top: 15px;
  }
`

// export const TitleWrapper = styled.h1`
//   font-size: ${fontSize.h1.size};
//   font-weight: 700;
//   color: ${Theme.PrimaryColor};
//   line-height: 156.52%;
//   text-align: center;

//   @media ${devices.tablet} {
//     text-align: left;
//   }

//   @media (min-width: 1024px) {
//     font-size: 2rem /* 32px */;
//   }

//   @media (min-width: 1280px) {
//     font-size: 2.5rem /* 40px */;
//   }
// `;

export default HeroSection;
