import { Box, DropDown, Text } from '@flexisaf/flexibull2';
import { FlashcardView, KeypointView } from 'generated/index';
import moment from 'moment';
import Tag from './tag';
interface Props {
  onClick?: () => void;
  onShare?: (card: FlashcardView | KeypointView) => void;
  onDelete?: (card: FlashcardView | KeypointView) => void;
  onRename?: (card: FlashcardView | KeypointView) => void;
  card: FlashcardView | KeypointView;
  isKeypoint?: boolean;
}

const FlashCardGroup = ({
  onClick,
  card,
  onShare,
  onDelete,
  onRename,
  isKeypoint,
}: Props) => {
  const flashcard = card as FlashcardView;
  const handleMenu = () => {
    return [
      {
        onClick: () => {
          onShare?.(card);
        },
        label: 'Share with friends',
        iconLeft: 'saf-share',
      },
      {
        onClick: () => {
          onRename?.(card);
        },
        label: 'Rename',
        iconLeft: 'saf-magicpen',
      },
      {
        onClick: () => {
          onDelete?.(card);
        },
        label: 'Delete card group',
        iconLeft: 'saf-trash',
      },
    ];
  };
  const truncateText = (text: string) => {
    if (!text) return '';
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const maxLength = isMobile ? 35 : 45;

    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <Box
      pad="10px 20px"
      className={`bg-white rounded-md !mb-2 ${!isKeypoint && 'h-[121px]'}`}
    >
      <Box className="flex justify-between h-full">
        <Box
          onClick={onClick}
          className={`flex flex-col ${
            isKeypoint ? '' : 'justify-around'
          } cursor-pointer w-[90%]`}
        >
          <Text className="mb-4 mr-2 text-[16px]" block>
            {truncateText(card?.title ?? '')}
          </Text>

          <Box className="flex justify-between items-center">
            {flashcard.difficulty && <Tag title={flashcard.difficulty} />}
            <Text
              block
              className={`${!isKeypoint && 'ml-2'} text-[12px] text-[#202020]`}
            >
              {moment(card.updatedAt).format('MMMM Do YYYY, h:mm a')}
            </Text>
          </Box>
        </Box>

        <Box align="right">
          <DropDown
            label={
              <div
                style={{
                  transform: 'rotate(90deg)',
                  pointerEvents: 'none',
                }}
              >
                <i className="saf-more text-lg cursor-pointer" />
              </div>
            }
            menuAlign="bottom right"
            menuList={handleMenu()}
            style={{ height: 'fit-content' }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FlashCardGroup;
