import {
  PortalStudentPapersService,
  StudentAnswerProgressRequest,
  TracktimerRequest,
  TrackTimerView,
} from 'generated/index';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitStudentPaperSuccess } from 'redux/studentPapers/reducer';
import { SubmitPaperResponseSuccess } from 'redux/studentPapers/typings';
import { handleError } from 'utils/errorHandlers';
import { apiWrapper } from 'utils/http-client';
interface ScoreBreakdown {
  topic: string;
  questionCount: number;
  score: number;
}

interface Exam {
  id: string;
  name: string;
}

interface Paper {
  exam: Exam;
  id: string;
  name: string;
}

interface Result {
  id: string;
  paper: Paper;
  questionCount: number;
  remark: string;
  score: number;
  scoreBreakdown: ScoreBreakdown[];
}

const usePracticeSync = () => {
  const [isTimeTrackerLoading, setIsTimeTrackerLoading] =
    useState<boolean>(false);
  const [isRetrievingTrackedDetails, setIsRetrievingTrackedDetails] =
    useState<boolean>(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedProgress, setSavedProgress] = useState<Result | null>(null);
  const dispatch = useDispatch();

  const [retrievedDetails, setRetrievedDetails] =
    useState<TrackTimerView | null>(null);

  const trackTimer = async (payload: TracktimerRequest) => {
    setIsTimeTrackerLoading(true);
    try {
      await apiWrapper(() =>
        PortalStudentPapersService.trackTimer({ requestBody: payload })
      );
      setIsTimeTrackerLoading(false);
    } catch (error) {
      setIsTimeTrackerLoading(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const retrieveTrackedDetails = async (id: string) => {
    setIsRetrievingTrackedDetails(true);

    try {
      const data = await apiWrapper(() =>
        PortalStudentPapersService.retrieveTrackTimer({ id })
      );

      setRetrievedDetails(data);
      setIsRetrievingTrackedDetails(false);
      return { ...data };
    } catch (error) {
      setIsRetrievingTrackedDetails(false);
      if (error instanceof Error) {
        console.error(error.message);
        handleError(error);
      }
    }
  };
  const handleSaveProgress = async (
    id: string,
    requestBody: StudentAnswerProgressRequest
  ) => {
    setIsSaving(true);

    try {
      const data = await apiWrapper(() =>
        PortalStudentPapersService.saveProgress({ id, requestBody })
      );

      setIsSaving(false);
      dispatch(submitStudentPaperSuccess(data as SubmitPaperResponseSuccess));
      return data;
    } catch (error) {
      setIsSaving(false);
      handleError(error);
    }
  };

  return {
    trackTimer,
    isTimeTrackerLoading,
    retrieveTrackedDetails,
    retrievedDetails,
    isRetrievingTrackedDetails,
    handleSaveProgress,
    isSaving,
    savedProgress,
    setSavedProgress,
  };
};

export default usePracticeSync;
