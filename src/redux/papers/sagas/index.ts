import { all, call } from 'redux-saga/effects';

import onFetchPapers from './getPapers';
import onCreatePaperRating from './createPaperRating';

export default function* papersSaga() {
  yield all([
    call(onFetchPapers),
    call(onCreatePaperRating)
  ]);
}
