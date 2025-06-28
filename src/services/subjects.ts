import request from '../utils/request';
import urls from '../utils/config';
import { GetSubjectsPayload } from '../redux/subjects/typings';

const { API_BASE_URL } = urls || {};

export const httpGetAllSubjects = (payload: GetSubjectsPayload) => {
  const url = `${API_BASE_URL}/portal/subjects`;
  return request({
    url,
    method: 'get',
    data: payload,
  });
};
