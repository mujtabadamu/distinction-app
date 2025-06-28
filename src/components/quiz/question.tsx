import { QuizQuestion } from 'utils/content-utils';
import { AnswerStatus } from './types';

interface QuizQuestionProps {
  question: QuizQuestion;
  questionIndex: number;
  selectedAnswers: string[];
  quizSubmitted: boolean;
  onAnswerSelect: (questionIndex: number, answer: string) => void;
  getAnswerStatus: (questionIndex: number, answer: string) => AnswerStatus;
}

const statusClassesMap: Record<AnswerStatus, string> = {
  [AnswerStatus.CorrectlySelected]:
    'bg-green-100 border border-green-500 text-green-800',
  [AnswerStatus.CorrectNotSelected]:
    'bg-cyan-50 border border-cyan-500 text-cyan-800',
  [AnswerStatus.WronglySelected]:
    'bg-red-100 border border-red-500 text-red-800',
  [AnswerStatus.Default]:
    'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100',
};

const getAnswerLabelClasses = (
  status: AnswerStatus,
  quizSubmitted: boolean
): string => {
  let classes =
    'flex-grow p-3 rounded-md transition-all duration-300 text-base flex items-center';

  classes += ` ${statusClassesMap[status]}`;

  classes += quizSubmitted ? 'cursor-default' : 'cursor-pointer';

  return classes;
};

export const Question = ({
  question,
  questionIndex,
  selectedAnswers,
  quizSubmitted,
  onAnswerSelect,
  getAnswerStatus,
}: QuizQuestionProps) => {
  return (
    <div className="mb-8 pb-5 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
      <h2 className="text-xs text-gray-600 mb-1 uppercase tracking-wider">
        QUESTION {questionIndex + 1}
      </h2>
      <p className="text-lg text-gray-800 mb-2 leading-relaxed">
        {question.question}
      </p>
      <p className="text-sm text-gray-500 mb-4">Select correct answer</p>

      <div className="flex flex-col">
        {question.options.map((answer, answerIndex) => {
          const isSelected = selectedAnswers.includes(answer);
          const status = getAnswerStatus(questionIndex, answer);

          const labelClasses = getAnswerLabelClasses(status, quizSubmitted);

          let inputClasses =
            'mr-3 appearance-none w-5 h-5 border-2 rounded-md cursor-pointer relative outline-none transition-all duration-300 checked:bg-blue-700 checked:border-blue-700 hover:border-blue-700 disabled:cursor-not-allowed disabled:opacity-80 disabled:bg-gray-200 disabled:border-gray-300';

          if (question.answers.length === 1) {
            inputClasses = inputClasses.replace('rounded-md', 'rounded-full');
          }

          return (
            <div key={answerIndex} className="flex items-center mb-2 last:mb-0">
              <input
                type={question.answers.length > 1 ? 'checkbox' : 'radio'}
                id={`q${questionIndex}-a${answerIndex}`}
                name={`question-${questionIndex}`}
                checked={isSelected}
                onChange={() => onAnswerSelect(questionIndex, answer)}
                disabled={quizSubmitted}
                className={inputClasses}
              />
              <label
                htmlFor={`q${questionIndex}-a${answerIndex}`}
                className={labelClasses}
              >
                {answer}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
