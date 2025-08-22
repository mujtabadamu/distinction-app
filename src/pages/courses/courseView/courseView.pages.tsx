import Skeleton from 'react-loading-skeleton';
import { Box } from '@flexisaf/flexibull2';
import { useNavigate, useParams } from 'react-router-dom';

import { CourseHeader } from './course-header';
import { Tabs } from './tabs';
import { ModulesList } from './modules-list';
import { ContentOverview } from './content-overview';
import { CourseCrumb } from './course-crumb';
import { useGetCourseByIdQuery } from '../course-api';
import { sortLessonGroups } from 'utils/content-utils';
import { useCourseGenerationProgress as useCourseGenerationProgress } from 'hooks/courses/useCourseGenerationProgress';
import { useCoursesEnrollment } from 'hooks/courses/useCourseEnrollment';
import { useCourseStudyTime } from 'hooks/general/useCourseStudyTime';
import { FeedbackFormEmbed } from 'components/feedback/feedback';
import urls from 'utils/config';

export enum CourseViewRouteSearchParam {
  JustGenerated = 'just_generated',
}

type CourseViewRouteParams = { id: string };

const CourseView = () => {
  const { id: courseId } = useParams<CourseViewRouteParams>();
  const navigate = useNavigate();
  const { data: courseData, isLoading } = useGetCourseByIdQuery(
    {
      id: courseId as string,
    },
    { refetchOnMountOrArgChange: true }
  );

  const {
    pendingLessonGroupsCount,
    getLessonGroupGenerationStatus,
    courseGenerationStatus,
    retry,
    isLoadingLastStreamedAt,
    currentProgress: progressUpdate,
  } = useCourseGenerationProgress(courseData);

  const { enrollCourse, getCourseEnrollmentStatus, isEnrolling } =
    useCoursesEnrollment();

  const studyTime = useCourseStudyTime(courseData);

  const onOpenCourseLessons = () => {
    if (!courseData?.id) return;
    const path = `/courses/${courseData.id}/lessons`;
    navigate(path);
  };

  const sortedLessonGroups = sortLessonGroups(courseData?.lessonGroups ?? []);
  const tagsToDisplay = courseData?.tags?.slice(0, 5) ?? [];

  const courseStatus = getCourseEnrollmentStatus(courseId as string);
  const isPageLoading = isLoading || isLoadingLastStreamedAt;

  if (isPageLoading) return <CourseViewSkeleton />;

  return (
    <Box pad="1.5rem" className="flex flex-col ">
      <div className="mb-6">
        <CourseCrumb courseTitle={courseData?.title ?? 'N/A'} />
      </div>

      <div className="mb-12">
        <CourseHeader
          title={courseData?.title ?? 'N/A'}
          tags={tagsToDisplay}
          onBookmark={() => alert('bookmarked')}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-6 md:gap-10">
        <div className=" md:min-w-[360px] md:order-2">
          {courseData && (
            <ContentOverview
              course={courseData}
              onOpen={onOpenCourseLessons}
              onEnroll={enrollCourse}
              courseStatus={courseStatus}
              isEnrolling={isEnrolling}
            />
          )}
        </div>
        <div className="flex-grow ">
          <div className=" mb-10 bg-white p-[20px] rounded-md rounded-lg border">
            <Tabs
              learningObjectives={courseData?.learningObjectives ?? ['N/A']}
              intro={courseData?.description ?? 'N/A'}
            />
          </div>
          <ModulesList
            // isVerbose would be false, by the time we have public courses
            isVerbose
            lessonGroups={sortedLessonGroups}
            pendingCount={pendingLessonGroupsCount}
            courseStatus={courseGenerationStatus}
            currentProgress={progressUpdate}
            retry={retry}
            getLessonGroupGenerationStatus={getLessonGroupGenerationStatus}
            studyTime={studyTime}
          />
        </div>
      </div>

      {/* Feedback Form */}
      <FeedbackFormEmbed
        title="Help us improve"
        position="bottom-right"
        formUrl={urls.COURSE_FEEDBACK_FORM_URL}
      />
    </Box>
  );
};

const CourseViewSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 p-[1.5em]">
      <Skeleton height={50} />
      <Skeleton height={200} className="mb-4" />
      <div className="grid grid-cols-[1.8fr_1fr] gap-6 ">
        <div className="flex flex-col gap-8">
          <Skeleton height={240} />
          <Skeleton height={400} />
        </div>
        <Skeleton height={240} />
      </div>
    </div>
  );
};

export default CourseView;
