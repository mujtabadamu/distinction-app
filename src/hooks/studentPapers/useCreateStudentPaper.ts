import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createStudentPaperStart,
  resetStudentPapersState,
} from '../../redux/studentPapers/reducer';
import {
  selectIsCreatingStudentPaper,
  selectStudentPaper,
} from '../../redux/studentPapers/selectors';
import { PostStudentPapersPayload } from '../../redux/studentPapers/typings';
import { clientErrorHandler } from '../../utils/errorHandlers';

const useStudentPaperPost = () => {
  const dispatch = useDispatch();
  const isCreating = useSelector(selectIsCreatingStudentPaper);
  const paper = useSelector(selectStudentPaper);

  const createStudentPaper = useCallback(
    (data: PostStudentPapersPayload) => {
      if (data.paperId === '')
        return clientErrorHandler('Please select a paper');
      dispatch(createStudentPaperStart(data));
    },
    [dispatch]
  );

  const resetStudentPaper = () => {
    dispatch(resetStudentPapersState());
  };

  return {
    createStudentPaper,
    isCreatingStudentPaper: isCreating,
    studentPaper: paper,
    resetStudentPaper,
  };
};

export default useStudentPaperPost;
