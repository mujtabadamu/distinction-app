import React, { useState, ChangeEvent } from 'react';
import {
  Box,
  Button,
  Text,
  Spacer,
  Modal,
  ModalBody,
  ModalFooter,
  Notify,
} from '@flexisaf/flexibull2';
import { FileUploader } from '../../../components/fileUploader/fileUploader';
import { selectExamGroupItem } from '../../../redux/papers/typings';
import useCreateAndEarn from '../../../hooks/createAndEarn/useCreateAndEarn';
import { useNavigate } from 'react-router-dom';
import UploadInstructions from '../components/uploadInstructions';

const FILE_TO_UPLOAD =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

interface BulkUploadProps {
  open: boolean;
  onClose: () => void;
  selectedPaper: selectExamGroupItem | null;
}

const BulkUpload = ({ open, onClose, selectedPaper }: BulkUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const { uploadBulkQuestions, questionsLoading } = useCreateAndEarn();
  const navigate = useNavigate();

  const handleClose = () => {
    document.body.style.overflow = 'auto';
    setFile(null);
    onClose();
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const selectedFile = e.target?.files?.[0];

    if (!selectedFile) return;
    if (selectedFile.type !== FILE_TO_UPLOAD)
      return Notify('Invalid file, please select a valid excel file', {
        status: 'error',
      });

    const uploadLimit = selectedFile.size / 1024 / 1024 < 2.5;

    if (!uploadLimit) {
      Notify('File must not exceed 2.5MB', { status: 'error' });
      return;
    }
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (!file) {
      Notify('No file selected', { status: 'error' });
      return;
    }

    const formData = new FormData();
    const paperId = selectedPaper?.id ?? '';
    formData.append('file', file);

    const payload = {
      data: { formData, paperId },
      callback: () => {
        handleClose();
        navigate('/create-and-earn');
      },
    };
    uploadBulkQuestions(payload);
  };

  return (
    <Modal open={open}>
      <ModalBody width="600px">
        <Box pad="30px">
          <Box>
            <Text size="1.5rem">Bulk Upload Questions</Text>
          </Box>
          <UploadInstructions />
          <Box>
            <Text block bold size="14px">
              Upload XLSX File
            </Text>
            <Text block size="11px" style={{ margin: '10px 0' }}>
              {' '}
              Select your XLSX file from your computer/phone to upload it using
              the uploader provided for you below{' '}
            </Text>
            <Spacer />
            <Box style={{ borderBottom: '1px solid #d1d1d1' }} />

            <Box pad="25px 0">
              <FileUploader
                onChange={(e) => handleFile(e)}
                label="Select your Excel file"
                size="Maximum size 2.5mb"
                accept={FILE_TO_UPLOAD}
              />
              {file ? <span>{file.name}</span> : null}
              <Spacer space="10px" />
              <Button
                progress={questionsLoading}
                disabled={!file}
                onClick={() => handleUpload()}
              >
                Upload Excel File
              </Button>
            </Box>
          </Box>
        </Box>
        <ModalFooter>
          <Box pad="20px" align="right">
            <Button pale onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

export default BulkUpload;
