import { call, put, takeLatest } from 'redux-saga/effects';
import { GetPapersSuccess, PapersError } from '../typings';
import { RequestResult } from '../../../utils/request';

import { httpGetPapers } from '../../../services/papers';
// import { networkErrorHandler } from '../../../utils/errorHandlers';

import {
  fetchPapersStart,
  fetchPapersFailure,
  fetchPapersSuccess,
} from '../reducer';

function* getPapers({ payload }: ReturnType<typeof fetchPapersStart>) {
  const response: RequestResult<GetPapersSuccess | PapersError> = yield call(
    httpGetPapers,
    payload
  );

  const { raw, success } = response;

  if (success) {
    yield put(fetchPapersSuccess(raw as GetPapersSuccess));
  } else {
    yield put(fetchPapersFailure(raw as PapersError));
    // networkErrorHandler(statusCode, message);
  }
}

export default function* onFetchPapers() {
  yield takeLatest(fetchPapersStart.type, getPapers);
}
