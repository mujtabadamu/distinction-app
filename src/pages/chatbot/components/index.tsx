import { Text, Button } from '@flexisaf/flexibull2';
import { useNavigate } from 'react-router-dom';
import {
  HistoryListContainer,
  BotResponseContainer,
  TopSection,
  LoadingDotsContainer,
  LoadingDot,
} from '../styles';
import { ChatThreadView } from 'generated/index';
import Theme from 'utils/theme';

type BotResponseProps = {
  children: React.ReactNode;
};

type AvatarProps = {
  avatarContent: React.ReactNode;
  icon?: React.ReactNode;
  backgroundColor?: string;
  handleClick?: () => void;
};

export const HistoryList = ({
  historyItems,
  handleDelete,
  handleClick,
}: {
  historyItems: ChatThreadView[];
  handleDelete: (id: string) => void;
  handleClick?: () => void;
}) => {
  const navigate = useNavigate();

  return (
    <HistoryListContainer>
      {historyItems.length ? (
        historyItems
          .slice()
          .sort((a, b) => {
            const dateA = new Date(a.createdAt ?? '');
            const dateB = new Date(b.createdAt ?? '');
            return dateB.getTime() - dateA.getTime();
          })
          .map((item) => (
            <div className="list-content">
              <li
                key={item.id}
                className="list-item"
                onClick={() => {
                  navigate(`/chatbot/${item.id}`);
                  if (handleClick) handleClick();
                }}
              >
                {item.title}
              </li>
              <Button
                plain
                color={Theme.PrimaryRed}
                icon={<i className="saf-trash" />}
                onClick={() => handleDelete(item.id || '')}
              ></Button>
            </div>
          ))
      ) : (
        <Text bold size="1rem">
          No history to show
        </Text>
      )}
    </HistoryListContainer>
  );
};

export const BotResponse = ({ children }: BotResponseProps) => {
  return <BotResponseContainer id="response">{children}</BotResponseContainer>;
};

export const ChatAvatar = ({
  avatarContent,
  icon,
  backgroundColor,
  handleClick,
}: AvatarProps) => {
  return (
    <TopSection backgroundColor={backgroundColor}>
      <span>{avatarContent}</span>
      {icon && <i className={`${icon}`} onClick={handleClick} />}
    </TopSection>
  );
};

export const PulsatingLoadingDots = () => {
  return (
    <LoadingDotsContainer>
      <LoadingDot />
      <LoadingDot />
      <LoadingDot />
    </LoadingDotsContainer>
  );
};
