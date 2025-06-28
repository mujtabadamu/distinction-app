import styled from 'styled-components';
import Theme from '../../utils/theme';

export const Liner = styled.div<{
  margin?: string;
  thickness?: string;
  borderstyle?: string;
}>`
  height: 0;
  width: 100%;
  margin: ${(props) => props.margin};
  /* prettier-ignore */
  /* prettier-ignore */
  border-bottom: ${(props) => (props.thickness ? props.thickness : '1px')} ${(
    props
  ) => (props.borderstyle ? props.borderstyle : 'solid')} ${(props) =>
    props.color ? props.color : Theme.PrimaryBorderColor};
`;
