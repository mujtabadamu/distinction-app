import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import devices from '../../utils/devices';
import Theme from '../../utils/theme';

export const OptionsWrapper = styled.div`
  width: 100%;
  min-height: 100px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  @media ${devices.tablet} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const OptionWrapper = styled(Draggable)`
  background-color: red;
  width: 100%;
`;

export const StepList = styled.div`
  padding: 2px 0;
  text-align: justify;

  & .step {
    font-weight: 600;
    display: inline-block;
    font-size: 12px;
    margin-right: 10px;
  }
  & p {
    display: inline-block;
    font-size: 12px;
  }
`;

export const SuggestionContainer = styled.div`
  position: absolute;
  top: 43px;
  z-index: 2;
  width: 100%;
  max-height: 150px;
  overflow-y: scroll;
  background: #fff;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 0px 0px 1px;
  & li {
    list-style: none;
    padding: 8px 5px;
    transition: all 0.03s ease-in-out;
    :hover {
      background: ${Theme.PrimaryLight};
      cursor: pointer;
    }
  }
`;

export const TruncateText = styled.div<{ maxLength: number }>`
  overflow: hidden;
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: ${(props) => props.maxLength}px;
`;
