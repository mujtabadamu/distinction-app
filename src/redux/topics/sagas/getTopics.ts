import { call, put, takeLatest } from 'redux-saga/effects';
import { GetTopicsSuccess, TopicsError } from '../typings';
import { RequestResult } from '../../../utils/request';

import { httpGetTopics } from '../../../services/topics';
import { networkErrorHandler } from '../../../utils/errorHandlers';

import {
  fetchTopicsFailure,
  fetchTopicsStart,
  fetchTopicsSuccess,
} from '../reducer';

function* getTopics({ payload }: ReturnType<typeof fetchTopicsStart>) {
  const response: RequestResult<GetTopicsSuccess | TopicsError> = yield call(
    httpGetTopics,
    payload
  );

  const { raw, statusCode, success, message } = response;

  if (success) {
    yield put(fetchTopicsSuccess(raw as GetTopicsSuccess));
  } else {
    yield put(fetchTopicsFailure(raw as TopicsError));
    networkErrorHandler(statusCode, message);
  }
}

export default function* onFetchTopics() {
  yield takeLatest(fetchTopicsStart.type, getTopics);
}
