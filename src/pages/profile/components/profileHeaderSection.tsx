import { Box, Text, Spacer, Button, Grid } from '@flexisaf/flexibull2';
import {
  ContentWrapper,
  ProfileHeader,
  ProfileContent,
  ProfileImage,
  ProfileInfo,
  InfoRow,
  Badge,
  ButtonWrapper,
} from '../styles';
import { IoSchoolOutline } from 'react-icons/io5';
import { CiMail } from 'react-icons/ci';
import { RiVerifiedBadgeLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import {
  UserProfileDTO,
  SubscriptionView,
  PublicUserProfileDTO,
} from 'generated/index';
import UserEmptyState from '../../../assets/images/ImageEmptyState.svg';
import QRCodeModal from './QRCodeModal';
import { useState } from 'react';
import ShareProfileModal from './shareProfileModal';
import Skeleton from 'react-loading-skeleton';
import dayjs from 'dayjs';
import PreviewPublicProfileModal from './previewPublicProfileModal.tsx';

const subscriptionColors: { [key: string]: string } = {
  BASIC_PLAN: '#D1D1D626',
  STANDARD_PLAN: '#F7960E1A',
  PREMIUM_PLAN: '#2789601A',
};

interface ProfileSectionProps {
  profileData: UserProfileDTO | PublicUserProfileDTO | null;
  activePlan: SubscriptionView | null;
  selectedImage?: string | null;
  handleFile?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showEditButton: boolean;
  showShareButton?: boolean;
  showVerifyBadge?: boolean;
  username?: string;
  isLoading?: boolean;
  handleNiNVerification?: () => void;
}

// Type guard functions
function isUserProfile(
  profile: UserProfileDTO | PublicUserProfileDTO
): profile is UserProfileDTO {
  return 'email' in profile;
}

function isPublicProfile(
  profile: UserProfileDTO | PublicUserProfileDTO
): profile is PublicUserProfileDTO {
  return 'schoolName' in profile;
}

function ProfileHeaderSection({
  profileData,
  activePlan,
  showEditButton,
  selectedImage,
  handleFile,
  showShareButton,
  showVerifyBadge,
  isLoading,
  username,
}: ProfileSectionProps) {
  const navigate = useNavigate();
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false);
  const [isSharedModalOpen, setIsSharedModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const getBadgeBackground = () => {
    const planName = activePlan?.subscriptionPackage?.code ?? 'BASIC_PLAN';
    return subscriptionColors[planName] || '#e1effe';
  };

  // Helper function to get email safely
  const getEmail = () => {
    if (profileData && isUserProfile(profileData)) {
      return profileData.email;
    }
    return null;
  };

  // Helper function to get school name safely
  const getSchoolName = () => {
    if (!profileData) return '';

    if (isPublicProfile(profileData)) {
      return profileData.schoolName || '';
    } else if (isUserProfile(profileData)) {
      const schoolName = profileData.schoolInformationView?.school?.name || '';
      const departmentName =
        profileData.schoolInformationView?.department?.name || '';
      return `${schoolName}${departmentName ? ' | ' + departmentName : ''}`;
    }
    return '';
  };

  // Helper function to check if NIN is verified
  const isNinVerified = () => {
    if (!profileData) return false;

    if (isUserProfile(profileData)) {
      return profileData.isNinVerified || false;
    } else if (isPublicProfile(profileData)) {
      return profileData.ninVerified || false;
    }
    return false;
  };

  // Helper function to get lastSeen safely
  const getLastSeen = () => {
    if (profileData && isPublicProfile(profileData)) {
      return dayjs(profileData.lastSeen).format('DD/MM/YYYY');
    }
    return null;
  };

  const handlePublicProfilePreview = () => {
    if (!isPreviewModalOpen) {
      setIsPreviewModalOpen(true);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Skeleton height={250} />
      ) : (
        <ContentWrapper>
          <ProfileHeader />
          <ProfileContent>
            <Box relative>
              <ProfileImage
                src={
                  selectedImage || profileData?.profileImage || UserEmptyState
                }
                alt="Profile_image"
              />
              {handleFile && (
                <>
                  <label htmlFor="profileImage" style={{ cursor: 'pointer' }}>
                    <Button
                      style={{
                        borderRadius: '100px',
                        background: 'rgba(0, 0, 0, 0.4)',
                        position: 'absolute',
                        bottom: '30px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        outline: '1px solid #7f7a78',
                        color: 'white',
                      }}
                    >
                      Change
                    </Button>
                  </label>
                  <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    onChange={(e) => handleFile(e)}
                    style={{ display: 'none' }}
                  />
                </>
              )}
            </Box>
            <ProfileInfo>
              <Text size="1.5rem" bold>
                {`${profileData?.firstName} ${profileData?.lastName} ${
                  profileData?.otherName || ''
                }`.trim()}

                {showVerifyBadge && isNinVerified() && (
                  <Badge
                    style={{
                      background: getBadgeBackground(),
                      padding: 0,
                      margin: 3,
                    }}
                  >
                    <RiVerifiedBadgeLine size={16} />
                  </Badge>
                )}
              </Text>
              {username && (
                <>
                  <Spacer space={5} />
                  <Text
                    color="#1D4ED8"
                    block
                    style={{ cursor: 'pointer' }}
                    onClick={handlePublicProfilePreview}
                  >
                    @{username}
                  </Text>
                  <Spacer space={5} />
                </>
              )}

              {getEmail() && (
                <InfoRow>
                  <CiMail size={16} />
                  {getEmail()}
                </InfoRow>
              )}
              {getSchoolName() && (
                <>
                  {/* <Spacer space="10" /> */}

                  <InfoRow>
                    <IoSchoolOutline size={16} />
                    {getSchoolName()}
                  </InfoRow>
                </>
              )}
              {getLastSeen() && (
                <>
                  <Spacer space="10" />
                  <Text block>Last seen: {getLastSeen() ?? ''}</Text>
                </>
              )}

              <Grid
                default="max-content max-content"
                md="min-content auto"
                style={{ justifyContent: 'space-between' }}
              >
                {!showVerifyBadge && isNinVerified() ? (
                  <Box>
                    <Badge
                      style={{
                        background: getBadgeBackground(),
                      }}
                    >
                      <RiVerifiedBadgeLine size={14} />
                      {activePlan?.subscriptionPackage?.name ?? 'Basic Plan'}
                    </Badge>
                  </Box>
                ) : (
                  <Box />
                )}
                <ButtonWrapper>
                  {showShareButton && (
                    <>
                      <Button
                        onClick={() => setIsQRCodeModalOpen(true)}
                        pale
                        className="qr_code_button"
                        style={{ border: 'none' }}
                      >
                        Generate QR Code
                      </Button>
                      <Button
                        className="share_button"
                        pale
                        onClick={() => setIsSharedModalOpen(true)}
                      >
                        Share
                      </Button>
                    </>
                  )}

                  {showEditButton && (
                    <>
                      <Button
                        className="edit_button"
                        onClick={() => navigate('/edit-profile')}
                      >
                        Edit Profile
                      </Button>
                    </>
                  )}
                </ButtonWrapper>
              </Grid>
            </ProfileInfo>
          </ProfileContent>
        </ContentWrapper>
      )}

      <QRCodeModal
        profileData={profileData}
        handleCloseModal={() => setIsQRCodeModalOpen(false)}
        isOpen={isQRCodeModalOpen}
      />
      <ShareProfileModal
        isOpen={isSharedModalOpen}
        profileData={profileData}
        handleCloseModal={() => setIsSharedModalOpen(false)}
      />
      <PreviewPublicProfileModal
        isOpen={isPreviewModalOpen}
        loggedInUsername={username ?? ''}
        handleCloseModal={() => {
          setIsPreviewModalOpen(false);
        }}
      />
    </div>
  );
}

export default ProfileHeaderSection;
