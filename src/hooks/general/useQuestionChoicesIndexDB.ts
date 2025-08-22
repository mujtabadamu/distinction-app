import { useState } from 'react';
import Dexie from 'dexie';
import type { AnswerOption } from '../../store/result';

interface MyDatabase extends Dexie {
  answers: Dexie.Table<IAnswerOptionDb, number>;
}

export interface IAnswerOptionDb extends AnswerOption {
  dbId?: number; // Use dbId for the database ID to avoid conflict with AnswerOption.id
}

const useQuestionChoicesIndexDB = () => {
  const [db, setDb] = useState<MyDatabase | null>(null);

  const setUpDatabase = () => {
    const database = new Dexie('QuestionChoices') as MyDatabase;
    database.version(1).stores({
      answers: '++id',
    });
    database.version(2).stores({
      answers: '++id, questionId',
    });

    setDb(database);
  };

  const addAnswer = async (answer: AnswerOption) => {
    await db?.answers.add(answer);
  };

  const getAllAnswers = () => {
    return db?.answers.toArray();
  };

  const getAnswer = (id: number) => {
    return db?.answers.get(id);
  };

  const updateAnswer = (id: number, answer: AnswerOption) => {
    return db?.answers.update(id, answer);
  };

  const deleteAnswer = (id?: number) => {
    if (!id) return;
    return db?.answers.delete(id);
  };

  const clearDB = () => {
    return db?.answers.clear();
  };

  return {
    setUpDatabase,
    database: db,
    addAnswer,
    getAllAnswers,
    getAnswer,
    updateAnswer,
    deleteAnswer,
    clearDB,
  };
};

export default useQuestionChoicesIndexDB;
