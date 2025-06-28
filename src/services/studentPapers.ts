import request from '../utils/request';
import urls from '../utils/config';
import {
  GetStudentPapersPayload,
  GetStudentPaperQuestionsPayload,
  PostStudentPapersPayload,
  AnswerOptionChoice,
  SubmitPaperPayload,
  GetSingleStudentPaperPayload,
} from '../redux/studentPapers/typings';

const { API_BASE_URL } = urls || {};

export const httpGetStudentPapers = (payload: GetStudentPapersPayload) => {
  const { data } = payload;
  return request({
    url: `${API_BASE_URL}/portal/student-papers`,
    method: 'get',
    data,
  });
};

export const httpPostStudentPapers = (data: PostStudentPapersPayload) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { callback, ...payload } = data;
  const url = `${API_BASE_URL}/portal/student-papers`;
  return request({
    url,
    method: 'post',
    data: {
      ...payload,
    },
  });
};

export const httpGetStudentPaperQuestions = (
  data: GetStudentPaperQuestionsPayload
) => {
  const { id, page, size } = data;

  return request({
    url: `${API_BASE_URL}/portal/student-papers/${id || ''}/questions`,
    method: 'get',
    data: {
      page,
      size,
    },
  });
};

export const httpGetStudentPaperQuestionsSolutions = (
  data: GetStudentPaperQuestionsPayload
) => {
  const { id, page, size } = data;

  return request({
    url: `${API_BASE_URL}/portal/student-papers/${id || ''}/solutions`,
    method: 'get',
    data: {
      page,
      size,
    },
  });
};

export interface IHttpPostStudentPaperAnswer {
  data: AnswerOptionChoice;
  id: string;
}

export const httpPostStudentPaperAnswer = (
  data: IHttpPostStudentPaperAnswer
) => {
  const url = `${API_BASE_URL}/portal/student-papers/${data.id}/answers`;

  return request({
    url,
    method: 'post',
    data: data.data,
  });
};

export const httpPostSubmitStudentPaper = (data: SubmitPaperPayload) => {
  const { id, timeElapsed } = data;
  const url = `${API_BASE_URL}/portal/student-papers/${id}/submit`;
  return request({
    url,
    method: 'post',
    data: {
      timeElapsed,
    },
  });
};

export const httpGetSingleStudentPaper = (
  payload: GetSingleStudentPaperPayload
) => {
  const { data } = payload;
  const url = `${API_BASE_URL}/portal/student-papers/${data.id}`;

  return request({
    url,
    method: 'get',
  });
};

export interface IHttpPostPaperBookmark {
  studentPaperId?: string;
  questionId: string;
}

export const httpPostPaperBookmark = (data: IHttpPostPaperBookmark) => {
  const { studentPaperId, questionId } = data;
  const url = `${API_BASE_URL}/portal/student-papers/${studentPaperId}/bookmarks`;
  return request({
    url,
    method: 'post',
    data: {
      questionId,
    },
  });
};

export const httpDeletePaperBookmark = (data: IHttpPostPaperBookmark) => {
  const { studentPaperId, questionId } = data;
  const url = `${API_BASE_URL}/portal/student-papers/${studentPaperId}/bookmarks?questionId=${questionId}`;
  return request({
    url,
    method: 'delete',
  });
};
