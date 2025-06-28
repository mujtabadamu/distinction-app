import { all, call } from 'redux-saga/effects';

import onGetOverviewStatistics from './getOverviewStatistics';
import onGetLearningStatistics from './getLearningStatistics';
import onGetTotalQuestion from './getTotalSingleQuestion';

export default function* statisticsSaga() {
  yield all([call(onGetOverviewStatistics), call(onGetLearningStatistics) , call(onGetTotalQuestion)]);
}
