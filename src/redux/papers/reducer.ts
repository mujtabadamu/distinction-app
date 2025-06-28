import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  PapersState,
  PapersError,
  GetPapersPayload,
  GetPapersSuccess,
  PostPaperRatingPayload,
} from './typings';

const initialState: PapersState = {
  papers: null,
  isFetchingPapers: false,
  error: null,
  isCreatingRating:false,
  paperRating:null
};

const papersSlice = createSlice({
  name: 'papers',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchPapersStart: (state, action: PayloadAction<GetPapersPayload>) => {
      state.isFetchingPapers = true;
    },
    fetchPapersSuccess: (state, action: PayloadAction<GetPapersSuccess>) => {
      state.isFetchingPapers = false;
      state.papers = action.payload;
    },
    fetchPapersFailure: (state, action: PayloadAction<PapersError>) => {
      state.isFetchingPapers = false;
      state.papers = null;
      state.error = action.payload;
    },
    createPaperRatingStart: (
      state,
       // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<PostPaperRatingPayload>
    ) => {
      state.isCreatingRating = true;
      state.error = null;
    },
    createPaperRatingSuccess: (
      state,
    ) => {
      state.isCreatingRating = false;
    },
    createPaperRatingFailure: (
      state,
      action: PayloadAction<PapersError>
    ) => {
      state.isCreatingRating = false;
      state.error = action.payload;
    },
  },
});

export const { 
  fetchPapersStart, 
  fetchPapersSuccess,
   fetchPapersFailure,
   createPaperRatingStart,
   createPaperRatingSuccess,
   createPaperRatingFailure,

   } =
  papersSlice.actions;

const papersReducer = papersSlice.reducer;

export default papersReducer;
