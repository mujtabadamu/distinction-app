import { all, call } from 'redux-saga/effects';

import onCreatePractice from './createStudentPractice';
import onGetSingleStudentPractice from './getSingleStudentPractice';
import onGetStudentPractice from './getStudentPractice';

export default function* studentPracticeSaga() {
  yield all([
    call(onCreatePractice),
    call(onGetSingleStudentPractice),
    call(onGetStudentPractice),
  ]);
}
