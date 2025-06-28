import React, { useEffect, useRef, useState } from 'react';
import { Box, Text, Button } from '@flexisaf/flexibull2';
import styled from 'styled-components';
import { startSession, getDefaultUI, sendChat } from 'services/studyPalApi';
import ReactMarkdown from 'react-markdown';

const ChatbotPane = styled(Box)`
  width: 350px;
  min-width: 300px;
  max-width: 100vw;
  height: 100%;
  position: relative;
  background: #fff;
  box-shadow: -2px 0 8px 0 #101a3312;
  display: flex;
  flex-direction: column;
  z-index: 100;
`;

const ChatHeader = styled(Box)`
  padding: 24px 24px 8px 24px;
  border-bottom: 1px solid #f0f0f0;
`;

const ChatPrompt = styled(Text)`
  margin: 16px 24px 0 24px;
`;

const QuickActionButton = styled(Button)`
  width: 100%;
  border: 2px solid #2563eb !important;
  background: #fff !important;
  color: #111 !important;
  font-weight: bold !important;
  font-size: 0.92rem !important;
  border-radius: 16px !important;
  padding: 18px 0 !important;
  margin-bottom: 18px !important;
  box-shadow: none !important;
  text-align: center;
  transition: background 0.15s, box-shadow 0.15s;
  &:hover,
  &:focus {
    background: #f0f6ff !important;
    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.08);
    color: #2563eb !important;
  }
`;

const QuickActions = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 24px 24px 0 24px;
`;

const ChatHistory = styled(Box)`
  flex: 1;
  overflow-y: auto;
  margin: 16px 24px 0 24px;
  background: #fafbfc;
  border-radius: 16px;
  padding: 16px 0;
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

const Message = styled(Box)<{ type: 'user' | 'ai' }>`
  margin-bottom: 12px;
  align-self: ${({ type }) => (type === 'user' ? 'flex-end' : 'flex-start')};
  background: ${({ type }) => (type === 'user' ? '#e6f7ff' : '#f5f5f5')};
  color: #222;
  border-radius: 16px;
  padding: 16px 24px;
  box-sizing: border-box;
  margin-left: 0;
  font-size: 0.85rem;
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
}

// Animated bar loader for chat
const ChatLoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 8px;
`;

const Bar = styled.div<{ delay: number }>`
  width: 10px;
  height: 24px;
  margin: 0 2px;
  border-radius: 6px;
  background: #2563eb;
  opacity: 0.5;
  animation: chatBarBounce 1s infinite;
  animation-delay: ${({ delay }) => delay}s;

  @keyframes chatBarBounce {
    0%,
    100% {
      transform: scaleY(0.6);
      opacity: 0.5;
    }
    50% {
      transform: scaleY(1.2);
      opacity: 1;
    }
  }
`;

function ChatLoader() {
  return (
    <ChatLoaderWrapper>
      <Bar delay={0} />
      <Bar delay={0.15} />
      <Bar delay={0.3} />
      <Bar delay={0.45} />
    </ChatLoaderWrapper>
  );
}

const ChatHeaderIcons = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 21px;
  top: 24px;
  gap: 12px;
`;

export default function StudyPalChatbot(
  {
    user,
    subject,
    topic,
    onClose,
  }: StudyPalChatbotProps
) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [quickActions, setQuickActions] = useState<{ label: string; action: string }[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [welcome, setWelcome] = useState<string>('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [resetKey, setResetKey] = useState(0);

  // User info (required by API)
  const user_id = user?.id ?? 'guest';
  const name = user?.name ?? 'Guest';
  const safeSubject = subject ?? '';
  const safeTopic = topic ?? '';

  // On mount or reset: start session and get default UI
  useEffect(() => {
    let isMounted = true;
    async function init() {
      setLoading(true);
      try {
        const sessionRes = await startSession({
          user_id,
          name,
          subject: safeSubject,
          topic: safeTopic,
        });
        if (!isMounted) return;
        setSessionId(sessionRes.session_id);
        // Get default UI (welcome + quick actions)
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
      } catch (e) {
        setWelcome('Could not start StudyPal session.');
      } finally {
        setLoading(false);
      }
    }
    init();
    return () => { isMounted = false; };
  }, [user_id, name, safeSubject, safeTopic, resetKey]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) handleSend(input);
    }
  };

  const handleSend = async (
    msg: string,
    action?: string
  ) => {
    if (!sessionId || loading) return;
    setLoading(true);
    setMessages((prev) => [...prev, { type: 'user', content: msg }]);
    setInput('');
    try {
      const res = await sendChat({
        user_id,
        name,
        subject: safeSubject,
        topic: safeTopic,
        message: action ? undefined : msg,
        action,
        session_id: sessionId,
      });
      setMessages((prev) => [
        ...prev,
        { type: 'ai', content: res.ai_response?.text || '' },
      ]);
      setQuickActions(
        (res.quick_actions || []).map((label: string) => ({
          label,
          action: label,
        }))
      );
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { type: 'ai', content: 'Sorry, something went wrong.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    if (input.trim()) handleSend(input);
  };

  const handleQuickAction = (
    qa: { label: string; action: string }
  ) => {
    handleSend(qa.label, qa.action);
  };

  const handleNewChat = () => {
    setResetKey(prev => prev + 1);
  };

  return (
    <ChatbotPane>
      <ChatHeader style={{ position: 'relative' }}>
        <Text size="20px" bold>Hi, {name}!</Text>
        <ChatHeaderIcons>
          <button onClick={handleNewChat} aria-label="Start new chat" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, margin: 0, transform: 'scale(0.81)' }}>
            {/* Plus-in-chat-bubble icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 8V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M9 11H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          {onClose && (
            <button onClick={onClose} aria-label="Close Chatbot" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, margin: 0, transform: 'scale(0.81)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </ChatHeaderIcons>
      </ChatHeader>
      {messages.length === 0 && (
        <>
          <ChatPrompt size="16px">{welcome}</ChatPrompt>
          <QuickActions>
            {quickActions.map((q) => (
              <QuickActionButton
                key={q.action}
                onClick={() => handleQuickAction(q)}
              >
                {q.label}
              </QuickActionButton>
            ))}
          </QuickActions>
        </>
      )}
      <ChatHistory>
        {messages.map((msg, i) => (
          <Message key={i} type={msg.type as 'user' | 'ai'}>
            {msg.type === 'ai' ? (
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            ) : (
              msg.content
            )}
          </Message>
        ))}
        {loading && (
          <Message type="ai">
            <ChatLoader />
          </Message>
        )}
        <div ref={chatEndRef} />
      </ChatHistory>
      <ChatInputRow onSubmit={handleSubmit}>
        <ChatInputWrapper>
          <ChatTextarea
            value={input}
            onChange={handleInputChange}
            placeholder="Ask me anything"
            style={{ paddingRight: 44 }}
            disabled={loading}
            onKeyDown={handleKeyDown}
          />
          <SendIconButton type="submit" aria-label="Send" disabled={loading}>
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