import React from 'react';
import { FaFile } from 'react-icons/fa';
import styled from 'styled-components';

interface EmptyStateProps {
  image?: React.ReactNode;
  title?: string;
  action?: React.ReactNode;
  description?: string;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
`;

const ImageWrapper = styled.div`
  margin-bottom: 0.5rem;

  svg {
    width: 4rem;
    height: 4rem;

    @media (min-width: 640px) {
      width: 6rem;
      height: 6rem;
    }
  }

  img {
    width: 8rem;
    height: 8rem;
    object-fit: cover;
    border-radius: 9999px;
  }
`;

const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  text-align: center;
  margin-bottom: 0.5rem;

  @media (min-width: 640px) {
    font-size: 1.25rem;
  }
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
  max-width: 28rem;

  @media (min-width: 640px) {
    font-size: 1rem;
  }
`;
const ActionWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmptyState: React.FC<EmptyStateProps> = ({
  image,
  title = 'No data available',
  description = 'There seems to be no data to display at the moment.',
  action,
}) => {
  return (
    <Container>
      <ImageWrapper>{image || <FaFile size={50} />}</ImageWrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
      {action && <ActionWrapper>{action}</ActionWrapper>}
    </Container>
  );
};

export default EmptyState;
