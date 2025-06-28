import {
  Modal,
  ModalBody,
  ModalFooter,
  Box,
  Button,
} from '@flexisaf/flexibull2';
import styled from 'styled-components';
import Theme from 'utils/theme';

interface TermsAndConditionsI {
  isOpen: boolean;
  onClose: () => void;
  handleAccept: () => void;
}

const TermsAndConditions = ({
  isOpen,
  onClose,
  handleAccept,
}: TermsAndConditionsI) => {
  const url =
    'https://docs.google.com/document/d/e/2PACX-1vQmvxCr2l1V4QDbwykFtRpzOaV62D7bW9Tu5jsk1enoSpj3RYLDqxr0udcbJRKXgOMVjN6h4IzXMjbL/pub?embedded=true';

  return (
    <Modal onClose={onClose} open={isOpen}>
      <ModalBody style={{ maxWidth: '800px' }} width="90%">
        <DocumentSection>
          <TermsOfUseIframe src={url} />
        </DocumentSection>
        <ModalFooter>
          <Box pad="20px" align="right">
            <Button onClick={handleAccept}>Accept</Button>
            <Button
              pale
              spaceLeft
              color={Theme.PrimaryRed}
              fontColor={Theme.PrimaryRed}
              onClick={() => {
                onClose();
              }}
            >
              Reject
            </Button>
          </Box>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

export default TermsAndConditions;

const DocumentSection = styled.section`
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  height: 100vh;
  overflow: hidden;
`;

const TermsOfUseIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  display: block;
  padding: 10px;
`;
