import request from '../utils/request';
import urls from '../utils/config';

import {
  GetStudentPapersPayload,
  PostStudentPapersPayload,
  GetStudentPaperQuestionsPayload,
  GetSingleStudentPaperPayload,
  SubmitPaperPayload,
} from '../typings/studentPaper';

const { API_BASE_URL } = urls || {};

// Get student papers
export const httpGetStudentPapers = (payload: GetStudentPapersPayload) => {
  const { data, options } = payload;

  const params: any = {};
  if (data?.examGroupId) params.examGroupId = data.examGroupId;
  if (data?.page !== undefined) params.page = data.page;
  if (data?.size !== undefined) params.size = data.size;

  if (options?.filterBy === 'completed') {
    params.completed = true;
  } else if (options?.filterBy === 'inProgress') {
    params.completed = false;
  }

  return request({
    url: `${API_BASE_URL}/portal/student-papers`,
    method: 'get',
    data: params,
  });
};

// Create student paper
export const httpPostStudentPapers = (payload: PostStudentPapersPayload) => {
  const { paperId, size, mode, captcha } = payload;

  const data: any = {
    paperId,
    size,
    mode,
  };

  if (captcha) {
    data.captcha = captcha;
  }

  return request({
    url: `${API_BASE_URL}/portal/student-papers`,
    method: 'post',
    data,
  });
};

// Get student paper questions
export const httpGetStudentPaperQuestions = (
  payload: GetStudentPaperQuestionsPayload
) => {
  const { id, page, size } = payload;

  return request({
    url: `${API_BASE_URL}/portal/student-papers/${id}/questions`,
    method: 'get',
    data: { page, size },
  });
};

// Get student paper questions with solutions
export const httpGetStudentPaperQuestionsSolutions = (
  payload: GetStudentPaperQuestionsPayload
) => {
  const { id, page, size } = payload;

  return request({
    url: `${API_BASE_URL}/portal/student-papers/${id}/questions/solutions`,
    method: 'get',
    data: { page, size },
  });
};

// Get single student paper
export const httpGetSingleStudentPaper = (
  payload: GetSingleStudentPaperPayload
) => {
  const { data } = payload;

  return request({
    url: `${API_BASE_URL}/portal/student-papers/${data.id}`,
    method: 'get',
  });
};

// Submit student paper
export const httpPostSubmitStudentPaper = (payload: SubmitPaperPayload) => {
  const { id, data } = payload;

  return request({
    url: `${API_BASE_URL}/portal/student-papers/${id}/submit`,
    method: 'post',
    data,
  });
};

// Save student paper progress
export const httpPostSaveStudentPaperProgress = (
  payload: SubmitPaperPayload
) => {
  const { id, data } = payload;

  return request({
    url: `${API_BASE_URL}/portal/student-papers/${id}/progress`,
    method: 'post',
    data,
  });
};
