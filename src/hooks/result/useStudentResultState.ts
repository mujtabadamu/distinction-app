import { useSelector } from 'react-redux';

import { selectPaperResult } from '../../redux/studentPapers/selectors';

const useStudentResultState = () => {
  const paperResult = useSelector(selectPaperResult);

  return {
    paperResult,
  };
};

export default useStudentResultState;
