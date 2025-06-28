import { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  Text,
  Button,
  Grid,
  Spacer,
  Input,
  Table,
  FlexiPagination,
  EmptyState,
  Notify,
  Tabs,
  PageTitle,
} from '@flexisaf/flexibull2';
import Theme from 'utils/theme';
import InfoBanner from 'components/infoBanner/InfoBanner';

import useProfile from 'pages/profile/hooks/useProfile';
import { StatCard } from 'pages/learnerDashboard/tabs/overview';
import NinVerificationModal from 'pages/profile/components/NinVerificationModal';
import { FaInstagram, FaFacebookSquare, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { RiLinkedinLine } from 'react-icons/ri';
import Skeleton from 'react-loading-skeleton';
import { PaginationWrapper } from 'pages/learnerDashboard/tabs/availableCourses';
import styled from 'styled-components';
import devices from 'utils/devices';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'redux/auth/selectors';
import useReferrals from './hooks/useReferrals';
import { useForm } from 'react-hook-form';
import Media from 'react-media';
import { isValidEmail, thousandFormatter } from 'utils/helpers';
import DistinctionReferralTerms from './referralTerms';
import { FaSpinner } from 'react-icons/fa';
import useAuth from 'pages/auth/hooks/useAuth';
import { useDebounce } from 'use-debounce';
import ClaimReward from './components/ClaimReward';
import { ReferralStatisticsView } from 'generated/index';
import PaymentHistory from './components/PaymentHistory';
import { Tooltip } from 'components/tooltip';
interface EmailInvite {
  email: string;
}

const Referrals: React.FC = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [showTerms, setShowTerms] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const activeUser = useSelector(selectCurrentUser);
  const userId = activeUser?.id ?? '';
  const [openClaimReward, setOpenClaimReward] = useState<{
    data: ReferralStatisticsView | null;
    open: boolean;
  }>({ data: null, open: false });
  const [openNinVerification, setOpenNinVerification] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
    setError,
    clearErrors,
  } = useForm<EmailInvite>({
    defaultValues: {
      email: '',
    },
  });

  const {
    isLoadingReferrals,
    referrals,
    setSearchText,
    page,
    setPage,
    pageOptions,
    setOffset,
    setLimit,
    limit,
    isLoadingReferralCode,
    getReferralCode,
    referralCode,
    referralStats,
    isLoadingReferralStats,
    getReferralStats,
    sendInvite,
    isSendingInvitation,
  } = useReferrals(userId);
  const { profileData } = useProfile();
  const { validateEmail, isValidatingEmail } = useAuth();
  const canUpdateNin =
    !!profileData?.firstName &&
    !!profileData?.lastName &&
    !!profileData?.email &&
    !!profileData?.gender &&
    !!profileData?.phoneNumber &&
    !!profileData?.schoolInformationView?.school?.name &&
    !!profileData?.schoolInformationView?.department?.name &&
    !!profileData?.schoolInformationView?.level &&
    !!profileData?.stateOfOrigin &&
    !!profileData?.schoolInformationView?.matriculationNumber;

  const email = watch('email');

  const isDevelopment = () => {
    if (process.env.NODE_ENV === 'production') return false;
    if (process.env.REACT_APP_ENV === 'production') return false;
    return (
      process.env.NODE_ENV === 'development' ||
      process.env.REACT_APP_ENV === 'development'
    );
  };

  const baseUrl = isDevelopment()
    ? 'https://schools.distinctionapp.flexisafapps-dev.com'
    : 'https://dashboard.distinction.app';

  const uniQueRefCode = referralCode?.referralCode ?? '';

  const referralLink = `${baseUrl}/register?ref=${uniQueRefCode}`;
  const referralMessage =
    'Tired of boring study routines? Say hello to Distinction, the AI-powered platform that helps you study smarter, compete, and earn rewards. ₦15 million up for grabs in the upcoming Quizathon 3.0. Sign up today:';

  const handleEmailInvite = async (data: EmailInvite) => {
    await sendInvite(data.email);
    reset();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Could not copy text: ', err);
    }
  };

  const shareOnInstagram = async () => {
    try {
      await navigator.clipboard.writeText(`${referralMessage} ${referralLink}`);
      Notify(
        'Referral link copied! You can now paste it in an Instagram post, story, or direct message.',
        { status: 'info' }
      );
    } catch (error) {
      console.error('Could not copy text: ', error);
    }
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      referralLink
    )}`;
    window.open(url, '_blank');
  };

  const shareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(
      `${referralMessage} ${referralLink}`
    )}`;
    window.open(url, '_blank');
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `${referralMessage} ${referralLink}`
    )}`;
    window.open(url, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      referralLink
    )}`;
    window.open(url, '_blank');
  };

  const showIcon = email && (isValidEmail(email) || isEmailValid !== null);

  const [debouncedEmail] = useDebounce(email, 400);

  useEffect(() => {
    if (!userId) return;
    getReferralCode(userId);
    getReferralStats(userId);
  }, []);

  useEffect(() => {
    const validateEmailIfCompleted = async () => {
      if (isValidEmail(debouncedEmail)) {
        const res = await validateEmail(debouncedEmail);
        setIsEmailValid(!!res?.status);

        if (!res?.status) {
          setError('email', {
            type: 'manual',
            message: 'This email is not valid, please use a valid email',
          });
        } else {
          clearErrors('email');
        }
      } else {
        setIsEmailValid(null);
        clearErrors('email');
      }
    };

    validateEmailIfCompleted();
  }, [debouncedEmail, setError, clearErrors]);

  const handleClose = () => {
    setOpenClaimReward({
      data: null,
      open: false,
    });
  };

  const closeNinVerification = () => {
    setOpenNinVerification(false);
  };
  return (
    <Box pad="20px 40px">
      <PageTitle>Referrals</PageTitle>
      <Text bold size="16px" color={Theme.PrimaryTextColor}>
        Referrals
      </Text>
      <Box pad="15px 0 0">
        <InfoBanner
          bgColor="#E7E7FF"
          infoTitle="Earn as you refer"
          infoText={
            <>
              <Text>
                Earn ₦100 airtime for each student you refer who scores at least
                50 correct answers in their practice.
              </Text>
              <Spacer space={4} />
              <Text>
                <strong>Note:</strong> The terms and conditions have been
                updated. Please click "Learn More" below to review the new
                terms.
              </Text>

              <Spacer space={2} />
              <LearnMoreButton plain pad="0" onClick={() => setShowTerms(true)}>
                Learn More
              </LearnMoreButton>
            </>
          }
          icon="saf-information"
        />
      </Box>
      <Spacer space={10} />

      <Box
        align="right"
        style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}
        pad="0 0 15px"
      >
        {!profileData?.isNinVerified && (
          <Button
            style={{ color: '#ffff', backgroundColor: '#202020', zIndex: '0' }}
            onClick={() => setOpenNinVerification(true)}
          >
            Verify NIN
          </Button>
        )}

        {!profileData?.isNinVerified ? (
          <Tooltip box="Cashout referrals have been restricted. Please update your NIN to proceed.">
            <Button
              disabled={true}
              onClick={() => {
                setOpenClaimReward({ data: referralStats, open: true });
              }}
            >
              Claim Reward
            </Button>
          </Tooltip>
        ) : (referralStats?.totalUnclaimed ?? 0) <= 0 ? (
          <Tooltip box="You do not have sufficient airtime  to cash out">
            <Button
              disabled={true}
              onClick={() => {
                setOpenClaimReward({ data: referralStats, open: true });
              }}
            >
              Claim Reward
            </Button>
          </Tooltip>
        ) : (
          <Button
            onClick={() => {
              setOpenClaimReward({ data: referralStats, open: true });
            }}
          >
            Claim Reward
          </Button>
        )}
      </Box>

      <Spacer space={10} />
      {/* )} */}
      {isLoadingReferralStats ? (
        <Grid default="repeat(4, 1fr)" gap="16px">
          {[1, 2, 3, 4].map((el) => (
            <Skeleton
              key={el}
              count={1}
              baseColor="#d0d5d933"
              highlightColor="#c2cad133"
              width="100%"
              height="6rem"
            />
          ))}
        </Grid>
      ) : (
        <Grid default="repeat(4, 1fr)" gap="16px">
          <StatCard>
            <Box>
              <Text size="2rem" bold>
                {thousandFormatter(referralStats?.totalReferrals ?? 0)}
              </Text>
              <Spacer space={10} />
              <Text color={Theme.PrimaryColor} bold>
                Referral(s)
              </Text>
            </Box>
          </StatCard>
          <StatCard>
            <Box>
              <Text size="2rem" bold>
                {thousandFormatter(referralStats?.totalVerifiedUser ?? 0)}
              </Text>
              <Spacer space={10} />
              <Text color={Theme.PrimaryOrange} bold>
                Qualified Referral(s)
              </Text>
            </Box>
          </StatCard>
          <StatCard>
            <Box>
              <Text size="2rem" bold>
                {`₦${thousandFormatter(
                  (referralStats?.totalVerifiedUser ?? 0) * 100
                )}`}
                <span
                  style={{
                    fontSize: '12px',
                    color: '#B3B3B3',
                    fontWeight: '300',
                  }}
                >
                  (Airtime)
                </span>
              </Text>
              <Spacer space={10} />
              <Text color="#23C16B" bold>
                Earnings
              </Text>
            </Box>
          </StatCard>
          <StatCard>
            <Box width="60%">
              <Box
                display="flex"
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text bold color="#23C16B" style={{ display: 'block' }}>
                  Claimed
                </Text>
                <Text
                  size="24px"
                  bold
                  style={{
                    display: 'block',
                  }}
                >
                  {`₦${thousandFormatter(referralStats?.totalClaimed ?? 0)}`}
                </Text>
              </Box>
              <Spacer space={10} />

              <Box
                display="flex"
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text bold color="#FF9500" style={{ display: 'block' }}>
                  Pending
                </Text>
                <Text
                  size="24px"
                  bold
                  style={{
                    display: 'block',
                  }}
                >
                  {`₦${thousandFormatter(referralStats?.totalUnclaimed ?? 0)}`}
                </Text>
              </Box>
            </Box>
          </StatCard>
        </Grid>
      )}

      <Box pad="24px" background="#fff" round margin="15px 0 0">
        <Text bold size="1rem" color={Theme.PrimaryTextColor}>
          Invite via Email
        </Text>
        <Spacer space={10} />
        <Text size="1rem" color={Theme.PrimaryTextColor}>
          You can enter the email of your fellow students and send them your
          referral code
        </Text>
        <Spacer space={20} />
        <Grid default="1fr 1fr" gap="10px">
          <Box relative>
            <Input
              block
              placeholder="Enter email address"
              type="email"
              isLoading={false}
              value={watch('email')}
              aria-invalid={errors.email ? 'true' : 'false'}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address',
                },

                validate: () => {
                  if (isEmailValid === false) {
                    return 'This email is not valid, please use a valid email';
                  }
                },
              })}
              error={errors.email?.message}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValue('email', e.target.value)
              }
              style={{ paddingRight: showIcon ? '30px' : 'inherit' }}
            />
            {showIcon && (
              <Box
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '15px',
                }}
              >
                {isValidatingEmail ? (
                  <SpinnerIcon color="#007bff" size={15} className="spinner" />
                ) : null}
              </Box>
            )}
          </Box>

          <Box>
            <Button
              progress={isSendingInvitation}
              disabled={isValidatingEmail || !isEmailValid}
              onClick={handleSubmit(handleEmailInvite)}
            >
              Send Invite
            </Button>
          </Box>
        </Grid>
        <Spacer space={40} />
        <Text bold size="1rem" color={Theme.PrimaryTextColor}>
          Share Referral code
        </Text>
        <Spacer space={10} />
        <Text size="1rem" color={Theme.PrimaryTextColor}>
          Share the link to your fellow students by copying the link or sharing
          via social media
        </Text>
        <Spacer space={20} />
        {isLoadingReferralCode ? (
          <Skeleton
            count={1}
            baseColor="#d0d5d933"
            highlightColor="#c2cad133"
            width="100%"
            height="6rem"
          />
        ) : (
          <Grid default="1fr 1fr" gap="15px">
            <Box
              background="#F1F6FF"
              round
              display="flex"
              pad="10px"
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              <span style={{ display: 'block' }}>
                {`${baseUrl}/register?ref=${uniQueRefCode}`}
              </span>
              <Button
                fontColor={Theme.PrimaryColor}
                onClick={copyToClipboard}
                pale
              >
                {isCopied ? 'Copied!' : 'Copy link'}
              </Button>
            </Box>
            <Box
              display="flex"
              style={{ gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}
            >
              <Button
                color="#F1F6FF"
                fontColor="#000"
                onClick={shareOnInstagram}
              >
                <FaInstagram size="1.5rem" />
              </Button>
              <Button
                color="#F1F6FF"
                fontColor="#000"
                onClick={shareOnFacebook}
              >
                <FaFacebookSquare size="1.5rem" />
              </Button>
              <Button
                color="#F1F6FF"
                fontColor="#000"
                onClick={shareOnWhatsApp}
              >
                <FaWhatsapp size="1.5rem" />
              </Button>
              <Button color="#F1F6FF" fontColor="#000" onClick={shareOnTwitter}>
                <FaXTwitter size="1.5rem" />
              </Button>
              <Button
                color="#F1F6FF"
                fontColor="#000"
                onClick={shareOnLinkedIn}
              >
                <RiLinkedinLine size="1.5rem" />
              </Button>
            </Box>
          </Grid>
        )}

        <Spacer space={60} />
        <Tabs responsive={false} bgColor="none" style={{ maxWidth: '100%' }}>
          <Box label="Referral List">
            <Box pad="40px 0 0">
              <Grid default="1fr 1fr max-content">
                <Box>
                  <Text bold size="1rem" color={Theme.PrimaryTextColor}>
                    Invited Students
                  </Text>
                  <Spacer space={10} />
                  <Text size="1rem" color={Theme.PrimaryTextColor}>
                    You can view the list of students that used your referral
                    code
                  </Text>
                </Box>
                <Box />
                <Box align="end">
                  <Input
                    block
                    placeholder="Search by name"
                    isLoading={false}
                    iconLeft="saf-search-normal-1"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setSearchText(e.target.value)
                    }
                  />
                </Box>
              </Grid>
              <Box>
                {isLoadingReferrals ? (
                  <>
                    <Spacer space={14} />
                    <Skeleton
                      count={1}
                      baseColor="#d0d5d933"
                      highlightColor="#c2cad133"
                      width="100%"
                      height="30rem"
                    />
                  </>
                ) : referrals?.items?.length ? (
                  <TableWrapper>
                    <Media query="(max-width: 480px)">
                      {(matches) => {
                        return matches ? (
                          <Table>
                            <table>
                              <thead>
                                <tr>
                                  <th>S/No</th>
                                  <th>User Details</th>

                                  <th>Questions Attempted</th>
                                  <th>Correct Answers</th>
                                </tr>
                              </thead>
                              <tbody>
                                {referrals?.items?.map((referral, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                      {referral.referredName} <br />
                                      {referral.referredEmail}
                                    </td>

                                    <td>
                                      {thousandFormatter(
                                        referral.questionCount ?? 0
                                      )}
                                    </td>
                                    <td>
                                      {thousandFormatter(
                                        referral.correctQuestionsCount ?? 0
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </Table>
                        ) : (
                          <Table>
                            <table>
                              <thead>
                                <tr>
                                  <th>S/No</th>
                                  <th>Name</th>
                                  <th>User ID</th>
                                  {/* <th>Status</th> */}
                                  <th>Questions Attempted</th>
                                  <th>Correct Answers</th>
                                </tr>
                              </thead>
                              <tbody>
                                {referrals?.items?.map((referral, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{referral.referredName}</td>
                                    <td>{referral.referredEmail}</td>
                                    {/* <td>{referral.used}</td> */}
                                    <td>
                                      {thousandFormatter(
                                        referral.questionCount ?? 0
                                      )}
                                    </td>
                                    <td>
                                      {thousandFormatter(
                                        referral.correctQuestionsCount ?? 0
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </Table>
                        );
                      }}
                    </Media>

                    <PaginationWrapper>
                      <FlexiPagination
                        pageCounts={pageOptions}
                        total={referrals?.count}
                        pageSize={limit}
                        onChange={(page: number) => {
                          setPage(page);
                          setOffset(page - 1);
                        }}
                        changePageSize={({ value }: { value: number }) => {
                          setLimit(value);
                        }}
                        current={page}
                        style={{ margin: '0' }}
                      />
                    </PaginationWrapper>
                  </TableWrapper>
                ) : (
                  <Box align="center">
                    <EmptyState
                      title="No referrals found"
                      info="It seems no one has registered using your referral code"
                      style={{ width: '100%' }}
                    />
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
          <Box label="Payment History">
            <PaymentHistory />
          </Box>
        </Tabs>
      </Box>

      <DistinctionReferralTerms
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
      />
      <ClaimReward
        openModal={openClaimReward}
        reload={() => {
          getReferralStats(userId);
        }}
        handleClose={handleClose}
      />
      <NinVerificationModal
        canUpdateNin={canUpdateNin}
        openVerificationModal={openNinVerification}
        onClose={closeNinVerification}
      />
    </Box>
  );
};

export default Referrals;

export const TableWrapper = styled(Box)`
  overflow-y: auto;
  margin-bottom: 5rem;
  @media ${devices.tablet} {
    margin-bottom: 0;
  }
`;
const LearnMoreButton = styled(Button)`
  height: 18px;
  &:hover {
    background-color: transparent;
  }
`;

export const SpinnerIcon = styled(FaSpinner)`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  animation: spin 1s linear infinite;
`;
