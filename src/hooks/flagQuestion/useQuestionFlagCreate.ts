import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsFlaggingQuestion } from '../../redux/flagQuestion/selectors';
import { FlagQuestionPayload } from '../../redux/flagQuestion/typings';
import { createFlagStart } from '../../redux/flagQuestion/reducers';

const useQuestionFlagCreate = () => {
  const dispatch = useDispatch();
  const createQuestionFlag = useCallback((data: FlagQuestionPayload) => {
    dispatch(createFlagStart(data));
  }, []);

  const isCreatingFlag = useSelector(selectIsFlaggingQuestion);
  return {
    isCreatingFlag,
    createQuestionFlag,
  };
};

export default useQuestionFlagCreate;
