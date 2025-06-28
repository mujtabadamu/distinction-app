import React from 'react';
import styled from 'styled-components';

export type StatusType =
  | 'Sent'
  | 'Failed'
  | 'Pending'
  | 'Enrolled'
  | 'Queued'
  | 'N/A'
  | 'Reverted'
  | 'Success'
  | 'Active'
  | 'Blocked'
  | 'Resolved'
  | boolean;

interface StatusIndicatorProps {
  status?: StatusType;
  pale?: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status = 'N/A',
  pale = false,
}) => {
  let displayStatus: Exclude<StatusType, boolean>;
  if (typeof status === 'boolean') {
    displayStatus = status ? 'Success' : 'Failed';
  } else {
    displayStatus = status;
  }

  return (
    <StatusPill status={displayStatus} pale={pale}>
      {displayStatus}
    </StatusPill>
  );
};

const StatusPill = styled.div<{
  status: Exclude<StatusType, boolean>;
  pale?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  padding: 10px;
  border-radius: 16px;
  font-size: 12px;
  background: #f1f1f1;
  color: #666666;
  width: fit-content;

  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 6px;
    background: #666666;
  }

  ${({ status, pale }) => {
    switch (status) {
      case 'Sent':
      case 'Success':
      case 'Enrolled':
        return `
          background: #E6F9F1;
          color: #0CA375;
          &::before { background: #0CA375; }
        `;
      case 'Active':
        return pale
          ? `
            background: transparent;
            color: #14B8A6;
            border: 1px solid #2DD4BF;
            &::before { background: #14B8A6; }
          `
          : `
            background: #CCFBF1;
            color: #115E59;
            &::before { background: #115E59; }
          `;
      case 'Failed':
      case 'Blocked':
      case 'Reverted':
        return `
          background: #FFE5E5;
          color: #FF4D4D;
          &::before { background: #FF4D4D; }
        `;
      case 'Pending':
      case 'Queued':
        return `
          background: #FFF9E6;
          color: #D6A40C;
          &::before { background: #D6A40C; }
        `;
      case 'N/A':
        return `
          background: #F1F1F1;
          color: #666666;
          &::before { background: #666666; }
        `;
      case 'Resolved':
        return `
             background: #CCFBF1;
          color: #115E59;
          &::before { background: #115E59; }
          `;
      default:
        return `
          background: #F1F1F1;
          color: #666666;
          &::before { background: #666666; }
        `;
    }
  }}
`;

export default StatusIndicator;
