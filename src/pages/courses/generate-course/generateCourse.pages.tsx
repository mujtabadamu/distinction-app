import Lottie, { LottieRef } from 'lottie-react';
import { Box, Text } from '@flexisaf/flexibull2';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pick from 'lodash/pick';

import pulsingRingsAnimationJson from 'assets/animation-json/pulsing-rings.json';
import robot from 'assets/icons/hugeicon-robotic.svg';

import GenerateCourseForm, {
  CourseGenerationFormBody,
} from './generateCourseForm';
import { useCoursesSocketConnection } from 'hooks/courses/useCoursesSocketConnection';
import { useGenerateCourseMutation } from '../course-api';
import { errorNotifier } from 'utils/helpers';
import { parseErrorMessage } from 'utils/errorHandlers';
import AnimatedLabel from 'components/animatedLabel/animatedLabel';
import { CourseViewRouteSearchParam } from '../courseView/courseView.pages';
import { useTimeout } from 'hooks/general/useTimeout';

// ----- Messages & Constants -----
const EST_GENERATION_DURATION = 15_000;
const DEFAULT_MESSAGE =
  'Enter the course name and other details below to begin building your module.';
const GENERATING_MESSAGE = 'Please wait, generating content...';
const GENERATION_RETRY_MESSAGE =
  'It seems the generation might have been interrupted, please try again';

// -----Generate Course Page  Component-----

const GenerateCoursePage = () => {
  const [generateCourseRequest] = useGenerateCourseMutation();
  const [isGenerating, setIsGenerating] = useState(false);
  const [courseId, setCourseId] = useState<string>();
  const [label, setLabel] = useState(DEFAULT_MESSAGE);
  const navigate = useNavigate();

  const { isConnected } = useCoursesSocketConnection({
    onCourseUpdate: (data) => {
      if (data.id === courseId) {
        const url = `/courses/${data.id}?${CourseViewRouteSearchParam.JustGenerated}`;
        navigate(url);
      }
    },
  });

  const { start: startCountdown } = useTimeout((tId) => {
    tId && clearTimeout(tId);
    if (isConnected) {
      setLabel(GENERATION_RETRY_MESSAGE);
      setIsGenerating(false);
      return;
    }
    startCountdown();
  }, EST_GENERATION_DURATION);

  const generateCourse = async (body: CourseGenerationFormBody) => {
    try {
      // api does not support other parameters for now
      const requestBody = pick(body, ['name', 'courseCode', 'curriculum']);
      const resp = await generateCourseRequest({
        requestBody,
      }).unwrap();
      if (!resp?.id) {
        errorNotifier('Cannot proceed with generation, please retry');
        return;
      }
      setCourseId(resp?.id);
      setIsGenerating(true);
      setLabel(GENERATING_MESSAGE);
      startCountdown();
    } catch (err) {
      errorNotifier(parseErrorMessage(err));
    }
  };

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
            isGenerating && 'opacity-0'
          }`}
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
    <div className="relative grid place-items-center w-full bg-contain bg-no-repeat bg-center">
      <div className="absolute   top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <PulsingRing isPlaying={props.isLoading || false} />
      </div>
      <Box className="flex flex-col  text-center gap-2 w-full">
        <img src={robot} className=" mt-[4%] w-6 h-6 mx-auto" />

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
      lottieRef.current[action]();
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
