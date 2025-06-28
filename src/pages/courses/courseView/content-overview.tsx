import { Button } from '@flexisaf/flexibull2/build/button';
import { Text } from '@flexisaf/flexibull2/build/typo';
import { CourseView } from 'generated/index';
import { useCallback, useMemo } from 'react';
import { LessonType } from 'utils/content-utils';
import { EnrolledCourseStatus } from '../enrolledCourseApi';

type ContentOverviewProps = {
  course: CourseView;
  onOpen: () => void;
  onEnroll: (id: string) => void;
  courseStatus: EnrolledCourseStatus | undefined;
  isEnrolling?: boolean;
};

export const ContentOverview = (p: ContentOverviewProps) => {
  const courseStat = getCourseContentMetrics(p.course);
  const info = useMemo(() => {
    const statList = [
      {
        icon: <i className="saf-calendar-1 text-[16px]" />,
        label: `${courseStat.numberOfLessonGroups} Weeks of learning`,
      },
      {
        icon: <i className="saf-clock text-[16px]" />,
        label: `Hours of on-demand reading materials`,
      },
      {
        icon: <i className="saf-document-text text-[16px]" />,
        label: `${courseStat.numberOfQuestions} multiple choice questions`,
      },
      {
        icon: <i className="saf-cards text-[16px]" />,
        label: `Flashcards`,
        hidden: courseStat.hasFlashcards,
      },
      {
        icon: <i className="saf-award text-[16px]" />,
        label: `Certificate of Completion`,
        hidden: courseStat.hasCertificate,
      },
    ];
    return statList.filter((l) => !l.hidden);
  }, [courseStat]);

  const renderActionButton = useCallback(() => {
    if (p.courseStatus) {
      const isStarted = p.courseStatus !== 'NOT_STARTED';

      return (
        <Button onClick={p.onOpen} style={{ width: '100%' }}>
          {isStarted ? 'Open' : 'Start Now'}
        </Button>
      );
    }

    return (
      <Button
        color="black"
        progress={p.isEnrolling}
        disabled={p.isEnrolling}
        onClick={() => p.onEnroll(p.course.id as string)}
        style={{ width: '100%' }}
      >
        {p.isEnrolling ? 'Enrolling...' : 'Enroll'}
      </Button>
    );
  }, [p]);

  return (
    <div className="rounded-lg border bg-white leading-[20px] h-[max-content] py-2">
      <Text block bold className="leading-inherit pb-2 mb-2 px-[12px] border-b">
        This course includes
      </Text>
      <div className="flex flex-col px-[12px]  ">
        <div className="mb-[14px]">
          {info.map((item) => (
            <div
              key={item.label}
              className="flex leading-inherit py-2 items-start"
            >
              <span className="mr-2"> {item.icon}</span>
              <span> {item.label}</span>
            </div>
          ))}
        </div>

        {renderActionButton()}
      </div>
    </div>
  );
};

const getCourseContentMetrics = (course: CourseView) => {
  let numberOfQuestions = 0;
  let hasFlashcards = false;
  if (course.lessonGroups) {
    for (const lessonGroup of course.lessonGroups) {
      if (lessonGroup.lessons) {
        for (const lesson of lessonGroup.lessons) {
          if (lesson.lessonItems) {
            for (const item of lesson.lessonItems) {
              if (item.type === LessonType.Quiz && item.content) {
                try {
                  const quizQuestions = JSON.parse(item.content);
                  if (Array.isArray(quizQuestions)) {
                    numberOfQuestions += quizQuestions.length;
                  }
                } catch (e) {
                  console.error(
                    'Error parsing quiz content for item ID:',
                    item.id,
                    e
                  );
                }
              }
              if (item.type === LessonType.Flashcard) {
                hasFlashcards = true;
              }
            }
          }
        }
      }
    }
  }

  const numberOfLessonGroups = course.lessonGroups?.length ?? 0;
  const hasCertificate = !!course.certificateUrl;

  return {
    numberOfLessonGroups,
    numberOfQuestions,
    hasFlashcards,
    hasCertificate,
  };
};
