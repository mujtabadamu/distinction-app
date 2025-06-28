import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStudentPracticeStart } from '../../redux/studentPractice/reducer';

import {
  selectIsCreatingStudentPractice,
  selectStudentPracticeData,
} from '../../redux/studentPractice/selectors';
import { PostStudentPracticePayload } from '../../redux/studentPractice/typings';
import { clientErrorHandler } from '../../utils/errorHandlers';

const useStudentPracticePost = () => {
  const dispatch = useDispatch();
  const isCreating = useSelector(selectIsCreatingStudentPractice);
  const practice = useSelector(selectStudentPracticeData);

  const createStudentPractice = useCallback(
    (payload: PostStudentPracticePayload) => {
      if (payload.data.paperId === '')
        return clientErrorHandler('Please select a paper');
      dispatch(createStudentPracticeStart(payload));
    },
    [dispatch]
  );

  return {
    createStudentPractice,
    isCreatingStudentPractice: isCreating,
    studentPractice: practice,
  };
};

export default useStudentPracticePost;
