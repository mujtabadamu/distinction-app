import { useState } from 'react';
import {
  Box,
  Text,
  Spacer,
  Button,
  Modal,
  ModalBody,
  ModalClose,
  Grid,
} from '@flexisaf/flexibull2';
import {
  FaLinkedin,
  FaWhatsapp,
  FaInstagram,
  FaFacebookSquare,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { UserProfileDTO } from 'generated/index';
import styled from 'styled-components';
import { baseUrl } from '../hooks/useQRCode';
import { BsCopy } from 'react-icons/bs';
import { isEnvEqual } from 'utils/helpers';
import { Environment } from 'utils/constants';
import useProfile from '../hooks/useProfile';

interface ShareProfileModalProps {
  profileData: UserProfileDTO | null;
  handleCloseModal?: () => void;
  isOpen: boolean;
}

const isDev = isEnvEqual(Environment.Development);
const urlPrefix = isDev ? 'https://schools' : 'https://dashboard';

function ShareProfileModal({
  isOpen,
  handleCloseModal,
  profileData,
}: ShareProfileModalProps) {
  const { trackPublicProfileShare } = useProfile();
  const shareLink = `${baseUrl}/d/${profileData?.username || ''}`;
  const displayLink = `${urlPrefix}****/d/${profileData?.username || ''}`; // Shortened version for display
  const encodedShareLink = encodeURIComponent(shareLink);
  const shareText = encodeURIComponent(
    `Check out my profile on Distinction: ${shareLink}`
  );
  const [copyFeedback, setCopyFeedback] = useState('');

  const handleShare = (platformName: string, action: () => void) => {
    trackPublicProfileShare({
      sharedPlatform: platformName,
    });
    action();
  };

  const handleCopyLink = () => {
    handleShare('COPY_LINK', () => {
      navigator.clipboard
        .writeText(shareLink + '?platform=copy_link')
        .then(() => {
          setCopyFeedback('Link copied to clipboard!');
          setTimeout(() => setCopyFeedback(''), 3000);
        });
    });
  };

  const socialMediaShares = [
    {
      name: 'LinkedIn',
      icon: <FaLinkedin size={50} style={{ color: '#0A66C2' }} />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedShareLink}?platform=linkedin`,
      description: 'Post to your LinkedIn feed or share with connections',
    },
    {
      name: 'WhatsApp',
      icon: (
        <FaWhatsapp
          size={50}
          style={{
            background: '#25D366',
            borderRadius: '3px',
            padding: '2px',
            color: '#fff',
          }}
        />
      ),
      url: `https://api.whatsapp.com/send?text=${shareText}?platform=whatsapp`,
      description: 'Send to friends or groups on WhatsApp',
    },
    {
      name: 'Facebook',
      icon: <FaFacebookSquare size={50} style={{ color: '#1877F2' }} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedShareLink}?platform=facebook`,
      description: 'Post to your Facebook timeline or share with friends',
    },
    {
      name: 'Instagram',
      icon: <FaInstagram size={50} style={{ color: '#E4405F' }} />,
      url: null,
      action: () => {
        handleShare('INSTAGRAM', () => {
          navigator.clipboard
            .writeText(shareLink + '?platform=instagram')
            .then(() => {
              setCopyFeedback(
                'Link copied! Paste it in an Instagram post, story, or DM.'
              );
              setTimeout(() => setCopyFeedback(''), 5000);
            });
        });
      },
      description: 'Copy link to share in posts, stories, or DMs',
    },
    {
      name: 'Twitter',
      icon: (
        <FaXTwitter
          size={50}
          style={{
            background: '#000',
            borderRadius: '3px',
            padding: '10px',
            color: '#fff',
          }}
        />
      ),
      url: `https://x.com/intent/tweet?url=${encodedShareLink}/platform=x`,
      description: 'Tweet or send as a direct message on X',
    },
  ];

  return (
    <Modal open={isOpen} center={true} outerclick>
      <ModalBody
        style={{ maxWidth: '550px', padding: '0px 20px 20px 20px' }}
        width="90%"
      >
        <ModalClose onClick={handleCloseModal}>×</ModalClose>
        <Box pad="20px">
          <Text block size="1.3rem" bold>
            Share Profile
          </Text>
          <Spacer space={15} />
          <Text block size="0.9rem" style={{ color: '#666' }}>
            Share your profile with friends or post on social media
          </Text>
          <Spacer space={40} />
          <StyledGrid>
            {socialMediaShares.map((social) => (
              <SocialItem
                key={social.name}
                onClick={() => {
                  handleShare(social.name, () => {
                    social.url
                      ? window.open(social.url, '_blank', 'noopener,noreferrer')
                      : social.action?.();
                  });
                }}
                role="button"
                aria-label={`Share on ${social.name}`}
                title={social.description}
              >
                <IconWrapper>{social.icon}</IconWrapper>
                <Text block className="social-text">
                  {social.name}
                </Text>
              </SocialItem>
            ))}
          </StyledGrid>
          <Spacer space={40} />
          <Box
            display="flex"
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#F1F6FF',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #E3E5E5',
            }}
          >
            <Text
              size="0.9rem"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {displayLink}
            </Text>
            <Button onClick={handleCopyLink} style={{ border: 'none' }} pale>
              <BsCopy />
            </Button>
          </Box>
          {copyFeedback && (
            <Box pad="10px">
              <Text block size="0.8rem" style={{ color: '#25D366' }}>
                {copyFeedback}
              </Text>
            </Box>
          )}
        </Box>
      </ModalBody>
    </Modal>
  );
}

export default ShareProfileModal;

const StyledGrid = styled(Grid)`
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  justify-items: center;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
`;

const SocialItem = styled(Box)`
  cursor: pointer;
  width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 60px;
    & .social-text {
      font-size: 13px;
    }
  }
`;

const IconWrapper = styled.div`
  display: flex;
  margin-bottom: 5px;
  justify-content: center;
  align-items: center;
  & > svg {
    font-size: 50px;
  }
  @media screen and (max-width: 768px) {
    & > svg {
      /* font-size: 35px; */
      width: 40px;
      height: 40px;
    }
  }
`;
