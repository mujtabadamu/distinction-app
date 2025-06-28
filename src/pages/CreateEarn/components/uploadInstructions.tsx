import { Box, Button, Text, Spacer } from '@flexisaf/flexibull2';
import { StepList } from '../styles';
import BulkUploadTemplate from '../../../assets/bulkQuestionTemplate.xlsx';

const UploadInstructions = () => {
  return (
    <Box pad="30px 0 0 0">
      <Text block bold size="14px">
        Template Guideline
      </Text>
      <Text block size="11px" style={{ margin: '10px 0' }}>
        To ensure seamless uploads for the "Create and Earn" project, adhere to
        these key instructions for the Excel template. Following these
        guidelines will ensure your contributions are correctly integrated into
        the project, facilitating a smooth and effective learning experience.
      </Text>
      <Spacer />
      <Box style={{ borderBottom: '1px solid #d1d1d1' }} />

      <Box pad="25px 0">
        <StepList>
          <span className="step"> Step 1: </span>
          <p>
            Click the button below to download the bulk question upload excel
            file, open the file on your computer/phone
          </p>
          <br />
          <a
            href={BulkUploadTemplate}
            target="_blank"
            rel="noreferrer"
            download="Bulk Questions Template"
            style={{ margin: 'auto' }}
          >
            <Button>Download XLSX Template</Button>
          </a>
        </StepList>
        <Spacer space="10px" />
        <StepList>
          <span className="step"> Step 2:</span>
          <p>
            <b>Question Types:</b> Use "MULTIPLE_CHOICE" for questions with
            several correct answers, and "SINGLE_CHOICE" for questions with only
            one correct answer. Accuracy in question type selection is crucial
            for proper question presentation and learner assessment.
          </p>
        </StepList>
        <StepList>
          <span className="step"> Step 3: </span>
          <p>
            <b>Formatting:</b> Exact capitalization and the inclusion of an
            underscore between "MULTIPLE" and "CHOICE" or "SINGLE" and "CHOICE"
            are mandatory. Deviations will lead to rejection.
          </p>
        </StepList>
        <StepList>
          <span className="step"> Step 4: </span>
          <p>
            <b>Correct Answers:</b> Mark all correct answers with a preceding
            "@@" to distinguish them clearly. For example, the correct option
            for the SINGLE_CHOICE question below is option 1.
          </p>
        </StepList>
        <StepList>
          <span className="step"> Step 5: </span>
          <p>
            <b>Template Completeness:</b> Fill all template columns with
            accurate and relevant information, particularly the "question type"
            column, ensuring it matches one of the specified formats.
          </p>
        </StepList>
      </Box>
    </Box>
  );
};

export default UploadInstructions;
