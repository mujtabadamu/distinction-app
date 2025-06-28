import styled from 'styled-components';
import devices from '../../utils/devices';
import Theme from '../../utils/theme';

// Anything wrapped with this will only show up on mobile/tablet devices
export const Mobile = styled.div`
  @media ${devices.laptop} {
    display: none;
  }
`;

// Anything wrapped with this will only show up on laptop devices
export const Laptop = styled.div`
  display: none;

  @media ${devices.laptop} {
    display: contents;
  }
`;

export const QuestionBox = styled.div<{ answered: boolean }>`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 1rem;
  background-color: ${(props) => props.answered && 'white'};
  color: ${(props) => (props.answered ? Theme.PrimaryColor : '#9e9e9e')};
  border: 1px solid
    ${(props) =>
      props.answered ? Theme.PrimaryColor : Theme.PrimaryBorderColor};
  position: relative;
  /* &:hover {

  } */
`;
