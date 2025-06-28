import { Box, Text, PageTitle } from '@flexisaf/flexibull2';
import bannerImage from 'assets/images/library_banner.png';
import cards from 'assets/images/stacked_cards.svg';
import styled from 'styled-components';
import React, { useState } from 'react';
import FlashCardTab from './tabs/flashCardTab';
import KeyPointsTab from './tabs/keyPointsTab';
import FlashcardDashboard from './components/FlashcardDashboard';
import {
  TabButton,
  TabContainer,
  TabPanel,
} from 'pages/learnerDashboard/dashboardTab';

type TabTypes = 'Dashboard' | 'Flashcards' | 'Key Points';

const MyLibraryPage = () => {
  const [activeTab, setActiveTab] = useState<TabTypes>('Dashboard');

  const handleTabChange = (tabLabel: TabTypes) => {
    setActiveTab(tabLabel);
  };

  return (
    <Box pad="1rem 1.5rem">
      <PageTitle>My Library</PageTitle>
      <Banner
        style={{
          backgroundImage: `url(${bannerImage})`,
          minHeight: '150px',
        }}
      >
        <Box className="w-[100%] md:w-[90%]  flex items-center justify-between">
          <Box>
            <Text className="text-white text-md" block>
              Introducing
            </Text>
            <Text
              className="text-lg text-[#FFCB66] md:text-3xl font-bold"
              block
            >
              Flashcards & Key Points
            </Text>
            <Text className="text-[13px] text-white md:text-lg">
              Personalized Learning, Anytime, Anywhere
            </Text>
          </Box>

          <Box className="hidden lg:block">
            <img src={cards} />
          </Box>
        </Box>
      </Banner>

      <TabContainer>
        <TabButton
          active={activeTab === 'Dashboard'}
          onClick={() => handleTabChange('Dashboard')}
        >
          Dashboard
        </TabButton>
        <TabButton
          active={activeTab === 'Flashcards'}
          onClick={() => handleTabChange('Flashcards')}
        >
          Flashcards
        </TabButton>
        <TabButton
          active={activeTab === 'Key Points'}
          onClick={() => handleTabChange('Key Points')}
        >
          Key Points
        </TabButton>
      </TabContainer>

      <TabPanel active={activeTab === 'Dashboard'}>
        {activeTab === 'Dashboard' && <FlashcardDashboard />}
      </TabPanel>

      <TabPanel active={activeTab === 'Flashcards'}>
        {activeTab === 'Flashcards' && <FlashCardTab />}
      </TabPanel>

      <TabPanel active={activeTab === 'Key Points'}>
        {activeTab === 'Key Points' && <KeyPointsTab />}
      </TabPanel>
    </Box>
  );
};

export default MyLibraryPage;

const Banner = styled.div`
  border-radius: 10px;
  background-color: #101a33;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  justify-content: center;
  margin: 0 0 20px 0;
`;
