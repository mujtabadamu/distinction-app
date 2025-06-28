import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSubjectsStart } from '../../redux/subjects/reducer';
import {
  selectIsFetchingSubjects,
  selectSubjectsList,
} from '../../redux/subjects/selectors';
import { GetSubjectsPayload } from '../../redux/subjects/typings';

const useSubjectsGet = ({ examGroupId }: GetSubjectsPayload) => {
  const dispatch = useDispatch();
  const isFetching = useSelector(selectIsFetchingSubjects);
  const subjects = useSelector(selectSubjectsList);

  useEffect(() => {
    dispatch(fetchSubjectsStart({ examGroupId }));
  }, [dispatch, examGroupId]);

  return {
    loadingSubjects: isFetching,
    subjects,
  };
};

export default useSubjectsGet;
