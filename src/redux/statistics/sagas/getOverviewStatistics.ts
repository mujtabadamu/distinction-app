import { call, put, takeLatest, all } from 'redux-saga/effects';
import { Overview, Activity, Score, RecentPapers,QuestionCountByYear } from '../typings';
import { RequestResult } from '../../../utils/request';

import {
  httpGetScore,
  httpGetRecentPapers,
  httpGetTimeSpent,
  httpGetQuestionCountByYear,
} from '../../../services/statistics';

import {
  fetchOverviewStatisticsStart,
  fetchOverviewStatisticsSuccess,
} from '../reducer';

function* getOverviewStatistics({
  payload,
}: ReturnType<typeof fetchOverviewStatisticsStart>) {
  const {
    data: { timeSpent, scoreData, recentPapersData, questionCountByYearData },
  } = payload;
  const response: {
    score: RequestResult<Score>;
    recentPapers: RequestResult<RecentPapers>;
    timeSpent: RequestResult<Activity>;
    questionCountByYear:RequestResult<QuestionCountByYear>;
  } = yield all({
    score: call(httpGetScore, scoreData),
    recentPapers: call(httpGetRecentPapers, recentPapersData),
    timeSpent: call(httpGetTimeSpent, timeSpent),
    questionCountByYear:call(httpGetQuestionCountByYear,questionCountByYearData)
  });

  const {
    score: { raw: sRaw, success: sSuccess },
    recentPapers: { raw: rpRaw, success: rpSuccess },
    timeSpent: { raw: tsRaw, success: tsSuccess },
    questionCountByYear: { raw: countRaw, success: countSuccess },
  } = response;

  const overview: Overview = {
    activity: tsSuccess ? tsRaw : null,
    score: sSuccess ? sRaw : null,
    recentPapers: rpSuccess ? rpRaw : null,
    questionCountByYear:countSuccess? countRaw:null
  };

  yield put(fetchOverviewStatisticsSuccess(overview));
}

export default function* onGetOverviewStatistics() {
  yield takeLatest(fetchOverviewStatisticsStart.type, getOverviewStatistics);
}
