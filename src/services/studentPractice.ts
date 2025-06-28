import request from '../utils/request';
import urls from '../utils/config';

import {
  PostStudentPracticePayload,
  GetSingleStudentPracticePayload,
  GetStudentPracticePayload,
} from '../redux/studentPractice/typings';

const { API_BASE_URL } = urls || {};

export const httpPostStudentPractice = (
  payload: PostStudentPracticePayload
) => {
  const { data } = payload;
  return request({
    url: `${API_BASE_URL}/portal/student-practice`,
    method: 'post',
    data,
  });
};

export const httpGetStudentPractice = (payload: GetStudentPracticePayload) => {
  const { data } = payload;

  return request({
    url: `${API_BASE_URL}/portal/student-practice`,
    method: 'get',
    data,
  });
};

export const httpGetSingleStudentPractice = (
  payload: GetSingleStudentPracticePayload
) => {
  const { data } = payload;

  return request({
    url: `${API_BASE_URL}/portal/student-practice/${data.id}`,
    method: 'get',
  });
};
