import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Spacer, Box, Select, Grid } from '@flexisaf/flexibull2';
import styled from 'styled-components';
import devices from '../../../utils/devices';
import { Typography } from 'antd';
import CardSelect from './CardSelect';
import { Swiper } from '../../../styles/dashboard/dashboard.styles';
import { selectExamGroupItem } from '../../../redux/papers/typings';
import { selectCurrentUser } from '../../../redux/auth/selectors';
import { Paper } from '../../../redux/papers/typings';
import { useSelector } from 'react-redux';
import { AsyncSelectComponent } from '../../../components/custom/AsyncSelect';
import usePapersGet from '../../../hooks/papers/usePapersGet';
import { OptionI } from 'components/quizPopUp/popUp';
import useSubjects from 'hooks/general/useSubjects';
import CurriculumSelector from './curriculumSelect';
import { motion } from 'framer-motion';
import { PrimaryButton } from 'styles/common/buttons.styles';
import { capitalizeFirstLetterOFEachWord } from 'utils/helpers';

const variants = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
};
interface Props {
  setSelectedExamGroup: (x: selectExamGroupItem | null) => void;
  selectedExamGroup: selectExamGroupItem | null;
  onProceedToNext: () => void;
}
const buttonVariants = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    y: 100,
    opacity: 0,
  },
};
const SelectExamGroup = ({
  setSelectedExamGroup,
  selectedExamGroup,
  onProceedToNext,
}: Props) => {
  const [selectedCurriculum, setSelectedCurriculum] = useState<
    'NUC' | 'NBTE' | 'NCCE' | 'OTHERS'
  >('NUC');
  const [department, setDepartment] = useState<OptionI | null>(null);
  const { isLoadingSubjects, subjectList, fetchSubjects } = useSubjects();
  const [localPapers, setLocalPapers] = useState<Paper[]>([]);

  const {
    papers,
    loadingPapers,
    searchText,
    setSearchText,
    setPage,
    page,
    increaseSize,
  } = usePapersGet({
    subjectId: department?.value,
    curriculum: selectedCurriculum,
  });

  const [randomPaper, setRandomPaper] = useState<Paper[]>([]);

  useEffect(() => {
    fetchSubjects({ curriculum: selectedCurriculum });
  }, [selectedCurriculum]);

  useEffect(() => {
    if (papers) {
      if (page === 1) {
        setLocalPapers(papers.items);
      } else {
        setLocalPapers((prev) => [...prev, ...papers.items]);
      }
    }
  }, [papers, page]);

  useEffect(() => {
    if (papers) {
      const defaultPapers = papers?.items
        .slice()
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
      setRandomPaper(defaultPapers);
    } else {
      setRandomPaper([]);
    }
  }, [papers, selectedCurriculum, loadingPapers, department]);

  useEffect(() => {
    setDepartment(null);
    setSelectedExamGroup(null);
    setLocalPapers([]);
    setPage(1);
  }, [selectedCurriculum, setSelectedExamGroup]);

  useEffect(() => {
    setSelectedExamGroup(null);
    setLocalPapers([]);
    setPage(1);
  }, [department]);

  const user = useSelector(selectCurrentUser);
  return (
    <Swiper variants={variants} initial="hidden" animate="visible">
      <Container>
        <>
          <Typography.Text className="welcome-text">
            Welcome back,{' '}
            <span>
              {user?.firstName
                ? user?.firstName?.charAt(0).toUpperCase() +
                  user?.firstName?.slice(1)
                : ''}
            </span>
          </Typography.Text>
          <Typography.Text className="course">
            Which course would you like to practice today?
          </Typography.Text>
          <Spacer space="20px" />
          <CurriculumSelector
            selectedCurriculum={selectedCurriculum}
            setSelectedCurriculum={setSelectedCurriculum}
            data-tour="select-curriculum"
          />
          <Box>
            <Label required>SCHOOL INFORMATION</Label>
            <InstructionText>
              Select department and course that applies to you
            </InstructionText>
            <Grid default="1fr 1fr" sm="1fr">
              <Select
                block
                label="DEPARTMENT "
                placeholder="Select department"
                isLoading={isLoadingSubjects}
                spaceTop
                value={department}
                onChange={(value: OptionI) => setDepartment(value)}
                options={subjectList?.map((subject) => {
                  return {
                    label: capitalizeFirstLetterOFEachWord(subject.name || ''),
                    value: subject.id,
                  };
                })}
                data-tour="select-department"
              />
              <Box>
                <LabelWrapper>
                  Course <span className="text-red-600">*</span>{' '}
                </LabelWrapper>
                <AsyncSelectComponent
                  placeholder="Search course"
                  value={selectedExamGroup}
                  onLoadMore={increaseSize}
                  onChange={(value) => {
                    if (!value) {
                      setSelectedExamGroup(null as any);
                      return;
                    }
                    if (value && value.label && value.value) {
                      const paper = localPapers?.find(
                        (paper) => paper.id === value.value
                      );
                      if (paper) {
                        setSelectedExamGroup({
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
                    localPapers?.map((v) => ({
                      label: `${capitalizeFirstLetterOFEachWord(
                        v?.name
                      )} (${capitalizeFirstLetterOFEachWord(v.exam.name)})`,
                      value: v?.id,
                    })) ?? []
                  }
                  data-tour="select-course"
                />
              </Box>
            </Grid>
          </Box>
          <Spacer space="20px" />
          {selectedExamGroup && (
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ width: '100%' }}
            >
              <PrimaryButton
                style={{
                  width: '50%',
                  margin: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  zIndex: 0,
                }}
                onClick={onProceedToNext}
                data-tour="proceed-button"
              >
                Proceed to next
              </PrimaryButton>
              <Spacer space="10px" />
            </motion.div>
          )}
          <DividerContainer>
            <Line />
            <span
              style={{
                padding: '0 16px',
                color: '#000',
                fontSize: '0.825rem',
                fontWeight: '500',
              }}
            >
              OR
            </span>
            <Line />
          </DividerContainer>
          <Box>
            {isLoadingSubjects ? (
              <Skeleton height={150} />
            ) : (
              <>
                <Typography.Text
                  style={{
                    fontWeight: '700',
                    textAlign: 'center',
                    marginRight: 'auto',
                  }}
                >
                  RECOMMENDED COURSES
                </Typography.Text>
                <InstructionText>
                  Practice courses tailored for you.
                </InstructionText>
                <Grid
                  default="repeat(4, 1fr)"
                  md="1fr 1fr"
                  sm="1fr"
                  data-tour="recommended-courses"
                >
                  {randomPaper.length > 0 ? (
                    randomPaper.map((paper) => (
                      <CardSelect
                        key={paper.id}
                        selectedExamGroup={selectedExamGroup}
                        setSelectedExamGroup={setSelectedExamGroup}
                        paper={paper}
                        papers={papers}
                        onProceedToNext={onProceedToNext}
                      />
                    ))
                  ) : (
                    <Typography.Text>
                      No featured courses available for this curriculum.
                    </Typography.Text>
                  )}
                </Grid>
              </>
            )}
          </Box>
        </>
      </Container>
    </Swiper>
  );
};
export default SelectExamGroup;
const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 900px;
  width: 90%;
  & .welcome-text {
    font-weight: 500;
    text-align: center;
    @media ${devices.mobileS} {
      font-size: 20px;
    }
    @media ${devices.tablet} {
      font-size: 30px;
    }
  }
  & .course {
    text-align: center;
    @media ${devices.mobileS} {
      font-size: 15px;
    }
    @media ${devices.tablet} {
      font-size: 20px;
    }
  }
`;
const LabelWrapper = styled.div`
  font-weight: 600;
  font-size: 0.95em;
  text-transform: uppercase;
  color: #1a202c;
  margin-bottom: 5px;
`;
const Label = styled.label<{ required?: boolean }>`
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 0.99em;
  text-transform: uppercase;
  color: #1a202c;
  ${(props) =>
    props.required &&
    `
    &::after {
      content: ' *';
      color: #e53e3e;
    }
  `}
`;
const InstructionText = styled.p`
  font-size: 16px;
  color: #000000cc;
  margin-top: 4px;
  margin-bottom: 24px;
`;

const DividerContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 16px 0;
`;
const Line = styled.div`
  flex-grow: 1;
  height: 1px;
  border: 0.5px solid #d1d5db;
`;
