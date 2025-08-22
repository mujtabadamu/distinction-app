import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalClose,
  ModalFooter,
  Text,
} from '@flexisaf/flexibull2';
import { FlashcardView, KeypointView } from 'generated/index';
import useBreakpointValue from 'hooks/general/useBreakpointValue';
import { useState } from 'react';
import Theme from 'utils/theme';

interface Props {
  isOpen?: boolean;
  onClose: () => void;
  card?: FlashcardView | KeypointView;
  isKeypoint?: boolean;
}

const ShareFlashcardModal = ({ isOpen, onClose, card, isKeypoint }: Props) => {
  const maxWidth = useBreakpointValue({ base: '800px', xl: '600px' });
  const [isCopied, setIsCopied] = useState(false);
  const isDevelopment = () => {
    if (process.env.NODE_ENV === 'production') return false;
    if (process.env.REACT_APP_ENV === 'production') return false;
    return (
      process.env.NODE_ENV === 'development' ||
      process.env.REACT_APP_ENV === 'development'
    );
  };

  const baseUrl = isDevelopment()
    ? 'https://schools.distinctionapp.flexisafapps-dev.com'
    : 'https://dashboard.distinction.app';

  const link = `${baseUrl}/${isKeypoint ? 'keypoints' : 'flashcards'}/${
    card?.id
  }`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Could not copy text: ', err);
    }
  };
  return (
    <Modal onClose={onClose} open={isOpen}>
      <ModalBody style={{ maxWidth }} width="90%">
        <ModalClose onClick={onClose}>&times;</ModalClose>

        <Box className="!p-4 !border-b !mt-6">
          <Text className="text-lg !mb-4 font-semibold">
            Share {isKeypoint ? 'Key Point' : 'Flashcard'}
          </Text>
          <Text block size="14px" color={Theme.PrimaryTextColor}>
            Share the link to your fellow students by copying the link or
            sharing via social media
          </Text>
        </Box>
        <Box pad="2rem">
          <Text block color={Theme.PrimaryTextColor}>
            Share the link to your friends by copying the link
          </Text>
          <Box
            background="#F1F6FF"
            round
            display="flex"
            pad="10px"
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              marginTop: '10px',
            }}
          >
            <Box
              className="w-full md:!w-[70%]  overflow-hidden whitespace-nowrap "
              style={{ display: 'block', color: Theme.PrimaryGrey }}
            >
              {link}
            </Box>
            <Button
              fontColor={Theme.PrimaryColor}
              onClick={copyToClipboard}
              pale
              style={{ border: 'none' }}
            >
              {isCopied ? 'Copied!' : 'Copy link'}
            </Button>
          </Box>
        </Box>

        <ModalFooter>
          <Box className="flex justify-end" pad="20px">
            <Button pale onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

export default ShareFlashcardModal;
