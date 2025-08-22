import { Button, TextArea } from '@flexisaf/flexibull2';
import { PiTelegramLogoLight } from 'react-icons/pi';
import { ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import styled from 'styled-components';

const ChatInput = ({
  placeholder,
  name,
  block,
  disabled,
  value,
  onChange,
  onSubmit,
  onKeyDown,
}: {
  style?: React.CSSProperties;
  placeholder?: string;
  name?: string;
  block?: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit?: (e: FormEvent) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
}) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ChatContainer>
        <TextArea
          style={{
            border: 'none ',
            outline: 'none ',
            resize: 'none',
            width: '100%',
            fontSize: 16,
            background: 'transparent',
            minHeight: 24,
            maxHeight: 120,
            fontFamily: 'inherit',
            lineHeight: 1.5,
          }}
          placeholder={placeholder}
          name={name}
          block={block}
          disabled={disabled}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          // rows={1}
        />

        <Button
          type="submit"
          onClick={handleSubmit}
          style={{
            background: '#2563EB',
            color: '#fff',
            minWidth: 36,
            minHeight: 36,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            flexShrink: 0,
          }}
        >
          <PiTelegramLogoLight size={18} />
        </Button>
      </ChatContainer>
    </form>
  );
};

export default ChatInput;

const ChatContainer = styled.div`
  border-radius: 20px;
  padding: 12px 16px;
  background: #fff;
  width: 100%;
  border: 2px solid #6689ea;
  box-sizing: border-box;
  display: flex;
  align-items: flex-end;
  gap: 12px;
  min-height: 56px;
  margin-bottom: 20px;
  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;
