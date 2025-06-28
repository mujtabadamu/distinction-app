import styled from 'styled-components';
import { Text } from '@flexisaf/flexibull2';
import devices from '../../utils/devices';
import { Rate } from 'antd';
import Theme from '../../utils/theme';
interface PillProps {
  isMultipleChoice: boolean;
}

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: #fff !important;
`;
export const CustomRate = styled(Rate)`
  color: #eebb3e;
  font-size: 13px;
  & .ant-rate-star.ant-rate-star-zero span svg {
    color: white !important;
    stroke: #eebb3e;
    stroke-width: 60px;
  }
`;

export const TopWrapper = styled.div`
  width: 100%;
  background-color: #fdfdff;
  height: 90vh;
`;

export const TopInfo = styled.div`
  width: 100%;
  max-width: 900px;
  margin: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const QuitButton = styled.h5`
  text-align: right;
  color: ${Theme.PrimaryRed};
  font-size: 0.7rem;
  cursor: pointer;
  font-weight: 600;
`;

export const PracticeInfo = styled.h1`
  color: #757575;
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  gap: 5px;

  & .tags {
    display: flex;
    gap: 0.5rem;
  }
`;

export const TopTag = styled.div<{ color?: string }>`
  border-radius: 4px;
  font-size: 0.6rem;
  text-transform: capitalize;
  border: 0.5px solid ${(props) => props?.color || '#757575'};
  font-weight: 400;
  color: ${(props) => props?.color || '#757575'};
  width: fit-content;
  padding: 2px 5px 2px 5px;
`;

export const TabLabel = styled.span<{ answered: boolean }>`
  padding-right: 20px;
  padding-left: 20px;
  color: ${(props) => props.answered && Theme.PrimaryColor};
  font-weight: ${(props) => props.answered && '700'};
`;

// Middle

export const MiddleWrapper = styled.div`
  width: 100%;
  /* height: 70%; */
  background-color: #fff !important;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 2rem;
  z-index: 5;
  margin-top: -16px;
`;

export const ContentContainer = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  @media ${devices.tablet} {
    max-width: 600px;
  }

  @media ${devices.laptop} {
    max-width: 900px;
  }
`;

export const QuestionInfoBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const QuestionOptionsWrapper = styled.div`
  max-height: 60vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const QuestionNumber = styled(Text)`
  font-size: 0.8rem;
  color: #757575;
  font-weight: 500;

  @media ${devices.laptop} {
    font-size: 0.8rem;
  }
`;

export const ViewQuestions = styled(Text)`
  font-size: 0.7rem;
  color: #757575;
  font-weight: 500;
  color: ${Theme.PrimaryColor};
  cursor: pointer;

  @media ${devices.laptop} {
    font-size: 0.8rem;
  }
`;

export const Question = styled(Text)`
  font-weight: 400;
  color: #333333;
  line-height: 150.52%;
  font-size: 1rem;
  user-select: none;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */

  @media ${devices.laptop} {
    font-size: 1.1rem;
  }
`;

export const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
  width: 100%;
  height: 100%;
  color: #333;

  @media ${devices.tablet} {
    width: 50%;
  }
  @media screen and (max-width: 350px) {
    .select-option-text {
      font-size: small;
    }
  }
`;

export const QuestionTypePill = styled.div<PillProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 16px;
  border-radius: 20px;
  font-size: 12px;
  margin-left: 4px;
  background-color: ${(props) => (props.isMultipleChoice ? '#333' : '#fff')};
  color: ${(props) => (props.isMultipleChoice ? '#fff' : '#333')};
  border: 1px solid ${(props) => (props.isMultipleChoice ? '#333' : '#e0e0e0')};

  @media screen and (max-width: 350px) {
    font-size: 10px;
    padding: 2px 4px;
  }
`;

// Bottom

export const BottomWrapper = styled.div`
  width: 100%;
  height: 15%;
  margin-top: auto;
  border-top: 1px solid #e0e0e0;
  position: fixed;
  background-color: white;
  bottom: 0;
  left: 0;
  z-index: 10;
`;

export const BottomControls = styled.div`
  max-width: 900px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  height: 100%;
  padding-left: 2rem;
  padding-right: 2rem;

  @media ${devices.laptop} {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const LeftText = styled(Text)`
  font-size: 1.2rem;
  color: #757575;
  font-weight: 600;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const SectionWrapper = styled.div<{ showMore: boolean }>`
  width: 100%;
  background-color: ${Theme.PrimarySurface};
  padding: 15px;
  margin-bottom: 20px;
  margin-top: ${(props) => props.showMore && 'px'};
  border-radius: 8px;
  position: relative;
  height: auto;
  max-height: ${(props) => (props?.showMore ? 'auto' : '100px')};
  overflow: hidden;

  @media ${devices.tablet} {
    height: auto;
    max-height: ${(props) => (props?.showMore ? 'auto' : '200px')};
    padding: 20px;
  }

  & .title {
    color: #333333;
    font-weight: 500;
  }

  & .show-more-buttion {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 10;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: ${(props) =>
      !props?.showMore &&
      'linear-gradient(180deg, rgba(242, 244, 250, 0) -41.05%, #f2f4fa 48.68%)'};
    font-weight: 500;
  }
`;

export const CustomCardSelector = styled.div`
  & .flexi-selector-label {
    font-weight: normal !important;
    font-size: 12px;
    display: flex;
    align-items: center;
  }
`;

export const MenuWrapper = styled.div`
  .menu-icon {
    font-size: 1.6rem;
    color: #757575;
    cursor: pointer;
  }
`;

export const BookMarkWrapper = styled.div`
  cursor: pointer;
`;
