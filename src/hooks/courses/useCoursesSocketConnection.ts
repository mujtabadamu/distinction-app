import { useMemo } from 'react';
import useWebSocket, {
  WebSocketSubscriptionHandler,
} from '../general/useWebSocket';
import { CourseView, LessonGroupView } from 'generated/index';
import { errorNotifier } from 'utils/helpers';
import { COURSE_TAG_TYPE, courseApi } from 'pages/courses/course-api';
import { useAppDispatch } from 'store/store';

export type CourseImagePartial = Pick<
  CourseView,
  'bannerUrl' | 'coverImageUrl'
>;

export interface UseCourseSocketConnectionConfig {
  onCourseUpdate?: (data: CourseView) => void;
  onCourseImage?: (data: CourseImagePartial) => void;
  onLessonGroup?: (data: LessonGroupView) => void;
}

export const useCoursesSocketConnection = (
  config: UseCourseSocketConnectionConfig
) => {
  const dispatch = useAppDispatch();

  const subscriptions: WebSocketSubscriptionHandler[] = useMemo(() => {
    const subs: WebSocketSubscriptionHandler[] = [];

    if (config?.onCourseUpdate) {
      subs.push({
        topic: '/ws/updates/course',
        callback: (data: unknown) => {
          try {
            const coursePartial = JSON.parse(data as string) as CourseView;
            dispatch(courseApi.util.invalidateTags([COURSE_TAG_TYPE]));
            config.onCourseUpdate?.(coursePartial);
          } catch (err) {
            errorNotifier('Unable to parse course update message');
          }
        },
      });
    }

    if (config?.onCourseImage) {
      subs.push({
        topic: '/ws/updates/course_images',
        callback: (data: unknown) => {
          try {
            const courseImagePartial = JSON.parse(
              data as string
            ) as CourseImagePartial;
            config.onCourseImage?.(courseImagePartial);
          } catch (err) {
            errorNotifier('Unable to parse course images message');
          }
        },
      });
    }

    if (config?.onLessonGroup) {
      subs.push({
        topic: '/ws/updates/lesson_group',
        callback: (data: unknown) => {
          try {
            const lessonGroup = JSON.parse(data as string) as LessonGroupView;
            config.onLessonGroup?.(lessonGroup);
          } catch (err) {
            errorNotifier('Unable to parse course update message');
          }
        },
      });
    }

    return subs;
  }, [config]);

  const { client, sendMessage, readyState, error, isConnected } = useWebSocket({
    subscriptions,
  });

  return {
    client,
    sendMessage,
    readyState,
    error,
    isConnected,
  };
};
