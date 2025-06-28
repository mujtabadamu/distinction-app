import request from '../utils/request';
import urls from '../utils/config';
import { GetExamGroupsPayload } from '../redux/examGroups/typings';

const { API_BASE_URL } = urls || {};

export const httpGetExamGroups = (data: GetExamGroupsPayload) => {
  const url = `${API_BASE_URL}/portal/exam-groups`;
  return request({
    url,
    method: 'get',
    data,
  });
};
