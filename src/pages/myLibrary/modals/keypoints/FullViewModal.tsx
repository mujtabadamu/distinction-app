import { Box, Modal } from '@flexisaf/flexibull2';
import { KeypointView, PaperView } from 'generated/index';
import useBreakpointValue from 'hooks/general/useBreakpointValue';
import ActiveKeyPointView from 'pages/myLibrary/components/activeKeyPointView';

interface Props {
  isOpen?: boolean;
  onClose: () => void;
  onShare: () => void;
  keypoint: KeypointView;
  paper?: PaperView;
}

const FullViewModal = ({
  isOpen,
  onClose,
  keypoint,
  paper,
  onShare,
}: Props) => {
  const maxWidth = useBreakpointValue({ base: '800px', xl: '1000px' });
  return (
    <Modal onClose={onClose} open={isOpen}>
      <Box className="w-full flex justify-center">
        <Box style={{ maxWidth, width: '90%' }} className="">
          <ActiveKeyPointView
            keypoint={keypoint}
            paper={paper}
            onShare={onShare}
            onClose={onClose}
            isFullView
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default FullViewModal;
