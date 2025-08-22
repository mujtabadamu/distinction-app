import {
  Box,
  Text,
  Spacer,
  Button,
  Grid,
  PageTitle,
  Table,
  FlexiPagination,
} from '@flexisaf/flexibull2';
import {
  ContentWrapper,
  PlanHeader,
  PlanTitle,
  ActiveBadge,
  PriceSection,
  Price,
  DateInfo,
  FeaturesList,
  FeatureItem,
} from './styles';
import useProfile from 'pages/profile/hooks/useProfile';
import SectionLoader from 'components/custom/sectionLoader';
import EmptyState from 'components/emptyState/emptyState';
import FolderIcon from 'assets/images/folder.svg';
import NinVerificationModal from './components/NinVerificationModal';
import { useEffect, useState } from 'react';
import InfoBanner from 'components/infoBanner/InfoBanner';
import { IoCheckmark } from 'react-icons/io5';
import { CiCreditCard1 } from 'react-icons/ci';
import { FaListAlt } from 'react-icons/fa';
import {
  TabButton,
  TabContainer,
  TabPanel,
} from 'pages/learnerDashboard/dashboardTab';
import usePaginationWrapper from 'hooks/general/usePaginationWrapper';
import SubscriptionPlansModal from './subscription/SubscriptionPlansModal';
import useSubscriptionBilling from './hooks/useSubscriptionBilling';
import { capitalizeFirstLetter, thousandFormatter } from 'utils/helpers';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';
import { useLocation } from 'react-router-dom';
// import { TableWrapper } from 'pages/referrals';
import { PLAN_FEATURES } from './subscription/billingPlans';
import useDisclosure from 'hooks/general/useDisclosure';
import DeleteModal from 'components/deleteModal/DeleteModal';
import ProfileHeaderSection from './components/profileHeaderSection';
import { NiNWrapper } from './style';
import useQuizathon from 'pages/quizathon/hooks/useQuizathon';
import { getLevelOptionsByCurriculum } from 'utils/constants';
import { useAuthSlice } from 'pages/auth/authSlice';

type ViewType = 'plan' | 'history';

const Profile = () => {
  const { user } = useAuthSlice();
  const [activeView, setActiveView] = useState<ViewType>('plan');
  const ninVerificationHandler = useDisclosure();
  const subscriptionPlansHandler = useDisclosure();
  const subscriptionCancelHandler = useDisclosure();

  const { profileData, isLoadingProfile } = useProfile();
  const { schoolList, getSchoolList } = useQuizathon({
    studentId: user?.user?.id || undefined,
  });
  const location = useLocation();
  const {
    // getActivePlan,
    loadingActivePlan,
    activePlan,
    getSubscriptionHistory,
    subscriptionHistory,
    loadingHistory,
    cancelSubscription,
    isCancellingSubscription,
  } = useSubscriptionBilling();

  const { limit, setLimit, page, setPage, pageOptions } = usePaginationWrapper(
    {}
  );

  const missingFields: Record<string, string> = {};

  // Level validation using curriculum-based options
  let isLevelValid = false;
  const schoolInfo = profileData?.schoolInformationView;
  if (schoolInfo && schoolInfo.level && schoolList?.items) {
    const institutionId = schoolInfo.school?.id;
    const selectedInstitution = schoolList.items.find(
      (s) => s.id === institutionId
    );
    const institutionCurriculum = selectedInstitution?.curriculum;
    const levelOptions = getLevelOptionsByCurriculum(
      institutionCurriculum || ''
    );
    isLevelValid = levelOptions.some((opt) => opt.value === schoolInfo.level);
  }
  if (!schoolInfo || !schoolInfo.level || !isLevelValid) {
    missingFields.level = 'Level';
  }
  if (!profileData?.firstName) missingFields.firstName = 'First Name';
  if (!profileData?.lastName) missingFields.lastName = 'Last Name';
  if (!profileData?.email) missingFields.email = 'Email';
  if (!profileData?.dateOfBirth) missingFields.dateOfBirth = 'Date of Birth';
  if (!profileData?.gender) missingFields.gender = 'Gender';
  if (!profileData?.phoneNumber) missingFields.phoneNumber = 'Phone Number';
  if (!schoolInfo || !schoolInfo.school?.name)
    missingFields.schoolName = 'School Name';
  if (!schoolInfo || !schoolInfo.department?.name)
    missingFields.departmentName = 'Department';
  if (!profileData?.stateOfOrigin)
    missingFields.stateOfOrigin = 'State of Origin';
  if (!schoolInfo || !schoolInfo.matriculationNumber)
    missingFields.matriculationNumber = 'Matriculation Number';

  const profileComplete = Object.keys(missingFields).length === 0;

  const canUpdateNin =
    !!profileData?.firstName &&
    !!profileData?.lastName &&
    !!profileData?.email &&
    !!profileData?.gender &&
    !!profileData?.phoneNumber &&
    !!schoolInfo &&
    !!schoolInfo.school?.name &&
    !!schoolInfo.department?.name &&
    !!schoolInfo.level &&
    isLevelValid &&
    !!profileData?.stateOfOrigin &&
    !!schoolInfo.matriculationNumber;

  const toggleView = (value: ViewType) => {
    setActiveView(value);
    setPage(1);
  };

  const handleReload = () => {
    subscriptionCancelHandler.onClose();
    // getActivePlan();
  };

  useEffect(() => {
    if (activeView === 'plan') {
      // getActivePlan();
    } else {
      const payload = {
        page: page - 1,
        size: limit,
      };
      getSubscriptionHistory(payload);
    }
  }, [page, limit, activeView]);

  useEffect(() => {
    getSchoolList();
  }, []);

  let features = activePlan?.subscriptionPackage?.propertyPlan
    ?.map((prop) => {
      if (prop.value === '0' || prop.value === null) return null;

      let text;
      switch (prop.name) {
        case 'KEYPOINTS':
          text = `Generate up to ${
            prop.value
          } keypoints/${prop?.durationType?.toLowerCase()}`;
          break;
        case 'FLASHCARD':
          text = `Generate up to ${
            prop.value
          } flashcards/${prop?.durationType?.toLowerCase()}`;
          break;
        case 'STUDY_PAL':
          text = `Use study pal to generate ${
            prop.value
          } prompts/${prop?.durationType?.toLowerCase()}`;
          break;
        case 'PRACTICE_QUESTIONS':
          text = `Practice ${
            prop.value
          } questions/${prop?.durationType?.toLowerCase()}`;
          break;
        case 'QUIZATON_CERTIFICATE':
          text = `Certificate generation for ₦${prop.value}`;
          break;

        default:
          text = `${prop.name}: ${
            prop.value
          } per ${prop?.durationType?.toLowerCase()}`;
      }

      return {
        text,
      };
    })
    .filter((feature): feature is { text: string } => feature !== null);

  const planCode = activePlan?.subscriptionPackage?.code;

  if (planCode === 'PREMIUM_PLAN') {
    features = PLAN_FEATURES.PREMIUM_PLAN;
  } else {
    features?.push(...PLAN_FEATURES[planCode as keyof typeof PLAN_FEATURES]);
  }

  const scrollToTab = (tabId: string, offset = 150) => {
    const element = document.getElementById(tabId);
    if (element) {
      const top = element.offsetTop - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };
  useEffect(() => {
    if (location?.state?.tab) {
      const tabId = location.state.tab;

      setTimeout(() => {
        scrollToTab(tabId);
      }, 300);
    }
  }, [location.state, activePlan]);

  if (isLoadingProfile) return <SectionLoader />;
  return (
    <>
      <PageTitle>Profile</PageTitle>
      <Box pad="1rem">
        {!isLoadingProfile && !profileComplete && (
          <InfoBanner
            bgColor="#E7E7FF"
            infoTitle="Update Profile"
            infoText={
              <>
                <Box>
                  The following field(s) need to be updated:
                  <span className="">
                    {Object.values(missingFields).map(
                      (fieldName, index, array) => (
                        <span key={index}>
                          <Text size="0.9rem" bold>
                            {' '}
                            "{fieldName}
                            {index < array.length - 1 ? ',' : '". '}
                          </Text>
                        </span>
                      )
                    )}
                  </span>
                  <Text>
                    Update your profile by clicking the{' '}
                    <Text bold size="1rem">
                      "Edit Profile"
                    </Text>{' '}
                    button below.
                  </Text>
                </Box>
              </>
            }
            icon="saf-information"
          />
        )}
        {!isLoadingProfile &&
          profileComplete &&
          !profileData?.isNinVerified && (
            <InfoBanner
              bgColor="#E7E7FF"
              infoTitle="NIN Verification"
              infoText={
                <>
                  <NiNWrapper>
                    <Box>
                      Kindly update your profile by clicking on the
                      <Text bold size="1rem">
                        "Verify"
                      </Text>
                      button.
                    </Box>
                    <Button
                      className="nin_button"
                      onClick={ninVerificationHandler.toggle}
                    >
                      Verify NIN
                    </Button>
                  </NiNWrapper>
                </>
              }
              icon="saf-information"
            />
          )}
        <Spacer space="20px" />

        <ProfileHeaderSection
          activePlan={activePlan}
          profileData={profileData}
          showEditButton
          showShareButton
          username={profileData?.username}
          isLoading={isLoadingProfile}
        />
        <Spacer space="20px" />
        <TabContainer>
          <TabButton
            active={activeView === 'plan'}
            onClick={() => toggleView('plan')}
          >
            <CiCreditCard1 size={16} style={{ marginRight: '5px' }} /> Current
            Plan
          </TabButton>
          <TabButton
            active={activeView === 'history'}
            onClick={() => toggleView('history')}
          >
            {' '}
            <FaListAlt size={16} style={{ marginRight: '5px' }} />
            Billing history
          </TabButton>
        </TabContainer>
        <Spacer space="20px" />
        <ContentWrapper>
          <TabPanel active={activeView === 'plan'}>
            <Box id="subscription" label="plan">
              {loadingActivePlan ? (
                <Skeleton height={350} />
              ) : (
                <>
                  <PlanHeader>
                    <PlanTitle>
                      <h2>{activePlan?.subscriptionPackage?.name}</h2>
                      <p>Current Plan</p>
                    </PlanTitle>
                    <ActiveBadge>Active</ActiveBadge>
                  </PlanHeader>
                  <Grid default="auto auto" gap="1.5rem">
                    <Box>
                      <PriceSection>
                        <Price>
                          ₦
                          {thousandFormatter(
                            activePlan?.subscriptionPackage?.packagePlan?.find(
                              (plan) =>
                                plan.plan?.type?.toUpperCase() ===
                                activePlan?.planType?.toUpperCase()
                            )?.plan?.price || 0
                          )}
                          <span>
                            /per{' '}
                            {activePlan?.planType?.toLowerCase() === 'yearly'
                              ? 'year'
                              : 'month'}
                          </span>
                        </Price>

                        <h3 className="font-semibold text-gray-600 uppercase mb-3">
                          Available Features
                        </h3>

                        <FeaturesList>
                          {features?.map((feature, index) => (
                            <FeatureItem key={index}>
                              <IoCheckmark size={14} color="blue" />
                              <span>
                                {capitalizeFirstLetter(feature.text ?? '')}
                              </span>
                            </FeatureItem>
                          ))}
                        </FeaturesList>
                      </PriceSection>
                    </Box>
                    <Box
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        maxHeight: '370px',
                        marginBottom: '60px',
                      }}
                    >
                      <DateInfo>
                        <p>
                          Start date:{' '}
                          {moment(activePlan?.startAt).format('Do MMM, YYYY')}
                        </p>
                        <p>
                          Next billing date:{' '}
                          {moment(activePlan?.endAt).format('Do MMM, YYYY')}
                        </p>
                      </DateInfo>

                      <Box
                        display="flex"
                        style={{ justifyContent: 'space-between' }}
                      >
                        <Button pale onClick={subscriptionPlansHandler.onOpen}>
                          Change Plan
                        </Button>
                        {activePlan?.subscriptionPackage?.code !==
                          'BASIC_PLAN' && (
                          <Button
                            pale
                            color="red"
                            fontColor="red"
                            onClick={subscriptionCancelHandler.onOpen}
                          >
                            Cancel Subscription
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                </>
              )}
            </Box>
          </TabPanel>
          <TabPanel active={activeView === 'history'}>
            <Box label="history">
              <Box>
                {loadingHistory ? (
                  <Skeleton height={350} />
                ) : (
                  <>
                    {subscriptionHistory?.items &&
                    subscriptionHistory?.items?.length > 0 ? (
                      <>
                        <Table>
                          <table>
                            <thead>
                              <tr>
                                <th>Subscription Date</th>
                                <th>Description</th>
                                <th>Amount</th>
                              </tr>
                            </thead>
                            {subscriptionHistory?.items?.map((item) => (
                              <tbody>
                                <tr key={item.id}>
                                  <td>
                                    <Text>
                                      {`${moment(item.createdAt).format(
                                        'Do MMM YYYY'
                                      )} - ${moment(item.endAt).format(
                                        'Do MMM YYYY'
                                      )}`}
                                    </Text>
                                  </td>

                                  <td>
                                    <Text>{`${
                                      item.subscriptionPackage?.name ??
                                      'Basic Plan'
                                    } - ${capitalizeFirstLetter(
                                      item.planType ?? ''
                                    )}`}</Text>
                                  </td>
                                  <td>
                                    <Text>
                                      ₦{thousandFormatter(item.price ?? 0)}
                                    </Text>
                                  </td>
                                </tr>
                              </tbody>
                            ))}
                          </table>
                        </Table>
                        <FlexiPagination
                          pageCounts={pageOptions}
                          total={subscriptionHistory.count}
                          pageSize={limit}
                          onChange={(page: number) => {
                            setPage(page);
                          }}
                          changePageSize={({ value }: { value: number }) => {
                            setLimit(value);
                          }}
                          current={page}
                          style={{ margin: '0' }}
                        />
                      </>
                    ) : (
                      <EmptyState
                        image={<img src={FolderIcon} alt="folder_icon" />}
                        title="No billing history Available"
                        description={`Your billing records will appear here once you make any payments or subscription changes`}
                      />
                    )}
                  </>
                )}
              </Box>
            </Box>
          </TabPanel>
        </ContentWrapper>
        <NinVerificationModal
          openVerificationModal={ninVerificationHandler.isOpen}
          onClose={ninVerificationHandler.onClose}
          canUpdateNin={canUpdateNin}
        />
        <SubscriptionPlansModal
          openModal={subscriptionPlansHandler.isOpen}
          onClose={subscriptionPlansHandler.onClose}
        />
        <DeleteModal
          isOpen={subscriptionCancelHandler.isOpen}
          onClose={subscriptionCancelHandler.onClose}
          title="Subscription Cancellation"
          description="Your current plan will remain active until the end of your billing period. After that, your account will automatically switch to the free plan with limited features. You won't be charged for any renewal."
          isLoading={isCancellingSubscription}
          onDelete={() => cancelSubscription(handleReload)}
          deleteText="Confirm"
        />
      </Box>
    </>
  );
};

export default Profile;
