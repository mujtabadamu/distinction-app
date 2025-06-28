import request from '../utils/request';
import urls from '../utils/config';

import { GetExamsPayload } from '../redux/exams/typings';

const { API_BASE_URL } = urls || {};

export const httpGetExams = (data: GetExamsPayload) => {
  const url = `${API_BASE_URL}/portal/exams`;
  return request({
    url,
    method: 'get',
    data,
  });
};
