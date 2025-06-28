import { Box } from '@flexisaf/flexibull2';
import { Cardselectdiv } from '../../../styles/dashboard/dashboard.styles';
import { Typography } from 'antd';
import { CustomRate } from '../../../styles/practice/practice.styles';
import {
  Paper,
  selectExamGroupItem,
  GetPapersSuccess,
} from '../../../redux/papers/typings';
import { Spacer } from '@flexisaf/flexibull2';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

interface Props {
  setSelectedExamGroup: (x: selectExamGroupItem) => void;
  selectedExamGroup: selectExamGroupItem | null;
  paper: Paper;
  papers: GetPapersSuccess | null;
  onProceedToNext: () => void;
}
const CardSelect = ({
  selectedExamGroup,
  paper,
  papers: AllPapers,
  setSelectedExamGroup,
  onProceedToNext,
}: Props) => {
  const { state } = useLocation();
  const recommendedPracticeId = state?.data?.recommendedPracticeId;
  useEffect(() => {
    if (!recommendedPracticeId) return;
    const recommendedPaper =
      AllPapers &&
      AllPapers.items.find((item) => item.id === recommendedPracticeId);
    if (recommendedPaper) {
      setSelectedExamGroup({
        label: `${
          recommendedPaper.name
        } (${recommendedPaper.exam.name.trim()})`,
        value: recommendedPaper.id,
        ...recommendedPaper,
      });
    }
  }, [recommendedPracticeId]);
  return (
    <label style={{ margin: '0 0 0.8rem 0' }}>
      <input
        type="radio"
        checked={selectedExamGroup?.id === paper.id}
        style={{ opacity: 0, position: 'absolute', left: '-9999px' }}
        onChange={() => {
          setSelectedExamGroup({
            label: `${paper.name} (${paper.exam.name.trim()})`,
            value: paper.id,
            ...paper,
          });
        }}
      />
      <Cardselectdiv
        className={selectedExamGroup?.id === paper.id ? 'active' : ''}
        onClick={onProceedToNext}
      >
        <Typography.Text className="elipse-text">
          {paper.name} ({paper.exam.name.trim()})
        </Typography.Text>
        <Box>
          <CustomRate disabled defaultValue={paper.averageRating} />
        </Box>
        <Spacer space="2px" />
      </Cardselectdiv>
    </label>
  );
};
export default CardSelect;
