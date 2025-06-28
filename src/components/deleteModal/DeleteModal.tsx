import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalClose,
  ModalFooter,
  Text,
} from '@flexisaf/flexibull2';
import DeleteSVG from 'assets/delete-svg.svg';
import Theme from 'utils/theme';

interface IProps {
  isOpen: boolean;
  onClose: (data?: any) => void;
  isLoading?: boolean;
  onDelete: (data?: any) => void;
  title: string;
  description: string;
  deleteText?: string;
  iconColor?: string;
  buttonColor?: string;
}

const DeleteModal = ({
  onClose,
  isOpen,
  title,
  description,
  isLoading,
  onDelete,
  deleteText,
  buttonColor,
}: IProps) => {
  return (
    <Modal onClose={onClose} open={isOpen} outerclick>
      <ModalBody style={{ minWidth: '50dvw' }}>
        <ModalClose onClick={onClose}>&times;</ModalClose>
        <Box pad="20px 30px 10px 30px"></Box>
        <Box pad="30px" align="center">
          <div className="flex items-center flex-col gap-3">
            <img src={DeleteSVG} className="w-20" />
            <Text style={{ fontWeight: '600', fontSize: '20px' }}>{title}</Text>
            <Text style={{ lineHeight: '20px', maxWidth: '400px' }}>
              {description}
            </Text>
          </div>
        </Box>
        <ModalFooter>
          <Box pad="20px" align="right">
            <Button
              pale
              onClick={onClose}
              color="rgba(0,0,0,0)"
              fontColor={Theme.PrimaryGrey}
            >
              Cancel
            </Button>
            <Button
              progress={isLoading}
              disabled={isLoading}
              color={buttonColor || Theme.PrimaryRed}
              onClick={() => onDelete()}
            >
              {deleteText || 'Delete'}
            </Button>
          </Box>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

export default DeleteModal;
