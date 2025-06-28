import styled from 'styled-components';
import { Text } from '@flexisaf/flexibull2';
import Theme from '../../utils/theme';

const Wrapper = styled.div`
  min-height: 80vh;
  display: grid;
  place-items: center;
`;

const ComingSoon = () => {
  return (
    <Wrapper>
      <Text size="2rem" color={Theme.PrimaryColor} bold>
        Coming Soon
      </Text>
    </Wrapper>
  );
};

export default ComingSoon;
