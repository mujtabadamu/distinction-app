import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalClose,
  ModalFooter,
  Text,
} from '@flexisaf/flexibull2';
import useBreakpointValue from 'hooks/general/useBreakpointValue';
import Theme from 'utils/theme';

interface Props {
  isOpen?: boolean;
  onClose: () => void;
  onRepeat: () => void;
  onBackToLibrary?: () => void;
  disableBackToLibrary?: boolean;
}

const CardCompleteModal = ({
  isOpen,
  onClose,
  onRepeat,
  onBackToLibrary,
  disableBackToLibrary = false,
}: Props) => {
  const maxWidth = useBreakpointValue({ base: '800px', xl: '500px' });

  return (
    <Modal onClose={onClose} open={isOpen}>
      <ModalBody style={{ maxWidth }} width="90%">
        <ModalClose onClick={onClose}>&times;</ModalClose>

        <Box className="flex flex-col items-center justify-center" pad="2rem">
          <Text className="text-xl font-semibold" color={Theme.PrimaryColor}>
            You've completed your cards
          </Text>
          <Text className="text-md mt-4" color={Theme.PrimaryGrey} block>
            You did a great job, remember to come back later
          </Text>
        </Box>

        <ModalFooter>
          <Box className="flex w-full " pad="20px">
            {!disableBackToLibrary && (
              <Button pale onClick={onBackToLibrary}>
                Back to Library
              </Button>
            )}
            <div className="flex-1" />
            <Button onClick={onRepeat} iconLeft={<i className="saf-note"></i>}>
              Repeat Flashcards
            </Button>
          </Box>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

export default CardCompleteModal;
