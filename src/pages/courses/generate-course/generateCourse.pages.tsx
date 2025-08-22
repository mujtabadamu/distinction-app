import Lottie, { LottieRef } from 'lottie-react';
import { Box, Text } from '@flexisaf/flexibull2';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTimeout } from 'hooks/general/useTimeout';

import pulsingRingsAnimationJson from 'assets/animation-json/pulsing-rings.json';
import robot from 'assets/icons/hugeicon-robotic.svg';

import GenerateCourseForm, {
  CourseGenerationFormBody,
} from './generateCourseForm';
import { useCoursesSocketConnection } from 'hooks/courses/useCoursesSocketConnection';
import {
  useGenerateCourseMutation,
  useLazyGetCourseByIdQuery,
} from '../course-api';
import { errorNotifier } from 'utils/helpers';
import { parseErrorMessage } from 'utils/errorHandlers';
import AnimatedLabel from 'components/animatedLabel/animatedLabel';
import { CourseViewRouteSearchParam } from '../courseView/courseView.pages';
import { CourseView } from 'generated/index';
import { AIErrorUpdateMessage } from 'types/courseGeneration';

// ----- Messages & Constants -----
const DEFAULT_MESSAGE = 'Enter the course name to begin building your course.';
const GENERATING_MESSAGE = 'Please wait, generating content...';
const INVESTIGATING_MESSAGE = 'This is taking a bit long, investigating...';
const FAILED_MESSAGE =
  'It seems the generation might have failed, please try again';
const CANNOT_PROCEED_MESSAGE = 'Cannot proceed with generation, please retry';
const COURSE_GEN_DURATION_TIMEOUT = 120_000;
const TAKING_LONGER_TIMEOUT = 0.5 * COURSE_GEN_DURATION_TIMEOUT;
const TAKING_LONGER_MESSAGE =
  'This is taking a bit longer than usual... Apologies, please wait';

// -----Generate Course Page Component-----

const GenerateCoursePage = () => {
  const [generateCourseRequest] = useGenerateCourseMutation();
  const [getCourseById] = useLazyGetCourseByIdQuery();
  const [isGenerating, setIsGenerating] = useState(false);
  const [label, setLabel] = useState(DEFAULT_MESSAGE);

  const navigate = useNavigate();
  const courseIdRef = useRef<string>();

  const takingLongerRef = useRef(false);

  const resetGenerationState = useCallback((arg?: { message: string }) => {
    setIsGenerating(false);
    setLabel(arg?.message ?? DEFAULT_MESSAGE);
    courseIdRef.current = undefined;
    takingLongerRef.current = false;
    stopTakingLongerTimer();
    stopTimer();
  }, []);

  const handleTakingLonger = useCallback(() => {
    takingLongerRef.current = true;
    setLabel(TAKING_LONGER_MESSAGE);
  }, []);

  const { start: startTakingLongerTimer, stop: stopTakingLongerTimer } =
    useTimeout(handleTakingLonger, TAKING_LONGER_TIMEOUT);

  const handleTimerExpiry = useCallback(async () => {
    if (!courseIdRef.current) return;
    setLabel(INVESTIGATING_MESSAGE);
    try {
      const result = await getCourseById({
        id: courseIdRef.current,
      }).unwrap();
      if (result) {
        const url = `/courses/${result.id}?${CourseViewRouteSearchParam.JustGenerated}`;
        navigate(url);
      } else {
        resetGenerationState({ message: FAILED_MESSAGE });
      }
    } catch (error) {
      resetGenerationState({ message: FAILED_MESSAGE });
    }
  }, [getCourseById, navigate, resetGenerationState]);

  const { start: startTimer, stop: stopTimer } = useTimeout(
    handleTimerExpiry,
    COURSE_GEN_DURATION_TIMEOUT
  );

  useCoursesSocketConnection({
    onCourseUpdate: useCallback(
      (data: CourseView) => {
        if (data.id === courseIdRef.current) {
          stopTakingLongerTimer();
          stopTimer();
          const url = `/courses/${data.id}?${CourseViewRouteSearchParam.JustGenerated}`;
          navigate(url);
        }
      },
      [navigate, stopTakingLongerTimer, stopTimer]
    ),
    onError: useCallback(
      (data: AIErrorUpdateMessage) => {
        if (data.requestId === courseIdRef.current) {
          stopTakingLongerTimer();
          stopTimer();
          resetGenerationState({ message: FAILED_MESSAGE });
        }
      },
      [resetGenerationState, stopTakingLongerTimer, stopTimer]
    ),
  });

  const generateCourse = useCallback(
    async (body: CourseGenerationFormBody) => {
      resetGenerationState();
      try {
        const requestBody = {
          name: body.name,
          courseCode: body.courseCode,
          curriculum: body.curriculum,
          ...(body.documentUrl ? { documentUrl: body.documentUrl } : {}),
        };

        const resp = await generateCourseRequest({
          requestBody,
        }).unwrap();
        if (!resp?.id) {
          errorNotifier(CANNOT_PROCEED_MESSAGE);
          resetGenerationState();
          return;
        }
        courseIdRef.current = resp?.id;
        setIsGenerating(true);
        setLabel(GENERATING_MESSAGE);
        startTakingLongerTimer();
        startTimer();
      } catch (err) {
        errorNotifier(parseErrorMessage(err));
        resetGenerationState();
      }
    },
    [
      generateCourseRequest,
      resetGenerationState,
      startTakingLongerTimer,
      startTimer,
    ]
  );

  return (
    <Box
      pad="1.5rem"
      className=" flex flex-col items-center justify-between  h-[calc(100vh-100px)]  gap-8"
    >
      <Box className="z-[-1] w-full mb-auto h-[60%] grid place-items-center ">
        <PageSplash isLoading={isGenerating} label={label} />
      </Box>

      {
        <div
          className={` mb-2 md:w-[660px] mx-auto ${
            isGenerating ? 'opacity-0 pointer-events-none' : 'opacity-100'
          } transition-opacity duration-300`}
        >
          <GenerateCourseForm onSubmit={generateCourse} />
        </div>
      }
    </Box>
  );
};

// -----Page Splash------

type PageSplashProps = {
  courseName?: string;
  isLoading?: boolean;
  label: string;
};

const PageSplash = (props: PageSplashProps) => {
  return (
    <div className="relative grid place-items-center w-full bg-contain bg-no-no-repeat bg-center">
      <div className="absolute   top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <PulsingRing isPlaying={props.isLoading || false} />
      </div>
      <Box className="flex flex-col  text-center gap-2 w-full">
        <img
          src={robot}
          className=" mt-[4%] w-6 h-6 mx-auto"
          alt="Robot Icon"
        />

        <>
          {!props.isLoading && (
            <Text block bold className="text-gray-500">
              Ready to create a course
            </Text>
          )}
          <AnimatedLabel
            label={props.label}
            className="max-w-[320px] text-gray-500"
          />
        </>
      </Box>
    </div>
  );
};

// -----Pulsing Ring-----

type PulsingRingProps = {
  isPlaying: boolean;
};

const PulsingRing = (props: PulsingRingProps) => {
  const { isPlaying } = props;
  const lottieRef = useRef(null) as LottieRef;

  useEffect(() => {
    if (lottieRef.current) {
      const action = isPlaying ? 'play' : 'stop';
      lottieRef.current[action]?.();
    }
  }, [isPlaying]);

  const style: React.CSSProperties = {
    width: 600,
    height: 600,
    filter: isPlaying ? 'none' : 'grayscale(100%)',
    transition: 'filter 0.5s ease-in-out',
    opacity: isPlaying ? 1 : 0.4,
  };
  return (
    <Lottie
      animationData={pulsingRingsAnimationJson}
      loop={true}
      lottieRef={lottieRef}
      autoplay={false}
      style={style}
      rendererSettings={{
        preserveAspectRatio: 'xMidYMid slice',
      }}
    />
  );
};

export default GenerateCoursePage;
