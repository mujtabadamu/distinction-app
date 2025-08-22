import { useEffect, useState, useCallback, useMemo } from 'react';
import findLast from 'lodash/findLast';
import { useParams } from 'react-router-dom';
import { SimpleLessonItemView } from 'generated/index';
import { useGetCourseByIdQuery } from 'pages/courses/course-api';
import { sortLessonGroups } from 'utils/content-utils';
import { useCoursesEnrollment } from 'hooks/courses/useCourseEnrollment';
import { useCourseLessonItemsProgress } from 'hooks/courses/useCourseLessonItemProgress';
import { errorNotifier } from 'utils/helpers';
import { parseErrorMessage } from 'utils/errorHandlers';
import { useCompletionTracker } from 'hooks/courses/useCompletionTracker';
import { useCourseStudyTime } from 'hooks/general/useCourseStudyTime';

type LessonsViewRouteParams = { id: string };

export const useLessonView = () => {
  const { id } = useParams<LessonsViewRouteParams>();

  const {
    data: courseData,
    isLoading: isCourseLoading,
    error: courseError,
  } = useGetCourseByIdQuery({
    id: id as string,
  });

  const lessonGroups = sortLessonGroups(courseData?.lessonGroups ?? []);

  const studyTime = useCourseStudyTime(courseData);

  const [currentLesson, setCurrentLesson] = useState<SimpleLessonItemView>();

  const {
    isCoursesLoading,
    getEnrolledCourse,
    coursesError: enrolledCoursesError,
  } = useCoursesEnrollment();

  const enrolledCourse = getEnrolledCourse(id ?? '');
  const enrolledCourseId = enrolledCourse?.id;

  const lessonItemsProgressReturn = useCourseLessonItemsProgress({
    enrolledCourseId: enrolledCourseId ?? '',
  });
  const { sortedLessonItemProgress, progressMapByLessonItemId, startLessonItem, completeLessonItem, isLoading: isLoadingProgress, error:progressError } =
    lessonItemsProgressReturn;

  const completionTracker = useCompletionTracker(
    lessonGroups,
    progressMapByLessonItemId
  );

  const allLessonItems = useMemo(() => {
    const items: SimpleLessonItemView[] = [];
    for (const group of lessonGroups) {
      for (const lesson of group.lessons ?? []) {
        for (const item of lesson.lessonItems ?? []) {
          items.push(item);
        }
      }
    }
    return items;
  }, [lessonGroups]);

  const onLessonItemClick = useCallback(
    async (lessonItem: SimpleLessonItemView) => {
      if (lessonItem?.id) {
        setCurrentLesson(lessonItem);

        const progress = progressMapByLessonItemId[lessonItem?.id];
        if (
          progress &&
          ['COMPLETED', 'IN_PROGRESS'].includes(progress?.status as string)
        ) {
          return;
        }

        try {
          await startLessonItem(lessonItem.id);
        } catch (err) {
          errorNotifier(parseErrorMessage(err));
          console.error(err);
        }
      }
    },
    [progressMapByLessonItemId, setCurrentLesson, startLessonItem]
  );

  useEffect(
    function setDefaultLessonItem() {
      // Only run on mount or when lessonGroups/progress changes
      if (!lessonGroups || lessonGroups.length === 0) return;
      // if loading progress or there is an error, we can't set the default lesson item
      if(isLoadingProgress || progressError) return;
      if (currentLesson) return;

      const lastInProgress = findLast(
        sortedLessonItemProgress,
        (item) => item.status === 'IN_PROGRESS'
      );

      const last = lastInProgress
        ? lastInProgress
        : sortedLessonItemProgress.at(-1);

      if (last) {
        const found = allLessonItems.find(
          (item) => item.id === last.lessonItemId
        );
        if (found) {
          setCurrentLesson(found);
          return;
        }
      }

      // Otherwise set the first lessonItem in the array
      if (allLessonItems.length > 0) {
        const firstLessonItem = allLessonItems[0];
        setCurrentLesson(firstLessonItem);
        
        // Check if the first lesson item is not in progress and start it
        const progress = progressMapByLessonItemId[firstLessonItem.id || ''];
        if (!progress || !['COMPLETED', 'IN_PROGRESS'].includes(progress.status as string)) {
          // Start the first lesson item if it's not already in progress
          startLessonItem(firstLessonItem.id || '').catch((err) => {
            console.error(err);
          });
        }
      }
    },
    [
      lessonGroups,
      sortedLessonItemProgress,
      currentLesson,
      allLessonItems,
      isLoadingProgress,
      progressError,
      progressMapByLessonItemId,
      startLessonItem
    ]
  );

  const loadingState = {
    isCourseLoading,
    isCoursesLoading,
    lessonItemsProgressLoading: lessonItemsProgressReturn.isLoading,
    isLoadingData:
      isCourseLoading ||
      isCoursesLoading ||
      (enrolledCourseId && lessonItemsProgressReturn.isLoading),
  };

  const errors = {
    courseError,
    coursesError: enrolledCoursesError,
    lessonItemsProgressError: lessonItemsProgressReturn.error,
  };

  const actions = {
    setCurrentLesson,
    onLessonItemClick,
  };

  return {
    currentLesson,
    lessonGroups,
    actions,
    loadingState,
    errors,
    courseData,
    enrolledCourse,
    sortedLessonItemProgress,
    completeLessonItem,
    completionTracker,
    progressMap: progressMapByLessonItemId,
    studyTime,
  };
};
