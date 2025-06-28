import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchSingleStudentPaperStart,
  fetchStudentPapersStart,
} from '../../redux/studentPapers/reducer';
import {
  selectIsFetchingSinglePaper,
  selectStudentPapersList,
  selectIsFetchingStudentPapers,
  selectStudentPaper,
  selectCompletedStudentPapers,
  selectInProgressStudentPapers,
} from '../../redux/studentPapers/selectors';
import { GetStudentPapersPayload } from '../../redux/studentPapers/typings';

interface IUseStudentPapersQuery {
  id?: string;
  run?: boolean;
  options?: GetStudentPapersPayload['data'];
}

/**
 * Get either the student papers history or a particular student paper.
 * If ID is passed, it will return a single practice, else the history
 */

const useStudentPapersQuery = ({
  id,
  run = true,
  options,
}: IUseStudentPapersQuery) => {
  const dispatch = useDispatch();
  const isFetchingSingleStudentPaper = useSelector(selectIsFetchingSinglePaper);
  const isFetchPapersHistory = useSelector(selectIsFetchingStudentPapers);
  const studentPapersHistory = useSelector(selectStudentPapersList);
  const singlePaper = useSelector(selectStudentPaper);
  const completedPapers = useSelector(selectCompletedStudentPapers);
  const inProgress = useSelector(selectInProgressStudentPapers);

  const getSinglePaper = useCallback(() => {
    dispatch(
      fetchSingleStudentPaperStart({
        data: {
          id: id || '',
        },
      })
    );
  }, [id]);

  const getStudentPapersHistory = useCallback(() => {
    dispatch(
      fetchStudentPapersStart({
        data: { ...options },
        options: {
          filterBy: null,
        },
      })
    );
  }, [options]);

  const getCompletedStudentPapers = () => {
    dispatch(
      fetchStudentPapersStart({
        data: { ...options },
        options: {
          filterBy: 'completed',
        },
      })
    );
  };
  const getInprogressStudentPapers = () => {
    dispatch(
      fetchStudentPapersStart({
        data: { ...options },
        options: {
          filterBy: 'inProgress',
        },
      })
    );
  };

  useEffect(() => {
    if (!run) return;
    if (id) {
      getSinglePaper();
    } else {
      getStudentPapersHistory();
      getCompletedStudentPapers();
      getInprogressStudentPapers();
    }
  }, [id, run, options?.examGroupId,options?.page, options?.size]);

  return {
    loadingSinglePaper: isFetchingSingleStudentPaper,
    loadingStudentPapersHistory: isFetchPapersHistory,
    singlePaper: id ? singlePaper : null,
    studentPapersHistory: !id ? studentPapersHistory : null,
    run,
    completedPapers,
    inProgress,
  };
};

export default useStudentPapersQuery;
