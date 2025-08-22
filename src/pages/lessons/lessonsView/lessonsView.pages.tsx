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
import { FeedbackFormEmbed } from 'components/feedback/feedback';
import urls from 'utils/config';

const LessonsView = () => {
  const {
    currentLesson,
    actions,
    lessonGroups,
    courseData,
    loadingState,
    completeLessonItem,
    progressMap,
    studyTime,
    completionTracker,
  } = useLessonView();

  const handleLessonItemComplete = async (lessonItem: LessonItem) => {
    await completeLessonItem({ id: lessonItem.id });
  };

  const lessonOutlineView = (
    <LessonsOutline
      completionTracker={completionTracker}
      progressMap={progressMap}
      currentLessonItem={currentLesson as LessonItem}
      onLessonItemClick={actions.onLessonItemClick}
      lessonGroups={lessonGroups ?? []}
      studyTime={studyTime}
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
          totalModules={lessonGroups?.length ?? 0}
          completedModules={completionTracker.completedLessonGroupsCount}
        />
      </div>
      <div className="grid md:grid-cols-[2.2fr_1fr] lg:grid-cols-[2.5fr_1fr] gap-6">
        <div className="flex flex-col">
          <div className="sticky top-0 mx-[-1.9em]   md:m-0 mb-6">
            <LessonRenderer
              lesson={currentLesson as LessonItem}
              onComplete={handleLessonItemComplete}
              progressMap={progressMap}
            />
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
        <div className="hidden md:block max-w-[480px]">{lessonOutlineView}</div>
      </div>

      {/* Feedback Form */}
      <FeedbackFormEmbed
        title="Let's have your feedback"
        position="bottom-right"
        className="mr-[20px]"
        formUrl={urls.COURSE_FEEDBACK_FORM_URL}
      />
    </Box>
  );
};

const LessonsHeader = (p: {
  title: string;
  totalModules: number;
  completedModules: number;
}) => {
  const progressValue = (p.completedModules / p.totalModules) * 100;

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
          {p.completedModules} of {p.totalModules} complete
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
