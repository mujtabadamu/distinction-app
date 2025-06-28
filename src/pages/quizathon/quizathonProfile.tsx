import { useCallback, useEffect, useState } from 'react';
import { Box, Spacer, PageTitle } from '@flexisaf/flexibull2';
import useQuizathon from './hooks/useQuizathon';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'redux/auth/selectors';
import CountDown, { BannerWrapper } from './components/countDown';
import QuizProfileSkeleton from './components/quizProfileSkeleton';
import TermsAndConditions from './components/termsAndConditions';
const AGREEMENT_KEY = 'activeQuizathon-conditions';
import BreadCrumbs from 'components/breadcrumb';
import moment from 'moment';
import QuizathonStatsPanel from './components/QuizathonStatsPanel';
import { useParams } from 'react-router-dom';
import FeatureSlider from './components/featureSlider';
import AdSense from 'adsense/AdSense';
import { HORIZONTAL_ADS } from 'adsense/adsConfig';
import useSubscriptionBilling from 'pages/profile/hooks/useSubscriptionBilling';

const now = moment();
const startDate = moment('2024-11-30').startOf('day');
const endDate = moment('2024-12-1').hour(10).minute(0).second(0);
export const isWithinRange = now.isBetween(startDate, endDate, null, '[]');

const QuizathonProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [openAgreement, setOpenAgreement] = useState<boolean>(false);

  const {
    participantDetails,
    getActiveQuizathon,
    getParticipant,
    hasQuizathonEnded,
    getSingleQuizathon,
    isLoadingQuizathon,
    singleQuizathon,
    getAllActiveQuizathon,
    allActiveQuizathon,
  } = useQuizathon();

  const { activePlan, getActivePlan } = useSubscriptionBilling();

  const hasEnded = hasQuizathonEnded;

  const user = useSelector(selectCurrentUser);
  const userId = user?.id;

  const handleAccept = () => {
    localStorage.setItem(AGREEMENT_KEY, 'true');
    setOpenAgreement(false);
  };

  const isRegistered = !!participantDetails;

  useEffect(() => {
    getActiveQuizathon();
    getParticipant({ studentId: userId || '', quizathonId: id || '' });
    getActivePlan();
    getSingleQuizathon(id || '');
    getAllActiveQuizathon();
  }, []);

  const refetchParticipantDetail = useCallback(() => {
    getParticipant({ studentId: userId || '', quizathonId: id || '' });
  }, []);
  useEffect(() => {
    const hasAcceptedConditions = localStorage.getItem(AGREEMENT_KEY);

    if (singleQuizathon && !hasAcceptedConditions) {
      const today = moment();
      const activeQuizathonStart = moment(singleQuizathon.startAt);
      const activeQuizathonEnd = moment(singleQuizathon.stopAt);
      const isDuringQuizathon = today.isBetween(
        activeQuizathonStart,
        activeQuizathonEnd,
        null,
        '[]'
      );
      if (isDuringQuizathon) {
        setOpenAgreement(true);
      }
    }
  }, [singleQuizathon]);

  if (isLoadingQuizathon) return <QuizProfileSkeleton />;

  return (
    <Box pad="20px 30px">
      {allActiveQuizathon && allActiveQuizathon.length > 1 && (
        <BreadCrumbs
          links={[{ path: `/quizathons`, text: 'Ongoing events' }]}
          last={singleQuizathon?.title || 'Quizathon'}
        />
      )}
      <PageTitle>Quizathon</PageTitle>
      {!hasEnded ? (
        <CountDown
          title={singleQuizathon?.title ?? 'Quiz title'}
          eventStartTime={new Date(singleQuizathon?.startAt as string)}
          eventEndTime={new Date(singleQuizathon?.stopAt as string)}
          isRegistered={isRegistered}
          singleQuizathon={singleQuizathon}
          refetch={refetchParticipantDetail}
        />
      ) : (
        <BannerWrapper>
          <Spacer space={80} />
          <FeatureSlider />
        </BannerWrapper>
      )}

      <Spacer space={32} />

      {activePlan?.subscriptionPackage?.code === 'BASIC_PLAN' && (
        <Box pad="1rem 0">
          <AdSense adSlotType={HORIZONTAL_ADS} />
        </Box>
      )}
      <QuizathonStatsPanel singleQuizathon={singleQuizathon} />

      <TermsAndConditions
        isOpen={openAgreement}
        onClose={() => {
          localStorage.setItem(AGREEMENT_KEY, 'true');
          setOpenAgreement(false);
        }}
        handleAccept={handleAccept}
      />
    </Box>
  );
};

export default QuizathonProfile;
