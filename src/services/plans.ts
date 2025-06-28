import request from '../utils/request';
import urls from '../utils/config';

const { API_BASE_URL } = urls || {};

export const httpGetPlans = () => {
  const url = `${API_BASE_URL}/plans`;
  return request({
    url,
    method: 'get',
  });
};
