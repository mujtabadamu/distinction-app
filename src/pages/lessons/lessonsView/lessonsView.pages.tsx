import { Box, Text } from '@flexisaf/flexibull2';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { CourseCrumb } from 'pages/courses/courseView/course-crumb';
import { LessonItem } from 'utils/content-utils';
import { LessonRenderer } from 'components/lessonRenderer/lessonRenderer';
import { useLessonView } from './useLessonsView';
import { LessonsOutline } from '../lessonsComponents/outline';
import ContentViewer from 'components/content-viewer/content-viewer';
import { Accordion } from 'components/accordion/accordion';
import { SimpleLessonItemView } from 'generated/index';
import SectionLoader from 'components/custom/sectionLoader';

const LessonsView = () => {
  const { currentLesson, actions, lessonGroups, courseData, loadingState } =
    useLessonView();

  const lessonOutlineView = (
    /* NOTE some fields in the generate LessonItemView are not supposed to be optionl, typecasting for now  */
    <LessonsOutline
      currentLessonItem={currentLesson as LessonItem}
      setLesson={actions.setCurrentLesson}
      lessonGroups={lessonGroups ?? []}
    />
  );

  const titleWithMaybeCourseCode = `${
    courseData?.courseCode ? `${courseData.courseCode}- ` : ''
  }  ${courseData?.title ?? 'Course'}`;

  if (loadingState.isLoadingData) return <SectionLoader />;

  return (
    <Box pad="1.5rem" className="flex flex-col ">
      <div className="mb-2">
        <CourseCrumb courseTitle={courseData?.title ?? 'N/A'} />
      </div>
      <div className="mb-4 md:mb-6">
        <LessonsHeader
          title={titleWithMaybeCourseCode}
          totalLessons={lessonGroups?.length ?? 0}
          completedLessons={0}
        />
      </div>
      <div className="grid md:grid-cols-[1.8fr_1fr] gap-6">
        <div className="flex flex-col">
          <div className="sticky top-0 mx-[-1.9em] mb-2  md:m-0 mb-6">
            {/* NOTE some fields in the generate LessonItemView are not supposed to be optionl, typecasing for now  */}
            <LessonRenderer lesson={currentLesson as LessonItem} />
          </div>
          <div className="mb-6">
            <MobileOutlineWrapper currentLesson={currentLesson}>
              {lessonOutlineView}
            </MobileOutlineWrapper>
          </div>
          <LessonDescription
            description={currentLesson?.description ?? currentLesson?.title}
          />
        </div>
        <div className="hidden md:block">{lessonOutlineView}</div>
      </div>
    </Box>
  );
};

const LessonsHeader = (p: {
  title: string;
  totalLessons: number;
  completedLessons: number;
}) => {
  const progressValue = (p.completedLessons / p.totalLessons) * 100;

  return (
    <div className="flex  justify-between items-end">
      <div className="flex flex-col gap-2">
        <Text> Course Learning Module</Text>
        <Text bold className="text-[14px] md:text-[22px]">
          {p.title}
        </Text>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-[30px] h-[30px]">
          <CircularProgressbar
            value={progressValue}
            styles={buildStyles({
              pathColor: '#E8198B',
              trailColor: '#BFDBFE',
            })}
          />
        </div>

        <Text size="12px">
          {p.completedLessons} of {p.totalLessons} complete
        </Text>
      </div>
    </div>
  );
};

const MobileOutlineWrapper = (p: {
  currentLesson?: SimpleLessonItemView;
  children: React.ReactNode;
}) => {
  return (
    <Accordion
      label={(isOpen) => (
        <div className="flex p-2 rouded-md border rounded-bl-0 rounded-br-0 items-center justify-between">
          {!isOpen && (
            <Text className="w-7/12 ellipsis">{p.currentLesson?.title}</Text>
          )}
          <Text className="ml-auto inline-flex gap-2">
            {' '}
            <span>{isOpen ? '▾ ' : '◂ '}</span>
            <span> Content</span>
          </Text>
        </div>
      )}
      className="block mb-6 md:hidden md:m-0 "
    >
      {p.children}
    </Accordion>
  );
};

const LessonDescription = (props: { description?: string }) => (
  <div className=" p-3  text-[14px] border rounded-lg">
    <ContentViewer botResponse={props.description ?? 'N/A'} />
  </div>
);

export default LessonsView;
