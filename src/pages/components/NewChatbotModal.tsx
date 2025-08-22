import { CustomSelect } from 'components/custom/CustomSelect';
import { useEffect, useState } from 'react';
import { curriculums } from 'utils/constants';
import {
  Box,
  Button,
  Select,
  Spacer,
  Modal,
  ModalBody,
} from '@flexisaf/flexibull2';
import usePapersGet from 'hooks/papers/usePapersGet';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface NewChatbotModalProps {
  onClose: () => void;
  open: boolean;
}

function NewChatbotModal({ onClose, open }: NewChatbotModalProps) {
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
    allPapers,
  } = usePapersGet({ curriculum: selectedCurriculum?.value });

  useEffect(() => {
    if (selectedCurriculum) {
      fetchPapers();
    }
    setSelectedPaper(null);
    setSearchText('');
  }, [selectedCurriculum?.value]);

  const handleProceed = () => {
    navigate(`/chatbot/${selectedCurriculum?.value}/${selectedPaper?.value}`);
    if (onClose) onClose();
  };

  return (
    <Modal onClose={onClose} open={open} outerclick>
      <StyledModalBody>
        <Box
          onClick={onClose}
          className="text-[1.3rem] !ml-auto !w-[4%] !mb-3 cursor-pointer"
        >
          &times;
        </Box>
        <div>
          <div className="mt-[-1rem]">
            <h2 className="text-center  text-[1.1rem] font-semibold">
              For a personalised experience
            </h2>
            <p className="text-center  text-[0.9rem] mt-[-0.4rem]">
              select curriculum and course
            </p>
            <Spacer space="20px" />

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
                    allPapers?.map((v) => ({
                      label: `${v?.name} (${v.exam?.name.trim()})`,
                      value: v?.id,
                    }))) ??
                  []
                }
                data-tour="select-course"
              />
              <Spacer space="10px" />

              <Button
                style={{ width: '100%', padding: '18px', marginTop: '10px' }}
                onClick={handleProceed}
                disabled={!selectedCurriculum?.value || !selectedPaper?.value}
              >
                Proceed
              </Button>
              <Box />
            </div>
          </div>
        </div>
      </StyledModalBody>
    </Modal>
  );
}

export default NewChatbotModal;
const StyledModalBody = styled(ModalBody)`
  &.flexi-modal-body {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    padding: 1rem;
    border-radius: 0.5rem;
    width: 90%;
    @media (min-width: 768px) {
      width: 50%;
    }

    max-width: 470px;
    background-color: #fff;
  }
`;
