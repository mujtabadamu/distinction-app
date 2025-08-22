import {
  Box,
  Button,
  Grid,
  Modal,
  ModalBody,
  ModalClose,
  ModalFooter,
  Text,
} from '@flexisaf/flexibull2';
import styled from 'styled-components';
import Theme from '../../../utils/theme';
import devices from '../../../utils/devices';

interface IQuitExamModal {
  onClose: () => void;
  isOpen: boolean;
  isLoading: boolean;
  onQuitAndSumit: () => void;
  onQuit: () => void;
}

const QuitExamModal = ({
  onClose,
  isOpen,
  isLoading,
  onQuitAndSumit,
  onQuit,
}: IQuitExamModal) => {
  return (
    <Modal onClose={onClose} open={isOpen}>
      <StyledModalBody>
        <ModalClose onClick={onClose}>&times;</ModalClose>
        <Box pad="20px 30px 10px 30px">
          <h1>Quit This Exam?</h1>
        </Box>
        <Box pad="10px 30px 20px 30px">
          <Grid default="1fr">
            <p>
              Are you sure you want to quit this exam? You can choose to submit
              it as is, or return back to home
              <br />
              <br />
              <strong>Note:</strong> This action can't be undone.
            </p>
          </Grid>
        </Box>
        <ModalFooter className="modal-footer">
          <div className="container">
            <Button
              onClick={onClose}
              pale
              color="rgba(0,0,0,0.0)"
              fontColor={Theme.PrimaryGrey}
              className="cancel-btn"
            >
              Cancel
            </Button>
            <div className="btns">
              <Button
                pale
                // color="rgba(0,0,0,0.0)"
                color={Theme.PrimaryRed}
                onClick={onQuit}
              >
                <Text color={Theme.PrimaryRed}>Back to home</Text>
              </Button>
              <Button
                progress={isLoading}
                color={Theme.PrimaryRed}
                onClick={onQuitAndSumit}
              >
                Submit and quit
              </Button>
            </div>
          </div>
        </ModalFooter>
      </StyledModalBody>
    </Modal>
  );
};

export default QuitExamModal;

const StyledModalBody = styled(ModalBody)`
  width: 90vw;

  & .modal-footer {
    & .container {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 30px;

      @media ${devices.tablet} {
        flex-direction: row;
      }

      & .btns {
        display: flex;
        gap: 1rem;
      }

      & .cancel-btn {
        margin-left: -15px;
        display: none;
        @media ${devices.tablet} {
          display: flex;
        }
      }
    }
  }

  @media ${devices.laptop} {
    width: 35vw;
  }
`;
