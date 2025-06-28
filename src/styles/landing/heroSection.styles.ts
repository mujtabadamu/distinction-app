import styled from 'styled-components';
import { motion } from 'framer-motion';

import { lighten } from 'polished';
import { Text, Box } from '@flexisaf/flexibull2';
import Theme from '../../utils/theme';
import fontSize from '../../utils/typography';
import devices from '../../utils/devices';

export const SectionWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  justify-items: center;

  @media ${devices.tablet} {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    align-items: center;
    margin-top: 2rem;
  }
`;

export const TextWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${devices.tablet} {
    align-items: start;
  }
`;

export const TitleWrapper = styled.h1`
  font-weight: 700;
  color: ${Theme.PrimaryColor};
  line-height: 156.52%;
  text-align: center;

  @media ${devices.tablet} {
    /* text-align: left; */
    font-size: ${fontSize.h1.size};
  }

  @media (min-width: 1024px) {
    font-size: 2rem /* 32px */;
    text-align: left;
  }

  @media (min-width: 1280px) {
    font-size: 2.5rem /* 40px */;
  }
`;

export const TitleWrapper2 = styled.h1`
  font-size: ${fontSize.h1.size};
  font-weight: 700;
  color: ${Theme.PrimaryColor};
  line-height: 156.52%;
  text-align: center;

  @media ${devices.tablet} {
    text-align: left;
  }

  @media (min-width: 1024px) {
    font-size: 2rem /* 32px */;
  }

  @media (min-width: 1280px) {
    font-size: 2.5rem /* 40px */;
  }
`;

export const Desc = styled(Text)`
  font-size: ${fontSize.caption.size};
  line-height: 191.02%;
  text-align: center;
  max-width: 100vw;

  @media ${devices.tablet} {
    /* text-align: left; */
  }

  @media (min-width: 1024px) {
    text-align: left;
  }
`;

export const Desc2 = styled(Text)`
  /* width: 25rem; */
  font-size: ${fontSize.caption.size};
  line-height: 191.02%;
  text-align: center;

  @media ${devices.tablet} {
    text-align: left;
  }
`;

export const ExamsWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  & > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }
`;

export const ExamCard = styled.div`
  display: flex;
  align-items: center;
  background-color: ${lighten(0.55, Theme.PrimaryColor)};
  width: fit-content;
  border-radius: 5px;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0rem;
  padding-right: 2rem;

  & > :not([hidden]) ~ :not([hidden]) {
    margin-right: 0.5rem;
    margin-left: 0.5rem;
  }
`;

export const ExamLogo = styled.img`
  width: 3rem;
`;

export const ExamName = styled(Text).attrs({
  color: Theme.PrimaryColor,
})`
  font-weight: 500;
  font-size: 0.7rem;
`;

export const ButtonsWrapper = styled(Box)`
  margin-top: 1rem;
  gap: 1rem;
  display: flex;
  position: relative;
`;

export const ImageWrapper = styled(motion.div)`
  position: relative;
  width: 80%;
  height: 40vh;
  max-height: 420px;
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  border-radius: 1.5rem;
  box-shadow: 0px 283px 113px rgba(199, 199, 199, 0.01),
    0px 159px 95px rgba(199, 199, 199, 0.05),
    0px 71px 71px rgba(199, 199, 199, 0.09),
    0px 18px 39px rgba(199, 199, 199, 0.1), 0px 0px 0px rgba(199, 199, 199, 0.1);

  @media ${devices.tablet} {
    width: 45%;
  }

  @media ${devices.laptop} {
    height: 30rem;
  }
`;

export const HeroImage = styled.img.attrs({
  src: '/images/hero-image.png',
})`
  width: 100%;
  object-fit: contain;
  margin-bottom: 10px;
`;

export const EarnImage = styled.img.attrs({
  src: '/images/create&earn.png',
})`
  display: none;

  @media ${devices.tablet} {
    display: block;
    max-width: 35vw;
    object-fit: contain;
  }

  @media ${devices.laptop} {
    position: absolute;
    bottom: 0;
    left: 2.34vw;
    width: auto;
    margin-bottom: 0px;
  }

  @media ${devices.laptopM} {
    width: 30vw;
    left: 6.34vw;
  }

  @media ${devices.laptopL} {
    width: 25vw;
    left: 6.34vw;
  }

  @media (min-width: 1980px) {
    width: 20vw;
    left: 8.34vw;
  }
`;

export const Learn = styled(motion.img)`
  opacity: 0.7;
  position: absolute;
  left: -10%;
  top: 70%;
  filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.1));
  width: 8rem;

  @media ${devices.laptop} {
    width: 12rem;
  }
`;
export const Solution = styled(motion.img)`
  opacity: 0.7;
  position: absolute;
  top: 70%;
  left: 60%;
  filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.1));
  width: 8rem;

  @media ${devices.tablet} {
    left: 70%;
  }

  @media ${devices.laptop} {
    width: 12rem;
    left: 75%;
  }
`;
export const Practice = styled(motion.img)`
  opacity: 0.7;
  position: absolute;
  left: 55%;
  top: 10%;
  filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.1));
  width: 8rem;

  @media ${devices.laptop} {
    width: 12rem;
  }
`;

export const StatsDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  gap: 2rem;
`;

export const Stat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & .metric {
    font-size: 2rem;
    line-height: 2.5rem;
    font-weight: 500;
    color: #18181b;
    font-family: 'Plus Jakarta Sans';
  }

  & .desc {
    font-size: 12px;
    line-height: 16px;
  }
`;
