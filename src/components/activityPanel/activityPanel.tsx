import styled from 'styled-components';
import Theme from '../../utils/theme';
import { Text, Grid, Box, EmptyState } from '@flexisaf/flexibull2';
import devices from '../../utils/devices';
// import ellipse from '../../assets/Ellipse 7.svg';
import { IRecentPractice } from '../../hooks/practice/useRecentPracticesQuery';
import StatusTag from '../statusTag/statusTag';
import { capitalizeFirstLetter } from '../../utils/helpers';

interface ActivityPanelProp {
  recentPractices: IRecentPractice[] | null;
}

const ActivityPanel = ({
  recentPractices,
}: ActivityPanelProp) => {
  return (
    <Grid default="1fr" md="1fr">
      <CardContainer>
        <Box pad="10px 20px" style={{ borderBottom: '1px solid #CDCFD0' }}>
          <Text size="16px" color={Theme.PrimaryTextColor}>
            Recent Practices
          </Text>
        </Box>
        <Box pad="10px 0px" >
          {recentPractices?.length ? (
            recentPractices?.map((practice) => {
              return (
                <FlexWrapper key={practice.id}>
                  <Box
                    display="flex"
                    style={{
                      flexDirection: 'column',
                      gap: '5px',
                    }}
                  >
                    <Text bold size="16px" color={Theme.PrimaryTextColor}>
                      {practice.exam}
                    </Text>
                    <span className="title">{''}</span>
                  </Box>
                  <Box display="flex" style={{ gap: '20px' }}>
                    <StatusTag status={practice.status}>
                      {capitalizeFirstLetter(practice.status)}
                    </StatusTag>
                    {/* <img src={ellipse} alt="ellipse" /> */}
                  </Box>
                </FlexWrapper>
              );
            })
          ) : (
            <EmptyState
              title="No practice recorded yet"
              info="Please click the new practice button to start"
              style={{ width: '100%' }}
            />
          )}
        </Box>
      </CardContainer>
    </Grid>
  );
};

export const FlexWrapper = styled.div`
  display: flex;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-bottom: 1px solid #e3e5e5;
  padding: 10px 20px;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  padding: 8px 0;
  min-width:300px;
  & .empty-state{
    text-align:center;
    margin:0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }


  @media ${devices.tablet} {
    grid-template-columns: 1fr 1fr;
  }

  @media ${devices.laptop} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default ActivityPanel;
