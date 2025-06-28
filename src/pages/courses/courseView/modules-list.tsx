import { Text, Button } from '@flexisaf/flexibull2';
import { Accordion } from 'components/accordion/accordion';
import { LessonGroupView } from 'generated/index';
import { formatSecondsToHumanReadableString } from 'utils/helpers';
import React, { useCallback, useState } from 'react';
import {
  GetLessonGrooupGenerationStatus,
  GenerationStatus,
} from 'hooks/courses/useCourseGenerationProgress';
import Theme from 'utils/theme';

// -----Main Component-----

type ModulesListProps = {
  lessonGroups: LessonGroupView[];
  courseStatus: GenerationStatus;
  getLessonGroupGenerationStatus: GetLessonGrooupGenerationStatus;
  pendingCount: number;
  retry?: () => Promise<void>;
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
    const { lessonGroups, pendingCount, courseStatus, retry } = props;
    if (courseStatus === GenerationStatus.Done) {
      return null;
    }

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

    const total = lessonGroups.length;
    const finishedCount = total - pendingCount;

    // tentative, subject to change
    const estTimeMins = pendingCount * 3 * 60;

    return (
      <span className={wrapperClassName}>
        <span>
          Generating {finishedCount}/{total} modules
        </span>
        ...
        <span>
          Estimated {formatSecondsToHumanReadableString(estTimeMins)} until
          completion
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
        {renderModuleRightContent()}
      </div>
      <LessonGroupsSection {...props} />
    </div>
  );
};

// -----Lesson Group Section-----

const LessonGroupsSection = (props: ModulesListProps) => {
  const { lessonGroups } = props;

  return (
    <div className="rounded-lg border bg-white">
      {lessonGroups.map((group, i) => {
        return (
          <div key={group.id ?? i} className="border-b pb-2">
            <LessonGroupItem
              lessonGroup={group}
              getLessonGrooupGenerationStatus={
                props.getLessonGroupGenerationStatus
              }
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
  getLessonGrooupGenerationStatus: GetLessonGrooupGenerationStatus;
}) => {
  const { lessonGroup, getLessonGrooupGenerationStatus } = props;
  const lessonCount = lessonGroup.lessons?.length ?? 0;
  const groupStatus = getLessonGrooupGenerationStatus(lessonGroup.id as string);

  const renderRightContent = () => {
    if (groupStatus === GenerationStatus.Done) {
      return (
        <>
          <span>{lessonCount} lessons</span>

          <span>• </span>
          <span>18 mins</span>
        </>
      );
    }
    const isGenerating = groupStatus === GenerationStatus.Generating;
    const wrapperClasses = `inline-flex items-center gap-1  ${getStatusBasedClasses(
      groupStatus
    )}
    `;
    return (
      <span className={wrapperClasses}>
        {/* <img src={star} width={18} height={18} />{' '} */}
        {/* <i className="saf-magicpen text-[18px]" /> */}
        <span>{isGenerating ? 'Generating...' : 'Failed'}</span>
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
          <div className="mr-[20px] text-[20px] text-blue-grey-900 ">
            {isOpen ? '-' : '+'}
          </div>
          <div className="flex flex-col w-7/12 md:w-auto mr-3 ">
            <Text className="leading-[24px]"> </Text>
            <Text bold size="14px" className="leading-[24px]">
              {lessonGroup.name}
            </Text>
          </div>
          <div className=" ml-auto flex text-smaller items-center gap-1">
            {renderRightContent()}
          </div>
        </div>
      )}
    >
      <>
        {lessonGroup.lessons?.map((lesson, i) => {
          return (
            <div
              key={lesson?.id ?? i}
              className="  hover:bg-gray-100 cursor-pointer px-[20px] py-2 flex  items-center"
            >
              <div className="w-6"></div>
              <span className={` text-black mr-3`}> {i + 1}. </span>
              <Text> {lesson.title} </Text>
              <Text className="ml-auto"> 20:45</Text>
            </div>
          );
        })}
      </>
    </Accordion>
  );
};

// ----- Styles -----

const getStatusBasedClasses = (state: GenerationStatus): string => {
  if (state === GenerationStatus.Done) return '';
  if (state === GenerationStatus.Failed) return 'text-[red]';
  return 'bg-gradient-to-b from-[#F9D423] to-[#E14FAD] bg-clip-text text-transparent';
};
