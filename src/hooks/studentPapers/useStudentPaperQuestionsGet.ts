import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentPaperQuestionsStart } from '../../redux/studentPapers/reducer';
import {
  selectIsFetchingStudentPaperQuestions,
  selectStudentPaperQuestions,
} from '../../redux/studentPapers/selectors';
import { GetStudentPaperQuestionsPayload } from '../../redux/studentPapers/typings';

const useStudentPaperQuestionsGet = ({
  id,
  page,
  size,
}: GetStudentPaperQuestionsPayload) => {
  const dispatch = useDispatch();
  const isFetching = useSelector(selectIsFetchingStudentPaperQuestions);
  const [fetch, setFetch] = useState(0);
  const studentPaperQuestions = useSelector(selectStudentPaperQuestions);
  const refetch = () => setFetch((prev) => prev + 1);

  const fetchQuestions = useCallback(() => {
    dispatch(fetchStudentPaperQuestionsStart({ id, page, size }));
  }, [dispatch, id, page, size]);

  useEffect(() => {
    fetchQuestions();
  }, [id, page, size, fetch]);

  return {
    gettingStudentPaperQuestions: isFetching,
    studentPaperQuestions,
    refetch,
  };
};

export default useStudentPaperQuestionsGet;
