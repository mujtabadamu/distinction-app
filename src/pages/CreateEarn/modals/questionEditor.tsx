import { useEffect, useState, useRef, ChangeEvent } from 'react';
import {
  Box,
  Button,
  Text,
  Spacer,
  Grid,
  Select,
  Input,
  Modal,
  ModalBody,
  Tabs,
  Notify,
} from '@flexisaf/flexibull2';
import Theme from '../../../utils/theme';
import TinyEditor from '../../../components/tinyEditor/tinyEditor';
import { OptionsWrapper, SuggestionContainer } from '../styles';
import { OptionItem } from '../../../components/optionItem/optionItem';
import { returnUpdatedList } from '../../../utils/helpers';
import { DEFAULT_OPTION, questionTypes } from '../../../utils/constants';
import useAutoCompleteGet from '../../../hooks/topics/useAutoComplete';
// Type for exam group item - aligned with distinction-app
interface selectExamGroupItem {
  createdat: string;
  exam: {
    examGroupName: string;
    name: string;
    year: number;
    examGroupId: string;
  };
  subjectId: string;
  id: string;
  instruction: string;
  isActive: boolean;
  name: string;
  averageRating: number;
  subjectName: string;
  label?: string;
  value?: string;
}
// import { QuestionCreatePayload } from '../../../redux/createAndEarn/typings';
import useCreateAndEarn from '../../../hooks/createAndEarn/useCreateAndEarn';
import { useNavigate } from 'react-router-dom';

export interface IOption {
  id: string;
  text?: string;
  correct?: boolean;
  imageUrl?: string;
}

type CorrectOptionType = IOption | IOption[];

interface QuestionEditorProps {
  open: boolean;
  onClose: () => void;
  selectedPaper: selectExamGroupItem | null;
}

const QuestionEditor = ({
  open,
  onClose,
  selectedPaper,
}: QuestionEditorProps) => {
  const [options, setOptions] = useState<IOption[]>(DEFAULT_OPTION);
  const [correctOption, setCorrectOption] = useState<CorrectOptionType | null>(
    null
  );
  const [selectedQuestionType, setSelectedQuestionType] = useState(
    questionTypes[0]
  );

  const { topicList, topic, setTopic, setSelectedTopic, clearTopics } =
    useAutoCompleteGet({
      key: selectedPaper?.subjectName,
    });

  const navigate = useNavigate();

  const { createQuestion } = useCreateAndEarn();

  const questionEditorRef = useRef<any>(null);
  const explanationEditorRef = useRef<any>(null);

  const handleClose = () => {
    document.body.style.overflow = 'auto';
    setCorrectOption(null);
    setOptions(DEFAULT_OPTION);
    setSelectedTopic('');
    setTopic('');
    onClose();
  };

  const isCorrectOptionEmpty =
    selectedQuestionType.value === 'SINGLE_CHOICE'
      ? correctOption === null
      : selectedQuestionType.value === 'MULTIPLE_CHOICE'
        ? correctOption === null ||
          (Array.isArray(correctOption) && correctOption.length === 0)
        : true;

  const isEmptyFields =
    questionEditorRef?.current?.getContent() === '' ||
    explanationEditorRef?.current?.getContent() === '' ||
    topic === '';

  const editOption = (option: IOption) => {
    const newList = returnUpdatedList(option, options, 'id');
    setOptions([...newList]);
  };

  const addNewOption = () => {
    setOptions([
      ...options,
      { id: crypto.randomUUID(), text: '', correct: false },
    ]);
  };

  const deleteOption = (id: string) => {
    setOptions(options.filter((option) => option.id !== id));

    if (correctOption !== null) {
      if (Array.isArray(correctOption)) {
        const updatedCorrectOption = correctOption.filter(
          (option) => option.id !== id
        );
        setCorrectOption(
          updatedCorrectOption.length > 0 ? updatedCorrectOption : null
        );
      } else if (correctOption.id === id) {
        setCorrectOption(null);
      }
    }
  };

  const handleCorrectOption: (option: IOption) => void = (option) => {
    if (selectedQuestionType.value === 'SINGLE_CHOICE') {
      setCorrectOption(option);
    }

    if (selectedQuestionType.value === 'MULTIPLE_CHOICE') {
      setCorrectOption((prevCorrectOption) => {
        if (prevCorrectOption === null) {
          return [option];
        } else if (Array.isArray(prevCorrectOption)) {
          return [...prevCorrectOption, option];
        } else {
          return [prevCorrectOption, option];
        }
      });
    }
  };

  const validateFields = (fieldData) => {
    if (
      questionEditorRef?.current?.getContent() === '' ||
      explanationEditorRef?.current?.getContent() === '' ||
      topic === ''
    ) {
      return Notify(
        'Please fill in a question, explanation, topic and select correct option(s)',
        {
          status: 'error',
        }
      );
    } else {
      createQuestion(fieldData);
    }
  };

  const handleSubmit = () => {
    const filteredOptions = options.filter(
      (option) => option.text?.trim() !== ''
    );
    validateFields({
      data: {
        type: selectedQuestionType?.value,
        topic: topic.trim(),
        paperId: selectedPaper ? (selectedPaper?.id ?? '') : '',
        text: questionEditorRef?.current
          ? questionEditorRef?.current?.getContent()
          : '',
        sectionId: '',
        tags: [],
        imageUrl: '',
        answerTexts: [],
        solution: explanationEditorRef?.current
          ? explanationEditorRef?.current?.getContent()
          : '',
        answerOptions: filteredOptions,
      },

      callback: () => {
        handleClose();
        navigate('/create-and-earn');
      },
    });
  };

  useEffect(() => {
    if (!correctOption) return;
    const newOptionsList = options?.map((option) => {
      return {
        ...option,
        correct:
          selectedQuestionType.value === 'SINGLE_CHOICE'
            ? (correctOption as IOption).id === option?.id
            : selectedQuestionType.value === 'MULTIPLE_CHOICE'
              ? Array.isArray(correctOption) &&
                correctOption.some((item: IOption) => item.id === option.id)
              : false,
      };
    });
    setOptions(newOptionsList);
  }, [correctOption]);

  useEffect(() => {
    const newOptionsList = options?.map((option) => {
      return {
        ...option,
        correct: false,
      };
    });

    setOptions(newOptionsList);
    setCorrectOption(null);
  }, [selectedQuestionType]);

  return (
    <Modal open={open}>
      <ModalBody width="90%">
        <Grid default="25% 75%" sm="1fr" style={{ background: '#fff' }} gap="0">
          <Box background={Theme.PrimarySurface} pad="35px 25px">
            <Text bold block size="16px">
              Add Question
            </Text>
            <Box margin="50px 0">
              <Select
                label="Select Question Type"
                placeholder="E.g Multiple Choice"
                block
                spaceTop="30px"
                spaceBottom="30px"
                value={selectedQuestionType}
                onChange={(value: { label: string; value: string }) =>
                  setSelectedQuestionType(value)
                }
                options={questionTypes}
                defaultValue={questionTypes[0]}
              />

              <Box style={{ position: 'relative' }}>
                <Input
                  placeholder="Ex: Algebra"
                  label="Topic"
                  spaceTop="30px"
                  spaceBottom="30px"
                  block
                  required
                  value={topic}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setTopic(event.target.value)
                  }
                />
                {topic && topicList && !topicList.includes(topic) && (
                  <SuggestionContainer>
                    {topicList.map((topic) => (
                      <li
                        key={topic}
                        onClick={() => {
                          setTopic(topic);
                          setSelectedTopic(topic);
                          clearTopics();
                        }}
                      >
                        {topic}
                      </li>
                    ))}
                  </SuggestionContainer>
                )}
              </Box>
            </Box>
            <Box
              align="center"
              style={{
                borderTop: `1px solid ${Theme.PrimaryBorderColor}`,
              }}
              pad="20px 0 0 0"
            >
              <Button spaceRight="20px" pale onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isEmptyFields || isCorrectOptionEmpty}
              >
                Add Question
              </Button>
            </Box>
          </Box>
          <Box pad="40px 0 0 0">
            <Tabs activeTab={0} padContent="35px 0 0 0">
              <Box label="Question">
                <Box pad="1rem 2rem" maxWidth="1200px">
                  <TinyEditor
                    editorRef={questionEditorRef}
                    height={300}
                    value={''}
                    showMenuBar
                  />
                  <Box pad="20px 0px">
                    <Text
                      uppercase
                      bold
                      size="10px"
                      style={{ letterSpacing: '1px' }}
                    >
                      Options
                    </Text>
                    <Spacer space={8} />

                    <OptionsWrapper>
                      {options.map((option) => (
                        <OptionItem
                          key={option.id}
                          option={option}
                          editOption={editOption}
                          deleteOption={deleteOption}
                          disableDelete={options.length < 2}
                          setCorrectOption={() => {
                            handleCorrectOption(option);
                          }}
                          isCorrectOption={
                            selectedQuestionType.value === 'SINGLE_CHOICE'
                              ? (correctOption as IOption)?.id === option.id
                              : Array.isArray(correctOption)
                                ? correctOption.some(
                                    (item) => item.id === option.id
                                  )
                                : false
                          }
                          questionType={selectedQuestionType?.value}
                        />
                      ))}
                    </OptionsWrapper>

                    <Box height="5px" />
                    <Box
                      display="flex"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Button
                        color={Theme.PrimaryFontColor}
                        fontColor="#fff"
                        iconLeft={
                          <i
                            className="saf-add-circle"
                            style={{ fontSize: '18px' }}
                          />
                        }
                        style={{
                          marginTop: '5px',
                          marginBottom: '15px',
                        }}
                        onClick={addNewOption}
                      >
                        <Text>Add option</Text>
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box label="Explanation">
                <Box pad="1rem 2rem" maxWidth="1200px">
                  <Button>Generate Explanation</Button>
                  <Spacer space="20px" />
                  <TinyEditor
                    editorRef={explanationEditorRef}
                    height={300}
                    value={''}
                    showMenuBar
                  />
                </Box>
              </Box>
            </Tabs>
          </Box>
        </Grid>
      </ModalBody>
    </Modal>
  );
};

export default QuestionEditor;
