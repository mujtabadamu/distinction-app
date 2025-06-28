import styled from 'styled-components';
import { Button } from '@flexisaf/flexibull2';
import Theme from '../../utils/theme';

export const PrimaryButton = styled(Button).attrs((props) => ({
  disabled: props.disabled,
}))`
  border-radius: 3px;
  font-size: 0.8rem;
  height: 40px;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
`;

export const SecondaryButton = styled(Button).attrs({
  color: Theme.PrimaryColor,
  fontColor: Theme.PrimaryColor,
  pale: true,
})`
  border-radius: 3px;
  font-size: 0.8rem;
  height: 40px;
  margin: ${(props) => props.margin || '0px'};
`;
