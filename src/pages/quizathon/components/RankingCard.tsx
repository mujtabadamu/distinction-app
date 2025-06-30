import React, { useEffect, useRef } from 'react';
import { Button } from '@flexisaf/flexibull2';
import styled from 'styled-components';
import { AiOutlineStar } from 'react-icons/ai';
import { FiShare2 } from 'react-icons/fi';
import { ScoreLeaderboardView } from 'generated/index';
import { formatTime, thousandFormatter } from 'utils/helpers';
import CertificateUI from '../certificateUI';
import EmptyState from 'components/emptyState/emptyState';
import RankingEmptyState from 'assets/images/ranking_empty_icon.svg';
import useQuizathon from '../hooks/useQuizathon';
import html2pdf from 'html2pdf.js';
import { DistinctionFeatureProperty } from 'utils/constants';
import useSubscriptionBilling from 'pages/profile/hooks/useSubscriptionBilling';
import PlanLimitBlock from 'pages/profile/subscription/PlanLimitBlock';
import SubscriptionPlansModal from 'pages/profile/subscription/SubscriptionPlansModal';
import useDisclosure from 'hooks/general/useDisclosure';

interface RankingCardProps {
  participantInfo: ScoreLeaderboardView | undefined;
  timeStats?: number | undefined;
  title?: string;
  enableSharing?: boolean;
  enableCertificateDownload?: boolean;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  shareContent?: {
    title: string;
    text: string;
    url: string;
  };
  positionValue?: number;
  positionLabel?: string;
  scoreValue?: number;
  scoreLabel?: string;
  // activeTab?: string;
}

const RankingCard: React.FC<RankingCardProps> = ({
  title = 'My Ranking',
  participantInfo,
  timeStats,
  enableSharing = true,
  enableCertificateDownload = true,
  emptyStateTitle = 'No record found',
  emptyStateDescription = "Your ranking will be available when you've earned a score.",
  shareContent,
  positionValue,
  positionLabel = 'Position',
  scoreValue,
  scoreLabel = 'Score',
  // activeTab,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const {
    generateCertificate,
    certificateData,
    isGeneratingCertificate,
    getActiveQuizathon,
    hasQuizathonEnded,
    hasQuizathonStarted,
  } = useQuizathon();

  const {
    getFeatureLimit,
    isSuccessFeatureLimit,
    loadingFeatureLimit,
    featureLimitData,
  } = useSubscriptionBilling();

  const planLimitHandler = useDisclosure();
  const subscriptionPlanHandler = useDisclosure();

  const quizHasStarted = hasQuizathonStarted;
  const quizHasEnded = hasQuizathonEnded;

  const isQuizathonInProgress = quizHasStarted && !quizHasEnded;

  const CheckPlanLimit = async () => {
    const payload = {
      property: DistinctionFeatureProperty.QUIZATON_CERTIFICATE,
    };
    await getFeatureLimit(payload);
    if (isSuccessFeatureLimit && Number(featureLimitData?.balance) === 0) {
      planLimitHandler.onOpen();
    } else {
      handleGenerateCertificate();
    }
  };

  const handleGenerateCertificate = async () => {
    try {
      await generateCertificate(participantInfo?.participantId as string);

      await new Promise((resolve) => setTimeout(resolve, 100));

      const element = document.getElementById('certificate');
      if (!element) {
        throw new Error('Certificate element not found');
      }

      const options = {
        filename: 'certificate.pdf',
        html2canvas: { scale: 4 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
      };

      await html2pdf().from(element).set(options).save();
    } catch (error) {
      console.error('Error generating certificate:', error);
    }
  };

  const handleShare = () => {
    if (!participantInfo || !shareContent) return;

    if (navigator.share) {
      navigator.share({ ...shareContent }).catch(console.error);
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  useEffect(() => {
    getActiveQuizathon();
  }, []);

  return (
    <>
      <Card>
        <Header>
          <RankingTitle>
            <AiOutlineStar size={20} />
            {title}
          </RankingTitle>
          {enableSharing && participantInfo && (
            <Button
              pale
              color="#D1D1DB"
              fontColor="#121217"
              iconLeft={<FiShare2 />}
              style={{ borderRadius: '8px' }}
              onClick={handleShare}
            >
              Share
            </Button>
          )}
        </Header>

        {participantInfo ? (
          <>
            <UserInfo>
              <Name>{participantInfo.participantName}</Name>
              <University>{participantInfo.schoolName}</University>
              {timeStats && <Time>{formatTime(timeStats)}</Time>}
            </UserInfo>

            <StatsContainer>
              <StatBox>
                <StatLabel>{positionLabel}</StatLabel>
                <StatValue>
                  {participantInfo?.position ?? positionValue ?? 'N/A'}
                </StatValue>
              </StatBox>
              <StatBox>
                <StatLabel>{scoreLabel}</StatLabel>
                <StatValue>
                  {thousandFormatter(
                    participantInfo?.totalScore ?? scoreValue ?? 0
                  )}
                </StatValue>
              </StatBox>
            </StatsContainer>
          </>
        ) : (
          <EmptyState
            image={<img src={RankingEmptyState} alt="No Ranking" />}
            title={emptyStateTitle}
            description={emptyStateDescription}
          />
        )}

        {enableCertificateDownload &&
          participantInfo &&
          !isQuizathonInProgress && (
            <CertificateDownload>
              <Button
                pale
                style={{ borderRadius: '4px' }}
                onClick={CheckPlanLimit}
                progress={isGeneratingCertificate || loadingFeatureLimit}
              >
                {isGeneratingCertificate || loadingFeatureLimit
                  ? 'Generating Certificate'
                  : 'Download Certificate'}
              </Button>
            </CertificateDownload>
          )}
      </Card>

      {certificateData && (
        <HiddenCertificate ref={contentRef}>
          <CertificateUI certificateData={certificateData} />
        </HiddenCertificate>
      )}

      <PlanLimitBlock
        isOpen={planLimitHandler.isOpen}
        closeModal={planLimitHandler.onClose}
        feature={DistinctionFeatureProperty.QUIZATON_CERTIFICATE}
        togglePlansModal={() => {
          planLimitHandler.onClose();
          subscriptionPlanHandler.onOpen();
        }}
      />
      <SubscriptionPlansModal
        onClose={subscriptionPlanHandler.onClose}
        openModal={subscriptionPlanHandler.isOpen}
      />
    </>
  );
};

export default RankingCard;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 24px;
`;

const RankingTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
  font-size: 1.125rem;
  font-weight: 500;
`;

const UserInfo = styled.div`
  text-align: center;
  margin-bottom: 24px;
  padding-bottom: 14px;
`;

const Name = styled.h2`
  font-size: 1.5rem;
  color: #1a202c;
  margin: 0 0 4px 0;
  font-weight: 600;
`;

const University = styled.p`
  color: #64748b;
  padding-bottom: 24px;
  font-size: 0.875rem;
  border-bottom: 1px solid #e2e8f0;
`;

const Time = styled.p`
  color: #1d4ed8;
  font-size: 0.875rem;
  margin: 0;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e2e8f0;
`;

const StatBox = styled.div`
  background: #f8fafc;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
`;

const StatLabel = styled.p`
  color: #64748b;
  font-size: 0.875rem;
  margin: 0 0 8px 0;
  text-transform: uppercase;
`;

const StatValue = styled.p`
  color: #1a202c;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const CertificateDownload = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

const HiddenCertificate = styled.div`
  position: fixed;
  top: -9999px;
  left: -9999px;
  width: 297mm;
  height: 210mm;
  margin: 0;
  padding: 0;
  overflow: hidden;

  @media print {
    visibility: visible;
    position: absolute;
    left: 0;
    top: 0;
  }
`;
