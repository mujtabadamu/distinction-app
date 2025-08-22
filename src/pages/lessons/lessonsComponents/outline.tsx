import { Text } from '@flexisaf/flexibull2';
import React, { useRef, useEffect } from 'react';

import { Accordion } from 'components/accordion/accordion';
import {
  LessonGroupView,
  LessonView,
  SimpleLessonItemView,
  SimpleEnrolledLessonItemView,
} from 'generated/index';
import {
  CompletionTracker,
  getIconClassForLessonType,
  StudyTime,
} from 'utils/content-utils';
import { LessonItem, LessonType } from 'utils/content-utils';
import {
  capitalizeFirstLetterOFEachWord,
  formatSecondsToHumanReadableString,
} from 'utils/helpers';
import { useScrollIntoView } from 'hooks/general/useScrollIntoView';

interface LessonsOutlineProps {
  onLessonItemClick: (lesson: SimpleLessonItemView) => void;
  lessonGroups: LessonGroupView[];
  currentLessonItem?: LessonItem;
  progressMap: Record<string, SimpleEnrolledLessonItemView>;
  completionTracker: CompletionTracker;
  studyTime: StudyTime;
}

export const LessonsOutline = (props: LessonsOutlineProps) => {
  const outlineContainerRef = useRef<HTMLDivElement>(null);
  const currentLessonRef = useRef<HTMLDivElement>(null);

  // Determine the current lesson group id based on the currentLessonItem
  const currentLessonGroupId = React.useMemo(() => {
    if (!props.currentLessonItem) return undefined;
    for (const group of props.lessonGroups) {
      if (
        group.lessons?.some(
          (lesson) => lesson.id === props.currentLessonItem?.lessonId
        )
      ) {
        return group.id;
      }
    }
    return undefined;
  }, [props.currentLessonItem, props.lessonGroups]);

  const { scrollIntoView } = useScrollIntoView(
    currentLessonRef,
    outlineContainerRef
  );

  // Auto-scroll to current lesson when it changes
  useEffect(() => {
    if (props.currentLessonItem && currentLessonRef.current) {
      // Small delay to ensure the accordion has expanded
      const timer = setTimeout(() => {
        scrollIntoView();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [props.currentLessonItem, scrollIntoView]);

  return (
    <div
      ref={outlineContainerRef}
      className="max-h-[calc(100vh-200px)] overflow-y-auto"
    >
      <div className="rounded-lg border bg-white">
        {props.lessonGroups.map((lessonGroup) => (
          <Accordion
            key={lessonGroup.id}
            isOpen={lessonGroup.id === currentLessonGroupId}
            label={() => (
              <LessonGroupTag
                key={lessonGroup.id}
                title={lessonGroup.name ?? 'N/A'}
              />
            )}
          >
            {lessonGroup.lessons?.map((lesson) => {
              const isCurrentLesson =
                lesson.id === props.currentLessonItem?.lessonId;
              return (
                <div key={lesson.id} className="border-b pb-2">
                  <LessonAccordion
                    isCurrentLesson={isCurrentLesson}
                    currentLessonItem={props.currentLessonItem}
                    setLesson={props.onLessonItemClick}
                    lesson={lesson}
                    progressMap={props.progressMap}
                    completionTracker={props.completionTracker}
                    studyTime={props.studyTime}
                    currentLessonRef={
                      isCurrentLesson ? currentLessonRef : undefined
                    }
                  />
                </div>
              );
            })}
          </Accordion>
        ))}
      </div>
    </div>
  );
};

const LessonGroupTag = (p: { title: string }) => (
  <div className="flex items-center px-[20px] border-b py-4">{p.title}</div>
);

type SectionItemProps = {
  setLesson: (lesson: SimpleLessonItemView) => void;
  lesson: LessonView;
  isCurrentLesson?: boolean;
  currentLessonItem?: LessonItem;
  progressMap: Record<string, SimpleEnrolledLessonItemView>;
  completionTracker: LessonsOutlineProps['completionTracker'];
  studyTime: StudyTime;
  currentLessonRef?: React.RefObject<HTMLDivElement>;
};

const LessonAccordion = (p: SectionItemProps) => {
  const isCompleted =
    p.lesson?.id && p.completionTracker.lessonMap[p.lesson.id]?.isCompleted;

  return (
    <div ref={p.currentLessonRef} data-lesson-id={p.lesson.id}>
      <Accordion
        isOpen={p.isCurrentLesson}
        label={(isOpen) => (
          <div
            className={`flex px-[20px] items-center py-4 ${
              isOpen ? 'bg-gray-100' : 'bg-transparent'
            }`}
          >
            <div className="flex flex-col flex-1 min-w-0 mr-4">
              <Text
                bold
                size="14px"
                className="leading-[24px] flex items-center gap-2 truncate"
              >
                {p.lesson.title}
                {isCompleted && <CompletedTag />}
              </Text>
              <div className="flex text-smaller items-center gap-2">
                <span>
                  {p.lesson.lessonItems?.filter(
                    (item) =>
                      p.progressMap[item.id || '']?.status === 'COMPLETED'
                  ).length || 0}
                  /{p.lesson.lessonItems?.length || 0}
                </span>
                <span>•</span>
                <span>
                  {formatSecondsToHumanReadableString(
                    p.studyTime.lessons.find((st) => st.id === p.lesson.id)
                      ?.studyTime || 0
                  )}
                </span>
              </div>
            </div>
            <div className="flex-shrink-0 text-[20px] text-blue-grey-900">
              {isOpen ? '-' : '+'}
            </div>
          </div>
        )}
      >
        <>
          {p.lesson.lessonItems?.map((lessonItem) => {
            if (!lessonItem) return null;
            const isActive = lessonItem.id === p.currentLessonItem?.id;
            const progress = lessonItem.id
              ? p.progressMap[lessonItem.id]
              : undefined;
            // Find study time for this lesson item
            const itemStudyTime =
              p.studyTime.lessonItems.find((st) => st.id === lessonItem.id)
                ?.studyTime || 0;

            return (
              <LessonOutlineItem
                key={lessonItem.id}
                lessonItem={lessonItem}
                isActive={isActive}
                progress={progress}
                setLesson={p.setLesson}
                studyTime={itemStudyTime}
              />
            );
          })}
        </>
      </Accordion>
    </div>
  );
};

interface LessonOutlineItemProps {
  lessonItem: SimpleLessonItemView;
  isActive: boolean;
  progress?: SimpleEnrolledLessonItemView;
  setLesson: (lesson: SimpleLessonItemView) => void;
  studyTime: number;
}

const LessonOutlineItem: React.FC<LessonOutlineItemProps> = ({
  lessonItem,
  isActive,
  progress,
  setLesson,
  studyTime,
}) => {
  function renderMarker(status?: SimpleEnrolledLessonItemView['status']) {
    const baseClass =
      'inline-block w-3 h-3 rounded-full flex items-center justify-center';
    if (status === 'IN_PROGRESS') {
      return (
        <span className={`${baseClass} bg-yellow-400`} title="In Progress" />
      );
    }
    if (status === 'COMPLETED') {
      return (
        <span className={`${baseClass} bg-green-500`} title="Completed">
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </span>
      );
    }

    return null;
  }

  return (
    <div
      onClick={() => setLesson(lessonItem)}
      className={`px-[20px] hover:bg-gray-100 cursor-pointer py-2 flex items-center ${
        isActive && 'bg-gray-200'
      }`}
    >
      <div className="w-8 flex-shrink-0 flex items-center justify-center mr-2">
        {renderMarker(progress?.status)}
      </div>
      <i
        className={`${getIconClassForLessonType(
          lessonItem?.type as LessonType
        )} text-[16px] text-black flex-shrink-0 mr-3`}
      />
      <Text className="flex-1 min-w-0 truncate mr-4">
        {capitalizeFirstLetterOFEachWord(lessonItem.title ?? 'Untitled')}
      </Text>
      <Text className="text-smaller flex-shrink-0 min-w-[60px] text-right">
        {formatSecondsToHumanReadableString(studyTime)}
      </Text>
    </div>
  );
};

const CompletedTag = () => (
  <div className="bg-green-100 border border-green-200 text-[12px] text-green-600 rounded-lg px-2 ">
    {' '}
    Completed{' '}
  </div>
);
