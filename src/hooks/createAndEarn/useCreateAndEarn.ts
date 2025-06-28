import { useDispatch, useSelector } from 'react-redux';
import {
  createBulkQuestionsStart,
  createQuestionStart,
  fetchQuestionsStart,
  fetchQuestionsStatsStart,
} from '../../redux/createAndEarn/reducers';
import {
  BulkQuestionCreatePayload,
  GetQuestionsPayload,
  GetQuestionsStatsPayload,
  QuestionCreatePayload,
} from '../../redux/createAndEarn/typings';
import {
  isFetchingQuestions,
  selectIsFetchingQuestionsStats,
  selectQuestions,
  selectQuestionsStats,
} from '../../redux/createAndEarn/selectors';

const useCreateAndEarn = () => {
  const dispatch = useDispatch();
  const questionsLoading = useSelector(isFetchingQuestions);
  const questionStats = useSelector(selectQuestionsStats);
  const loadingQuestionStats = useSelector(selectIsFetchingQuestionsStats);
  const questions = useSelector(selectQuestions);
  const questionsList = questions?.items;

  const createQuestion = (data: QuestionCreatePayload) => {
    dispatch(createQuestionStart(data));
  };

  const uploadBulkQuestions = (data: BulkQuestionCreatePayload) => {
    dispatch(createBulkQuestionsStart(data));
  };

  const getQuestionsStats = (data: GetQuestionsStatsPayload) => {
    dispatch(fetchQuestionsStatsStart(data));
  };

  const getQuestions = (data: GetQuestionsPayload) => {
    dispatch(fetchQuestionsStart(data));
  };

  return {
    createQuestion,
    uploadBulkQuestions,
    getQuestionsStats,
    getQuestions,
    questionsLoading,
    questionStats,
    loadingQuestionStats,
    questionsList,
    questions,
  };
};

export default useCreateAndEarn;
