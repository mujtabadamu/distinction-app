import { call, put, takeLatest } from 'redux-saga/effects';
import { GetTopicsSuccess, TopicsError } from '../typings';
import { RequestResult } from '../../../utils/request';

import { httpGetAutoCompleteTopics } from '../../../services/topics';
import { networkErrorHandler } from '../../../utils/errorHandlers';

import {
  fetchAutoCompleteTopicsStart,
  fetchAutoCompleteTopicsSuccess,
  fetchAutoCompleteTopicsFailure,
} from '../reducer';

function* getAutoCompleteTopics({
  payload,
}: ReturnType<typeof fetchAutoCompleteTopicsStart>) {
  const response: RequestResult<GetTopicsSuccess | TopicsError> = yield call(
    httpGetAutoCompleteTopics,
    payload
  );

  const { raw, statusCode, success, message } = response;

  if (success) {
    yield put(fetchAutoCompleteTopicsSuccess(raw as GetTopicsSuccess));
  } else {
    yield put(fetchAutoCompleteTopicsFailure(raw as TopicsError));
    networkErrorHandler(statusCode, message);
  }
}

export default function* onFetchAutoCompleteTopics() {
  yield takeLatest(fetchAutoCompleteTopicsStart.type, getAutoCompleteTopics);
}
