import { CustomSelect } from 'components/custom/CustomSelect';
import { useEffect, useState } from 'react';
import { curriculums } from 'utils/constants';
import { Box, Button, Select, Spacer } from '@flexisaf/flexibull2';
import usePapersGet from 'hooks/papers/usePapersGet';
import { useNavigate } from 'react-router-dom';

interface NewChatbotModalProps {
  onClose?: () => void;
}

function NewChatbot({ onClose }: NewChatbotModalProps) {
  const navigate = useNavigate();
  const [selectedCurriculum, setSelectedCurriculum] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [selectedPaper, setSelectedPaper] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const {
    papers,
    loadingPapers,
    increaseSize,
    searchText,
    setSearchText,
    fetchPapers,
  } = usePapersGet({ curriculum: selectedCurriculum?.value });

  useEffect(() => {
    if (selectedCurriculum) {
      fetchPapers();
    }
  }, [selectedCurriculum?.value]);

  const handleProceed = () => {
    // add params for selectedCurriculum and selectedPaper
    navigate(`/chatbot/${selectedCurriculum?.value}/${selectedPaper?.value}`);
    if (onClose) onClose();
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <Spacer space="10px" />
      <div className="bg-[#fff]  shadow-lg p-8 flex  flex-col justify-around rounded-lg w-[90%] md:w-[50%] max-w-[430px]">
        <p className="text-center  text-[1rem]">
          For a personalised experience, select curriculum and course
        </p>
        <Spacer space="40px" />

        <div>
          <Select
            label="Curriculum"
            placeholder="Select curriculum"
            required
            block
            options={curriculums?.map((item) => {
              return {
                label: item.label,
                value: item.value,
              };
            })}
            value={selectedCurriculum}
            onChange={(value: { label: string; value: string }) => {
              setSelectedCurriculum({
                label: value.label,
                value: value.value,
              });
            }}
            data-tour="select-curriculum"
          />
          <Spacer space="10px" />
          <label className="text-[12px] text-blue-grey-900 font-[500] block mb-1">
            Course <span className="text-red-500">*</span>
          </label>
          <CustomSelect
            placeholder="Select course"
            value={selectedPaper}
            // label="Course"
            onLoadMore={increaseSize}
            onChange={(value) => {
              if (value && value.label && value.value) {
                const paper = papers?.items?.find(
                  (paper) => paper.id === value.value
                );
                if (paper) {
                  setSelectedPaper({
                    label: value.label,
                    value: value.value,
                    ...paper,
                  });
                }
              }
            }}
            searchQuery={searchText}
            setSearchQuery={setSearchText}
            loading={loadingPapers}
            options={
              (selectedCurriculum &&
                papers?.items?.map((v) => ({
                  label: `${v?.name} (${v.exam.name.trim()})`,
                  value: v?.id,
                }))) ??
              []
            }
            data-tour="select-course"
          />
          <Spacer space="10px" />

          <Button
            style={{ width: '100%', padding: '18px', marginTop: '5px' }}
            onClick={handleProceed}
            disabled={!selectedCurriculum?.value || !selectedPaper?.value}
          >
            Proceed
          </Button>
          <Box />
        </div>
      </div>
    </div>
  );
}

export default NewChatbot;
