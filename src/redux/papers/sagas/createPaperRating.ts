import { call, put, takeLatest } from 'redux-saga/effects';
import { PapersError } from '../typings';
import { RequestResult } from '../../../utils/request';

import {
     createPaperRatingFailure,
     createPaperRatingStart,
     createPaperRatingSuccess
 } from '../reducer';
 import { httpPostPaperRating } from '../../../services/papers';


function* createPaperRating({ payload }: ReturnType<typeof createPaperRatingStart>) {
  const { callback, data } = payload;
  const response: RequestResult<never | PapersError> = yield call(
    httpPostPaperRating,
    data
  );

  const { raw, success } = response;

  if (success) {
    yield put(createPaperRatingSuccess());
    if (callback) {
      callback();
    }
  } else {
    yield put(createPaperRatingFailure(raw as PapersError));
  }
}

export default function* onCreatePaperRating() {
  yield takeLatest(createPaperRatingStart.type, createPaperRating);
}
