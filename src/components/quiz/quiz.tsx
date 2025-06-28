import { useState, useCallback, useMemo } from 'react';
import { QuizQuestion } from 'utils/content-utils';
import { Question } from './question';
import { AnswerStatus } from './types';

interface QuizProps {
  questions: QuizQuestion[];
}

export const Quiz = ({ questions }: QuizProps) => {
  const [selectedAnswersMap, setSelectedAnswersMap] = useState<
    Map<number, string[]>
  >(new Map());
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const handleAnswerSelect = useCallback(
    (questionIndex: number, answer: string) => {
      if (quizSubmitted) return;

      setSelectedAnswersMap((prevMap) => {
        const newMap = new Map(prevMap);
        const question = questions[questionIndex];
        const currentSelectedAnswers = prevMap.get(questionIndex) || [];
        let updatedAnswers: string[];

        if (question.answers.length > 1) {
          if (currentSelectedAnswers.includes(answer)) {
            updatedAnswers = currentSelectedAnswers.filter(
              (item) => item !== answer
            );
          } else {
            updatedAnswers = [...currentSelectedAnswers, answer];
          }
        } else {
          updatedAnswers = [answer];
        }
        newMap.set(questionIndex, updatedAnswers);
        return newMap;
      });
    },
    [quizSubmitted, questions]
  );

  const calculateAndSetScore = useCallback(() => {
    const calculatedScore = questions.reduce((accScore, question, qIndex) => {
      const userAnswers = selectedAnswersMap.get(qIndex) || [];
      const correctAnswers = question.answers;

      const sortedUserAnswers = [...userAnswers].sort();
      const sortedCorrectAnswers = [...correctAnswers].sort();

      const isCorrect =
        sortedUserAnswers.length === sortedCorrectAnswers.length &&
        sortedUserAnswers.every(
          (ans, index) => ans === sortedCorrectAnswers[index]
        );

      return accScore + (isCorrect ? 1 : 0);
    }, 0);
    setScore(calculatedScore);
  }, [questions, selectedAnswersMap]);

  const handleSubmit = useCallback(() => {
    setQuizSubmitted(true);
    calculateAndSetScore();
  }, [calculateAndSetScore]);

  const getAnswerStatus = useCallback(
    (questionIndex: number, answerOption: string): AnswerStatus => {
      if (!quizSubmitted) return AnswerStatus.Default;

      const question = questions[questionIndex];
      const userSelectedAnswers = selectedAnswersMap.get(questionIndex) || [];

      const isCorrectAnswer = question.answers.includes(answerOption);
      const isUserSelected = userSelectedAnswers.includes(answerOption);

      if (isCorrectAnswer && isUserSelected)
        return AnswerStatus.CorrectlySelected;
      if (isCorrectAnswer && !isUserSelected)
        return AnswerStatus.CorrectNotSelected;
      if (!isCorrectAnswer && isUserSelected)
        return AnswerStatus.WronglySelected;
      return AnswerStatus.Default;
    },
    [quizSubmitted, questions, selectedAnswersMap]
  );

  const answeredQuestionsCount = useMemo(() => {
    return Array.from(selectedAnswersMap.values()).filter(
      (answers) => answers.length > 0
    ).length;
  }, [selectedAnswersMap]);

  const totalQuestions = questions.length;
  const showScore = quizSubmitted && score !== null;

  return (
    <div className="flex flex-col w-full h-full mx-auto bg-gray-100 rounded-lg shadow-lg overflow-hidden ">
      <div className="flex-grow flex flex-col relative overflow-y-auto bg-white p-5 pb-20">
        {questions.map((question, qIndex) => (
          <Question
            // questions do not have an stable ID field,
            // and questions are not expected to be modified once displayed
            key={qIndex}
            question={question}
            questionIndex={qIndex}
            selectedAnswers={selectedAnswersMap.get(qIndex) || []}
            quizSubmitted={quizSubmitted}
            onAnswerSelect={handleAnswerSelect}
            getAnswerStatus={getAnswerStatus}
          />
        ))}
      </div>

      <div className="flex justify-between items-center p-4 border-t shadow-lg sticky bottom-0 z-10 rounded-b-lg">
        <div className="flex items-center gap-5">
          <span className="text-base ">
            <b>{answeredQuestionsCount} </b> <i>of</i> {totalQuestions} answered
          </span>
          {showScore && (
            <span className="text-lg font-bold text-green-400 bg-gray-700 rounded-md px-3 py-1 rounded">
              Your Score: {score} / {totalQuestions}
            </span>
          )}
        </div>
        <button
          onClick={handleSubmit}
          disabled={quizSubmitted}
          className="px-5 py-2 text-base bg-gray-900 text-white rounded-md cursor-pointer transition-colors duration-300 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {quizSubmitted ? 'Submitted' : 'Submit Exercise'}
        </button>
      </div>
    </div>
  );
};
