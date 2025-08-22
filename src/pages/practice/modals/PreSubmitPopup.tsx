import {
  Box,
  Modal,
  ModalBody,
  Button,
  Text,
  Spacer,
} from '@flexisaf/flexibull2';
import { RiErrorWarningLine } from 'react-icons/ri';

import { ModeBox } from '../../../styles/dashboard/dashboard.styles';
import Theme from '../../../utils/theme';
import styled from 'styled-components';

interface PreSubmitPopupProps {
  open: boolean;
  onClose: () => void;
  totalUnAnswered?: number;
  handleSubmit: () => void;
  isSubmitting: boolean;
}

const PreSubmitPopup = ({
  open,
  onClose,
  totalUnAnswered,
  handleSubmit,
  isSubmitting,
}: PreSubmitPopupProps) => {
  return (
    <Modal onClose={onClose} open={open}>
      <ModalBody width="90%" style={{ maxWidth: '540px' }}>
        <Box pad="2rem 1.5rem">
          <Box align="center">
            <h2>Are you sure you want to submit?</h2>
            <p>
              You still have <b>{totalUnAnswered}</b> unanswered question(s).
            </p>
          </Box>
          <Box>
            <ModeBox style={{ display: 'flex', alignItems: 'center' }}>
              <RiErrorWarningLine
                color={Theme.PrimaryColor}
                size="1.5rem"
                style={{ marginRight: '10px' }}
              />
              <Box maxWidth="90%" margin="0 auto">
                <b>Tip:</b> you can always click on the{' '}
                <Text color={Theme.PrimaryColor}>view questions </Text>
                button at the top right corner to see your answered and
                unanswered questions.
              </Box>
            </ModeBox>
          </Box>
          <Spacer space="40px" />
          <FooterContent>
            <Button pale progress={isSubmitting} onClick={handleSubmit}>
              Submit Anyway
            </Button>
            <Button onClick={onClose}>Continue Practice</Button>
          </FooterContent>
        </Box>
      </ModalBody>
    </Modal>
  );
};

export default PreSubmitPopup;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
`;
