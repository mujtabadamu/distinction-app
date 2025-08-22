import React from 'react';
import styled from 'styled-components';
import { Text, Grid } from '@flexisaf/flexibull2';

interface OverviewData {
  totalSessions: number;
  completedSessions: number;
  totalCardsStudied: number;
  totalCardsCompleted: number;
  totalCardsSkipped: number;
  totalTimeSpentSeconds: number;
  averageSessionDurationSeconds: number;
  completionRate: number;
  formattedTotalTime?: string;
}

interface OverviewCardsProps {
  overview: OverviewData | null;
}

const CARD_COLORS = [
  '#F76B3E', // Orange
  '#101A33', // Navy
  '#E94F8A', // Pink
  '#7B61FF', // Purple
  '#2EC4B6', // Teal
  '#FFCB66', // Yellow
  '#6C63FF', // Indigo
  '#FF8C42', // Deep Orange
];

const OverviewCards: React.FC<OverviewCardsProps> = ({ overview }) => {
  if (!overview) {
    return (
      <Grid
        default="repeat(4, 1fr)"
        md="1fr 1fr"
        sm="1fr"
        gap="1rem"
        style={{ marginBottom: 0 }}
      >
        {Array.from({ length: 8 }, (_, idx) => (
          <SummaryCard
            key={idx}
            bgcolor={CARD_COLORS[idx % CARD_COLORS.length]}
          >
            <Text size="32px" bold color="white" style={{ marginBottom: 8 }}>
              --
            </Text>
            <Text size="18px" color="white">
              Loading...
            </Text>
          </SummaryCard>
        ))}
      </Grid>
    );
  }

  const formatTime = (seconds: number, roundUp = false) => {
    if (typeof seconds !== 'number' || isNaN(seconds)) return '0m';
    const totalMinutes = roundUp
      ? Math.ceil(seconds / 60)
      : Math.floor(seconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const summaryCards = [
    { label: 'Total Sessions', value: overview.totalSessions },
    { label: 'Completed Sessions', value: overview.completedSessions },
    { label: 'Cards Studied', value: overview.totalCardsStudied },
    { label: 'Cards Completed', value: overview.totalCardsCompleted },
    { label: 'Cards Skipped', value: overview.totalCardsSkipped },
    {
      label: 'Total Time Spent',
      value:
        overview.formattedTotalTime ||
        formatTime(overview.totalTimeSpentSeconds),
    },
    {
      label: 'Avg. Session Duration',
      value: formatTime(overview.averageSessionDurationSeconds, true),
    },
    {
      label: 'Completion Rate',
      value:
        typeof overview.completionRate === 'number'
          ? `${overview.completionRate.toFixed(1)}%`
          : '0%',
    },
  ];

  return (
    <Grid
      default="repeat(4, 1fr)"
      md="1fr 1fr"
      sm="1fr"
      gap="1rem"
      style={{ marginBottom: 0 }}
    >
      {summaryCards.map((card, idx) => (
        <SummaryCard
          key={card.label}
          bgcolor={CARD_COLORS[idx % CARD_COLORS.length]}
        >
          <Text size="32px" bold color="white" style={{ marginBottom: 8 }}>
            {card.value}
          </Text>
          <Text size="18px" color="white">
            {card.label}
          </Text>
        </SummaryCard>
      ))}
    </Grid>
  );
};

export default OverviewCards;

const SummaryCard = styled.div<{ bgcolor: string }>`
  background: ${(props) => props.bgcolor};
  border-radius: 20px;
  box-shadow: 0 2px 8px 0 #101a3312;
  padding: 1.5rem 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 140px;
  /* height: 100%; */
  text-align: center;

  /* .sc-bdfBwQ {
    font-size: 19px !important;
  } */
`;
