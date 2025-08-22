import { useState, useEffect } from 'react';
import { apiWrapper, checkAndRefreshToken } from 'utils/http-client';
import {
  ChatRequest,
  NewThreadRequest,
  Session,
  Thread,
  ThreadDto,
  WelcomeMessageDto,
} from 'generated/index';
import { handleError } from 'utils/errorHandlers';
import urls from 'utils/config';
import {
  useEnhancedGetMessages1Query,
  // useEnhancedGetWelcomeMessage1Query,
  useEnhancedNewThreadMutation,
  useEnhancedGetThreadsQuery,
  useEnhancedDeleteThread1Mutation,
} from '../../../store/enhancedApi';

type GetMessagePayload = {
  threadId: string;
  limit?: number;
  order?: boolean;
};
interface chatProps extends Session {
  role?: string;
}
const useChatBot = ({ threadId }: { threadId: string }) => {
  // const [history, setHistory] = useState<Thread[] | null>(null);
  // const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false);
  // const [isLoadingNewThread, setIsLoadingNewThread] = useState<boolean>(false);
  const [isLoadingWelcomeMessage, setIsLoadingWelcomeMessage] =
    useState<boolean>(false);
  const [welcomeMsg, setWelcomeMsg] = useState<WelcomeMessageDto | null>(null);
  const [messageLog, setMessageLog] = useState<chatProps[]>([]);
  const [isLoadingMessageLog, setIsLoadingMessageLog] =
    useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const [currentStreamId, setCurrentStreamId] = useState<string | null>(null);

  const [context, setContext] = useState<string>('');
  const [newthread, setNewthread] = useState<ThreadDto | null>(null);
  const [botResponse, setBotResponse] = useState<string | null>(null);
  // const [isDeletingHistory, setIsDeletingHistory] = useState<boolean>(false);
  const [animateId, setAnimateId] = useState<string | undefined>('');

  const BASEURL = urls.API_BASE_URL;

  // RTK Query hooks
  const [
    newThreadMutation,
    { isLoading: isLoadingNewThread, isSuccess: isSuccessNewThread },
  ] = useEnhancedNewThreadMutation();
  const [deleteThreadMutation, { isLoading: isDeletingHistory }] =
    useEnhancedDeleteThread1Mutation();

  // Query hooks - these will be used by components that need the data
  const {
    data: messagesData,
    isLoading: isLoadingMessages,
    isSuccess: isSuccessMessages,
  } = useEnhancedGetMessages1Query(
    { threadId, limit: 20, order: true },
    { skip: true }
  );

  useEffect(() => {
    if (isSuccessMessages) {
      setMessageLog(messagesData);
    }
  }, [isSuccessMessages]);
  // const { data: welcomeMessageData, isLoading: isLoadingWelcomeMessage } = useEnhancedGetWelcomeMessage1Query(
  //   { paperName: '' },
  //   { skip: true }
  // );

  const {
    data: history,
    isLoading: isLoadingHistory,
    isSuccess: isSuccessHistory,
  } = useEnhancedGetThreadsQuery();

  const createNewThread = async (
    requestBody: NewThreadRequest,
    cb?: () => void
  ) => {
    try {
      const data = await newThreadMutation({
        newThreadRequest: requestBody,
      }).unwrap();

      if (cb) cb();
      return data;
    } catch (error) {
      handleError(error);
    }
  };

  const deleteHistory = async (threadId: string, callback: () => void) => {
    try {
      await deleteThreadMutation({ threadId }).unwrap();
      callback();
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (!botResponse) return;

    // Check if we're in streaming mode
    if (isStreaming && currentStreamId) {
      // Update the existing message
      setMessageLog((prevLog) => {
        const updatedLog = [...prevLog];
        const messageIndex = updatedLog.findIndex(
          (msg) => msg.id === currentStreamId
        );

        if (messageIndex !== -1) {
          // Update the existing message
          updatedLog[messageIndex] = {
            ...updatedLog[messageIndex],
            response: botResponse,
            // updatedAt: new Date().toISOString(),
          };
        }

        return updatedLog;
      });
    } else {
      // If not streaming or no currentStreamId, create a new message
      const newStreamId = Date.now().toString();
      setCurrentStreamId(newStreamId);
      setIsStreaming(true);

      const tempHistory: chatProps = {
        id: newStreamId,
        role: 'assistant',
        response: botResponse,
        context: context,
        createdAt: new Date().toISOString(),
      };

      setMessageLog((prevLog) => [...prevLog, tempHistory]);
    }

    // Don't reset botResponse here since we're handling streaming
  }, [botResponse]);

  const handleStreamingChatResponse = async (
    threadId: string,
    data: ChatRequest
  ) => {
    const token = await checkAndRefreshToken();

    try {
      const placeholderId = Date.now().toString();
      setCurrentStreamId(placeholderId);
      setIsStreaming(true);

      setMessageLog((prevLog) => {
        if (prevLog.length === 0) return prevLog;

        return [
          ...prevLog,
          {
            id: placeholderId,
            role: 'assistant',
            response: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            context: context,
          },
        ];
      });
      const payloadWithContext = {
        ...data,
        context: context,
      };

      const response = await fetch(
        `${BASEURL}/assistant/thread/${threadId}/chat-stream`,
        {
          method: 'POST',
          headers: {
            accept: '/',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payloadWithContext),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch response from server');
      }

      // Ensure response.body is defined
      if (!response.body) {
        throw new Error('Response body is undefined');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      while (response.ok) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        fullResponse += chunk;

        // Check if the response contains a JSON object at the end
        const jsonStartIndex = fullResponse.lastIndexOf('{');
        if (jsonStartIndex !== -1) {
          try {
            const jsonString = fullResponse.slice(jsonStartIndex);
            const context = JSON.parse(jsonString);
            setContext(context.context);
            break; // Exit loop when valid JSON is parsed
          } catch (error) {
            // JSON parsing failed, continue streaming
            setBotResponse(fullResponse);
          }
        } else {
          setBotResponse(fullResponse);
        }
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    } finally {
      setIsStreaming(false);
      setCurrentStreamId(null);
      setBotResponse(null);
    }
  };
  return {
    history,
    // setHistory,
    // getChatHistory,
    isLoadingHistory,
    isLoadingBotResponse: isStreaming,
    isLoadingMessageLog,
    // getMessageLog,
    messageLog,
    setMessageLog,
    setBotResponse,
    botResponse,
    handleStreamingChatResponse,
    deleteHistory,
    isDeletingHistory,
    animateId,
    setAnimateId,
    // getWelcomeMessage,
    isLoadingWelcomeMessage,
    welcomeMsg,
    setWelcomeMsg,
    createNewThread,
    newthread,
    isLoadingNewThread,
  };
};

export default useChatBot;
