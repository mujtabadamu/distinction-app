import {
  useEffect,
  useState,
  useRef,
  FormEvent,
  KeyboardEvent,
  ChangeEvent,
} from 'react';
import { Box, Button } from '@flexisaf/flexibull2';
import {
  ChatBotContainer,
  ChatBotAside,
  ChatInterface,
  UserPrompt,
} from './styles';
import { ChatAvatar } from './components';
import Theme from '../../utils/theme';
import { useNavigate, useParams } from 'react-router-dom';
import useChatBot from './hooks/useChatBot';
import { useUserSlice } from 'pages/auth/userSlice';
import ContentViewer from 'components/content-viewer/content-viewer';
import useSubscriptionBilling from 'pages/profile/hooks/useSubscriptionBilling';
import useDisclosure from 'hooks/general/useDisclosure';
import PlanLimitBlock from 'pages/profile/subscription/PlanLimitBlock';
import SubscriptionPlansModal from 'pages/profile/subscription/SubscriptionPlansModal';
import FeatureTour from 'components/onboarding/FeatureTour';
import { Step } from 'react-joyride';
import useDataLayer from 'hooks/tagManager/useDataLayer';
import { formattedDate, formattedTime } from 'utils/helpers';
import useProfile from 'pages/profile/hooks/useProfile';
import ChatInput from './components/ChatInput';
import HistoryModal from './components/historyModal';
import { DistinctionFeatureProperty } from 'utils/constants';
import DeleteModal from 'components/deleteModal/DeleteModal';
import { IoSwapVerticalOutline } from 'react-icons/io5';
import useSinglePaperGet from 'hooks/papers/useSinglePaperGet';
import Skeleton from 'react-loading-skeleton';
import NewChatbotModal from './components/NewChatbotModal';

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

const Chatbot = () => {
  const [prompt, setPrompt] = useState<string>('');
  const { selectedCurriculum, selectedPaper, threadId } = useParams();
  const chatInterfaceRef = useRef<HTMLDivElement>(null);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [openNewChatBot, setOpenNewChatBot] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>('');
  const navigate = useNavigate();
  const user = useUserSlice();
  const nameInitials = user?.firstName?.slice(0, 1);
  const disablePrompt = !selectedCurriculum || !selectedPaper;
  const planLimitHandler = useDisclosure();
  const subscriptionPlanHandler = useDisclosure();
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const { paper, loading } = useSinglePaperGet({ id: selectedPaper });
  const { pushEvent } = useDataLayer();
  const { profileData } = useProfile();

  const {
    history,
    isLoadingHistory,
    getMessageLog,
    setMessageLog,
    messageLog,
    setBotResponse,
    handleStreamingChatResponse,
    setWelcomeMsg,
    deleteHistory,
    isDeletingHistory,
    getChatHistory,
    isLoadingMessageLog,
    setAnimateId,
    getWelcomeMessage,
    createNewThread,
    isLoadingWelcomeMessage,
    welcomeMsg,
  } = useChatBot();
  const { getFeatureLimit } = useSubscriptionBilling();
  const handleNewChat = () => {
    setAnimateId('');
    setMessageLog([]);
    setWelcomeMsg(null);
    setPrompt('');
    setBotResponse(null);
    setOpenNewChatBot(true);
    // Tracking: Chatbot Session Started
    pushEvent('trackChatbotSessionStarted', {
      userId: profileData?.studentId,
      date: formattedDate,
      time: formattedTime,
    });
  };

  const checkPlanLimits = async () => {
    const studyPalLimitPayload = {
      property: DistinctionFeatureProperty.STUDY_PAL,
    };
    const planLimitResult = await getFeatureLimit(studyPalLimitPayload);

    if (planLimitResult.success && Number(planLimitResult.balance) === 0) {
      planLimitHandler.onOpen();
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!prompt) return;
    // Tracking: Chatbot Question Asked
    pushEvent('trackChatbotQuestionAsked', {
      userId: profileData?.studentId,
      threadId: threadId || undefined,
      question: prompt,
      date: formattedDate,
      time: formattedTime,
    });

    const payload = {
      context: '',
      curriculum: selectedCurriculum,
      paperName: paper?.name,
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
            paperId: selectedPaper,
          },
          getChatHistory
        );

        // Immediately call handleStreamingChatResponse with the new threadId
        const newThreadId = result?.id;
        if (newThreadId) {
          await handleStreamingChatResponse(newThreadId, {
            ...payload,
            paperId: selectedPaper,
          });
          navigate(
            `/chatbot/${selectedCurriculum}/${selectedPaper}/${newThreadId}`
          );
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
    // Tracking: Chatbot Session Ended
    pushEvent('trackChatbotSessionEnded', {
      userId: profileData?.studentId,
      threadId: id,
      date: formattedDate,
      time: formattedTime,
    });
  };

  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  const onCloseDelete = () => {
    setDeleteId('');
    toggleDeleteModal();
  };

  const deleteHistoryCallback = () => {
    onCloseDelete();
    handleNewChat();
    getChatHistory();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageLog]);

  useEffect(() => {
    if (!threadId) return;
    if (messageLog.length === 0) {
      const payload = {
        threadId,
        limit: 100,
        order: false,
      };
      getMessageLog(payload);
    }
  }, [threadId]);

  useEffect(() => {
    if (paper?.id) {
      getWelcomeMessage(paper.id);
    }
  }, [openNewChatBot, paper?.id]);

  const handleCommonQuestionClick = (question: string) => {
    setPrompt(question);
  };

  return (
    <>
      <ChatBotContainer>
        <FeatureTour
          tourName="chatbot_tour"
          tourVersion="1.0"
          tourSteps={chatbotTourSteps}
        />

        <ChatBotAside>
          <Button
            block
            pale
            color="#2998EC14"
            fontColor={Theme.PrimaryBlue}
            onClick={() => setIsHistoryModalOpen(true)}
            style={{
              borderRadius: '8px',
              border: `1px solid ${Theme.SecondaryGrey}`,
              width: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <i className="saf-search-status" style={{ fontSize: '1.1rem' }} />
          </Button>
          <Button
            block
            pale
            color="#2998EC14"
            fontColor={Theme.PrimaryBlue}
            onClick={handleNewChat}
            data-tour="new-chat"
            style={{
              borderRadius: '8px',
              width: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#1D4ED8',
              color: '#FFF',
              border: `none`,
            }}
          >
            <i className="saf-message-add" style={{ fontSize: '1.1rem' }} />
          </Button>
        </ChatBotAside>
        <Box className="flex justify-between !mt-[-15px]">
          {isHistoryModalOpen && (
            <HistoryModal
              isOpen={isHistoryModalOpen}
              onClose={() => setIsHistoryModalOpen(false)}
              title="Chat history"
              isLoading={isLoadingHistory}
              historyItems={history || []}
              handleDelete={handleDelete}
              handleClick={() => {
                setMessageLog([]);
                setWelcomeMsg(null);
                setIsHistoryModalOpen(false);
              }}
            />
          )}
          <>
            {isLoadingMessageLog || loading ? (
              <Box className="w-full  h-[calc(100vh-300px)]  md:h-[calc(100vh-250px)]  !mt-[4rem] md:!mt-0 flex items-center justify-center bg-[#FAFAFA]">
                <div className="flex items-start gap-3 mb-2">
                  <Skeleton circle height={28} width={28} />
                  <div className="flex-1">
                    <Skeleton height={14} width="50%" borderRadius={6} />
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Skeleton circle height={28} width={28} />
                  <div className="flex-1 space-y-3 mb-6">
                    <Skeleton
                      height={18}
                      borderRadius={6}
                      width={'100%'}
                      className="mb-5"
                    />
                    <Skeleton
                      height={18}
                      borderRadius={6}
                      width={'100%'}
                      className="mb-5"
                    />
                    <Skeleton
                      height={18}
                      borderRadius={6}
                      width={'100%'}
                      className="mb-5"
                    />
                  </div>
                </div>
              </Box>
            ) : (
              <>
                {!messageLog.length ? (
                  <div className="w-full  h-[calc(100vh-300px)]  md:h-[calc(100vh-250px)]  !mt-[4rem] md:!mt-0 flex items-center justify-center bg-[#FAFAFA]">
                    <div className="w-full max-w-[800px] mx-auto flex flex-col items-center justify-center">
                      <h1
                        style={{ fontFamily: 'Segoe UI' }}
                        className="text-6xl text-[#2998EC] mb-2 font-bold text-center"
                      >
                        Here to help you
                      </h1>
                      <div
                        className="flex bg-[#fff] border px-3 py-2  border-gray-400 rounded-xl   md:flex-row  text-center gap-2 justify-center items-center mt-[1rem] mb-[3rem] cursor-pointer"
                        onClick={() => setOpenNewChatBot(true)}
                      >
                        <span className="inline-block text-[#6B6B6B] rounded-md font-bold text-[13px] px-4 py-1ss">
                          {selectedCurriculum} - {paper?.name}
                        </span>
                        <IoSwapVerticalOutline className="w-[20px] h-[20px]  text-[#2998EC]" />
                      </div>

                      <div className="flex text-center flex-col md:flex-row gap-2 mb-5 w-full justify-center">
                        {isLoadingWelcomeMessage
                          ? Array.from({ length: 3 }).map((_, idx) => (
                              <Skeleton
                                key={idx}
                                width={100}
                                height={30}
                                borderRadius={9999}
                                inline
                                className="mr-2"
                              />
                            ))
                          : welcomeMsg?.sampleQuestions
                              .slice(0, 3)
                              .map((q, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleCommonQuestionClick(q)}
                                  className="border border-[#CCCCCC] rounded-full px-4 py-2 text-[11px] text-[#202020] hover:bg-gray-100 transition"
                                >
                                  {q}
                                </button>
                              ))}
                      </div>

                      <div className="w-full">
                        <ChatInput
                          placeholder="Ask your study pal"
                          name="prompt"
                          block
                          disabled={!threadId && disablePrompt}
                          value={prompt}
                          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                            setPrompt(e.target.value)
                          }
                          onSubmit={handleSubmit}
                          onKeyDown={handleKeyDown}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <ChatInterface>
                      <div
                        className="response-section"
                        ref={chatInterfaceRef}
                        data-tour="response-section"
                      >
                        {messageLog
                          .filter(
                            (message) =>
                              message?.role?.trim() !== '' ||
                              message.prompt?.trim() !== ''
                          )
                          .map((message, idx) => (
                            <Box
                              key={message.id}
                              animate={idx === messageLog.length - 1}
                            >
                              {(message.role === 'prompt' &&
                                message.role.trim() !== '') ||
                                (message.prompt &&
                                  message.prompt.trim() !== '' && (
                                    <UserPrompt>
                                      <ChatAvatar
                                        avatarContent={nameInitials}
                                        icon="saf-edit"
                                        handleClick={() => {
                                          setPrompt(message.prompt || '');
                                        }}
                                      />
                                      <div className="question-text">
                                        {message.prompt}
                                      </div>
                                    </UserPrompt>
                                  ))}

                              <>
                                <div
                                  onScroll={scrollToBottom}
                                  className="mb-[1rem] md:mb-[1rem]"
                                >
                                  <ContentViewer
                                    botResponse={message.response ?? ''}
                                  />
                                </div>
                              </>
                            </Box>
                          ))}
                      </div>
                      <div className="prompt-section">
                        <div className="form-content">
                          <ChatInput
                            placeholder="Type your question here"
                            name="prompt"
                            block
                            disabled={!threadId && disablePrompt}
                            value={prompt}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                              setPrompt(e.target.value)
                            }
                            onSubmit={handleSubmit}
                            onKeyDown={handleKeyDown}
                            data-tour="chat-input"
                          />
                        </div>
                      </div>
                    </ChatInterface>
                  </>
                )}
              </>
            )}
          </>
        </Box>
        <DeleteModal
          isOpen={deleteModal}
          onClose={onCloseDelete}
          title="Delete history"
          description="This action will delete the chat"
          isLoading={isDeletingHistory}
          onDelete={() => deleteHistory(deleteId, deleteHistoryCallback)}
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

        <NewChatbotModal
          onClose={() => setOpenNewChatBot(false)}
          open={openNewChatBot}
        />
      </ChatBotContainer>
    </>
  );
};

export default Chatbot;
