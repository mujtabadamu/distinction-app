import { Box, DropDown, Text } from '@flexisaf/flexibull2';
import { FlashcardView, KeypointView } from 'generated/index';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Theme from 'utils/theme';

type CardType = FlashcardView | KeypointView;
interface Props {
  card: CardType;
  onShare?: (card: CardType) => void;
  onDelete?: (card: CardType) => void;
  isKeypoint?: boolean;
}

const CardMenu = ({ card, onShare, isKeypoint }: Props) => {
  const navigate = useNavigate();
  const handleMenu = () => {
    return [
      {
        onClick: () => {
          onShare?.(card);
        },
        label: 'Share with friends',
        iconLeft: 'saf-share',
      },
      // TODO: Implement course delete
      // {
      //   onClick: () => {
      //     onDelete?.(flashcard);
      //   },
      //   label: 'Delete card group',
      //   iconLeft: 'saf-trash',
      // },
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
    <Container className="!px-4 h-full md:h-[160px]">
      <Box className="!pt-2 flex  justify-end ">
        <DropDown
          style={{ zIndex: 21 }}
          label={
            <div style={{ transform: 'rotate(90deg)' }}>
              <i className="saf-more text-lg cursor-pointer" />
            </div>
          }
          menuAlign="bottom right"
          menuList={handleMenu()}
        />
      </Box>

      <Box
        className=" h-[60px]  cursor-pointer relative "
        onClick={() =>
          navigate(
            `/my-library/${isKeypoint ? 'keypoints' : 'flashcard'}/course/${
              card?.paper?.id
            }`
          )
        }
      >
        <Box className="!mt-2 flex flex-col justify-between gap-2 !pb-2  absolute bottom-[-20px] w-[95%] z-20 md:top-0 ">
          <>
            <Text
              block
              className=" text-[14px] font-[500] md:text-xl turn_blue "
            >
              {truncateText(card?.paper?.name ?? '')}
            </Text>
            <Text block className="text-xs">
              Last update:{' '}
              {moment(card?.updatedAt).format('MMMM Do YYYY, h:mm a')}
            </Text>
          </>

          <Box className={`text-gray-500 flex space-x-1 items-center`}>
            <i className="saf-note text-lg"></i>
            <Text className="text-xs">
              {isKeypoint
                ? `${(card as KeypointView)?.points?.length || 0} key points`
                : `${(card as FlashcardView)?.cards?.length || 0} Decks`}
            </Text>
          </Box>
        </Box>

        <Box className="card_container flex overflow-hidden h-[100px] w-[220px] justify-end absolute right-5 bottom-[-20px] md:top-0">
          <div
            style={{ border: '2px solid #fff' }}
            className="blue_card bg-[#82a2fd] h-[200px] w-[120px] rounded-lg -mr-[100px] mt-[60px]"
          />
          <div
            style={{ border: '2px solid #fff' }}
            className="pink_card bg-[#ff78a0] h-[200px] w-[120px] rounded-lg -mr-[90px] mt-[20px]"
          />
          <div
            style={{ border: '2px solid #fff' }}
            className="bg-[#ffcb66] h-[200px] w-[120px] rounded-lg z-10"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default CardMenu;

const Container = styled.div`
  border-radius: 5px;
  background-color: white;
  padding-left: 20px;
  padding-right: 20px;
  border: 1px solid white;
  transition: 0.3s ease-in-out;
  margin-bottom: 20px;
  .card_container {
    opacity: 0.2;
    transition: 0.3s ease-in-out;
  }
  .pink_card {
    transform: rotate(-10deg);
    transition: 0.3s ease-in-out;
  }
  .blue_card {
    transform: rotate(-12deg);
    transition: 0.3s ease-in-out;
  }
  &:hover {
    border: 1px solid ${Theme.PrimaryBlue};
  }
  &:hover .turn_blue {
    transition: 0.3s ease-in-out;
    color: ${Theme.PrimaryBlue};
  }
  &:hover .card_container {
    opacity: 1;
  }
  &:hover .blue_card {
    transform: rotate(0deg);
  }
  &:hover .pink_card {
    transform: rotate(0deg);
  }
`;
