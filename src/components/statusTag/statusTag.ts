import styled from 'styled-components';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'RETAKE':
    case 'CONTINUE':
      return {
        borderColor: '#2998EC0D',
        backgroundColor: '#2998EC0D',
        color: '#1D4ED8',
        borderRadius: '5px',
      };
    case 'REAL_MODE':
      return {
        borderColor: '#EBFFEE',
        backgroundColor: '#EBFFEE',
        color: '#16734C',
        borderRadius: '5px',
      };
    case 'LEARNING_MODE':
      return {
        borderColor: '#FFFBEB',
        backgroundColor: '#FFFBEB',
        color: '#FF9500',
        borderRadius: '5px',
      };
    case 'PENDING':
      return {
        borderColor: '#E98B3A',
        color: '#E98B3A',
      };
    case 'APPROVED':
    case 'COMPLETED':
      return {
        borderColor: '#4cd471',
        color: '#4cd471',
      };
    case 'DECLINED':
      return {
        borderColor: '#fb5e9a',
        color: '#fb5e9a',
      };
    case 'STARTED':
    case 'NOT_STARTED':
      return {
        borderColor: '#2998ec',
        color: '#2998ec',
      };
    default:
      return {
        borderColor: '#999',
        color: '#999',
      };
  }
};

interface StatusTagProps {
  status: string;
}

const StatusTag = styled.div<StatusTagProps>`
  display: flex;
  width: 120px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  border-radius: ${(props) =>
    getStatusColor(props.status).borderRadius ?? '30px'};
  border: 1px solid ${(props) => getStatusColor(props.status).borderColor};
  background: ${(props) =>
    getStatusColor(props.status).backgroundColor ?? '#95a4af0d'};
  color: ${(props) => getStatusColor(props.status).color};
`;

export default StatusTag;
