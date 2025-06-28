import { Box, Spacer } from '@flexisaf/flexibull2';
import styled from 'styled-components';
import QuizathonCard from './components/QuizathonCard';
import SimultaneosBanner from '../../assets/images/simulaneos-banner.svg';
import useQuizathon from './hooks/useQuizathon';
import Skeleton from 'react-loading-skeleton';
import { useEffect } from 'react';
// import useProfile from 'pages/profile/hooks/useProfile';
import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { selectCurrentUser } from 'redux/auth/selectors';

const Quizathons = () => {
  const {
    getAllActiveQuizathon,
    allActiveQuizathon,
    isLoadingAllActiveQuizathon,
    // submitStudentInfo,
    // getParticipant,
    participantDetails,
    isSubmittingInfo,
    // activeQuizathon,
    getActiveQuizathon,
  } = useQuizathon();
  // const { getProfileData, profileData } = useProfile();
  // const user = useSelector(selectCurrentUser);
  // const studentId = user?.id as string;

  useEffect(() => {
    getAllActiveQuizathon();
    getActiveQuizathon();
    // getProfileData(studentId);
  }, []);

  const isRegistered = !!participantDetails;
  const navigate = useNavigate();

  // PS: just incase we want to be able to register on this page this function will always be useful
  // const handleSubmit = () => {
  //   const payload = {
  //     schoolId: profileData?.schoolInformationView?.school?.id || '',
  //     department: profileData?.schoolInformationView?.department?.name || '',
  //     quizathonId: activeQuizathon?.id ?? '',
  //   };

  //   submitStudentInfo(payload, () => {
  //     getAllActiveQuizathon();
  //   });
  // };

  return (
    <Box className="h-full !py-[30px] !px-5  md:!px-8">
      <BannerWrapper>
        <Box className="flex h-full flex-col items-center justify-center text-center">
          <h1 className="text-[#FFD166] font-bold text-[1.3rem] md:text-[2.4rem] mb-4">
            Quizathon Just Got Better
          </h1>
          <span className="text-[#fff] font-bold text-[1rem] md:text-[1.2rem]">
            More Competition . Better learning .
          </span>
        </Box>
      </BannerWrapper>
      <Spacer space={40} />
      <Box
        className="flex"
        style={{ justifyContent: 'flex-end', marginBottom: 20 }}
      ></Box>
      <CardsGrid>
        {isLoadingAllActiveQuizathon
          ? [...Array(6)].map((_, index) => (
              <Skeleton key={index} height={150} />
            ))
          : allActiveQuizathon?.map((event) => {
              return (
                <QuizathonCard
                  event={event}
                  isRegistered={isRegistered}
                  onCardClick={() => navigate(`/quizathon-profile/${event.id}`)}
                  // onButtonClick={handleSubmit}
                  badge={null}
                  loading={isSubmittingInfo}
                />
              );
            })}
      </CardsGrid>
    </Box>
  );
};

export default Quizathons;

export const BannerWrapper = styled.div`
  padding: 1rem;
  background-image: url(${SimultaneosBanner});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  height: 276px;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 10px;
  margin-bottom: 100px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;
