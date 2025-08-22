import React, { useEffect } from 'react';
import { Box, Text } from '@flexisaf/flexibull2';
import CertificateUI from './certificateUI';
import useQuizathon from './hooks/useQuizathon';
import { useLocation, useNavigate } from 'react-router-dom';
import SectionLoader from 'components/custom/sectionLoader';

const VerifyCertificate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const participantId = searchParams.get('participant');

  const { verifyCertificate, certificateData, isGeneratingCertificate } =
    useQuizathon({
      studentId: undefined, // This page doesn't need user context
    });

  useEffect(() => {
    if (!participantId) return;
    verifyCertificate(participantId);
  }, [participantId]);

  if (isGeneratingCertificate) return <SectionLoader />;
  return (
    <Box background="#fff">
      <Box pad="1rem">
        <div onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
          <i className="saf-arrow-left-2" />
          <Text>Back</Text>
        </div>
      </Box>
      <Box maxWidth="1024px" margin="auto">
        <CertificateUI
          certificateData={certificateData}
          certificateId={participantId}
        />
      </Box>
    </Box>
  );
};

export default VerifyCertificate;
