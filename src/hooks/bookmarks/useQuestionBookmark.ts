import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useBookmarkIndexDB from '../general/useBookmarkIndexDB';
import { BookmarksDb } from '../../typings/studentPaper';
import {
  useEnhancedAddBookmarkMutation,
  useEnhancedDeleteBookmarkMutation,
} from '../../store/enhancedApi';
import { errorNotifier } from '../../utils/helpers';
import {
  addBookmark,
  removeBookmark,
  clearBookmarks,
} from '../studentPapers/useStudentPaperSlice';
import { RootState, useAppDispatch } from '../../store/store';

const useQuestionBookmark = () => {
  const dispatch = useAppDispatch();
  const { bookmarks } = useSelector((state: RootState) => state.studentPaperUI);
  const { bookmarkDb, setUpBookmarkDb, addBookmarkToDB, getAllBookmarkFromDB } =
    useBookmarkIndexDB();
  const mode = localStorage.getItem('mode');

  // RTK Query mutations
  const [addBookmarkMutation] = useEnhancedAddBookmarkMutation();
  const [deleteBookmarkMutation] = useEnhancedDeleteBookmarkMutation();

  useEffect(() => {
    if (!bookmarkDb) {
      setUpBookmarkDb();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('online', handleBookmarkSync);
    window.addEventListener('offline', handleBookmarkSync);

    return () => {
      window.removeEventListener('online', handleBookmarkSync);
      window.removeEventListener('offline', handleBookmarkSync);
    };
  }, []);

  const handleBookmarkSync = async () => {
    if (navigator.onLine) {
      addBookmarkToServer();
    }
  };

  const bookmarkQuestion = async (payload: BookmarksDb) => {
    dispatch(addBookmark(payload));
    if (mode === 'real') {
      await addBookmarkToDB(payload);
      await handleBookmarkSync();
    }
  };

  const addBookmarkToServer = async () => {
    try {
      const bookmarks = await getAllBookmarkFromDB();
      if (!bookmarks) return;
      for (const bookmark of bookmarks) {
        const response = await requestAddBookmark(bookmark);
        if (response.success) {
          if (bookmark.id) {
            await bookmarkDb?.bookmarkedQuestions.delete(bookmark.id);
          }
        } else {
          if (!bookmark.id) return;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeQuestionBookmark = async (payload: BookmarksDb) => {
    if (mode === 'real') {
      await RemoveBookmarkFromServer(payload);
    } else {
      dispatch(removeBookmark(payload));
    }
  };

  const RemoveBookmarkFromServer = async (payload: BookmarksDb) => {
    try {
      const response = await requestRemoveBookmark(payload);
      if (response.success) {
        dispatch(removeBookmark(payload));
      } else {
        errorNotifier(response.message || (response.raw as string));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const resetBookmarks = () => {
    // setBookmarks([]);
  };

  const requestAddBookmark = async (data: {
    questionId: string;
    studentPaperId: string;
  }) => {
    try {
      await addBookmarkMutation({
        id: data.studentPaperId,
        bookmarkRequest: {
          questionId: data.questionId,
        },
      }).unwrap();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error?.data?.message || 'Failed to add bookmark',
        raw: error,
      };
    }
  };

  const requestRemoveBookmark = async (data: {
    questionId: string;
    studentPaperId: string;
  }) => {
    try {
      await deleteBookmarkMutation({
        id: data.studentPaperId,
        questionId: data.questionId,
      }).unwrap();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error?.data?.message || 'Failed to remove bookmark',
        raw: error,
      };
    }
  };

  return {
    bookmarkQuestion,
    removeQuestionBookmark,
    resetBookmarks,
    bookmarks: bookmarks || [],
  };
};

export default useQuestionBookmark;
