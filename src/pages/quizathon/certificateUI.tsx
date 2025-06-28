import React from 'react';
import styled from 'styled-components';
import CertificateFrame from 'assets/images/Certificate_Frame.svg';
import Ceo_Signature from 'assets/images/official_sign.jpg';
import Verified_Tag from 'assets/images/verified_tag.svg';
import CompanyLogo from 'assets/images/company_logo.svg';
import { CertificateDto } from 'generated/index';
import moment from 'moment';
import EmptyState from 'components/emptyState/emptyState';
import RankingEmptyState from 'assets/images/ranking_empty_icon.svg';

interface RemarkConfig {
  maxPosition: number;
  message: string;
}

interface CertificateUIProps {
  certificateData: CertificateDto | null;
  certificateId?: string | null;
}

const POSITION_REMARKS: RemarkConfig[] = [
  {
    maxPosition: 1,
    message: 'Congratulations! You are the ultimate champion',
  },
  {
    maxPosition: 2,
    message:
      'Outstanding performance! You secured second place with excellence',
  },
  {
    maxPosition: 3,
    message: 'Well done! A fantastic effort to claim the third position',
  },
  {
    maxPosition: 10,
    message: 'Great job! You ranked in the prestigious top 10',
  },
  {
    maxPosition: 20,
    message: 'Impressive achievement! You secured a spot in the top 20',
  },
  {
    maxPosition: 50,
    message: 'Remarkable effort! You made it into the top 50',
  },
  {
    maxPosition: 100,
    message: 'A solid performance! You placed among the top 100 competitors',
  },
];

const CertificateUI: React.FC<CertificateUIProps> = ({
  certificateData,
  certificateId,
}) => {
  const formatRemark = (message: string) => {
    return (
      <span>
        {message} at <strong>{certificateData?.quizathonTitle}</strong> held on{' '}
        <strong>
          {moment(certificateData?.quizathonDate).format('Do MMM, YYYY')}
        </strong>
      </span>
    );
  };

  const getCertificateRemark = (position: number) => {
    const defaultRemark = (
      <>
        For your participation and effort in{' '}
        <strong>{certificateData?.quizathonTitle}</strong> held on{' '}
        <strong>
          {moment(certificateData?.quizathonDate ?? '2024-01-06').format(
            'Do MMM, YYYY'
          )}
        </strong>
        .
      </>
    );

    const remarkConfig = POSITION_REMARKS.find(
      (config) => position <= config.maxPosition
    );
    if (!remarkConfig) return defaultRemark;

    return formatRemark(remarkConfig.message);
  };

  return (
    <CertificateContainer>
      {certificateData ? (
        <CertificateFrameLayer id="certificate">
          <Certificate>
            <Watermark>DISTINCTION</Watermark>

            <Header>
              <Logo>
                <img src="/newdistinctionlogo.svg" alt="Distinction" />
              </Logo>
            </Header>

            <Title>QUIZATHON CERTIFICATE</Title>
            <Subtitle>Proudly presented to</Subtitle>

            <Name>{`${certificateData?.firstname} ${certificateData?.lastname}`}</Name>

            {!certificateId && (
              <Description>
                {getCertificateRemark(Number(certificateData?.position))}
              </Description>
            )}

            <Footer>
              <Signature>
                <img src={Ceo_Signature} alt="Signature" />
                <p>Faiz Bashir</p>
                <small>C.E.O</small>
              </Signature>
              {!certificateId && (
                <SponsoredBy>
                  <p>Powered by:</p>
                  <img src={CompanyLogo} alt="sponsor" />
                </SponsoredBy>
              )}
              <QRCode>
                <img
                  src={certificateId ? Verified_Tag : certificateData?.qrCode}
                  alt="QR Code"
                />
              </QRCode>
            </Footer>
          </Certificate>
        </CertificateFrameLayer>
      ) : (
        <EmptyState
          image={<img src={RankingEmptyState} alt="No Ranking" />}
          title="No record found"
          description="The certificate for this participant has not been issued yet."
        />
      )}
    </CertificateContainer>
  );
};

export default CertificateUI;

const CertificateContainer = styled.div`
  background: #fff;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const CertificateFrameLayer = styled.div`
  position: relative;
  width: 100%;

  aspect-ratio: 1.414 / 1;
  background: transparent;
  padding: 0;
  margin: 0 auto;
  overflow: visible;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(${CertificateFrame}) no-repeat center;
    background-size: 100% 100%;
    pointer-events: none;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    z-index: 2;
  }
`;

const Certificate = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  top: 2rem;
  @media (min-width: 768px) {
    top: 3rem;
  }
`;

const Watermark = styled.div`
  position: absolute;
  top: 30%;
  left: 52%;
  transform: translate(-50%, -50%) rotate(-30deg);
  font-size: 2rem;
  color: rgba(0, 102, 255, 0.05);
  font-weight: bold;
  white-space: nowrap;
  pointer-events: none;

  @media (min-width: 768px) {
    top: 42%;
    left: 52%;
    transform: translate(-50%, -50%) rotate(-30deg);
    font-size: 8rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  @media (min-width: 768px) {
    margin: 4rem 0;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 500;
  color: #333;
  img {
    width: 80px;
  }
  @media (min-width: 768px) {
    img {
      width: 160px;
    }
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  margin: 0.7rem 0;
  color: #1d4ed8;
  font-family: 'League Spartan', serif;
  @media (min-width: 768px) {
    font-size: 2.5rem;
    margin: 0 0 1rem;
  }
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 0.8rem;
  letter-spacing: 0.2rem;
  @media (min-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 2rem;
  }
`;

const Name = styled.div`
  text-align: center;
  position: relative;
  font-style: italic;

  &:before {
    content: '';
    position: absolute;
    bottom: -0.6rem;
    left: 50%;
    transform: translateX(-50%);
    height: 1px;
    width: 50%;
    margin: 0.5rem 0;
    background-color: #1a1a1e;
  }
  @media (min-width: 768px) {
    margin-bottom: 1rem;
    font-size: 2rem;
    &:before {
      bottom: -1.5rem;
    }
  }
`;

const Description = styled.p`
  text-align: center;
  font-size: 1rem;
  margin: 0.5rem auto;
  line-height: 1.6;
  max-width: 50%;
`;

const Footer = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  margin: 0 auto;
  margin-top: 1rem;

  @media (min-width: 768px) {
    margin-top: 3rem;
  }
`;

const Signature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    height: 20px;
  }

  p {
    font-weight: 500;
    margin: 0;
    font-size: 0.5rem;
  }

  small {
    color: #666;
    font-size: 0.5rem;
  }

  @media (min-width: 768px) {
    img {
      height: 40px;
    }
    p {
      font-size: 1rem;
    }

    small {
      font-size: 0.75rem;
    }
  }
`;

const SponsoredBy = styled.div`
  text-align: center;

  p {
    margin: 0 0 0.5rem;
    font-size: 0.875rem;
    color: #666;
  }

  img {
    height: 20px;
  }
`;

const QRCode = styled.div`
  width: 40px;
  height: 40px;

  @media (min-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;
