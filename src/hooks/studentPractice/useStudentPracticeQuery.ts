import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchSingleStudentPracticeStart,
  fetchStudentPracticeStart,
} from '../../redux/studentPractice/reducer';
import {
  selectIsFetchingSinglePractice,
  selectIsFetchingStudentPractice,
  selectStudentPractices,
  selectStudentPracticeData,
} from '../../redux/studentPractice/selectors';

interface IUseStudentPracticeQuery {
  id?: string;
  run?: boolean;
}

/**
 * Get either the student practice history or a particular student practice.
 * If Id is passed, it will return a single practice, else the history
 */

const useStudentPracticeQuery = ({
  id,
  run = true,
}: IUseStudentPracticeQuery) => {
  const dispatch = useDispatch();
  const isFetchingSingleStudentPractice = useSelector(
    selectIsFetchingSinglePractice
  );
  const isFetchingPracticeHistory = useSelector(
    selectIsFetchingStudentPractice
  );
  const singlePractice = useSelector(selectStudentPracticeData);
  const practiceHistory = useSelector(selectStudentPractices);

  const getSinglePractice = useCallback(() => {
    dispatch(
      fetchSingleStudentPracticeStart({
        data: {
          id: id || '',
        },
      })
    );
  }, [id]);

  useEffect(() => {
    if (!run) return;
    if (id) {
      getSinglePractice();
    } else {
      dispatch(
        fetchStudentPracticeStart({
          data: {},
        })
      );
    }
  }, []);

  return {
    loadingSinglePractice: isFetchingSingleStudentPractice,
    practiceHistory: !id ? practiceHistory : null,
    singlePractice: id ? singlePractice : null,
    loadingPracticeHistory: isFetchingPracticeHistory,
    run,
  };
};

export default useStudentPracticeQuery;
