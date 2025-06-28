import React from 'react';
import styled from 'styled-components';
import { LuNewspaper, LuMessageCircle, LuUsers } from 'react-icons/lu';
import { HiOutlineBookOpen } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

const QuickLinks: React.FC = () => {
  const navigate = useNavigate();
  const links = [
    {
      title: 'Start Practice',
      description: 'Practice in real or learning mode',
      icon: <LuNewspaper size={24} />,
      bgcolor: '#F26D42',
      clickAction: () => navigate('/new-practice'),
      dataTour: 'practice',
    },
    {
      title: 'Flashcards',
      description: 'Learn with interactive flashcards',
      icon: <HiOutlineBookOpen size={24} />,
      bgcolor: '#1A1F2C',
      clickAction: () => navigate('/my-library'),
      dataTour: 'flashcards',
    },
    {
      title: 'Study Pal',
      description: 'Study using our AI powered study buddy',
      icon: <LuMessageCircle size={24} />,
      bgcolor: '#E74D87',
      clickAction: () => navigate('/chatbot'),
      dataTour: 'studypal',
    },
    {
      title: 'Leaderboard',
      description: 'See your rank on the points leaderboard',
      icon: <LuUsers size={24} />,
      bgcolor: '#8B5CF6',
      clickAction: () => navigate('/points/rank'),
      dataTour: 'pas-system',
    },
  ];

  return (
    <LinksContainer>
      {links.map((link, index) => (
        <LinkCard
          key={index}
          bgcolor={link.bgcolor}
          onClick={link.clickAction}
          data-tour={link.dataTour}
        >
          <IconWrapper>
            {React.cloneElement(link.icon, { size: '1em' })}
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
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

const LinkCard = styled.div<{ bgcolor: string }>`
  background-color: ${(props) => props.bgcolor};
  color: white;
  padding: 1.5rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    flex-direction: row;
    align-items: center;
  }
`;

const LinkTitle = styled.h3`
  margin: 0;
  font-weight: 600;
  font-size: 1.25rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-top: 0.2rem;
  }
`;

const LinkDescription = styled.p`
  margin: 0;
  font-size: 0.875rem;
  opacity: 0.9;

  @media (max-width: 768px) {
    display: none;
  }
`;

const IconWrapper = styled.div`
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
