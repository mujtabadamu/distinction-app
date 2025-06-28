import { ReactNode } from 'react';
import { Container } from '../../styles/landing/contentContainer.styles';

interface Props {
  children: ReactNode;
}

const ContentContainer = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

export default ContentContainer;
