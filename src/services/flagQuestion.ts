import request from '../utils/request';
import urls from '../utils/config';
import { FlagQuestionPayload } from '../redux/flagQuestion/typings';

const { API_BASE_URL } = urls || {};

export const httpPostQuestionFlag = (payload: FlagQuestionPayload) => {
  const { data } = payload;

  const url = `${API_BASE_URL}/flagged-questions`;

  return request({
    url,
    method: 'post',
    data,
  });
};

