import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleTotalQuestion } from '../../redux/statistics/reducer';
import {
selectSingleTotalQuestion
} from '../../redux/statistics/selectors';
interface IUseLearningStatisticsQuery {
  paperId: string | undefined;
}
const useGetSingleTotalQuestion = ({
  paperId
}: IUseLearningStatisticsQuery) => {
  const dispatch = useDispatch();
  const totalSingleQuestion= useSelector(
    selectSingleTotalQuestion
  );
 
  const getTotalQuestion = useCallback(() => {
    dispatch(
        fetchSingleTotalQuestion({
        data: {
            paperId:paperId || "",
        },
      })
    );
  }, [paperId]);
  useEffect(() => {
    if(!paperId) return
    getTotalQuestion();
  }, [paperId]);
  return {
    totalSingleQuestion
  };
};
export default useGetSingleTotalQuestion;