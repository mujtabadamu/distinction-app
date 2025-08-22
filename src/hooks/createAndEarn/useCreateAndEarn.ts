import { useCallback } from 'react';
import {
  useEnhancedCreateQuestionMutation,
  useEnhancedGetQuestionStatisticsQuery,
} from '../../store/enhancedApi';
import { QuestionRequest } from '../../generated';

// Type for question - aligned with distinction-app
interface Question {
  createdAt: string;
  customTags: string[];
  id: string;
  imageUrl: string | null;
  paperName: string;
  section: null | {
    title: string;
    imageUrl: string;
    multimediaFile: {
      contentType: string;
      name: string;
      id: string;
    };
    id: string;
    content: string;
  };
  status: string;
  text: string;
  topic: string;
  type: string;
}

interface GetQuestionsSuccess {
  count: number;
  pages: number;
  items: Question[];
}

interface QuestionCreatePayload {
  data: QuestionRequest;
  callback?: () => void;
}

interface BulkQuestionCreatePayload {
  data: any;
  callback?: () => void;
}

interface GetQuestionsPayload {
  data: any;
  callback?: () => void;
}

interface GetQuestionsStatsPayload {
  data: any;
  callback?: () => void;
}

const useCreateAndEarn = () => {
  const [createQuestion, { isLoading: questionsLoading }] =
    useEnhancedCreateQuestionMutation();
  const { data: questionStats, isLoading: loadingQuestionStats } =
    useEnhancedGetQuestionStatisticsQuery({});

  const createQuestionHandler = useCallback(
    async (data: QuestionCreatePayload) => {
      try {
        const result = await createQuestion(data.data).unwrap();

        if (data.callback) {
          data.callback();
        }

        return result;
      } catch (error) {
        console.error('Error creating question:', error);
        throw error;
      }
    },
    [createQuestion]
  );

  const uploadBulkQuestions = useCallback(
    async (data: BulkQuestionCreatePayload) => {
      // TODO: Implement bulk question upload when API is available
      console.warn('Bulk question upload not yet implemented');
      if (data.callback) {
        data.callback();
      }
    },
    []
  );

  const getQuestionsStats = useCallback((data: GetQuestionsStatsPayload) => {
    // Statistics are already loaded via RTK Query
    if (data.callback) {
      data.callback();
    }
  }, []);

  const getQuestions = useCallback((data: GetQuestionsPayload) => {
    // TODO: Implement get questions when API is available
    console.warn('Get questions not yet implemented');
    if (data.callback) {
      data.callback();
    }
  }, []);

  return {
    createQuestion: createQuestionHandler,
    uploadBulkQuestions,
    getQuestionsStats,
    getQuestions,
    questionsLoading,
    questionStats,
    loadingQuestionStats,
    questionsList: [] as Question[], // TODO: Implement when questions API is available
    questions: null as GetQuestionsSuccess | null, // TODO: Implement when questions API is available
  };
};

export default useCreateAndEarn;
