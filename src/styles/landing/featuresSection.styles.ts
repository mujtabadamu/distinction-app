import styled from 'styled-components';
import { motion } from 'framer-motion';

import devices from '../../utils/devices';
import Theme from '../../utils/theme';

export const SectionWrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
`;

export const SectionTitle = styled.h1`
  text-align: center;
  font-size: 1.4rem;
  color: ${Theme.PrimaryDark};
  font-weight: 600;

  @media ${devices.laptop} {
    font-size: 2rem;
  }

  @media ${devices.laptopM} {
    font-size: 2.5rem;
  }
`;

export const SectionSubTitle = styled.h4<{ marginTop?: string }>`
  text-align: center;
  font-weight: 400;
  margin-top: ${(props) => props.marginTop || '1rem'};
  font-size: 0.9rem;

  @media ${devices.laptop} {
    font-size: 1rem;
  }

  @media ${devices.laptopM} {
    font-size: 1.1rem;
  }
`;

export const FeaturesWrapper = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.5rem;
  margin-top: 2.5rem;

  @media ${devices.tablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;
  }

  @media ${devices.laptop} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const FeatureCard = styled(motion.div)`
  background-color: white;
  box-shadow: ${Theme.PrimaryShadow};
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  padding: 1rem;

  & > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(1rem * var(--tw-space-y-reverse));
  }

  @media ${devices.laptopM} {
    padding: 1.5rem;
    & > :not([hidden]) ~ :not([hidden]) {
      --tw-space-y-reverse: 0;
      margin-top: calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));
      margin-bottom: calc(1.5rem * var(--tw-space-y-reverse));
    }
  }
`;

export const FeatureImg = styled.img`
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  height: 6rem;
`;

export const FeatureTItle = styled.h4`
  color: ${Theme.PrimaryDark};
  font-size: 0.8rem;
  font-weight: 600;

  @media ${devices.laptopM} {
    font-size: 0.9rem;
  }
`;

export const FeatureDesc = styled.p`
  font-size: 0.7rem;
  line-height: 1.1rem;
  font-weight: 400;
  color: ${Theme.PrimaryGrey};

  @media ${devices.laptopM} {
    font-size: 0.8rem;
  }
`;

// New Design
export const FeatureSectionV2 = styled.div`
  width: 100%;
`;

export const FeaturesWrapperV2 = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  justify-items: center;
  width: 100%;

  @media ${devices.laptop} {
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
  }
`;

export const ImageV2 = styled(motion.img)`
  filter: drop-shadow(0px 110px 44px rgba(71, 71, 71, 0.01))
    drop-shadow(0px 62px 37px rgba(71, 71, 71, 0.05))
    drop-shadow(0px 28px 28px rgba(71, 71, 71, 0.09))
    drop-shadow(0px 7px 15px rgba(71, 71, 71, 0.1))
    drop-shadow(0px 0px 0px rgba(71, 71, 71, 0.1));
  border-radius: 10px;
  width: 100%;

  @media ${devices.laptop} {
    width: 50%;
  }
`;
