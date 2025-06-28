import { Box } from '@flexisaf/flexibull2';
import styled from 'styled-components';
import devices from '../../utils/devices';
import { motion } from 'framer-motion';
import Theme from '../../utils/theme';
import { TableWrapper } from 'pages/referrals';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Header = styled.header`
  width: 100%;
  height: 10%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 1rem;

  @media ${devices.laptop} {
    padding: 0px 2rem;
  }
`;

export const Swiper = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
export const Cardselectdiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: #fcfeffeb;
  border: 1px solid #cdcfd0;
  padding: 25px 15px;
  height: 140px;
  cursor: pointer;
  &.active {
    border: 1px solid #1d4ed8;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
  & .elipse-text {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
export const DarkBG = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  width: 100vw;
  height: 100%;
  z-index: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  overflow: hidden;
`;
export const SideModalWrapper = styled.div`
  width: 100%;
  max-width: 550px;
  top: 0;
  right: 0;
  position: fixed;
  background: #fff;
  height: 100vh;
  padding: 2rem;
  z-index: 1000;
  box-shadow: -5px 0 35px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  & .sideControl {
    right: 100%;
    padding: 8px;
    background: #fff;
    border-top: none;
    border-right: 0;
    box-shadow: -5px 0 35px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 0 ${(props) => props.theme.SecondaryRadius};
    z-index: 5;
  }
  & .side-container {
    width: inherit;
    height: 100vh;
    display: grid;
    overflow-y: auto;
  }
  & .modal-content {
    width: 100%;
    height: 100%;
    position: relative;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  & .header-text {
    font-size: 20px;
    font-weight: 700;
    text-align: center;
  }

  & .practiceTime {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
`;

interface PracticeWrapperProps {
  isActive?: boolean;
}

export const PracticeTypeWrapper = styled(Box)<PracticeWrapperProps>`
  border-radius: 4px;
  height: ${({ isActive }) => (isActive ? '175px' : '129px')};
  border: 1px solid #cdcfd0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & .header {
    padding: 0px 10px;
    height: 60px;
    display: flex;
    align-items: center;
    background: #f4f4f5;

    border-radius: 4px 4px 0px 0px;
    span {
      text-transform: uppercase;
      font-size: 10px;
      font-weight: 600;
    }
  }
  & .openTime {
    font-size: 12px;
  }
  .practiceTime {
    display: flex;
    align-items: center;
  }
  & .switch {
    border-top: 1px dashed #cdcfd0;
    display: flex;
    align-items: center;
    padding: 5px;
    justify-content: end;
    gap: 8px;
    label {
      font-size: 12px;
    }
    input {
      background: blue;
      height: 30px !important;
      max-width: 120px !important;
    }
  }
`;
export const PracticeQuestionWrapper = styled(Box)<PracticeWrapperProps>`
  border-radius: 4px;
  border: 1px solid #cdcfd0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 250px;

  & .header {
    padding: 0px 10px;
    height: 60px;
    display: flex;
    align-items: center;
    background: #f4f4f5;
    border-radius: 4px 4px 0px 0px;
    span {
      text-transform: uppercase;
      font-size: 10px;
      font-weight: 600;
    }
  }

  & .radioWrapper {
    border: ${({ isActive }) => (isActive ? '1px solid #1d4ed8' : 'none')};
    background: ${({ isActive }) => (isActive ? '#2998ec14' : 'none')};
    border-radius: 4px;
    cursor: pointer;
    margin: 10px;
    & .label {
      margin-top: -10px;
      margin-bottom: 10px;
      color: #202020c4;
      font-size: 12px;
    }
  }
  & .questionWrapper {
    padding-bottom: 4px;
    display: flex;
    flex-direction: column;
    margin: 10px;
    padding: 5px;
    cursor: pointer;
    border-radius: 4px;
    border: ${({ isActive }) => (!isActive ? '1px solid #1d4ed8' : 'none')};
    background: ${({ isActive }) => (!isActive ? '#2998ec14' : 'none')};
  }
  & .default {
    color: #202020c4;
    font-size: 12px;
    width: 80%;
    font-weight: 500;
    margin: 0px auto;
  }
  & .flexi-radio-label {
    font-size: 17px;
  }
  & .border {
    border-bottom: 1px solid #cdcfd0;
    padding-bottom: 1rem;
  }
  & .displaytime {
    display: flex;
    justify-content: space-between;
    gap: 0.4rem;
    margin-left: auto;
  }
`;

export const RightWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.6rem;
`;

export const Content = styled.main`
  width: 100%;
  height: 90%;
`;

export const ContentBox = styled.div`
  width: 100%;
  height: 400px;
  padding: 1rem 1rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  & .practice-button {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
  }

  @media ${devices.laptop} {
    padding: 2rem 0;
    width: 90%;
    height: 200px;
  }
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  margin-top: 2rem;
  width: 100%;
  height: 100%;

  @media ${devices.laptop} {
    flex-direction: row;
    gap: 2rem;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

export const ExamsGroupWrapper = styled.div`
  margin-right: auto;
  margin-left: auto;
  gap: 0.5rem;
  display: flex;
  width: fit-content;
`;

export const ModeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

export const PersonalizeWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const PracticeSummaryWrapper = styled.div`
  width: fit-content;
  background-color: white;
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  align-items: center;
  box-shadow: 0px 50px 20px rgba(210, 209, 209, 0.01),
    0px 28px 17px rgba(210, 209, 209, 0.05),
    0px 13px 13px rgba(210, 209, 209, 0.09),
    0px 3px 7px rgba(210, 209, 209, 0.1), 0px 0px 0px rgba(210, 209, 209, 0.1);
  border-radius: 5px;
  padding: 1rem 1rem;
`;

export const ExamChoice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SelectionDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ModeBox = styled.div`
  width: 100%;
  padding: 1rem;
  background: rgba(38, 73, 157, 0.1);
  border-radius: 5px;
`;

export const StepsWrapper = styled.div`
  width: 100%;
  height: fit-content;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${Theme.PrimaryBorderColor};
  border-right: none;

  & > div {
    display: flex;
    align-items: center;
    flex-direction: column;

    @media ${devices.laptop} {
      align-items: flex-start;
    }
  }

  @media ${devices.laptop} {
    width: 50%;
    height: 100%;
    padding-bottom: 0rem;
    border-right: 1px solid ${Theme.PrimaryBorderColor};
    border-bottom: none;
  }
`;

export const DashboardStep = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  height: 100%;
  gap: 2rem;
  margin-right: auto;
  margin-left: auto;
`;

export const LogoBox = styled.div<{ backgroundColor?: string; width?: string }>`
  border-radius: 100px;
  background-color: ${(props) => props.backgroundColor || Theme.PrimarySurface};
  overflow: hidden;
  display: flex;
  justify-content: center;
  padding: 2px;
  align-items: center;
  width: ${(props) => props.width};
`;
export const VerifyContainer = styled.div`
  /* display: flex;
  gap: 0.3rem; */
  /* & span {
    font-size: 12px;
    color: #666666;
    font-weight: 500;
  } */
  position: absolute;
  bottom: 30px;
  right: 2px;
  z-index: 3;
`;
export const PopularSubjectsWrapper = styled.div`
  width: 100%;
  background-color: #26499d0d;
  padding: 15px;
  border-radius: 8px;

  & .popular-subject-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;

    @media ${devices.tablet} {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
`;
export const AvatarWrapper = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: center;
  align-items: center;
  gap: 0.3rem; */
  position: relative;
`;

export const PopularSubject = styled.div<{ selected: boolean }>`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.selected ? 'white' : '#fafafa')};
  border: ${(props) =>
    props.selected && `1px solid ${Theme.PrimaryBorderColor}`};
  font-size: 9px;
  font-weight: ${(props) => props.selected && 600};
  border-radius: 8px;
  cursor: pointer;
  color: #757575;
`;

export const DesktopTableWrapper = styled(TableWrapper)`
  @media (max-width: 768px) {
    display: none;
  }
`;
