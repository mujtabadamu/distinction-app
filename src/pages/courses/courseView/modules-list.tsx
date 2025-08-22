import { Text, Button } from '@flexisaf/flexibull2';
import { Accordion } from 'components/accordion/accordion';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { LessonGroupView } from 'generated/index';
import { formatSecondsToHumanReadableString } from 'utils/helpers';
import { useCallback, useState } from 'react';
import { GetLessonGroupGenerationStatus } from 'hooks/courses/useCourseGenerationProgress';
import { StudyTime } from 'utils/content-utils';
import Theme from 'utils/theme';
import AnimatedLabel from 'components/animatedLabel/animatedLabel';
import { GenerationStatus, GenerationProgress } from 'types/courseGeneration';
import { TextMaskingLoader } from 'components/textLoading/textLoading';
import pick from 'lodash/pick';

// -----Main Component-----

type ModulesListProps = {
  lessonGroups: LessonGroupView[];
  courseStatus: GenerationStatus;
  getLessonGroupGenerationStatus: GetLessonGroupGenerationStatus;
  pendingCount: number;
  retry?: () => Promise<void>;
  currentStageLabel?: string;
  currentProgress?: GenerationProgress | null;
  studyTime: StudyTime;
  isVerbose?: boolean;
};

export const ModulesList = (props: ModulesListProps) => {
  const [isSendingRetryRequest, setIsSendingRetryRequest] = useState(false);

  const onRetry = useCallback(async () => {
    if (!props.retry) return;
    try {
      setIsSendingRetryRequest(true);
      await props.retry();
    } finally {
      setIsSendingRetryRequest(false);
    }
  }, [props.retry]);

  const renderModuleRightContent = useCallback(() => {
    if (!props.isVerbose) {
      return null;
    }

    const { lessonGroups, pendingCount, courseStatus, retry } = props;

    const wrapperClassName = `inline-flex items-center gap-[6px] ${getStatusBasedClasses(
      courseStatus
    )}`;

    if (courseStatus === GenerationStatus.Failed) {
      return (
        <div className={wrapperClassName}>
          <span>{pendingCount} modules failed to generate</span>
          {retry && (
            <Button
              color="white"
              fontColor="black"
              disabled={isSendingRetryRequest}
              progress={isSendingRetryRequest}
              style={{
                border: `1px solid ${Theme.PrimaryBorderColor}`,
                padding: '6px 8px 6px 3px',
              }}
              onClick={onRetry}
            >
              <i className="saf-refresh text-[16px] mr-1" />
              {isSendingRetryRequest ? 'Sending...' : 'Retry'}
            </Button>
          )}
        </div>
      );
    }

    if (courseStatus === GenerationStatus.Done) {
      return null;
    }

    if (props.currentProgress) {
      const { percentage, message } = props.currentProgress;
      return (
        <div className={wrapperClassName} style={{ alignItems: 'center' }}>
          <ProgressIndicator
            percentage={percentage}
            message={message}
            size={24}
          />
        </div>
      );
    }

    const total = lessonGroups.length;
    const finishedCount = total - pendingCount;

    return (
      <span className={wrapperClassName}>
        <span>
          Generated {finishedCount}/{total} modules.
        </span>
      </span>
    );
  }, [props.lessonGroups, onRetry, isSendingRetryRequest]);

  return (
    <div>
      <div className="flex items-center  justify-between mb-4">
        <Text bold size="22px">
          Course Content
        </Text>
        {props.currentStageLabel && (
          <span className="ml-4">
            <AnimatedLabel label={props.currentStageLabel} />
          </span>
        )}
        {renderModuleRightContent()}
      </div>
      <LessonGroupsSection
        lessonGroups={props.lessonGroups}
        getLessonGroupGenerationStatus={props.getLessonGroupGenerationStatus}
        studyTime={props.studyTime}
        isVerbose={props.isVerbose}
      />
    </div>
  );
};

// -----Lesson Group Section-----

const LessonGroupsSection = (
  props: Pick<
    ModulesListProps,
    'lessonGroups' | 'getLessonGroupGenerationStatus' | 'isVerbose'
  > & {
    studyTime: StudyTime;
  }
) => {
  const { lessonGroups, studyTime, isVerbose } = props;

  return (
    <div className="rounded-lg border bg-white">
      {lessonGroups.map((group, i) => {
        // Find study time for this group
        const groupStudyTime =
          studyTime.lessonGroups.find((st) => st.id === group.id)?.studyTime ||
          0;

        return (
          <div key={group.id ?? i} className="border-b pb-2">
            <LessonGroupItem
              lessonGroup={group}
              getLessonGrooupGenerationStatus={
                props.getLessonGroupGenerationStatus
              }
              studyTime={groupStudyTime}
              lessonAndItemsStudyTime={pick(studyTime, [
                'lessons',
                'lessonItems',
              ])}
              isVerbose={isVerbose}
            />
          </div>
        );
      })}
    </div>
  );
};

// ----- LessonGroupItem-----

const LessonGroupItem = (props: {
  lessonGroup: LessonGroupView;
  getLessonGrooupGenerationStatus: GetLessonGroupGenerationStatus;
  studyTime: number;
  lessonAndItemsStudyTime: Omit<StudyTime, 'lessonGroups' | 'totalStudyTime'>;
  isVerbose?: boolean;
}) => {
  const { lessonGroup, getLessonGrooupGenerationStatus, studyTime, isVerbose } =
    props;
  const lessonCount = lessonGroup.lessons?.length ?? 0;
  const groupStatus = getLessonGrooupGenerationStatus(lessonGroup.id as string);

  const renderRightContent = () => {
    // Always show study time for generated lesson groups, regardless of isVerbose
    if (groupStatus === GenerationStatus.Done) {
      return (
        <>
          <span>{lessonCount} lessons</span>
          <span>• </span>
          <span>{formatSecondsToHumanReadableString(studyTime)}</span>
        </>
      );
    }

    // Only show generation status when verbose
    if (!isVerbose) {
      return null;
    }

    const isGenerating = groupStatus === GenerationStatus.Generating;
    const wrapperClasses = `inline-flex  items-center gap-1  ${getStatusBasedClasses(
      groupStatus
    )}
    `;
    return (
      <span className={wrapperClasses}>
        <span>
          {isGenerating ? (
            <TextMaskingLoader text="Generating lessons..." />
          ) : (
            'Failed'
          )}
        </span>
      </span>
    );
  };

  return (
    <Accordion
      label={(isOpen) => (
        <div
          className={`flex px-[20px] items-center py-4  ${
            isOpen ? 'bg-gray-1001' : 'bg-transparent'
          } `}
        >
          <div className="mr-[20px] text-[20px] text-blue-grey-900 flex-shrink-0">
            {isOpen ? '-' : '+'}
          </div>
          <div className="flex flex-col flex-1 min-w-0 mr-4">
            <Text className="leading-[24px]"> </Text>
            <Text bold size="14px" className="leading-[24px] truncate">
              {lessonGroup.name}
            </Text>
          </div>
          <div className="flex-shrink-0 flex text-smaller items-center gap-2 min-w-0">
            {renderRightContent()}
          </div>
        </div>
      )}
    >
      <>
        {lessonGroup.lessons?.map((lesson, i) => {
          // Find study time for this lesson
          const lessonStudyTime =
            props.lessonAndItemsStudyTime.lessons.find(
              (st) => st.id === lesson.id
            )?.studyTime || 0;

          return (
            <div
              key={lesson?.id ?? i}
              className="hover:bg-gray-100 cursor-pointer px-[20px] py-2 flex items-center"
            >
              <div className="w-6 flex-shrink-0"></div>
              <span className="text-black mr-3 flex-shrink-0"> {i + 1}. </span>
              <Text className="flex-1 min-w-0 truncate mr-4">
                {' '}
                {lesson.title}{' '}
              </Text>
              <Text className="text-smaller flex-shrink-0 min-w-[60px] text-right">
                {lessonStudyTime > 0
                  ? formatSecondsToHumanReadableString(lessonStudyTime)
                  : '--'}
              </Text>
            </div>
          );
        })}
      </>
    </Accordion>
  );
};

// ----- Progress Indicator Component -----

interface ProgressIndicatorProps {
  percentage: number;
  size?: number;
  showText?: boolean;
  message?: string;
}

const ProgressIndicator = ({
  percentage,
  size = 24,
  showText = true,
  message,
}: ProgressIndicatorProps) => {
  // Determine colors based on percentage
  const getProgressColors = (percent: number) => {
    if (percent < 25) {
      return {
        pathColor: '#EF4444', // Red for low progress
        trailColor: '#FEE2E2',
      };
    } else if (percent < 50) {
      return {
        pathColor: '#F59E0B', // Orange for medium-low progress
        trailColor: '#FEF3C7',
      };
    } else if (percent < 75) {
      return {
        pathColor: '#3B82F6', // Blue for medium-high progress
        trailColor: '#DBEAFE',
      };
    } else {
      return {
        pathColor: '#10B981', // Green for high progress
        trailColor: '#D1FAE5',
      };
    }
  };

  const colors = getProgressColors(percentage);

  return (
    <div className="flex items-center gap-3">
      <div style={{ width: size, height: size }}>
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: colors.pathColor,
            trailColor: colors.trailColor,
            strokeLinecap: 'round',
          })}
        />
      </div>
      {showText && (
        <span>{`${percentage}% completed... ${message || 'Generating'}`}</span>
      )}
    </div>
  );
};

// ----- Utility Functions -----

const getStatusBasedClasses = (state: GenerationStatus): string => {
  if (state === GenerationStatus.Done) return '';
  if (state === GenerationStatus.Failed) return 'text-[red]';
  return 'bg-gradient-to-b from-[#454545] to-[#808080] bg-clip-text text-transparent';
};
