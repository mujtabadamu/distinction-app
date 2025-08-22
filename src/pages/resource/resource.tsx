import NavBar from 'components/landing/navBar.component';
import { Text } from '@flexisaf/flexibull2';
import {
  TabButton,
  TabContainer,
  TabPanel,
} from 'pages/learnerDashboard/dashboardTab';
import { useState } from 'react';
import Blogs from './components/blogs/blogs';
import Scholarship from './components/scholarship/scholarship';
import Webinars from './components/webinars/webinars';

const homePageLinks = [
  { link: '/home', name: 'Home' },
  { link: '/resource', name: 'Resource' },
  { link: '/quizathon', name: 'Quizathon' },
];

function Resource() {
  const [activeTab, setActiveTab] = useState('blogs');
  const handleTabSwitch = (value: string) => {
    setActiveTab(value);
  };
  return (
    <div>
      <NavBar navLinks={homePageLinks} />

      <section className="text-center my-0 md:my-20">
        <Text bold className="text-3xl font-bold">
          Welcome to Our
        </Text>
        <Text block className="text-[#1D4ED8]  font-bold text-3xl mb-3">
          Resource(s) Centre{' '}
        </Text>
        <Text className="">
          Our resource centre offers you an in-depth knowledge of what we do in
          distinction, how we can help you and keep you updated.
        </Text>
        <div>
          <TabContainer
            className="m-auto  !w-[95%] md:!w-fit justify-between  my-7 !gap-2 !border-none
        "
          >
            <TabButton
              className={`!p-3 w-[30%]  ${
                activeTab === 'blogs'
                  ? 'rounded-md after:!bg-transparent !border-none bg-[#1D4ED8] !text-white'
                  : ' border rounded-md'
              }`}
              onClick={() => {
                handleTabSwitch('blogs');
              }}
              active={activeTab === 'blogs'}
            >
              Blogs
            </TabButton>
            <TabButton
              onClick={() => {
                handleTabSwitch('scholarships');
              }}
              className={`!p-3 w-[30%] ${
                activeTab === 'scholarships'
                  ? 'rounded-md after:!bg-transparent !border-none bg-[#1D4ED8] !text-white'
                  : ' border rounded-md'
              }`}
              active={activeTab === 'scholarship'}
            >
              Scholarships
            </TabButton>
            <TabButton
              className={`!p-3 w-[30%] ${
                activeTab === 'webinars'
                  ? 'rounded-md after:!bg-transparent !border-none bg-[#1D4ED8] !text-white'
                  : ' border rounded-md'
              }`}
              onClick={() => {
                handleTabSwitch('webinars');
              }}
              active={activeTab === 'webinars'}
            >
              Webinars
            </TabButton>
          </TabContainer>
        </div>
      </section>

      <main>
        <TabPanel active={activeTab === 'blogs'}>
          <Blogs />
        </TabPanel>
        <TabPanel active={activeTab === 'scholarships'}>
          <Scholarship />
        </TabPanel>
        <TabPanel active={activeTab === 'webinars'}>
          <Webinars />
        </TabPanel>
      </main>
    </div>
  );
}

export default Resource;
