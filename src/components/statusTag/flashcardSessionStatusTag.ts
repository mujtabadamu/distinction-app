import styled from 'styled-components';

const getFlashcardSessionStatusColor = (status: string) => {
  switch (status) {
    case 'ABANDONED':
      return {
        borderColor: '#DC2626',
        backgroundColor: '#FFE5E5',
        color: '#DC2626',
        borderRadius: '30px',
      };
    case 'COMPLETED':
      return {
        borderColor: '#4cd471',
        backgroundColor: '#EBFFEE',
        color: '#16734C',
        borderRadius: '30px',
      };
    case 'STARTED':
      return {
        borderColor: '#2998ec',
        backgroundColor: '#E6F0FA',
        color: '#2998ec',
        borderRadius: '30px',
      };
    default:
      return {
        borderColor: '#999',
        backgroundColor: '#F5F5F5',
        color: '#999',
        borderRadius: '30px',
      };
  }
};

interface FlashcardSessionStatusTagProps {
  status: string;
}

const FlashcardSessionStatusTag = styled.div<FlashcardSessionStatusTagProps>`
  display: flex;
  width: 120px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  border-radius: ${(props) => getFlashcardSessionStatusColor(props.status).borderRadius};
  border: 1.5px solid ${(props) => getFlashcardSessionStatusColor(props.status).borderColor};
  background: ${(props) => getFlashcardSessionStatusColor(props.status).backgroundColor};
  color: ${(props) => getFlashcardSessionStatusColor(props.status).color};
`;

export default FlashcardSessionStatusTag; 