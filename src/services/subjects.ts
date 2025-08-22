import request from '../utils/request';
import urls from '../utils/config';

const { API_BASE_URL } = urls || {};

export const httpGetAllSubjects = (payload: { examGroupId?: string }) => {
  const url = `${API_BASE_URL}/portal/subjects`;
  return request({
    url,
    method: 'get',
    data: payload,
  });
};
