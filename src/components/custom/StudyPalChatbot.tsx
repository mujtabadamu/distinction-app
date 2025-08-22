import React, { useEffect, useRef, useState } from 'react';
import { Text, } from '@flexisaf/flexibull2';
import styled from 'styled-components';
import {
  startSession,
  getDefaultUI,
  sendChat,
  learnMoreChatbot,
} from 'services/studyPalApi';
import ReactMarkdown from 'react-markdown';
import {
  QuickActionButton,
  ChatLoader,
  QuickActions,
} from './StudyPalSharedUI';

const ChatbotPane = styled.div`
  /* width: 350px; */
  min-width: 300px;
  /* max-width: 100vw; */
  min-height: 400px;
  position: relative;
  background: #fff;
  box-shadow: -2px 0 8px 0 #101a3312;
  display: flex;
  flex-direction: column;
  z-index: 100;
  word-wrap: break-word;
  min-width: 0;
`;

const ChatHeader = styled.div`
  padding: 24px 24px 8px 24px;
  border-bottom: 1px solid #f0f0f0;
`;

const ChatHistory = styled.div`
  min-height: 300px;
  overflow-y: auto;
  margin: 16px 24px 0 24px;
  background: transparent;
  border-radius: 16px;
  padding: 16px 0;
  word-wrap: break-word;
  min-width: 0;
  flex: 1;
`;

const ChatTextarea = styled.textarea`
  width: 100%;
  min-height: 56px;
  max-height: 120px;
  resize: vertical;
  border: 1.5px solid #d1d5db;
  border-radius: 12px;
  padding: 14px 16px;
  font-size: 0.85rem;
  color: #222;
  background: #fff;
  outline: none;
  transition: border 0.2s;
  margin-right: 0;
  box-sizing: border-box;
  &:focus {
    border-color: #2563eb;
    background: #f0f6ff;
  }
`;

const ChatInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SendIconButton = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #bfc7d1;
  font-size: 1.6rem;
  transition: color 0.15s;
  &:hover {
    color: #2563eb;
  }
`;

const ChatInputRow = styled.form`
  display: flex;
  gap: 8px;
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
  background: #fff;
  flex-direction: column;
  width: 100%;
`;

const Message = styled.div<{ type: 'user' | 'ai' }>`
  margin-bottom: 12px;
  align-self: ${({ type }) => (type === 'user' ? 'flex-end' : 'flex-start')};
  background: ${({ type }) => (type === 'user' ? '#e6f7ff' : '#f5f5f5')};
  color: #222;
  border-radius: 16px;
  padding: 16px 24px;
  box-sizing: border-box;
  margin-left: 0;
  font-size: 0.85rem;
  word-wrap: break-word;
  /* min-width: 0; */
  /* max-width: 100%; */
`;

type Message = { type: 'user' | 'ai'; content: string };

interface StudyPalChatbotProps {
  user?: {
    id?: string;
    name?: string;
  };
  subject?: string;
  topic?: string;
  onClose?: () => void;
  question?: string;
  correctAnswer?: string;
  studentAnswer?: string;
  mode?: 'solution' | 'flashcard';
  forceLearnMoreOnInit?: boolean;
}

const ChatHeaderIcons = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 21px;
  top: 24px;
  gap: 12px;
`;

export default function StudyPalChatbot({
  user,
  subject,
  topic,
  onClose,
  question,
  correctAnswer,
  studentAnswer,
  mode = 'flashcard',
  forceLearnMoreOnInit = false,
}: StudyPalChatbotProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [quickActions, setQuickActions] = useState<
    { label: string; action: string }[]
  >([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [welcome, setWelcome] = useState<string>('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [resetKey, setResetKey] = useState(0);
  const [explanation, setExplanation] = useState<string>('');
  const [followUps, setFollowUps] = useState<string[]>([]);
  const [conversationHistory, setConversationHistory] = useState<any[]>([]);
  // const [explanations, setExplanations] = useState<string[]>([]);
  // const [userQuestions, setUserQuestions] = useState<string[]>([]);
  const [chatMessages, setChatMessages] = useState<
    { type: 'user' | 'ai' | 'loading'; content: string }[]
  >([]);

  // User info (required by API)
  const user_id = user?.id ?? 'guest';
  const name = user?.name ?? 'Guest';
  const safeSubject = subject ?? '';
  const safeTopic = topic ?? '';

  // Only use the new chat flow if mode === 'solution'
  const isSolutionMode = mode === 'solution';

  // On mount or reset: start session and get default UI or learn more
  useEffect(() => {
    let isMounted = true;
    async function init() {
      setLoading(true);
      // Show loading indicator in chat
      setChatMessages([{ type: 'loading', content: '' }]);
      try {
        const sessionRes = await startSession({
          user_id,
          name,
          subject: safeSubject,
          topic: safeTopic,
        });
        if (!isMounted) return;
        setSessionId(sessionRes.session_id);
        // If forceLearnMoreOnInit is true, always use learnMoreChatbot
        if (
          forceLearnMoreOnInit ||
          (question?.trim() && correctAnswer?.trim() && studentAnswer?.trim())
        ) {
          const learnRes = await learnMoreChatbot({
            session_id: sessionRes.session_id,
            question: question || '',
            correct_answer: correctAnswer || '',
            student_answer: studentAnswer || '',
          });
          if (!isMounted) return;
          setExplanation(learnRes.explanation || '');
          setFollowUps(learnRes.follow_up_questions || []);
          setConversationHistory(learnRes.conversation_history || []);
          // Remove loading indicator will be handled by explanation effect
        } else {
          // Fallback to default UI
          const uiRes = await getDefaultUI({
            user_id,
            name,
            subject: safeSubject,
            topic: safeTopic,
          });
          if (!isMounted) return;
          setWelcome(uiRes.welcome_message || uiRes.greeting || '');
          setQuickActions(
            (uiRes.quick_actions || []).map((label: string) => ({
              label,
              action: label,
            }))
          );
          setMessages([]);
          setChatMessages([]); // Clear chat messages for flashcard mode
        }
      } catch (e) {
        console.error('StudyPal initialization error:', e);
        if (
          question?.trim() &&
          correctAnswer?.trim() &&
          studentAnswer?.trim()
        ) {
          setExplanation(
            'Sorry, I could not load the explanation for this question.'
          );
        } else {
          setWelcome('Could not start StudyPal session.');
          setQuickActions([]);
        }
        setChatMessages([]); // Remove loading indicator on error
      } finally {
        setLoading(false);
      }
    }
    init();
    return () => {
      isMounted = false;
    };
  }, [
    resetKey,
    user_id,
    name,
    safeSubject,
    safeTopic,
    question,
    correctAnswer,
    studentAnswer,
    mode,
    forceLearnMoreOnInit,
  ]);

  // Scroll to bottom when messages or explanation change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, explanation, conversationHistory]);

  // On mount or when a new explanation is received, append it (if not already present)
  useEffect(() => {
    if (explanation) {
      setChatMessages((prev) => {
        // Remove the last loading message if present
        let msgs = prev;
        if (msgs.length > 0 && msgs[msgs.length - 1].type === 'loading') {
          msgs = msgs.slice(0, -1);
        }
        // If the last message is the same explanation, don't add again
        if (
          msgs.length > 0 &&
          msgs[msgs.length - 1].type === 'ai' &&
          msgs[msgs.length - 1].content === explanation
        ) {
          return msgs;
        }
        return [...msgs, { type: 'ai', content: explanation }];
      });
    }
  }, [explanation]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) handleSend(input);
    }
  };

  const handleSend = async (msg: string) => {
    setInput('');
    if (isSolutionMode) {
      setChatMessages((prev) => [
        ...prev,
        { type: 'user', content: msg },
        { type: 'loading', content: '' },
      ]);
      if (!sessionId) return;
      setLoading(true);
      try {
        const learnRes = await learnMoreChatbot({
          session_id: sessionId,
          question: question || '',
          correct_answer: correctAnswer || '',
          student_answer: studentAnswer || '',
          student_followup: msg,
        });
        setExplanation(learnRes.explanation || '');
        setFollowUps(learnRes.follow_up_questions || []);
      } catch (e) {
        setExplanation('Sorry, something went wrong.');
        setFollowUps([]);
      } finally {
        setLoading(false);
      }
    } else {
      setMessages((prev) => [
        ...prev,
        { type: 'user', content: msg },
        { type: 'ai', content: '' }, // Placeholder for loader/response
      ]);
      if (!sessionId) return;
      setLoading(true);
      try {
        const chatRes = await sendChat({
          user_id,
          name,
          subject: safeSubject,
          topic: safeTopic,
          message: msg,
          session_id: sessionId,
        });

        let aiContent =
          chatRes.text ||
          chatRes.explanation ||
          chatRes.message ||
          chatRes.response;
        let followUps = [];
        // For Explain, Summarize, Real-life examples, use explanation/follow_up_questions
        const explainLike = [
          'Explain this topic in simple terms',
          'Give me a summary',
          'Give me real-life examples',
        ];
        if (
          (msg &&
            explainLike.some((label) =>
              msg.toLowerCase().includes(label.toLowerCase())
            )) ||
          (chatRes.explanation && typeof chatRes.explanation === 'string')
        ) {
          aiContent = chatRes.explanation || aiContent;
          followUps = chatRes.follow_up_questions || [];
        } else if (chatRes.ai_response) {
          try {
            const parsed = JSON.parse(chatRes.ai_response.replace(/'/g, '"'));
            aiContent = parsed.text || parsed.explanation || aiContent;
          } catch (e) {
            aiContent = chatRes.ai_response;
          }
        }
        // NEW: If aiContent is a stringified object, parse and extract text/explanation
        try {
          const parsed =
            typeof aiContent === 'string' && aiContent.trim().startsWith('{')
              ? JSON.parse(aiContent)
              : null;
          if (parsed && (parsed.text || parsed.explanation)) {
            aiContent = parsed.text || parsed.explanation;
          }
        } catch (e) {
          console.error(e)
        }
        if (!aiContent) aiContent = 'Sorry, I could not get a response.';
        setMessages((prev) => {
          // Replace the last empty AI message with the actual response
          const newMsgs = [...prev];
          const lastIdx = newMsgs.findIndex(
            (m, i) =>
              m.type === 'ai' && m.content === '' && i === newMsgs.length - 1
          );
          if (lastIdx !== -1) {
            newMsgs[lastIdx] = { type: 'ai', content: aiContent };
          } else {
            newMsgs.push({ type: 'ai', content: aiContent });
          }
          return newMsgs;
        });
        setQuickActions(
          followUps.length > 0
            ? followUps.map((q: string) => ({ label: q }))
            : []
        );
      } catch (e) {
        setMessages((prev) => {
          const newMsgs = [...prev];
          const lastIdx = newMsgs.findIndex(
            (m, i) =>
              m.type === 'ai' && m.content === '' && i === newMsgs.length - 1
          );
          if (lastIdx !== -1) {
            newMsgs[lastIdx] = {
              type: 'ai',
              content: 'Sorry, I could not get a response.',
            };
          } else {
            newMsgs.push({
              type: 'ai',
              content: 'Sorry, I could not get a response.',
            });
          }
          return newMsgs;
        });
        setQuickActions([]);
      }
      setLoading(false);
    }
  };

 

  const handleQuickAction = (qa: { label: string; action: string }) => {
    handleSend(qa.label);
  };

  const handleNewChat = () => {
    setResetKey((prev) => prev + 1);
  };

  // When a follow-up button is clicked, show the question as a user message at the end, then show loading
  const handleFollowUp = async (followup: string) => {
    setChatMessages((prev) => [
      ...prev,
      { type: 'user', content: followup },
      { type: 'loading', content: '' },
    ]);
    if (!sessionId) return;
    setLoading(true);
    try {
      const learnRes = await learnMoreChatbot({
        session_id: sessionId,
        question: question || '',
        correct_answer: correctAnswer || '',
        student_answer: studentAnswer || '',
        student_followup: followup,
      });
      setExplanation(learnRes.explanation || '');
      setFollowUps(learnRes.follow_up_questions || []);
    } catch (e) {
      setExplanation('Sorry, something went wrong.');
      setFollowUps([]);
    } finally {
      setLoading(false);
    }
  };

  // Add a ref to each AI message and scroll to it after update
  const aiMessageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isSolutionMode && messages.length > 0) {
      // Find the last AI message
      const lastAIIdx = messages.findIndex(
        (m, i) => m.type === 'ai' && i === messages.length - 1
      );
      if (lastAIIdx !== -1 && aiMessageRefs.current[lastAIIdx]) {
        aiMessageRefs.current[lastAIIdx]?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  }, [messages, isSolutionMode]);

  return (
    <ChatbotPane>
      <ChatHeader style={{ position: 'relative' }}>
        <Text size="20px" bold>
          Hi, {name}!
        </Text>
        <ChatHeaderIcons>
          <button
            onClick={handleNewChat}
            aria-label="Start new chat"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              margin: 0,
              transform: 'scale(0.81)',
            }}
          >
            {/* Plus-in-chat-bubble icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3"
                y="4"
                width="18"
                height="14"
                rx="3"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M12 8V14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M9 11H15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              aria-label="Close Chatbot"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                margin: 0,
                transform: 'scale(0.81)',
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="18"
                  y1="6"
                  x2="6"
                  y2="18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="6"
                  y1="6"
                  x2="18"
                  y2="18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </ChatHeaderIcons>
      </ChatHeader>
      {isSolutionMode ? (
        <ChatHistory>
          {/* Render chat messages in order */}
          {chatMessages.map((msg, idx) =>
            msg.type === 'ai' ? (
              <Message key={`ai-exp-${idx}`} type="ai">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </Message>
            ) : msg.type === 'user' ? (
              <Message key={`user-q-${idx}`} type="user">
                {msg.content}
              </Message>
            ) : (
              <Message key={`loading-${idx}`} type="ai">
                <ChatLoader />
              </Message>
            )
          )}
          {followUps && followUps.length > 0 && !loading && (
            <>
              <div
                style={{
                  margin: '16px 0 24px 0',
                  color: '#222',
                  fontSize: 15,
                  wordWrap: 'break-word',
                  minWidth: 0,
                }}
              >
                If you want to continue exploring this topic, try one of these
                follow-up questions:
              </div>
              <QuickActions>
                {followUps.map((q, i) => (
                  <QuickActionButton key={i} onClick={() => handleFollowUp(q)}>
                    {q}
                  </QuickActionButton>
                ))}
              </QuickActions>
            </>
          )}
          <div ref={chatEndRef} />
        </ChatHistory>
      ) : (
        // Fallback to default chat UI (flashcard mode)
        <ChatHistory>
          {welcome && (
            <Message type="ai">
              <ReactMarkdown>{welcome}</ReactMarkdown>
            </Message>
          )}
          {messages
            .filter(
              (msg) => !(loading && msg.type === 'ai' && msg.content === '')
            )
            .map((msg, idx) => (
              <Message
                key={idx}
                type={msg.type}
                ref={
                  msg.type === 'ai'
                    ? (el: HTMLDivElement | null) =>
                        (aiMessageRefs.current[idx] = el)
                    : undefined
                }
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </Message>
            ))}
          {loading && (
            <Message type="ai">
              <ChatLoader />
            </Message>
          )}
          {quickActions.length > 0 && !loading && (
            <QuickActions>
              {quickActions.map((qa, i) => (
                <QuickActionButton
                  key={i}
                  onClick={() => handleQuickAction(qa)}
                >
                  <span
                    style={{ flex: 1, textAlign: 'left', display: 'block' }}
                  >
                    {qa.label}
                  </span>
                </QuickActionButton>
              ))}
            </QuickActions>
          )}
          <div ref={chatEndRef} />
        </ChatHistory>
      )}
      <ChatInputRow
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) handleSend(input);
        }}
      >
        <ChatInputWrapper>
          <ChatTextarea
            value={input}
            onChange={handleInputChange}
            placeholder="Ask a follow-up question..."
            style={{ paddingRight: 44 }}
            disabled={loading}
            onKeyDown={handleKeyDown}
          />
          <SendIconButton
            type="submit"
            aria-label="Send"
            disabled={loading || !input.trim()}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 20L21 12L3 4V10L17 12L3 14V20Z" fill="currentColor" />
            </svg>
          </SendIconButton>
        </ChatInputWrapper>
      </ChatInputRow>
    </ChatbotPane>
  );
}
