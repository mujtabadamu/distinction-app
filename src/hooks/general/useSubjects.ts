import { SimpleSubjectView, SubjectsService } from 'generated/index';
import { useState } from 'react';
import { apiWrapper } from 'utils/http-client';

export type CurriculumType = {
  curriculum: 'NUC' | 'NBTE' | 'NCCE' | 'OTHERS';
};

const useSubjects = () => {
  const [isLoadingSubjects, setIsLoadingSubjects] = useState<boolean>(false);
  const [subjectList, setSubjectList] = useState<SimpleSubjectView[] | null>(
    null
  );

  const fetchSubjects = async (payload: CurriculumType) => {
    setIsLoadingSubjects(true);
    try {
      const data = await apiWrapper(() =>
        SubjectsService.list2({ ...payload })
      );

      setIsLoadingSubjects(false);
      setSubjectList(data);
    } catch (error) {
      setIsLoadingSubjects(false);
      if (error instanceof Error) console.error(error.message);
    }
  };

  return {
    isLoadingSubjects,
    subjectList,
    fetchSubjects,
  };
};

export default useSubjects;
