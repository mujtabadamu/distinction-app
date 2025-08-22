import {
  PortalStudentPapersService,
  StudentAnswerProgressRequest,
  TracktimerRequest,
  TrackTimerView,
} from 'generated/index';
import { useState } from 'react';
import { useAppDispatch } from '../../store/store';
import {
  useEnhancedSaveStudentPaperProgressMutation,
  useEnhancedTrackTimerMutation,
} from '../../store/enhancedApi';
import { handleError } from 'utils/errorHandlers';
import { apiWrapper } from 'utils/http-client';
import { SubmitPaperResponseSuccess } from '../../typings/studentPaper';
import { setPaperResult } from '../studentPapers/useStudentPaperSlice';

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
  const dispatch = useAppDispatch();
  const [isTimeTrackerLoading, setIsTimeTrackerLoading] =
    useState<boolean>(false);
  const [isRetrievingTrackedDetails, setIsRetrievingTrackedDetails] =
    useState<boolean>(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedProgress, setSavedProgress] = useState<Result | null>(null);

  // RTK Query mutations
  const [saveProgressMutation, { isLoading: isSavingProgress }] =
    useEnhancedSaveStudentPaperProgressMutation();
  const [trackTimerMutation, { isLoading: isTrackingTimer }] =
    useEnhancedTrackTimerMutation();

  const [retrievedDetails, setRetrievedDetails] =
    useState<TrackTimerView | null>(null);

  const trackTimer = async (payload: TracktimerRequest) => {
    setIsTimeTrackerLoading(true);
    try {
      await trackTimerMutation({ tracktimerRequest: payload });
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
      const result = await saveProgressMutation({
        id,
        studentAnswerProgressRequest: requestBody,
      }).unwrap();

      setIsSaving(false);
      // Set the paper result in local state
      dispatch(setPaperResult(result as SubmitPaperResponseSuccess));
      setSavedProgress(result as Result);
      return result;
    } catch (error) {
      setIsSaving(false);
      handleError(error);
    }
  };

  return {
    trackTimer,
    isTimeTrackerLoading: isTimeTrackerLoading || isTrackingTimer,
    retrieveTrackedDetails,
    retrievedDetails,
    isRetrievingTrackedDetails,
    handleSaveProgress,
    isSaving: isSaving || isSavingProgress,
    savedProgress,
    setSavedProgress,
  };
};

export default usePracticeSync;
