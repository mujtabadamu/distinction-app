import { CourseView, LessonGroupView } from 'generated/index';
import {
  courseApi,
  useGetCourseGenerationRequestByIdQuery,
  useRegenerateCourseMutation,
} from 'pages/courses/course-api';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { useAppDispatch } from '../../store/store';

import { errorNotifier, hasMinItems } from 'utils/helpers';
import { useCoursesSocketConnection } from './useCoursesSocketConnection';
import { CustomRTKQueryError } from 'utils/errorHandlers';

export enum GenerationStatus {
  Done = 'DONE',
  Generating = 'GENERATING',
  Failed = 'FAILED',
}

export type GetLessonGrooupGenerationStatus = (
  lessonGroupId: string
) => GenerationStatus;

interface UseCourseGenerationProgressReturn {
  pendingLessonGroupsCount: number;
  totalLessonGroupsCount: number;
  retry: () => Promise<void>;
  isComplete: boolean;
  lastStreamedAt: Date | undefined;
  isLoadingLastStreamedAt: boolean;
  getLessonGroupGenerationStatus: GetLessonGrooupGenerationStatus;
  courseGenerationStatus: GenerationStatus;
  currentProgress: { percentage: number; message?: string } | undefined;
}

const FIFTEEN_MINUTES_IN_MS = 15 * 60 * 1000;

export const useCourseGenerationProgress = (
  course?: CourseView
): UseCourseGenerationProgressReturn => {
  const courseGenReqQuery = useGetCourseGenerationRequestByIdQuery(
    { id: course?.id as string },
    { skip: !course?.id, refetchOnMountOrArgChange: true }
  );

  const [regenerateCourseReq] = useRegenerateCourseMutation();
  const [lastStreamedAt, setLastStreamedAt] = useState<Date>();

  useEffect(() => {
    const lastTriedAt = courseGenReqQuery.data?.lastTriedAt;
    if (lastTriedAt) {
      setLastStreamedAt(new Date(lastTriedAt));
    }
  }, [courseGenReqQuery.data?.lastTriedAt]);

  // handling lessons update from websocket
  const dispatch = useAppDispatch();
  const onLessonGroup = useCallback(
    (data: LessonGroupView) => {
      if (!course?.id) return;
      dispatch(
        courseApi.util.updateQueryData(
          'getCourseById',
          { id: course.id },
          (draft) => {
            if (draft) {
              draft.lessonGroups = draft.lessonGroups?.map((group) => {
                if (group.id === data.id) {
                  group = data;
                }
                return group;
              });
            }
          }
        )
      );
    },
    [course?.id]
  );

  useCoursesSocketConnection({
    onLessonGroup,
  });

  const totalLessonGroupsCount = useMemo(
    () => course?.lessonGroups?.length ?? 0,
    [course?.lessonGroups?.length]
  );

  const pendingLessonGroupsCount = useMemo(() => {
    return (
      course?.lessonGroups?.filter((lg) => !hasMinItems(lg.lessons)).length ?? 0
    );
  }, [course?.lessonGroups]);

  const hasTimeElapsed = useMemo(() => {
    if (!lastStreamedAt) return false;
    const now = new Date();
    return now.getTime() - lastStreamedAt.getTime() > FIFTEEN_MINUTES_IN_MS;
  }, [lastStreamedAt]);

  const getLessonGroupStreamingState = useCallback(
    (lessonGroupId: string): GenerationStatus => {
      const lessonGroup = course?.lessonGroups?.find(
        (lg) => lg.id === lessonGroupId
      );

      if (!lessonGroup) {
        return GenerationStatus.Failed;
      }

      if (hasMinItems(lessonGroup?.lessons)) {
        return GenerationStatus.Done;
      }

      if (hasTimeElapsed) {
        return GenerationStatus.Failed;
      }
      return GenerationStatus.Generating;
    },
    [course?.lessonGroups, hasTimeElapsed]
  );

  // GenerationStatus.Failed if there are any pending modules
  // GenerationStatus.Done if all modules are complete
  // GenerationStatus.Generating if there are pending modules and time is not elapsed
  const courseGenerationStatus = useMemo((): GenerationStatus => {
    if (!course?.lessonGroups || course.lessonGroups.length === 0) {
      return GenerationStatus.Failed;
    }

    const allLessonGroupsHaveLessons = course.lessonGroups.every((lg) =>
      hasMinItems(lg.lessons)
    );

    if (allLessonGroupsHaveLessons) {
      return GenerationStatus.Done;
    }

    if (hasTimeElapsed) {
      return GenerationStatus.Failed;
    }

    return GenerationStatus.Generating;
  }, [course?.lessonGroups, hasTimeElapsed]);
  const isComplete = courseGenerationStatus === GenerationStatus.Done;
  const isLoadingLastStreamedAt = courseGenReqQuery.isLoading;

  const retry = useCallback(async () => {
    if (isComplete || !course?.id) return;
    try {
      await regenerateCourseReq({ id: course?.id }).unwrap();
      setLastStreamedAt(new Date());
    } catch (err) {
      const message = (err as CustomRTKQueryError).data?.message;
      errorNotifier(message);
    }
  }, [course?.id, isComplete]);

  return {
    isLoadingLastStreamedAt,
    isComplete,
    pendingLessonGroupsCount,
    totalLessonGroupsCount,
    retry,
    lastStreamedAt,
    getLessonGroupGenerationStatus: getLessonGroupStreamingState,
    courseGenerationStatus,
    currentProgress: undefined, // TODO: Implement progress tracking when needed
  };
};
