import { useState } from 'react';
import Dexie from 'dexie';
import { BookmarksDb } from '../../typings/studentPaper';

interface MyDatabase extends Dexie {
  bookmarkedQuestions: Dexie.Table<BookmarksDb>;
}

const useBookmarkIndexDB = () => {
  const [db, setDb] = useState<MyDatabase | null>(null);

  const setUpBookmarkDb = () => {
    const database = new Dexie('QuestionBookmarks') as MyDatabase;
    database.version(1).stores({
      bookmarkedQuestions: '++id',
    });

    setDb(database);
  };

  const addBookmarkToDB = async (bookmark: BookmarksDb) => {
    await db?.bookmarkedQuestions.add(bookmark);
  };

  const getAllBookmarkFromDB = () => {
    return db?.bookmarkedQuestions.toArray();
  };

  const getBookmarkFromDB = (questionId: string) => {
    return db?.bookmarkedQuestions.get(questionId);
  };

  const deleteBookmarkFromDB = (id?: number) => {
    if (!id) return;
    return db?.bookmarkedQuestions.delete(id);
  };

  return {
    bookmarkDb: db,
    setUpBookmarkDb,
    addBookmarkToDB,
    getAllBookmarkFromDB,
    getBookmarkFromDB,
    deleteBookmarkFromDB,
  };
};

export default useBookmarkIndexDB;
