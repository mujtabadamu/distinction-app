import { useState } from 'react';
import { Swiper } from '../../styles/dashboard/dashboard.styles';
import {
  Grid,
  Box,
  Select,
  Text,
  Spacer,
  RadioButton,
} from '@flexisaf/flexibull2';

import {
  PersonalizeWrapper,
  PopularSubjectsWrapper,
  PopularSubject,
} from '../../styles/dashboard/dashboard.styles';

import Theme from '../../utils/theme';
import useExamsGet from '../../hooks/exams/useExamsGet';
import { ExamGroup } from '../../redux/examGroups/typings';
import { Tag } from 'antd';
import usePapersGet from '../../hooks/papers/usePapersGet';
import { Paper } from '../../redux/papers/typings';
import useTopicsGet from '../../hooks/topics/useTopicsGet';
import useSubjectsGet from '../../hooks/subjects/useSubjectsGet';

interface Props {
  setPersonalizeOptions: (val: boolean) => void;
  setStep: (step: number) => void;
  mode: 'learning' | 'real' | null;
  selectedExamGroup: ExamGroup | null;
  setSelectedPaper: (subject: Paper | null) => void;
  selectedPaper: Paper | null;
  selectedExam: null | { value: string; label: number };
  selectedSubject: null | { value: string; label: string };
  setSelectedSubject: (x: { value: string; label: string }) => void;
  setSelectedExam: (x: { value: string; label: number } | null) => void;
  setTopics: (x: { value: string; label: string }[]) => void;
  topics: { value: string; label: string }[] | null;
  setYears: (x: { value: number; label: string }[]) => void;
  years: { value: number; label: string }[] | null;
  setPersonalizeYearSelection: (x: 'SPECIFIC' | 'ALL') => void;
  personalizeYearSelection: 'SPECIFIC' | 'ALL';
  setPersonalizeTopicSelection: (y: 'SPECIFIC-TOPICS' | 'ALL-TOPICS') => void;
  personalizeTopicSelection: 'SPECIFIC-TOPICS' | 'ALL-TOPICS';
}

interface MultiSelectAction<T> {
  removedValue: {
    value: number | string;
  };
  action: string;
  option: T;
}

const Personalize = ({
  setPersonalizeOptions,
  setStep,
  mode,
  selectedExamGroup,
  setSelectedPaper,
  selectedPaper,
  selectedExam,
  setSelectedExam,
  setTopics,
  topics: topicsState,
  selectedSubject,
  setSelectedSubject,
  personalizeYearSelection,
  setPersonalizeYearSelection,
  setPersonalizeTopicSelection,
  personalizeTopicSelection,
  setYears,
  years,
}: Props) => {
  const [filter, setFilter] = useState('');
  const { loadingExams, exams } = useExamsGet({
    examGroupId: selectedExamGroup?.id,
  });
  const { loadingPapers, papers } = usePapersGet({
    examId: mode === 'real' ? selectedExam?.value : undefined,
    subjectId: mode === 'learning' ? selectedSubject?.value : undefined,
    examGroupId: selectedExamGroup?.id,
  });
  const { loadingTopics, topics } = useTopicsGet({
    examGroupId: selectedExamGroup?.id || '',
    subjectId: selectedSubject?.value || '',
    years: years?.map((year) => year.value).join() || null,
  });
  const { loadingSubjects, subjects } = useSubjectsGet({
    examGroupId: selectedExamGroup?.id,
  });

  const variants = {
    hidden: {
      x: 100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.3,
      },
    },
    exit: {
      x: 100,
      opacity: 0,
    },
  };

  return (
    <Swiper variants={variants} initial="hidden" animate="visible" exit="exit">
      <Box display="flex">
        <Tag color="blue">{selectedExamGroup?.name}</Tag>
        <Tag color="blue" style={{ textTransform: 'capitalize' }}>
          {mode} mode
        </Tag>
      </Box>
      <Spacer space="10px" />

      <Text block style={{ textAlign: 'center' }}>
        Personalize your practice
      </Text>
      <Spacer space="10px" />

      <PersonalizeWrapper>
        {mode === 'real' && (
          <Grid default="1fr 1fr" gap="10px" responsive={false}>
            <Select
              spaceTop
              required
              style={{ width: '100%' }}
              value={selectedExam || null}
              onChange={(value: { label: number; value: string }) => {
                setSelectedExam({
                  label: value.label,
                  value: value.value,
                });
              }}
              isLoading={loadingExams}
              options={exams?.items
                ?.slice()
                ?.sort((a, b) => b.year - a.year)
                .map((exam) => ({
                  label: exam.name,
                  value: exam.id,
                }))}
              label="Select Practice"
            />
            <Select
              spaceTop
              style={{ width: '100%' }}
              disable={!selectedExam}
              required
              isLoading={loadingPapers}
              value={
                selectedPaper
                  ? {
                      ...selectedPaper,
                      label: selectedPaper?.subjectName,
                    }
                  : null
              }
              onChange={(value: Paper) => {
                setSelectedPaper(value);
                setPersonalizeOptions(true);
              }}
              options={papers?.items?.map((paper) => ({
                ...paper,
                label: paper.subjectName,
                value: paper.id,
              }))}
              label="Select Subject"
            />
          </Grid>
        )}

        {mode === 'learning' && (
          <Grid default="1fr" gap="10px" responsive={false}>
            <Box>
              <Select
                spaceTop
                style={{ width: '100%' }}
                // disable={!selectedSubject}
                placeholder="What subject would you like to learn?"
                required
                isLoading={loadingSubjects}
                value={selectedSubject}
                onChange={(value: { value: string; label: string }) => {
                  setSelectedSubject(value);
                  setPersonalizeOptions(true);
                  setSelectedExam(null);
                  setTopics([]);
                  setYears([]);
                }}
                options={subjects?.map((subject) => ({
                  value: subject.id,
                  label: subject.name,
                }))}
                label="Select Subject"
              />
              <Spacer space="10px" />
              <PopularSubjectsWrapper>
                <Text color="#757575" size="12px">
                  Popular Subjects
                </Text>
                <Spacer space="10px" />

                {subjects.length ? (
                  <div className="popular-subject-container">
                    {subjects?.slice(0, 4).map((subject) => {
                      return (
                        <PopularSubject
                          key={subject.id}
                          selected={subject.id === selectedSubject?.value}
                          onClick={() => {
                            setSelectedSubject({
                              value: subject.id,
                              label: subject.name,
                            });
                            setTopics([]);
                            setYears([]);
                            setPersonalizeOptions(true);
                          }}
                        >
                          {subject.name}
                        </PopularSubject>
                      );
                    })}
                  </div>
                ) : (
                  <Text size="12px" color={Theme.SecondaryGrey}>
                    No popular subjects available for this exam
                  </Text>
                )}
              </PopularSubjectsWrapper>
            </Box>

            <Spacer space="10px" />

            <Box>
              <Text bold size="12px">
                Select practice(s)
              </Text>
              <Spacer space="10px" />
              <form>
                <RadioButton
                  style={{ padding: '0px', margin: '0px' }}
                  name="radio"
                  label={
                    <Text size="12px" style={{ cursor: 'pointer' }}>
                      Across <strong>all available</strong> practices
                    </Text>
                  }
                  checked={personalizeYearSelection === 'ALL'}
                  onClick={() => {
                    setPersonalizeYearSelection('ALL');
                    setYears([]);
                  }}
                  block
                  size="14px"
                  height="20px"
                />
                <RadioButton
                  style={{ padding: '0px', margin: '0px' }}
                  name="radio"
                  label={
                    <Text size="12px" style={{ cursor: 'pointer' }}>
                      Across <strong>specific</strong> practices
                    </Text>
                  }
                  checked={personalizeYearSelection === 'SPECIFIC'}
                  onClick={() => setPersonalizeYearSelection('SPECIFIC')}
                  block
                  size="14px"
                  height="20px"
                />
              </form>
              {personalizeYearSelection === 'SPECIFIC' && (
                <Select
                  spaceTop
                  style={{ width: '100%' }}
                  isMulti
                  value={years || null}
                  onChange={(
                    _: unknown,
                    action: MultiSelectAction<{ label: string; value: number }>
                  ) => {
                    if (action?.action === 'select-option') {
                      if (years) {
                        setYears([...years, action?.option]);
                      } else {
                        setYears([action?.option]);
                      }
                    }

                    if (action?.action === 'remove-value') {
                      setYears(
                        years?.filter(
                          (year) =>
                            year.value !== (action.removedValue.value as number)
                        ) || []
                      );
                    }
                  }}
                  isLoading={loadingPapers}
                  disable={!selectedSubject}
                  options={papers?.items
                    ?.slice()
                    ?.sort((a, b) => b.exam.year - a.exam.year)
                    .map((paper) => ({
                      label: paper.exam.name,
                      value: paper.exam.year,
                    }))}
                  placeholder="What practice(s) do you want to focus on?"
                />
              )}
            </Box>
          </Grid>
        )}

        <Spacer space="10px" />

        {mode === 'learning' && (
          <Box>
            <Text bold size="12px">
              Select topic(s)
            </Text>
            <Spacer space="10px" />
            <form>
              <RadioButton
                style={{ padding: '0px', margin: '0px' }}
                name="radio"
                label={
                  <Text size="12px" style={{ cursor: 'pointer' }}>
                    All topics
                  </Text>
                }
                checked={personalizeTopicSelection === 'ALL-TOPICS'}
                block
                size="14px"
                height="20px"
                onClick={() => {
                  setPersonalizeTopicSelection('ALL-TOPICS');
                  setTopics([]);
                }}
              />

              <RadioButton
                style={{ padding: '0px', margin: '0px' }}
                name="radio"
                label={
                  <Text size="12px" style={{ cursor: 'pointer' }}>
                    Specific topics
                  </Text>
                }
                checked={personalizeTopicSelection === 'SPECIFIC-TOPICS'}
                block
                size="14px"
                onClick={() => {
                  setPersonalizeTopicSelection('SPECIFIC-TOPICS');
                }}
                // style={{ cursor: 'pointer' }}
                height="20px"
              />
            </form>
            {personalizeTopicSelection === 'SPECIFIC-TOPICS' && (
              <Select
                spaceTop
                isMulti
                disable={!selectedSubject}
                placeholder="Start typing a topic"
                value={topicsState}
                inputValue={filter}
                isLoading={loadingTopics}
                isClearable
                block
                options={topics?.map((topic) => ({
                  label: topic,
                  value: topic,
                }))}
                onChange={(
                  _: unknown,
                  action: MultiSelectAction<{ label: string; value: string }>
                ) => {
                  if (action?.action === 'select-option') {
                    if (topicsState) {
                      setTopics([...topicsState, action?.option]);
                    } else {
                      setTopics([action?.option]);
                    }
                  }

                  if (action?.action === 'remove-value') {
                    setTopics(
                      topicsState?.filter(
                        (topic) =>
                          topic.value !== (action.removedValue.value as string)
                      ) || []
                    );
                  }
                }}
                onInputChange={setFilter}
              />
            )}
          </Box>
        )}

        {/* {mode === 'learning' && (
          <>
            <Spacer space="10px" />
            <Text>How many question would you like to have?</Text>
            <Row gutter={10}>
              <Col span={18}>
                <Slider
                  min={1}
                  max={18}

                  onChange={onChange}
                  value={
                    typeof inputValue === 'number' ? inputValue : 0
                  }
                />
              </Col>
              <Col span={6}>
                <InputNumber
                  min={1}
                  max={20}
                  style={{ width: '100%' }}
                  value={inputValue}
                  onChange={onChange}
                />
              </Col>
            </Row>
          </>
        )} */}

        <Spacer space="10px" />
        <Text
          color={Theme.PrimaryColor}
          style={{
            textAlign: 'center',
            cursor: 'pointer',
          }}
          onClick={() => setStep(2)}
        >
          Go back
        </Text>
      </PersonalizeWrapper>
    </Swiper>
  );
};

export default Personalize;
