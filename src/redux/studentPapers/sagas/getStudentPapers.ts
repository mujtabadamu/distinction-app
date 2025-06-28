import { call, put, takeEvery } from 'redux-saga/effects';
import { GetStudentPapersSuccess, StudentPapersError } from '../typings';
import { RequestResult } from '../../../utils/request';

import { httpGetStudentPapers } from '../../../services/studentPapers';

import {
  fetchStudentPapersStart,
  fetchStudentPapersSuccess,
  fetchStudentPapersFailure,
  setCompletedStudentPapers,
  setInProgressStudentPapers,
} from '../reducer';

function* getStudentPapers({
  payload,
}: ReturnType<typeof fetchStudentPapersStart>) {
  const { onSuccess, onFailure, options } = payload;

  if (!options?.filterBy) {
    const response: RequestResult<
      GetStudentPapersSuccess | StudentPapersError
    > = yield call(httpGetStudentPapers, payload);

    const { raw,  success } = response;

    if (success) {
      yield put(fetchStudentPapersSuccess(raw as GetStudentPapersSuccess));

      if (onSuccess) {
        onSuccess();
      }
    } else {
      yield put(fetchStudentPapersFailure(raw as StudentPapersError));
      if (onFailure) {
        onFailure();
      }
    }
  }

  if (options?.filterBy === 'completed') {
    const response: RequestResult<GetStudentPapersSuccess> = yield call(
      httpGetStudentPapers,
      {
        ...payload,
        data: {
          ...payload.data,
          completed: true,
        },
      }
    );

    const { raw, success } = response;

    if (success) {
      yield put(setCompletedStudentPapers(raw as GetStudentPapersSuccess));
    }
  }

  if (options?.filterBy === 'inProgress') {
    const response: RequestResult<GetStudentPapersSuccess> = yield call(
      httpGetStudentPapers,
      {
        ...payload,
        data: {
          ...payload.data,
          completed: false,
        },
      }
    );

    const { raw, success } = response;

    if (success) {
      yield put(setInProgressStudentPapers(raw as GetStudentPapersSuccess));
    }
  }
}

export default function* onFetchStudentPapers() {
  yield takeEvery(fetchStudentPapersStart.type, getStudentPapers);
}
