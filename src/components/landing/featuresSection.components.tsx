import ContentContainer from './contentContainer';
// import { useNavigate } from 'react-router-dom';
import { Text, } from '@flexisaf/flexibull2';
import {
  SectionWrapper,
  FeatureSectionV2,
  FeaturesWrapperV2,
  // ImageV2,
} from '../../styles/landing/featuresSection.styles';
import {
  TextWrapper,
  TitleWrapper,
  Desc,
} from '../../styles/landing/heroSection.styles';
import { defaultVariant } from '../../styles/common/animationVariants.motion';
import { ANIMATE_ONCE } from '../../utils/constants';
import Theme from '../../utils/theme';
// import { PrimaryButton } from '../../styles/common/buttons.styles';

const FeaturesSection = () => {
  // const navigate = useNavigate();
  return (
    <>
      {/* Feature 1 */}
      {/* <FeatureSectionV2 style={{ paddingBottom: '4rem' }}>
        <ContentContainer>
          <SectionWrapper>
            <FeaturesWrapperV2
              variants={defaultVariant}
              whileInView="visible"
              initial="hidden"
              viewport={{ once: ANIMATE_ONCE, amount: 'some' }}
            >
              <TextWrapper>
                <TitleWrapper>
                  <Text color={Theme.PrimaryDark}>UNLEASH YOUR POTENTIAL</Text>.
                </TitleWrapper>
                <Desc>
                  With Distinction, you gain access to a wealth of comprehensive
                  practice materials, and interactive practice tools, all
                  tailored to your unique needs. Our app is meticulously
                  designed to help you harness your strengths and overcome any
                  weaknesses, ensuring you're fully equipped to achieve your
                  desired score.
                </Desc>
                <Spacer space="20px" />
                <PrimaryButton onClick={() => navigate('/register')}>
                  Start Trial
                </PrimaryButton>
              </TextWrapper>
              <ImageV2
                src="/images/result_page.png"
                alt="Result image"
                // style={{ width: '50%' }}
              />
            </FeaturesWrapperV2>
          </SectionWrapper>
        </ContentContainer>
      </FeatureSectionV2> */}

      {/* Feature 2 */}
      <FeatureSectionV2
        style={{
          backgroundColor: '#F7F9FA',
          paddingTop: '3rem',
          paddingBottom: '4rem',
          // marginTop: '4rem',
        }}
      >
        <ContentContainer>
          <SectionWrapper>
            <FeaturesWrapperV2
              variants={defaultVariant}
              whileInView="visible"
              initial="hidden"
              viewport={{ once: ANIMATE_ONCE, amount: 'some' }}
            >
              {/* <ImageV2 src="/images/exam_page.png" alt="Result image" /> */}
              <TitleWrapper>
                  <Text color={Theme.PrimaryDark}>
                    With distinction, our practice tests have been meticulously 
                    prepared in alignment with the NUC standard curriculum
                  </Text>
                  .
                </TitleWrapper>
              <TextWrapper>
                <Desc>
                  We understand that practice makes perfect. That's why
                  Distinction offers realistic exam simulations, allowing you to
                  familiarize yourself with the format, timing, and difficulty
                  level of the actual tests. Our advanced technology ensures an
                  authentic test-taking experience, so you can build your
                  endurance, manage time effectively, and optimize your
                  performance on exam day.
                </Desc>
                {/* <Spacer space="20px" />
                <PrimaryButton onClick={() => navigate('/register')}>
                  Start Trial
                </PrimaryButton> */}
              </TextWrapper>
            </FeaturesWrapperV2>
          </SectionWrapper>
        </ContentContainer>
      </FeatureSectionV2>
    </>
  );
};

export default FeaturesSection;
