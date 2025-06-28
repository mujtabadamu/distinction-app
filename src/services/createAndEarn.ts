import request from '../utils/request';
import urls from '../utils/config';

import {
  BulkQuestionData,
  GetQuestionsPayload,
  GetQuestionsStatsPayload,
  QuestionCreateData,
} from '../redux/createAndEarn/typings';
const { API_BASE_URL } = urls || {};

export const httpGetQuestions = (data: GetQuestionsPayload) => {
  const url = `${API_BASE_URL}/custom-questions`;
  return request({
    url,
    method: 'get',
    data,
  });
};

export const httpGetQuestionsStats = (data: GetQuestionsStatsPayload) => {
  const url = `${API_BASE_URL}/custom-questions/statistics`;
  return request({
    url,
    method: 'get',
    data,
  });
};

export const httpPostQuestion = (data: QuestionCreateData) => {
  const url = `${API_BASE_URL}/custom-questions`;
  return request({
    url,
    method: 'post',
    data,
  });
};

export const httpPostBulkQuestion = (data: BulkQuestionData) => {
  const { formData, paperId } = data;
  const url = `${API_BASE_URL}/custom-questions/bulk-upload?paperId=${paperId}`;
  return request({
    url,
    method: 'post',
    formData,
    upload: true,
    config: {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  });
};
