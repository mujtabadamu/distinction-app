import { all, call } from 'redux-saga/effects';

import onCreatePaper from './createStudentPapers';
import onFetchStudentPaperQuestions from './getStudentPaperQuestions';
import onFetchStudentPaperQuestionsSolutions from './getStudentPaperQuestionsSolutions';
import onSubmitPaper from './submitStudentPaper';
import onGetSingleStudentPaper from './getSingleStudentPaper';
import onGetStudentPapers from './getStudentPapers';

export default function* studentPapersSaga() {
  yield all([
    call(onCreatePaper),
    call(onFetchStudentPaperQuestions),
    call(onFetchStudentPaperQuestionsSolutions),
    call(onSubmitPaper),
    call(onGetSingleStudentPaper),
    call(onGetStudentPapers),
  ]);
}
