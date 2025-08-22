import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const useStudentResultState = () => {
  const { paperResult } = useSelector(
    (state: RootState) => state.studentPaperUI
  );

  return {
    paperResult,
  };
};

export default useStudentResultState;
