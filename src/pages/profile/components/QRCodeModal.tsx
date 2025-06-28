import UserEmptyState from '../../../assets/images/ImageEmptyState.svg';
import QRCode from 'react-qr-code';
import {
  Box,
  Text,
  Spacer,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from '@flexisaf/flexibull2';
import { InfoRow, ProfileImage } from '../styles';
import { UserProfileDTO } from 'generated/index';
import { useQRCode } from '../hooks/useQRCode';

interface QRCodeModalProps {
  profileData: UserProfileDTO | null;
  handleCloseModal?: () => void;
  isOpen: boolean;
}

function QRCodeModal({
  isOpen,
  handleCloseModal,
  profileData,
}: QRCodeModalProps) {
  const { qrRef, qrValue, handleDownload, handleShare } = useQRCode({
    profileData,
  });

  return (
    <Modal open={isOpen} onClose={handleCloseModal} center={true} outerclick>
      <ModalBody style={{ minWidth: '400px', padding: '0px 20px 20px 20px' }}>
        <Box pad="20px">
          <Spacer space={15} />
          <Box
            display="flex"
            style={{
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <ProfileImage
              style={{
                borderRadius: '100%',
                margin: 'auto',
                position: 'inherit',
              }}
              src={profileData?.profileImage || UserEmptyState}
              alt="Profile_image"
            />
            <Text block size="1.5rem" bold>
              {`${profileData?.firstName} ${profileData?.lastName}`}
            </Text>
            <InfoRow style={{ color: 'blue' }}>
              @{profileData?.username}
            </InfoRow>
            <div
              ref={qrRef}
              style={{
                height: 'auto',
                margin: '0 auto',
                maxWidth: 210,
                width: '100%',
              }}
            >
              <QRCode
                size={256}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                value={qrValue}
                viewBox={`0 0 256 256`}
              />
            </div>
            <Spacer space={20} />
            <Text block>This QR Code can be shared and scanned</Text>
            <Spacer space={10} />
            <img width={100} src="./newdistinctionlogo.svg" alt="Logo" />
            <Spacer space={30} />
          </Box>
        </Box>
        <ModalFooter
          style={{
            background: 'none',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            style={{
              background: '#e2e2e2',
              borderColor: '#b0b0b0',
              color: '#000',
            }}
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Box>
            <Button
              style={{ border: 'none', marginRight: '5px' }}
              pale
              onClick={handleDownload}
            >
              Download
            </Button>
            <Button onClick={handleShare}>Share</Button>
          </Box>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
}

export default QRCodeModal;
