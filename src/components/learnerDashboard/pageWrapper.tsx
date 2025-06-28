import { Box, PageTitle, Text } from '@flexisaf/flexibull2';
import { useSelector } from 'react-redux';

import { selectCurrentUser } from '../../redux/auth/selectors';
import useBreakpointValue from '../../hooks/general/useBreakpointValue';
import Theme from '../../utils/theme';
import styled from 'styled-components';
import { ReactNode } from 'react';
import { PrimaryButton } from '../../styles/common/buttons.styles';
import { useNavigate } from 'react-router-dom';
// import useQuizathon from 'hooks/general/useQuizathon';

interface IPageWrapper {
  children: ReactNode;
  title: string;
}

const PageWrapper = ({ children, title }: IPageWrapper) => {
  // const { getActiveQuizathon, activeQuizathon } = useQuizathon();
  const user = useSelector(selectCurrentUser);
  const padding = useBreakpointValue({ base: '10px 20px', md: '30px 36px' });
  const navigate = useNavigate();

  // commenting logic for disabling button
  // const currentTimeStamp = new Date();
  // const quizHasStarted =
  //   new Date(activeQuizathon?.startAt as string).getTime() <=
  //   currentTimeStamp.getTime();
  // const quizHasEnded =
  //   new Date(activeQuizathon?.stopAt as string).getTime() <=
  //   currentTimeStamp.getTime();
  // const isQuizathonInProgress = quizHasStarted && !quizHasEnded;

  // useEffect(() => {
  //   getActiveQuizathon();
  // }, []);

  return (
    <Box pad={padding}>
      <PageTitle>
        <Text size="16px" title="Admin dashboard" color={Theme.PrimaryColor}>
          Welcome {user?.firstName}
        </Text>
      </PageTitle>

      <Container>
        <div className="topContent">
          <Text bold size="16px" color={Theme.PrimaryTextColor}>
            {title}
          </Text>
          <PrimaryButton
            onClick={() => navigate('/new-practice')}
            // disabled={isQuizathonInProgress}
          >
            Start practice
          </PrimaryButton>
        </div>
        <>{children}</>
      </Container>
    </Box>
  );
};

export default PageWrapper;

export const Container = styled.div`
  width: 100%;
  height: 100%;

  & .topContent {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
