import React from 'react';
import styled from 'styled-components';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { Text } from '@flexisaf/flexibull2';

interface SessionOutcomeData {
  name: string;
  value: number;
  color: string;
}

interface SessionOutcomeDonutChartProps {
  data: SessionOutcomeData[];
  loading?: boolean;
}

const SessionOutcomeDonutChart: React.FC<SessionOutcomeDonutChartProps> = ({
  data,
  loading = false,
}) => {
  if (loading) {
    return (
      <ChartContainer>
        <Text size="18px" bold style={{ marginBottom: '16px' }}>
          Session Outcomes
        </Text>
        <LoadingPlaceholder>
          <Text size="14px" color="#666">
            Loading outcome data...
          </Text>
        </LoadingPlaceholder>
      </ChartContainer>
    );
  }

  if (!data || data.length === 0) {
    return (
      <ChartContainer>
        <Text size="18px" bold style={{ marginBottom: '16px' }}>
          Session Outcomes
        </Text>
        <EmptyState>
          <Text size="14px" color="#666">
            No session data available yet
          </Text>
        </EmptyState>
      </ChartContainer>
    );
  }

  const totalSessions = data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage =
        totalSessions > 0
          ? ((data.value / totalSessions) * 100).toFixed(1)
          : '0';

      return (
        <TooltipContainer>
          <Text size="14px" bold color={data.color}>
            {data.name}
          </Text>
          <Text size="12px" color="#666">
            {data.value} sessions ({percentage}%)
          </Text>
        </TooltipContainer>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <LegendContainer>
        {payload.map((entry: any, index: number) => (
          <LegendItem key={`legend-${index}`}>
            <LegendColor color={entry.color} />
            <Text size="12px">{entry.value}</Text>
            <Text size="10px" color="#666">
              {entry.payload.value} (
              {totalSessions > 0
                ? ((entry.payload.value / totalSessions) * 100).toFixed(1)
                : '0'}
              %)
            </Text>
          </LegendItem>
        ))}
      </LegendContainer>
    );
  };

  return (
    <ChartContainer>
      <Text size="18px" bold style={{ marginBottom: '24px' }}>
        Session Outcomes
      </Text>

      <ChartWrapper>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </ChartContainer>
  );
};

export default SessionOutcomeDonutChart;

const ChartContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 2px 8px 0 #101a3312;
  width: 100%;
  margin-bottom: 24px;
`;

const ChartWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;

const LegendContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-direction: column;
  text-align: center;
`;

const LegendColor = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  background: ${(props) => props.color};
  border-radius: 50%;
`;

const TooltipContainer = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
