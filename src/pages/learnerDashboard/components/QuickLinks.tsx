import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const QuickLinks: React.FC = () => {
  const navigate = useNavigate();
  const links = [
    {
      title: 'Practice',
      description: 'Begin your daily session ',
      icon: 'quill-write.svg',
      bgcolor: 'linear-gradient(135deg, #ff512f 0%, #f09819 100%)',
      border: '1px solid #f1961a',
      clickAction: () => navigate('/new-practice'),
      dataTour: 'practice',
    },
    {
      title: 'Study Pal',
      description: 'Connect with your personal tutor',
      icon: 'book.svg',
      bgcolor: 'linear-gradient(135deg, #EC038B 0%, #FC6768 100%)',
      border: '1px solid #51C9FE',
      clickAction: () => navigate('/chatbot'),
      dataTour: 'studypal',
    },
    {
      title: 'Flashcards',
      description: 'Review key concepts',
      icon: 'folder-library.svg',
      bgcolor: 'linear-gradient(135deg, #0CA5E9 0%, #54CAFF 100%)',
      border: '1px solid #C9C9C9',
      clickAction: () => navigate('/my-library'),
      dataTour: 'flashcards',
    },
    {
      title: 'Quizathon',
      description: 'Earn while you learn',
      icon: 'medal-first-place.svg',
      border: '1px solid #A3D950',
      bgcolor: 'linear-gradient(135deg, #29AB08 0%, #84CC15 100%)',
      clickAction: () => navigate('/quizathons'),
      dataTour: 'quizathon',
    },
  ];

  return (
    <LinksContainer>
      {links.map((link, index) => (
        <LinkCard
          key={index}
          onClick={link.clickAction}
          data-tour={link.dataTour}
          style={{ border: link.border }}
        >
          <IconWrapper bgcolor={link.bgcolor}>
            <img src={link.icon} alt="icons-image" />
          </IconWrapper>
          <LinkTitle>{link.title}</LinkTitle>
          <LinkDescription>{link.description}</LinkDescription>
        </LinkCard>
      ))}
    </LinksContainer>
  );
};

export default QuickLinks;

const LinksContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
`;

const LinkCard = styled.div`
  padding: 1.5rem 5px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  min-height: 138px;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const LinkTitle = styled.h3`
  margin: 0;
  font-weight: 700;
  font-size: 0.97rem;
`;

const LinkDescription = styled.p`
  margin: 0;
  font-size: 0.875rem;
  opacity: 0.9;
  text-align: center;
`;

const IconWrapper = styled.div<{ bgcolor: string }>`
  font-size: 24px;
  padding: 5px;
  border-radius: 5px;
  width: fit-content;
  background: ${(props) => props.bgcolor};
  /* @media (max-width: 768px) {
    font-size: 16px;
  } */
`;
