import { Box, Spacer } from '@flexisaf/flexibull2';

import PageWrapper from '../../components/learnerDashboard/pageWrapper';
import styled from 'styled-components';
import devices from '../../utils/devices';
import React, { useState } from 'react';
import { TabButton, TabContainer, TabPanel } from './dashboardTab';
import SectionLoader from 'components/custom/sectionLoader';
const Overview = React.lazy(() => import('./tabs/overview'));
const LearningStats = React.lazy(() => import('./tabs/learningStats'));
const AvailableCourses = React.lazy(() => import('./tabs/availableCourses'));

type TabTypes = 'Overview' | 'Statistics' | 'Courses';
const LearnerDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabTypes>('Overview');

  const handleTabChange = (tabLabel: TabTypes) => {
    setActiveTab(tabLabel);
  };

  return (
    <PageWrapper title="Your Dashboard">
      <Spacer space="20px" />
      <Box></Box>
      {/* {emptyStateCondition && <HomeEmptyState />} (Comment this out) */}
      <Wrapper /*isEmpty={emptyStateCondition}*/>
        <TabContainer>
          <TabButton
            active={activeTab === 'Overview'}
            onClick={() => handleTabChange('Overview')}
          >
            Overview
          </TabButton>
          <TabButton
            active={activeTab === 'Statistics'}
            onClick={() => handleTabChange('Statistics')}
          >
            Learning stats
          </TabButton>
          <TabButton
            active={activeTab === 'Courses'}
            onClick={() => handleTabChange('Courses')}
          >
            Available courses
          </TabButton>
        </TabContainer>

        <TabPanel
          active={activeTab === 'Overview'}
          style={{ maxWidth: '100%' }}
        >
          <Box label="Overview">
            {activeTab === 'Overview' && (
              <React.Suspense fallback={<SectionLoader />}>
                <Overview />
              </React.Suspense>
            )}
          </Box>
        </TabPanel>
        <TabPanel active={activeTab === 'Statistics'}>
          <Box label="Learning stats">
            {activeTab === 'Statistics' && (
              <React.Suspense fallback={<SectionLoader />}>
                <LearningStats />
              </React.Suspense>
            )}
          </Box>
        </TabPanel>
        <TabPanel active={activeTab === 'Courses'}>
          <Box label="Available courses">
            {activeTab === 'Courses' && (
              <React.Suspense fallback={<SectionLoader />}>
                <AvailableCourses />
              </React.Suspense>
            )}
          </Box>
        </TabPanel>
      </Wrapper>
    </PageWrapper>
  );
};

export default LearnerDashboard;

export const Container = styled.div`
  width: 100%;
  height: 100%;

  & .topContent {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Wrapper = styled(Box)<{ isEmpty: boolean }>`
  opacity: ${(props) => props.isEmpty && 0.2};
  filter: ${(props) => props.isEmpty && 'blur(2px)'};
`;

export const EmptyStateWrapper = styled.div`
  position: absolute;
  width: 80%;
  height: 60%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.1);
  z-index: 20;
  border-radius: 10px;
  padding: 20px;

  @media ${devices.laptop} {
    width: 40%;
  }

  & .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`;

export const EmptyStateSvg = styled.svg`
  width: 100;
  height: 100;
`;
