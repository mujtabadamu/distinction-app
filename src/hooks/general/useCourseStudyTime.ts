import { useMemo } from 'react';
import {
  CourseView,
  LessonGroupView,
  LessonView,
  LessonItemView,
} from 'generated/index';
import { StudyTime } from 'utils/content-utils';

export const useCourseStudyTime = (course?: CourseView): StudyTime => {
  return useMemo(() => {
    if (!course) {
      return {
        lessonGroups: [],
        lessons: [],
        lessonItems: [],
        totalStudyTime: 0,
      };
    }

    const lessonGroups: StudyTime['lessonGroups'] = [];
    const lessons: StudyTime['lessons'] = [];
    const lessonItems: StudyTime['lessonItems'] = [];
    let totalStudyTime = 0;

    // Process lesson groups
    course.lessonGroups?.forEach((group: LessonGroupView) => {
      let groupStudyTime = 0;

      // Process lessons in this group
      group.lessons?.forEach((lesson: LessonView) => {
        let lessonStudyTime = 0;

        // Process lesson items in this lesson
        lesson.lessonItems?.forEach((item: LessonItemView) => {
          const itemStudyTime = item.studyTimeSecs || 0;
          lessonItems.push({
            id: item.id || '',
            studyTime: itemStudyTime,
          });
          lessonStudyTime += itemStudyTime;
        });

        lessons.push({
          id: lesson.id || '',
          studyTime: lessonStudyTime,
        });
        groupStudyTime += lessonStudyTime;
      });

      lessonGroups.push({
        id: group.id || '',
        studyTime: groupStudyTime,
      });
      totalStudyTime += groupStudyTime;
    });

    return {
      lessonGroups,
      lessons,
      lessonItems,
      totalStudyTime,
    };
  }, [course]);
};
