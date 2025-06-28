import styled from 'styled-components';

import devices from '../../utils/devices';
import Theme from '../../utils/theme';

export const MainWrapper = styled.div`
  width: 100vw;
  max-width: 1200px;
  margin-right: auto;
  margin-left: auto;
  min-height: 100vh;
  height: 100vh;
  padding: 1rem 0rem;
`;

export const SubWrapper = styled.div`
  width: 100%;
  padding: 0rem 2rem;
  height: fit-content;
`;

export const BulletDot = styled.div<{ color?: string }>`
  width: 5px;
  height: 5px;
  border-radius: 100px;
  background-color: ${(props) => props.color || Theme.PrimaryColor};
`;

export const BottomWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 10%;
  z-index: 50;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #e0e0e0;
  padding: 0rem 2rem;
  @media ${devices.laptop} {
    gap: 1rem;
    height: 12%;
  }
`;

export const ResultWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6rem;
  align-items: flex-start;
  width: 100%;
  margin-right: auto;
  margin-left: auto;

  @media ${devices.laptop} {
    width: 90%;
  }

  & .summary {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;

    @media ${devices.laptop} {
      height: 85vh;
      overflow-y: scroll;
      padding-right: 20px;
    }
  }

  & .questions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    @media ${devices.laptop} {
      height: 85vh;
      overflow-y: scroll;
      padding-right: 20px;
    }
  }
`;

export const ChartWrapper = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;

  @media ${devices.laptop} {
    width: 100%;
    max-width: -webkit-fill-available;
  }
`;

export const Chart = styled.div`
  width: 100%;
  position: relative;
`;

export const ChartCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & .score {
    font-size: 0.7rem;
    color: #737373;
  }

  & .exam {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  & .exam-image {
    width: 30px;
    height: 30px;
    padding: 0.4rem;
    background-color: ${Theme.PrimarySurface};
    border-radius: 100px;
  }

  & .exam-name {
    font-size: 0.7rem;
    line-break: anywhere;
    width: 100px;
  }
`;
export const LegendWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
export const Legend = styled.div<{ boxColor?: string }>`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.7rem;

  & .dot {
    width: 10px;
    height: 10px;
    background-color: ${(props) =>
      props.boxColor ? props.boxColor : Theme.PrimaryColor};
  }
`;
