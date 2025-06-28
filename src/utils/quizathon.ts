import { QuizathonView } from 'generated/index';
import moment from 'moment';

export const getActiveQuizathonUtil = (
  quizathons: QuizathonView[]
): QuizathonView | undefined => {
  const currentTime = moment();

  return quizathons.find((quizathon) => {
    if (!quizathon.startAt || !quizathon.stopAt) return false;

    const startTime = moment(quizathon.startAt);
    const endTime = moment(quizathon.stopAt);
    return currentTime.isBetween(startTime, endTime, null, '[]');
  });
};

export const quizathonInProgress = (
  quizathon: QuizathonView | undefined
): boolean => {
  if (!quizathon?.startAt || !quizathon?.stopAt) return false;

  const currentTime = moment();
  const startTime = moment(quizathon.startAt);
  const endTime = moment(quizathon.stopAt);

  return currentTime.isBetween(startTime, endTime, null, '[]');
};

export const quizathonStarted = (
  quizathon: QuizathonView | undefined
): boolean => {
  if (!quizathon?.startAt) return false;

  const currentTime = moment();
  const startTime = moment(quizathon.startAt);

  return currentTime.isSameOrAfter(startTime);
};

export const quizathonEnded = (
  quizathon: QuizathonView | undefined
): boolean => {
  if (!quizathon?.stopAt) return false;

  const currentTime = moment();
  const endTime = moment(quizathon.stopAt);

  return currentTime.isAfter(endTime);
};

const numberToWords = (num: number): string => {
  if (num === 0) return 'Zero';

  const ones = [
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ];

  const tens = [
    '',
    '',
    'Twenty',
    'Thirty',
    'Forty',
    'Fifty',
    'Sixty',
    'Seventy',
    'Eighty',
    'Ninety',
  ];

  const scales = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];

  const convertHundreds = (n: number): string => {
    let result = '';

    if (n >= 100) {
      result += ones[Math.floor(n / 100)] + ' Hundred';
      n %= 100;
      if (n > 0) result += ' ';
    }

    if (n >= 20) {
      result += tens[Math.floor(n / 10)];
      n %= 10;
      if (n > 0) result += ' ';
    }

    if (n > 0) {
      result += ones[n];
    }

    return result;
  };

  if (num < 0) return 'Negative ' + numberToWords(-num);

  let result = '';
  let scaleIndex = 0;

  while (num > 0) {
    const chunk = num % 1000;
    if (chunk !== 0) {
      const chunkWords = convertHundreds(chunk);
      if (scaleIndex > 0) {
        result =
          chunkWords + ' ' + scales[scaleIndex] + (result ? ' ' + result : '');
      } else {
        result = chunkWords;
      }
    }
    num = Math.floor(num / 1000);
    scaleIndex++;
  }

  return result;
};

export const formatPrize = (prizeAmount: number) => {
  if (!prizeAmount || prizeAmount === 0) {
    return 'No prize specified';
  }

  const prizeInWords = numberToWords(prizeAmount);
  return `${prizeInWords} Naira`;
};
