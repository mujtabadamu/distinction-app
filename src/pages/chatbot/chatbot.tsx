import {
  useEffect,
  useState,
  useRef,
  FormEvent,
  KeyboardEvent,
  ChangeEvent,
} from 'react';
import {
  Box,
  Button,
  Text,
  Spacer,
  Grid,
  Select,
  TextArea,
  Loader,
} from '@flexisaf/flexibull2';
import {
  ChatBotContainer,
  ChatBotAside,
  HistorySection,
  ChatInterface,
  ChatMobileMenu,
  UserPrompt,
} from './styles';
import {
  HistoryList,
  ChatAvatar,
  BotResponse,
  PulsatingLoadingDots,
} from './components';
import Theme from '../../utils/theme';
import { GoHistory } from 'react-icons/go';
import { PiTelegramLogoLight } from 'react-icons/pi';
import { FaSearchPlus } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import useChatBot from './hooks/useChatBot';
import usePapersGet from '../../hooks/papers/usePapersGet';
import { AsyncSelectComponent } from '../../components/custom/AsyncSelect';
import { curriculums, DistinctionFeatureProperty } from '../../utils/constants';
import DeleteModal from 'components/deleteModal/DeleteModal';
// import { useUserSlice } from 'pages/auth/userSlice';
import ContentViewer from 'components/content-viewer/content-viewer';
import ChatSidebar from './components/ChatSidebar';
import useSubscriptionBilling from 'pages/profile/hooks/useSubscriptionBilling';
import useDisclosure from 'hooks/general/useDisclosure';
import PlanLimitBlock from 'pages/profile/subscription/PlanLimitBlock';
import SubscriptionPlansModal from 'pages/profile/subscription/SubscriptionPlansModal';
import FeatureTour from 'components/onboarding/FeatureTour';
import { Step } from 'react-joyride';
import { useAuthSlice } from 'pages/auth/authSlice';

const Chatbot = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [selectedCurriculum, setSelectedCurriculum] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [selectedPaper, setSelectedPaper] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const chatInterfaceRef = useRef<HTMLDivElement>(null);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>('');
  const navigate = useNavigate();
  const { user } = useAuthSlice();

  const nameInitials = user?.user?.firstName?.slice(0, 1);
  const disablePrompt = !selectedCurriculum || !selectedPaper;
  const { threadId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const planLimitHandler = useDisclosure();
  const subscriptionPlanHandler = useDisclosure();
  const [showTour, setShowTour] = useState(false);

  // Chatbot tour steps
  const chatbotTourSteps: Step[] = [
    {
      target: 'body',
      content:
        "Welcome to Study Pal! Your AI learning assistant. Let's explore how to get the most out of your study sessions.",
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '[data-tour="new-chat"]',
      content:
        'Start a new conversation by clicking "New Chat". This clears the current session and begins fresh.',
      placement: 'bottom',
    },
    {
      target: '[data-tour="select-curriculum"]',
      content:
        'First, select your curriculum to narrow down the available courses and subjects.',
      placement: 'bottom',
    },
    {
      target: '[data-tour="select-course"]',
      content:
        'Then choose your specific course. This helps the AI provide more relevant and accurate responses.',
      placement: 'bottom',
    },
    {
      target: '[data-tour="chat-input"]',
      content:
        'Type your questions here! Ask anything about your course material, request explanations, or get help with difficult concepts.',
      placement: 'top',
    },
    {
      target: '[data-tour="chat-history"]',
      content:
        'Access your previous conversations here. You can review past discussions and continue where you left off.',
      placement: 'right',
    },
    {
      target: '[data-tour="response-section"]',
      content:
        'Your AI responses will appear here. The assistant will provide detailed explanations, examples, and help you understand complex topics.',
      placement: 'top',
    },
  ];

  const {
    papers,
    loadingPapers,
    increaseSize,
    searchText,
    setSearchText,
    // fetchPapers,
  } = usePapersGet({ curriculum: selectedCurriculum?.value });

  const {
    history,
    isLoadingHistory,
    // getMessageLog,
    setMessageLog,
    messageLog,
    isLoadingBotResponse,
    setBotResponse,
    handleStreamingChatResponse,
    setWelcomeMsg,
    deleteHistory,
    isDeletingHistory,
    // getChatHistory,
    setAnimateId,
    // getWelcomeMessage,
    createNewThread,
  } = useChatBot({ threadId: threadId || '' });

  const {
    getFeatureLimit,
    featureLimitData,
    loadingFeatureLimit,
    isSuccessFeatureLimit,
  } = useSubscriptionBilling();
  const handleNewChat = () => {
    setAnimateId('');
    // setChatId('');
    setMessageLog([]);
    setWelcomeMsg(null);
    setPrompt('');
    setSelectedCurriculum(null);
    setSelectedPaper(null);
    setBotResponse(null);
    navigate('/chatbot');
  };

  const checkPlanLimits = async () => {
    const studyPalLimitPayload = {
      property: DistinctionFeatureProperty.STUDY_PAL,
    };
    await getFeatureLimit(studyPalLimitPayload);

    if (isSuccessFeatureLimit && Number(featureLimitData?.balance) === 0) {
      planLimitHandler.onOpen();
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!prompt) return;

    const payload = {
      context: '',
      curriculum: selectedCurriculum?.label,
      paperName: selectedPaper?.label,
      prompt,
      topics: '',
      useCase: 'CHATBOT_RESPONSE' as
        | 'QUESTION_GENERATION'
        | 'FLASHCARD_GENERATION'
        | 'KEYPOINT_GENERATION'
        | 'WELCOME_MESSAGE'
        | 'TITLE_GEN'
        | 'CHATBOT_RESPONSE',
    };

    const tempMessageLog = {
      id: crypto.randomUUID(),
      role: 'user',
      prompt,
    };

    setMessageLog([...messageLog, tempMessageLog]);

    if (!threadId) {
      const planLimitValid = await checkPlanLimits();
      if (planLimitValid) {
        // Create new thread
        const result = await createNewThread(
          {
            ...payload,
            paperId: selectedPaper?.value,
          }
          // getChatHistory
        );

        // Immediately call handleStreamingChatResponse with the new threadId
        const newThreadId = result?.id;
        if (newThreadId) {
          await handleStreamingChatResponse(newThreadId, {
            ...payload,
            paperId: selectedPaper?.value,
          });
          navigate(`/chatbot/${newThreadId}`);
        }
      }
    } else {
      const planLimitValid = await checkPlanLimits();

      if (planLimitValid) {
        handleStreamingChatResponse(threadId, payload);
      }
    }

    setPrompt('');
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  const scrollToBottom = () => {
    if (chatInterfaceRef.current) {
      chatInterfaceRef.current.scrollTop =
        chatInterfaceRef.current.scrollHeight;
    }
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    toggleDeleteModal();
  };

  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  const onCloseDelete = () => {
    setDeleteId('');
    toggleDeleteModal();
    setIsSidebarOpen(false);
  };

  const deleteHistoryCallback = () => {
    onCloseDelete();
    handleNewChat();
    // getChatHistory();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageLog]);

  // useEffect(() => {
  //   if (selectedCurriculum) {
  //     fetchPapers();
  //   }
  // }, [selectedCurriculum?.value]);

  // Check if tour should be shown
  useEffect(() => {
    const progress = sessionStorage.getItem('chatbot_onboarding');
    if (!progress) {
      setShowTour(true);
    } else {
      try {
        const parsed = JSON.parse(progress);
        if (
          !parsed ||
          parsed.tourVersion !== '1.0' ||
          parsed.lastCompletedStep < chatbotTourSteps.length - 1
        ) {
          setShowTour(true);
        }
      } catch (e) {
        setShowTour(true);
      }
    }
  }, []);

  const handleTourComplete = () => {
    setShowTour(false);
  };

  return (
    <ChatBotContainer>
      <FeatureTour
        tourKey="chatbot"
        tourVersion="1.0"
        steps={chatbotTourSteps}
        run={showTour}
        onComplete={handleTourComplete}
      />

      <ChatBotAside>
        <Button
          block
          color="#2998EC14"
          fontColor={Theme.PrimaryBlue}
          iconLeft={<i className="saf-message-add" />}
          onClick={handleNewChat}
          data-tour="new-chat"
        >
          New Chat
        </Button>
        <HistorySection data-tour="chat-history">
          <div className="title">
            <GoHistory />
            <Text>History</Text>
          </div>
          {isLoadingHistory ? (
            <Box
              display="flex"
              style={{ alignItems: 'center', minHeight: '60dvh' }}
            >
              <Loader section={true} size={40} color={Theme.PrimaryColor} />
            </Box>
          ) : (
            <>
              {history && (
                <HistoryList
                  historyItems={history}
                  handleDelete={handleDelete}
                  handleClick={() => {
                    setMessageLog([]);
                    setWelcomeMsg(null);
                  }}
                />
              )}
            </>
          )}
        </HistorySection>
      </ChatBotAside>
      <ChatInterface>
        <ChatMobileMenu>
          <Button
            color="#FFF"
            fontColor={Theme.PrimaryBlue}
            iconLeft={<i className="saf-message-add" />}
            onClick={handleNewChat}
          >
            New Chat
          </Button>

          <Button
            color="#FFF"
            fontColor={Theme.PrimaryBlue}
            iconLeft={<GoHistory />}
            onClick={() => setIsSidebarOpen(true)}
          >
            History
          </Button>
        </ChatMobileMenu>
        {!messageLog.length && (
          <>
            <h1>Hi, {user?.user?.firstName}</h1>
            <p>What would you love to learn today?</p>
            <Spacer space="20px" />

            <Grid default="1fr 1fr 1fr" md="1fr" gap="20px">
              <Select
                label="Curriculum"
                placeholder="Select curriculum"
                required
                block
                options={curriculums?.map((item) => {
                  return {
                    label: item.label,
                    value: item.value,
                  };
                })}
                value={selectedCurriculum}
                onChange={(value: { label: string; value: string }) => {
                  setSelectedCurriculum({
                    label: value.label,
                    value: value.value,
                  });
                }}
                data-tour="select-curriculum"
              />

              <AsyncSelectComponent
                placeholder="Select course"
                value={selectedPaper}
                onLoadMore={increaseSize}
                onChange={(value) => {
                  if (value && value.label && value.value) {
                    const paper = papers?.items?.find(
                      (paper) => paper.id === value.value
                    );
                    if (paper) {
                      setSelectedPaper({
                        label: value.label,
                        value: value.value,
                        ...paper,
                      });
                    }
                  }
                }}
                searchQuery={searchText}
                setSearchQuery={setSearchText}
                loading={loadingPapers}
                options={
                  (selectedCurriculum &&
                    papers?.items?.map((v) => ({
                      label: `${v?.name} (${v.exam.name.trim()})`,
                      value: v?.id,
                    }))) ??
                  []
                }
                data-tour="select-course"
              />

              <Box />
            </Grid>
          </>
        )}
        <div
          className="response-section"
          ref={chatInterfaceRef}
          data-tour="response-section"
        >
          {messageLog &&
            messageLog
              .filter(
                (message) =>
                  message?.role?.trim() !== '' || message.prompt?.trim() !== ''
              )
              .map((message) => (
                <Box key={message.id}>
                  {(message.role === 'prompt' && message.role.trim() !== '') ||
                    (message.prompt && message.prompt.trim() !== '' && (
                      <UserPrompt>
                        <ChatAvatar
                          avatarContent={nameInitials}
                          icon="saf-edit"
                          handleClick={() => {
                            setPrompt(message.prompt || '');
                          }}
                        />
                        <div className="question-text">{message.prompt}</div>
                      </UserPrompt>
                    ))}

                  <>
                    {message?.response && message?.response?.length > 0 ? (
                      <ChatAvatar
                        avatarContent={<FaSearchPlus size="0.9rem" />}
                        backgroundColor="#ffb323"
                      />
                    ) : null}

                    <div onScroll={scrollToBottom} className=" mb-9">
                      <ContentViewer botResponse={message.response ?? ''} />
                    </div>
                  </>
                </Box>
              ))}
          {isLoadingBotResponse ||
            (loadingFeatureLimit && (
              <BotResponse>
                <ChatAvatar
                  avatarContent={<FaSearchPlus size="0.9rem" />}
                  backgroundColor="#ffb323"
                />
                <div className="response-text">
                  <PulsatingLoadingDots />
                </div>
              </BotResponse>
            ))}
        </div>
        <div className="prompt-section">
          <div className="form-content">
            <form onSubmit={handleSubmit} className="prompt-input">
              <TextArea
                placeholder="Type your question here"
                name="prompt"
                block
                disabled={!threadId && disablePrompt}
                value={prompt}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setPrompt(e.target.value)
                }
                onKeyDown={handleKeyDown}
                data-tour="chat-input"
              />
              <button>
                <PiTelegramLogoLight size="1.5rem" />
              </button>
            </form>
          </div>
        </div>
      </ChatInterface>
      <DeleteModal
        isOpen={deleteModal}
        onClose={onCloseDelete}
        title="Delete history"
        description="This action will delete the chat"
        isLoading={isDeletingHistory}
        onDelete={() => deleteHistory(deleteId, deleteHistoryCallback)}
      />
      <ChatSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        historyItems={history || []}
        handleDelete={handleDelete}
        handleClick={() => {
          setMessageLog([]);
          setWelcomeMsg(null);
        }}
      />

      <PlanLimitBlock
        isOpen={planLimitHandler.isOpen}
        closeModal={planLimitHandler.onClose}
        feature={DistinctionFeatureProperty.STUDY_PAL}
        togglePlansModal={() => {
          planLimitHandler.onClose();
          subscriptionPlanHandler.onOpen();
        }}
      />
      <SubscriptionPlansModal
        onClose={subscriptionPlanHandler.onClose}
        openModal={subscriptionPlanHandler.isOpen}
      />
    </ChatBotContainer>
  );
};

export default Chatbot;
