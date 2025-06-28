export type QuizQuestion = {
  question: string;
  answers: string[];
  correctAnswer: string[];
};

export enum AnswerStatus {
  Default = 'default',
  CorrectlySelected = 'correctlySelected',
  CorrectNotSelected = 'correctNotSelected',
  WronglySelected = 'wronglySelected',
}
