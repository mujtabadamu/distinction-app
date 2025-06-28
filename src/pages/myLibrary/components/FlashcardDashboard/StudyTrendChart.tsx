import React from 'react';
import styled from 'styled-components';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Text } from '@flexisaf/flexibull2';

interface StudyTrendData {
  date: string;
  sessions: number;
  cardsStudied: number;
  timeSpent: number;
}

interface StudyTrendChartProps {
  data: StudyTrendData[];
  loading?: boolean;
}

const StudyTrendChart: React.FC<StudyTrendChartProps> = ({ data, loading = false }) => {
  if (loading) {
    return (
      <ChartContainer>
        <Text size="18px" bold style={{ marginBottom: '16px' }}>
          Study Trends
        </Text>
        <LoadingPlaceholder>
          <Text size="14px" color="#666">
            Loading trend data...
          </Text>
        </LoadingPlaceholder>
      </ChartContainer>
    );
  }

  if (!data || data.length === 0) {
    return (
      <ChartContainer>
        <Text size="18px" bold style={{ marginBottom: '16px' }}>
          Study Trends
        </Text>
        <EmptyState>
          <Text size="14px" color="#666">
            No study data available yet
          </Text>
        </EmptyState>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer>
      <Text size="18px" bold style={{ marginBottom: '24px' }}>
        Study Trends
      </Text>
      
      <LegendContainer>
        <LegendItem>
          <LegendColor color="#7B61FF" />
          <Text size="12px">Sessions</Text>
        </LegendItem>
        <LegendItem>
          <LegendColor color="#2EC4B6" />
          <Text size="12px">Cards Studied</Text>
        </LegendItem>
        <LegendItem>
          <LegendColor color="#FFCB66" />
          <Text size="12px">Time Spent (min)</Text>
        </LegendItem>
      </LegendContainer>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f0f0f0"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#666', fontSize: 12 }}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#666', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          />
          <Line
            type="monotone"
            dataKey="sessions"
            stroke="#7B61FF"
            strokeWidth={3}
            dot={{ fill: '#7B61FF', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#7B61FF', strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="cardsStudied"
            stroke="#2EC4B6"
            strokeWidth={3}
            dot={{ fill: '#2EC4B6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#2EC4B6', strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="timeSpent"
            stroke="#FFCB66"
            strokeWidth={3}
            dot={{ fill: '#FFCB66', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#FFCB66', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default StudyTrendChart;

const ChartContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 2px 8px 0 #101a3312;
  width: 100%;
  margin-bottom: 24px;
`;

const LegendContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 12px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LegendColor = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  background: ${(props) => props.color};
  border-radius: 2px;
`;

const LoadingPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  background: #f8f9fa;
  border-radius: 12px;
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  background: #f8f9fa;
  border-radius: 12px;
`; 