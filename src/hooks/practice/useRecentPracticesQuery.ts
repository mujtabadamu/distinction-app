import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useStudentPapersQuery from '../studentPapers/useStudentPaperQuery';
import useStudentPracticeQuery from '../studentPractice/useStudentPracticeQuery';
import { selectActiveExamGroup } from '../../redux/examGroups/selectors';
import { setMostRecentPractice } from '../../redux/statistics/reducer';

export interface IRecentPractice {
  exam: string;
  status: 'COMPLETED' | 'STARTED';
  mode: Mode;
  updatedAt: string;
  id: string;
  timeElapsed?: number;
  duration?: number;
  subject: string;
}

const useRecentPracticesQuery = () => {
  const dispatch = useDispatch();
  const activeExamGroup = useSelector(selectActiveExamGroup);
  const { loadingPracticeHistory, practiceHistory } = useStudentPracticeQuery({
    run: true,
  });

  const { loadingStudentPapersHistory, studentPapersHistory } =
    useStudentPapersQuery({
      options: {
        examGroupId: activeExamGroup?.value,
      },
    });

  const [recentPractices, setRecentPractices] = useState<
    IRecentPractice[] | null
  >(null);

  const computeRecentPractices = () => {
    const learningModePractices = practiceHistory?.items.slice(0, 3);
    const realModePractices = studentPapersHistory?.items.slice(0, 3);
    const recentPractices: IRecentPractice[] = [];
    if (learningModePractices) {
      for (const practice of learningModePractices) {
        recentPractices.push({
          exam: practice.name,
          subject: practice.subject.name,
          mode: 'learning',
          status: practice.completed ? 'COMPLETED' : 'STARTED',
          updatedAt: practice.createdAt,
          id: practice.id,
        });
      }
    }

    if (realModePractices) {
      for (const practice of realModePractices) {
        recentPractices.push({
          subject: practice.paper.subject.name,
          exam: practice.paper.name,
          mode: 'real',
          status: practice.status === 'COMPLETED' ? 'COMPLETED' : 'STARTED',
          updatedAt: practice.updatedAt,
          id: practice.id,
          timeElapsed: practice.timeElapsed,
          duration: practice.paper.duration,
        });
      }
    }

    if (recentPractices.length) {
      const sortedPractices = recentPractices.sort((a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);
        return dateB.getTime() - dateA.getTime();
      });
      setRecentPractices(sortedPractices);
      dispatch(
        setMostRecentPractice(
          recentPractices.find((p) => p.status === 'STARTED') || null
        )
      );
    } else {
      setRecentPractices(null);
    }
  };

  useEffect(() => {
    if (!loadingPracticeHistory && !loadingStudentPapersHistory) {
      computeRecentPractices();
    } else {
      setRecentPractices(null);
    }
  }, [loadingPracticeHistory, loadingStudentPapersHistory]);

  return {
    loadingRecent: loadingPracticeHistory || loadingStudentPapersHistory,
    recentPractices: recentPractices,
  };
};

export default useRecentPracticesQuery;
