import { call, put, takeLatest, all } from 'redux-saga/effects';
import {  Activity, LearningStats , Score, RecentPapers} from '../typings';
import { RequestResult } from '../../../utils/request';

import {
  httpGetTimeSpent,
  httpGetScore,
  httpGetRecentPapers
} from '../../../services/statistics';

import {
  fetchLearningStatisticsStart,
  fetchLearningStatisticsSuccess,
} from '../reducer';

function* getLearningStatistics({
  payload,
}: ReturnType<typeof fetchLearningStatisticsStart>) {
  const {
    data: { scoreData, recentPapersData ,timeSpent},
  } = payload;

  const response: {
    score: RequestResult<Score>;
    recentPapers: RequestResult<RecentPapers>;
    timeSpent: RequestResult<Activity>;
  } = yield all({
    score: call(httpGetScore, scoreData),
    recentPapers: call(httpGetRecentPapers, recentPapersData),
    timeSpent: call(httpGetTimeSpent, timeSpent),
  });

  const {
    score: { raw: sRaw, success: sSuccess },
    recentPapers: { raw: rpRaw, success: rpSuccess },
    timeSpent: { raw: tsRaw, success: tsSuccess },
  } = response;

  const learningStats: LearningStats = {
    activity: tsSuccess ? tsRaw : null,
    score: sSuccess ? sRaw : null,
    recentPapers: rpSuccess ? rpRaw : null,
  };

  yield put(fetchLearningStatisticsSuccess(learningStats));
}

export default function* onGetLearningStatistics() {
  yield takeLatest(fetchLearningStatisticsStart.type, getLearningStatistics);
}
