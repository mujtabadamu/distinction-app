import styled from 'styled-components';
import { Input } from '@flexisaf/flexibull2';
import Theme from '../../../utils/theme';

export const TextInput = styled(Input).attrs({
  type: 'text',
})`
  background-color: ${Theme.PrimaryFade};
`;
