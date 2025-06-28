import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SimpleLessonItemView } from 'generated/index';
import { useGetCourseByIdQuery } from 'pages/courses/course-api';
import { sortLessonGroups } from 'utils/content-utils';

type LessonsViewRouteParams = { id: string };

export const useLessonView = () => {
  const { id } = useParams<LessonsViewRouteParams>();

  const { data: courseData, isLoading } = useGetCourseByIdQuery({
    id: id as string,
  });

  const lessonGroups = sortLessonGroups(courseData?.lessonGroups ?? []);

  const [currentLesson, setCurrentLesson] = useState<SimpleLessonItemView>();

  useEffect(function setDefaultLesson() {
    if (!currentLesson && lessonGroups) {
      setCurrentLesson(lessonGroups?.[0]?.lessons?.[0]?.lessonItems?.[0]);
    }
  });

  const loadingState = {
    isLoadingData: isLoading,
  };

  const errors = {
    lessonGroupErrors: undefined,
  };

  const actions = {
    setCurrentLesson,
  };

  return {
    currentLesson,
    lessonGroups,
    actions,
    loadingState,
    errors,
    courseData,
  };
};
