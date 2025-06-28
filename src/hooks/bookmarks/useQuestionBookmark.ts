import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addBookmark,
  removeBookmark,
  clearBookmarks,
} from '../../redux/studentPapers/reducer';
import { BookmarksDb } from '../../redux/studentPapers/typings';
import { selectBookmarks } from '../../redux/studentPapers/selectors';
import useBookmarkIndexDB from '../general/useBookmarkIndexDB';
import { RequestResult } from '../../utils/request';
import {
  httpDeletePaperBookmark,
  httpPostPaperBookmark,
  IHttpPostPaperBookmark,
} from '../../services/studentPapers';
import { errorNotifier } from '../../utils/helpers';

const useQuestionBookmark = () => {
  const { bookmarkDb, setUpBookmarkDb, addBookmarkToDB, getAllBookmarkFromDB } =
    useBookmarkIndexDB();
  const bookmarks = useSelector(selectBookmarks);
  const dispatch = useDispatch();
  const mode = localStorage.getItem('mode');

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
    dispatch(addBookmark([...bookmarks, payload]));
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
        const response: RequestResult<BookmarksDb | string> =
          await requestAddBookmark(bookmark);
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
    dispatch(clearBookmarks());
  };

  const requestAddBookmark = (data: IHttpPostPaperBookmark) => {
    return httpPostPaperBookmark(data);
  };

  const requestRemoveBookmark = (data: IHttpPostPaperBookmark) => {
    return httpDeletePaperBookmark(data);
  };

  return {
    bookmarkQuestion,
    removeQuestionBookmark,
    resetBookmarks,
    bookmarks,
  };
};

export default useQuestionBookmark;
