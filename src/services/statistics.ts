import request from '../utils/request';
import urls from '../utils/config';
import {
  GetScore,
  GetRecentPapers,
  GetSubjectStats,
  GetTimeSpent,
  GetSingleTotalQuestion,
  GetQuestionCountByYear,
} from '../store/statisticsTypings';

const { API_BASE_URL } = urls || {};

export const httpGetScore = (data: GetScore) => {
  const url = `${API_BASE_URL}/portal/statistics/scores`;
  return request({
    url,
    method: 'get',
    data,
  });
};

export const httpGetRecentPapers = (data: GetRecentPapers) => {
  const url = `${API_BASE_URL}/portal/student-papers`;

  return request({
    url,
    method: 'get',
    data,
  });
};

export const httpGetSubjectStats = (data: GetSubjectStats) => {
  const url = `${API_BASE_URL}/portal/statistics/scores/breakdown`;

  return request({
    url,
    method: 'get',
    data,
  });
};

export const httpGetTimeSpent = (data: GetTimeSpent) => {
  const url = `${API_BASE_URL}/portal/statistics/time`;

  return request({
    url,
    method: 'get',
    data,
  });
};
export const httpGetTotalQuestion = (payload: GetSingleTotalQuestion) => {
  const { data } = payload;
  return request({
    url: `${API_BASE_URL}/statistics/questions`,
    method: 'get',
    data,
  });
};
export const httpGetQuestionCountByYear = (data: GetQuestionCountByYear) => {
  return request({
    url: `${API_BASE_URL}/portal/statistics/questions-count-by-year`,
    method: 'get',
    data,
  });
};
