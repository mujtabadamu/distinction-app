import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../store/store';
import {
  useEnhancedGetStudentPracticeQuery,
  useEnhancedGetStudentPapersQuery,
} from '../../store/enhancedApi';
import { setMostRecentPractice } from '../../store/statisticsSlice';

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
  const dispatch = useAppDispatch();
  // Use enhanced RTK Query hooks
  const { data: practiceHistory, isLoading: loadingPracticeHistory } =
    useEnhancedGetStudentPracticeQuery({});

  const { data: studentPapersHistory, isLoading: loadingStudentPapersHistory } =
    useEnhancedGetStudentPapersQuery({
      page: 0,
      size: 3,
    });

  const [recentPractices, setRecentPractices] = useState<
    IRecentPractice[] | null
  >(null);

  const computeRecentPractices = () => {
    // const learningModePractices = practiceHistory?.items?.slice(0, 3);
    // const realModePractices = studentPapersHistory?.items?.slice(0, 3);
    const recentPractices: IRecentPractice[] = [];

    // if (learningModePractices) {
    //   for (const practice of learningModePractices) {
    //     recentPractices.push({
    //       exam: practice.paper?.name || '',
    //       subject: practice.paper?.subject?.name || '',
    //       mode: 'learning',
    //       status: practice.completed ? 'COMPLETED' : 'STARTED' ,
    //       updatedAt: practice.paper?.createdAt || '',
    //       id: practice.id || '',
    //     });
    //   }
    // }

    // if (realModePractices) {
    //   for (const practice of realModePractices) {
    //     recentPractices.push({
    //       subject: practice.paper?.subject?.name || '',
    //       exam: practice.paper?.name || '',
    //       mode: 'real',
    //       status: practice.status === 'COMPLETED' ? 'COMPLETED' : 'STARTED',
    //       updatedAt: practice.updatedAt || '',
    //       id: practice.id || '',
    //       timeElapsed: practice.,
    //       duration: practice.paper?.duration,
    //     });
    //   }
    // }

    if (recentPractices.length) {
      const sortedPractices = recentPractices.sort((a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);
        return dateB.getTime() - dateA.getTime();
      });
      setRecentPractices(sortedPractices);

      // Dispatch the most recent started practice to Redux
      dispatch(
        setMostRecentPractice(
          sortedPractices.find(
            (p: IRecentPractice) => p.status === 'STARTED'
          ) || null
        )
      );
    } else {
      setRecentPractices(null);
      dispatch(setMostRecentPractice(null));
    }
  };

  useEffect(() => {
    if (!loadingPracticeHistory && !loadingStudentPapersHistory) {
      computeRecentPractices();
    } else {
      setRecentPractices(null);
    }
  }, [
    loadingPracticeHistory,
    loadingStudentPapersHistory,
    practiceHistory,
    studentPapersHistory,
  ]);

  return {
    loadingRecent: loadingPracticeHistory || loadingStudentPapersHistory,
    recentPractices: recentPractices,
  };
};

export default useRecentPracticesQuery;
