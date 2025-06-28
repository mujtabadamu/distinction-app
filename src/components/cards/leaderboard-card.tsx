import { Box, Text, Spacer } from '@flexisaf/flexibull2';
import Position from 'components/statusTag/position';
import styled from 'styled-components';

interface CardProps {
  name: string;
  point: string;
  pointLabel?: string;
  position: number;
}

function LeaderboardCard({
  name,
  point,
  position,
  pointLabel = 'Score',
}: CardProps) {
  return (
    <Container>
      <Box style={{ paddingBottom: '5px' }}>
        <SubHeading block>Position</SubHeading>
        <Spacer space="6" />
        <Position position={Number(position)} />
      </Box>

      <Box display="flex" style={{ justifyContent: 'space-between' }}>
        <Box>
          <SubHeading block>Name</SubHeading>
          <Spacer space="6" />
          <Text size="0.9rem" block>
            {name}
          </Text>
        </Box>
        <Box
          display="flex"
          style={{ justifyContent: 'start', flexDirection: 'column' }}
        >
          <SubHeading className="" block>
            {pointLabel}
          </SubHeading>
          <Spacer space="6" />
          <Text block style={{ textAlign: 'right' }}>
            {point}{' '}
          </Text>
        </Box>
      </Box>
    </Container>
  );
}

export default LeaderboardCard;

const SubHeading = styled(Text)`
  color: #6b7280;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 10px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px 0px;
`;
