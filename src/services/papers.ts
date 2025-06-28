import request from '../utils/request';
import urls from '../utils/config';
import { GetPapersPayload ,PaperRatingData} from '../redux/papers/typings';

const { API_BASE_URL } = urls || {};

export const httpGetPapers = (data: GetPapersPayload) => {
  const url = `${API_BASE_URL}/portal/papers`;
  return request({
    url,
    method: 'get',
    data,
  });
};

export const httpPostPaperRating = (data: PaperRatingData) => {
  const url = `${API_BASE_URL}/paper-ratings`;
  return request({
    url,
    method: 'post',
    data
  });
};
