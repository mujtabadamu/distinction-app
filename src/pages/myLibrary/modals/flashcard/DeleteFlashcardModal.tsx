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
import useFlashCard from 'pages/myLibrary/flashCardPages/hooks/useFlashCard';
import useKeyPoint from 'pages/myLibrary/keyPointPages/hooks/useKeyPoint';

interface Props {
  isOpen?: boolean;
  onClose: () => void;
  card?: FlashcardView | KeypointView;
  callback?: (id?: string) => void;
  isKeypoint?: boolean;
}

const DeleteFlashcardModal = ({
  isOpen,
  onClose,
  card,
  callback,
  isKeypoint,
}: Props) => {
  const maxWidth = useBreakpointValue({ base: '800px', xl: '500px' });
  const { deleteFlashcard, isDeletingFlashCard } = useFlashCard();
  const { deleteKeypoint, isDeletingKeyPoint } = useKeyPoint();
  return (
    <Modal onClose={onClose} open={isOpen}>
      <ModalBody style={{ maxWidth }} width="90%">
        <ModalClose onClick={onClose}>&times;</ModalClose>

        <Box className="!p-4 !border-b !mt-6">
          <Text className="text-md font-semibold">
            Delete {isKeypoint ? 'Key Point' : 'Flashcard'}
          </Text>
        </Box>
        <Box pad="2rem">
          <Text>
            This action will delete the {isKeypoint ? 'key point' : 'flashcard'}{' '}
            with title <b>"{card?.title}"</b>
          </Text>
        </Box>

        <ModalFooter>
          <Box className="flex justify-between" pad="20px">
            <Button pale onClick={onClose}>
              Cancel
            </Button>

            <Button
              progress={isDeletingFlashCard || isDeletingKeyPoint}
              onClick={() => {
                if (isKeypoint) {
                  deleteKeypoint(card?.id || '', () => callback?.(card?.id));
                } else {
                  deleteFlashcard(card?.id || '', () => callback?.(card?.id));
                }
              }}
              iconLeft={<i className="saf-note"></i>}
              color={'#900001'}
            >
              Yes, Proceed
            </Button>
          </Box>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

export default DeleteFlashcardModal;
