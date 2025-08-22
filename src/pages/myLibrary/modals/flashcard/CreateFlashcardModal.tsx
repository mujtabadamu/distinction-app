import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalClose,
  ModalFooter,
  Text,
  Notify,
  Spacer,
} from '@flexisaf/flexibull2';
import {
  AsyncSelectComponent,
  SelectOption,
} from 'components/custom/AsyncSelect';
import { useForm, Controller } from 'react-hook-form';
import usePapersGet from 'hooks/papers/usePapersGet';
import { useEffect, useState, ChangeEvent } from 'react';
import { DifficultyModes, DifficultyType } from 'utils/constants';
import Tag from '../../components/tag';
import { TabPanel, TabButton, TabContainer, Preview, Label } from '../style';
import { Uploader } from 'pages/myLibrary/components/Upload';
import Trash from '../../../../assets/icons/trash.svg';
import useFlashCard from 'pages/myLibrary/flashCardPages/hooks/useFlashCard';
import InfoBanner from 'components/infoBanner/InfoBanner';
import SelectCurriculum from 'pages/myLibrary/components/selectCurriculum';

interface Props {
  isOpen?: boolean;
  onClose: () => void;
  callback?: () => void;
}

export type FlashCardFormValues = {
  paper: SelectOption | null;
};
const CreateFlashcardModal = ({ isOpen, onClose, callback }: Props) => {
  const [activeTab, setActiveTab] = useState('Curiculum');
  const [selectedCurriculum, setSelectedCurriculum] = useState<
    'NUC' | 'NBTE' | 'NCCE' | 'OTHERS'
  >('NUC');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { createFlashcard, isCreatiingFlashCard } = useFlashCard();

  const { papers, loadingPapers, increaseSize, searchText, setSearchText } =
    usePapersGet({ curriculum: selectedCurriculum });

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const selectedFile = e.target?.files?.[0];

    if (!selectedFile) return;

    const uploadLimit = selectedFile.size / 1024 / 1024 < 2.5;

    if (!uploadLimit) {
      Notify('File must not exceed 2.5MB', { status: 'error' });
      return;
    }
    setSelectedFile(selectedFile);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FlashCardFormValues>({
    defaultValues: {
      paper: null,
    },
  });
  const [difficulty, setDifficulty] = useState<DifficultyType>('EASY');
  const FILE_TO_UPLOAD =
    '.pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain';
  const onSubmit = (data: FlashCardFormValues) => {
    createFlashcard(
      {
        difficulty,
        curriculum: activeTab === 'Upload' ? 'OTHERS' : selectedCurriculum,
        formData: { file: selectedFile as File },
        paperId: data.paper?.value || '',
      },
      () => {
        if (callback) {
          callback();
          setSelectedFile(null);
        }
      }
    );
  };
  const handleTabSwitch = (value: string) => setActiveTab(value);

  useEffect(() => {
    return () => reset();
  }, [isOpen]);

  return (
    <Modal onClose={onClose} open={isOpen}>
      <ModalBody style={{ maxWidth: '700px', background: '#ffff' }} width="90%">
        <ModalClose onClick={onClose}>&times;</ModalClose>

        <Box className="!p-4 !border-b !mt-6 pt-0">
          <Text className="text-lg font-semibold">Generate Flashcards</Text>
          <Spacer space={10} />
          <InfoBanner
            bgColor="#101A33"
            style={{
              color: '#FFFFFF',
              borderColor: '#FFCB66',
              margin: 0,
            }}
            infoTitle="✅ New!"
            infoText="Generate flashcards from either curriculum or your custom materials."
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
              <Controller
                name="paper"
                control={control}
                rules={{
                  required:
                    activeTab === 'Curiculum' ? 'Course is required' : false,
                }}
                render={({ field: { onChange } }) => (
                  <AsyncSelectComponent
                    placeholder="Search course"
                    value={watch('paper')}
                    onLoadMore={increaseSize}
                    onChange={(selected) => {
                      onChange(selected);
                      setValue('paper', selected);
                    }}
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
                )}
              />
              {errors.paper && <Text color="red">{errors.paper.message}</Text>}
            </Box>
          </TabPanel>

          <TabPanel active={activeTab === 'Upload'}>
            {!selectedFile && (
              <Uploader
                onChange={handleFile}
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
            {selectedFile && (
              <>
                <Preview>
                  <span>{selectedFile.name}</span>
                  <img
                    src={Trash}
                    alt="Remove file"
                    onClick={() => setSelectedFile(null)}
                    style={{ cursor: 'pointer' }}
                  />
                </Preview>
              </>
            )}
          </TabPanel>
          <h2 className="font-semibold mt-4">Difficulty</h2>
          <Box className="" display="flex" style={{ gap: '10px' }}>
            {DifficultyModes.map((mode) => (
              <Tag
                key={mode}
                onClick={() => setDifficulty(mode)}
                isActive={mode === difficulty}
                title={mode}
              />
            ))}
          </Box>
        </Box>

        <Spacer space={30} />

        <ModalFooter>
          <Box className="flex justify-between" pad="20px">
            <Button pale onClick={onClose}>
              Cancel
            </Button>

            <Button
              progress={isCreatiingFlashCard}
              onClick={handleSubmit(onSubmit)}
              iconLeft={<i className="saf-note"></i>}
            >
              Generate Flashcards
            </Button>
          </Box>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

export default CreateFlashcardModal;
