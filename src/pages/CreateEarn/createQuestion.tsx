// import { Box, Button, Text, Spacer, Grid, Select } from '@flexisaf/flexibull2';
// import { useNavigate } from 'react-router-dom';
// import QuestionEditor from './modals/questionEditor';
// import { useState } from 'react';
// import BulkUpload from './modals/bulkUpload';
// import usePapersGet from '../../hooks/papers/usePapersGet';
// import { AsyncSelect } from '../../components/custom/AsyncSelect';
import ComingSoon from "../../components/comingSoon/comingSoon";
// import { selectExamGroupItem } from '../../redux/papers/typings';

const CreateQuestion = () => {
  // const [editorModal, setEditorModal] = useState<boolean>(false);
  // const [uploadModal, setUploadModal] = useState<boolean>(false);
  // const [selectedPaper, setSelectedPaper] =
  //   useState<selectExamGroupItem | null>(null);
  // const { papers , loadingPapers , increaseSize ,searchText , setSearchText } = usePapersGet({
  //   size: 100,
  //   page: 0,
  // });

  // const navigate = useNavigate();

  // const toggleEditorModal = () => {
  //   setEditorModal((prev) => !prev);
  // };

  // const toggleUploadModal = () => {
  //   setUploadModal((prev) => !prev);
  // };

  return (
    <>
    <ComingSoon/>
    {/* <Box pad="10px 20px">
      <Button
        plain
        onClick={() => navigate('/home')}
        iconLeft={<i className="saf-arrow-left" />}
      >
        Back
      </Button>
      <Spacer space="10px" />
      <Box>
        <Text bold size="1.5rem">
          Create Question
        </Text>
        <Spacer space="20px" />
        <Box
          background="#fff"
          pad="10px"
          style={{ minHeight: '80px', borderRadius: '4px' }}
        >
          <Text bold>Guidelines:</Text>
          <Spacer spacer="10px" />
          <Box>
            <Text size="14px">
              To create or make question uploads for the "Create and Earn"
              project, first select a course then choose between single or bulk
              question creation.
            </Text>
          </Box>
        </Box>
        <Spacer space="50px" />
        <Grid default="1fr 1fr" sm="1fr" gap="20px">
          <Select
            label="Select Course"
            placeholder="Select Course"
            block
            spaceBottom="20px"
            options={papers?.items?.map((v) => ({
              label: v?.name,
              value: v?.id,
            }))}
            value={selectedPaper}
            onChange={({ label, value }: { label: string; value: string }) => {
              const paper = papers?.items?.find((paper) => paper.id === value);
              setSelectedPaper({ label, value, ...paper });
            }}
          />
           <AsyncSelect 
          placeholder='Select...'
          value={selectedPaper}
          onLoadMore={increaseSize}
          onChange={(value) => {
            if (value && value.label && value.value) { 
                const paper = papers?.items?.find((paper) => paper.id === value.value);
                if (paper) { 
                    setSelectedPaper({ label: value.label, value: value.value, ...paper });
                }
            }
        }}
          searchQuery={searchText}
          setSearchQuery={setSearchText}
          loading={loadingPapers} 
           options={papers?.items?.map((v) => ({
            label: `${v?.name} (${v.exam.name.trim()})`,
            value: v?.id,
          })) ?? []}

            />

          <Grid default="auto max-content max-content" sm="1fr">
            <Box />
            {selectedPaper && (
              <Button onClick={toggleEditorModal}>Add Question</Button>
            )}
            {selectedPaper && (
              <Button onClick={toggleUploadModal}>Bulk Upload Questions</Button>
            )}
          </Grid>
        </Grid>
      </Box>
      {editorModal && (
        <QuestionEditor
          open={editorModal}
          onClose={toggleEditorModal}
          selectedPaper={selectedPaper}
        />
      )}
      {uploadModal && (
        <BulkUpload
          open={uploadModal}
          onClose={toggleUploadModal}
          selectedPaper={selectedPaper}
        />
      )}
    </Box> */}
    </>
  );
};

export default CreateQuestion;
