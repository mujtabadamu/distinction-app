import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExamsStart } from '../../redux/exams/reducer';
import { GetExamsPayload } from '../../redux/exams/typings';

// import { fetchSubjectsStart } from '../../redux/subjects/reducer';
import {
  selectIsFetchingExams,
  selectExamsList,
} from '../../redux/exams/selectors';

const useExamsGet = ({
  name,
  year,
  examGroupId,
  page,
  size,
}: GetExamsPayload) => {
  const dispatch = useDispatch();
  const isFetching = useSelector(selectIsFetchingExams);
  const exams = useSelector(selectExamsList);

  const fetchExams = useCallback(() => {
    dispatch(fetchExamsStart({ name, year, examGroupId, page, size }));
  }, [name, year, examGroupId, page, size]);

  useEffect(() => {
    fetchExams();
  }, [dispatch, name, year, examGroupId, page, size]);

  return {
    loadingExams: isFetching,
    exams,
  };
};

export default useExamsGet;
