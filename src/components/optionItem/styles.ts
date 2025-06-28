import styled from 'styled-components';
import Theme from '../../utils/theme';

export const OptionInput = styled.div`
  border-radius: ${Theme.PrimaryRadius};
  border: 1px solid ${Theme.PrimaryBorderColor};
  width: 100%;
  & input {
    border: none;
    outline: none;
    height: 38px;
    width: 200px;
    padding: 0 10px;
    border-radius: ${Theme.PrimaryRadius};
    font-size: 12px;
  }

  & button {
    border: none;
    border-radius: 0 ${Theme.PrimaryRadius} ${Theme.PrimaryRadius} 0;
    background-color: ${Theme.PrimaryFade};
    color: ${Theme.PrimaryGrey};
    cursor: pointer;
    height: 38px;
    width: 38px;
  }
`;
