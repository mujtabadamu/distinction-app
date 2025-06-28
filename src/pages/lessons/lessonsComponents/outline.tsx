import { Text } from '@flexisaf/flexibull2';

import { Accordion } from 'components/accordion/accordion';
import {
  LessonGroupView,
  LessonView,
  SimpleLessonItemView,
} from 'generated/index';
import { getIconClassForLessonType } from 'utils/content-utils';
import { LessonItem, LessonType } from 'utils/content-utils';

interface LessonsOutlineProps {
  setLesson: (lesson: SimpleLessonItemView) => void;
  lessonGroups: LessonGroupView[];
  currentLessonItem?: LessonItem;
}

export const LessonsOutline = (props: LessonsOutlineProps) => {
  return (
    <div>
      <div className="rounded-lg border bg-white">
        {props.lessonGroups.map((lessonGroup, i) => (
          <Accordion
            isOpen={i === 0}
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
                    setLesson={props.setLesson}
                    lesson={lesson}
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
};

const LessonAccordion = (p: SectionItemProps) => {
  return (
    <Accordion
      isOpen={p.isCurrentLesson}
      label={(isOpen) => (
        <div
          className={`flex px-[20px] items-center py-4 ${
            isOpen ? 'bg-gray-100' : 'bg-transparent'
          }`}
        >
          <div className="flex flex-col max-w-[320px]">
            <Text bold size="14px" className="leading-[24px]">
              {p.lesson.title}
            </Text>
            <div className="  flex text-smaller items-center gap-1">
              <span>0/3</span>
              <span>•</span>
              <span>18 mins</span>
            </div>
          </div>
          <div className="ml-auto  text-[20px] text-blue-grey-900">
            {isOpen ? '-' : '+'}
          </div>
        </div>
      )}
    >
      <>
        {p.lesson.lessonItems?.map((lessonItem) => {
          const isActive = lessonItem.id === p.currentLessonItem?.id;
          if (!lessonItem) return;
          return (
            <div
              key={lessonItem.id}
              onClick={() => p.setLesson(lessonItem)}
              className={`px-[20px] hover:bg-gray-100  cursor-pointer py-2 flex gap-2 items-center ${
                isActive && 'bg-gray-200'
              }`}
            >
              <div className="w-8 shrink-0"></div>
              <i
                className={`${getIconClassForLessonType(
                  lessonItem?.type as LessonType
                )} text-[16px] text-black `}
              />
              <Text> {lessonItem.title} </Text>
              <Text className="ml-auto"> 23:45</Text>
            </div>
          );
        })}
      </>
    </Accordion>
  );
};
