import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalClose,
  ModalFooter,
  Notify,
  Text,
  Spacer,
} from '@flexisaf/flexibull2';
import {
  AsyncSelectComponent,
  SelectOption,
} from 'components/custom/AsyncSelect';
import usePapersGet from 'hooks/papers/usePapersGet';
import { useEffect, useState, ChangeEvent } from 'react';
import { TabPanel, TabButton, TabContainer, Preview, Label } from '../style';
import InfoBanner from 'components/infoBanner/InfoBanner';
import { Uploader } from 'pages/myLibrary/components/Upload';
import Trash from '../../../../assets/icons/trash.svg';
import SelectCurriculum from 'pages/myLibrary/components/selectCurriculum';
import useKeyPoint from 'pages/myLibrary/keyPointPages/hooks/useKeyPoint';

interface Props {
  isOpen?: boolean;
  onClose: () => void;
  callback?: () => void;
}

const CreateKeypointModal = ({ isOpen, onClose, callback }: Props) => {
  const FILE_TO_UPLOAD =
    '.pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain';
  const [activeTab, setActiveTab] = useState('Curiculum');
  const [file, setFile] = useState<File | null>(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const selectedFile = e.target?.files?.[0];

    if (!selectedFile) return;

    const uploadLimit = selectedFile.size / 1024 / 1024 < 2.5;

    if (!uploadLimit) {
      Notify('File must not exceed 2.5MB', { status: 'error' });
      return;
    }
    setFile(selectedFile);
  };
  const [selectedCurriculum, setSelectedCurriculum] = useState<
    'NUC' | 'NBTE' | 'NCCE' | 'OTHERS'
  >('NUC');
  const { createKeypoint, isCreatingKeyPoint } = useKeyPoint();
  const { papers, loadingPapers, increaseSize, searchText, setSearchText } =
    usePapersGet({});
  const [paper, setPaper] = useState<SelectOption | null>(null);

  useEffect(() => {
    return () => setPaper(null);
  }, [isOpen]);

  const handleSubmit = () => {
    if (activeTab === 'Curiculum') {
      if (!paper?.value) {
        Notify('Please select a course.', { status: 'error' });
        return;
      }
    } else if (activeTab === 'Upload') {
      if (!file) {
        Notify('Please select a file to upload.', { status: 'error' });
        return;
      }
    }

    const payload = {
      curriculum: activeTab === 'Upload' ? 'OTHERS' : selectedCurriculum,
      formData: { file: file as File },
      paperId: paper?.value || '',
    };

    createKeypoint(payload, () => {
      if (callback) {
        callback();
      }
      setPaper(null);
      setFile(null);
      setActiveTab('Curiculum');
    });
  };

  const handleTabSwitch = (value: string) => setActiveTab(value);
  return (
    <Modal onClose={onClose} open={isOpen} className="bg-white">
      <ModalBody style={{ maxWidth: '700px', background: '#ffff' }} width="90%">
        <ModalClose onClick={onClose}>&times;</ModalClose>

        <Box className="!p-4 !border-b !mt-6">
          <Text className="text-lg font-semibold">Generate Key Points</Text>
          <Spacer space={10} />
          <InfoBanner
            bgColor="#101A33"
            style={{
              color: '#FFFFFF',
              borderColor: '#FFCB66',
              margin: 0,
            }}
            infoTitle="✅ New!"
            infoText="Generate keypoints from either curriculum or your custom materials."
          />
        </Box>
        <Box className="!p-4">
          <Text className="text-[12px] font-semibold text-[#454545] mb-4">
            Select Content Source
          </Text>
          <TabContainer
            style={{
              marginTop: '0.4rem',
            }}
          >
            <TabButton
              active={activeTab === 'Curiculum'}
              onClick={() => handleTabSwitch('Curiculum')}
            >
              Curiculum
            </TabButton>
            <TabButton
              active={activeTab === 'Upload'}
              onClick={() => handleTabSwitch('Upload')}
            >
              Upload
            </TabButton>
          </TabContainer>
        </Box>
        <Box pad="1rem">
          <TabPanel active={activeTab === 'Curiculum'}>
            <SelectCurriculum
              selectedCurriculum={selectedCurriculum}
              setSelectedCurriculum={setSelectedCurriculum}
            />
            <Box>
              <h2>Course</h2>
              <AsyncSelectComponent
                placeholder="Course"
                value={paper}
                onLoadMore={increaseSize}
                onChange={setPaper}
                searchQuery={searchText}
                setSearchQuery={setSearchText}
                loading={loadingPapers}
                options={
                  papers?.items?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  })) ?? []
                }
              />
            </Box>
          </TabPanel>
          <TabPanel active={activeTab === 'Upload'}>
            {!file && (
              <Uploader
                onChange={(e) => handleFile(e)}
                label={
                  <Label>
                    Drag & drop files to upload or <strong>Browse</strong> from
                    your Computer
                  </Label>
                }
                size=""
                accept={FILE_TO_UPLOAD}
              />
            )}
            {file && (
              <>
                <Preview>
                  <span>{file.name}</span>
                  <img src={Trash} onClick={() => setFile(null)} />
                </Preview>
              </>
            )}
          </TabPanel>
        </Box>
        <Spacer space={20} />
        <ModalFooter>
          <Box className="flex justify-between" pad="20px">
            <Button style={{ color: '#202325' }} pale onClick={onClose}>
              Cancel
            </Button>

            <Button
              progress={isCreatingKeyPoint}
              onClick={handleSubmit}
              iconLeft={<i className="saf-note"></i>}
            >
              Generate Key Points
            </Button>
          </Box>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

export default CreateKeypointModal;
