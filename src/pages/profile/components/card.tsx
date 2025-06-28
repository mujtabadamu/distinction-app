import { Box, Text } from '@flexisaf/flexibull2';

import styled from 'styled-components';
interface Props {
  iconUrl?: string;
  title: string;
  value: string | number;
  className?: string;
  subTitle?: string;
  increase?: boolean;
}

function Card({ iconUrl, title, value, className, subTitle, increase }: Props) {
  return (
    <StatCard>
      <StatHeader>
        <StatTitle>{title}</StatTitle>
        <StatIcon className={className}>
          <img src={iconUrl} width={'30px'} />
        </StatIcon>
      </StatHeader>
      <StatValue>{value}</StatValue>
      <StatChange className={`${increase ? 'positive' : 'negative'}`}>
        {subTitle}
      </StatChange>
    </StatCard>
  );
}

export default Card;

const StatCard = styled(Box)`
  background: white;
  border-radius: 12px;
  padding: 5px 20px 15px 20px;
  box-shadow: 0px 4px 9px 0px #0000000a, 0px 16px 16px 0px #0000000a,
    0px 37px 22px 0px #00000005, 0px 65px 26px 0px #00000003,
    0px 102px 29px 0px #00000000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 150px;
  min-width: 344px;
  @media screen and (max-width: 768px) {
    min-width: 100%;
  }
`;

const StatHeader = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
`;

const StatIcon = styled(Box)`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.time {
    background: #fff5f5;
    color: #e53e3e;
  }
  &.accuracy {
    background: #f0fff4;
    color: #38a169;
  }
  &.streak {
    background: #ff792230;
    color: #ff611b;
  }
  &.points {
    background: #fff5e6;
    color: #dd6b20;
  }
  &.ranking {
    background: #f7fafc;
    color: #4299e1;
  }
  &.questions {
    background: #f0f4ff;
    color: #6366f1;
  }
`;

const StatTitle = styled(Text)`
  font-size: 14px;
  font-weight: 500;
  color: #484848;
`;

const StatValue = styled(Box)`
  font-size: 24px;
  font-weight: 700;
  color: #1a202c;
`;

const StatChange = styled(Box)`
  font-size: 10px;
  display: flex;
  align-items: center;
  gap: 4px;

  &.positive {
    color: #38a169;
  }
  &.negative {
    color: #e53e3e;
  }
`;
