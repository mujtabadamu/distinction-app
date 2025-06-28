import {
  Box,
  Button,
  Input,
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
import React, { useEffect, useState } from 'react';

interface Props {
  isOpen?: boolean;
  onClose: () => void;
  callback?: (card: FlashcardView | KeypointView) => void;
  card?: FlashcardView | KeypointView;
  isKeypoint?: boolean;
}

const RenameFlashcardModal = ({
  isOpen,
  onClose,
  callback,
  card,
  isKeypoint,
}: Props) => {
  const maxWidth = useBreakpointValue({ base: '800px', xl: '500px' });
  const { renameFlashcard, isRenamingFlashCard } = useFlashCard();
  const { renameKeypoint, isCreatingKeyPoint } = useKeyPoint();
  const [title, setTitle] = useState<string>(card?.title || '');

  useEffect(() => {
    if (card) {
      setTitle(card.title || '');
    }
  }, [card]);

  return (
    <Modal onClose={onClose} open={isOpen}>
      <ModalBody style={{ maxWidth }} width="90%">
        <ModalClose onClick={onClose}>&times;</ModalClose>

        <Box className="!p-4 !border-b !mt-6">
          <Text className="text-md font-semibold">Rename Flashcard</Text>
        </Box>
        <Box pad="2rem">
          <Input
            label="New name"
            style={{ width: '100%' }}
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
        </Box>

        <ModalFooter>
          <Box className="flex justify-between" pad="20px">
            <Button pale onClick={onClose}>
              Cancel
            </Button>

            <Button
              onClick={() => {
                if (title) {
                  if (isKeypoint)
                    renameKeypoint({
                      id: card?.id || '',
                      newName: title,
                      callback: () => callback?.({ ...card, title }),
                    });
                  else
                    renameFlashcard({
                      id: card?.id || '',
                      newName: title,
                      callback: () => callback?.({ ...card, title }),
                    });
                }
              }}
              progress={isRenamingFlashCard || isCreatingKeyPoint}
              iconLeft={<i className="saf-note"></i>}
            >
              Rename Card
            </Button>
          </Box>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

export default RenameFlashcardModal;
