import request from '../utils/request';
import urls from '../utils/config';
import { TopicsPayload } from '../redux/topics/typings';

const { API_BASE_URL } = urls || {};

export const httpGetTopics = (data: TopicsPayload) => {
  const url = `${API_BASE_URL}/portal/topics`;
  return request({
    url,
    method: 'get',
    data,
  });
};

export const httpGetAutoCompleteTopics = (data: TopicsPayload) => {
  const url = `${API_BASE_URL}/autocomplete`;
  return request({
    url,
    method: 'get',
    data,
  });
};
