import { LessonGroupView } from 'generated/index';
import { safeJsonParse } from './helpers';
import uniqueId from 'lodash/uniqueId';
import type { FlashcardView, CardView } from 'generated/index';

export enum LessonType {
  Video = 'VIDEO',
  Article = 'ARTICLE',
  Quiz = 'QUIZ',
  Flashcard = 'FLASHCARD',
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answers: string[];
}

export interface LessonFlashcard {
  question: string;
  answer: string;
}

export interface LessonItem {
  lessonId?: string;
  id: string;
  type: LessonType;
  title: string;
  description?: string;
  content: string;
}

const lessonTypeIconClassMap = {
  [LessonType.Video]: 'saf-play-circle',
  [LessonType.Article]: 'saf-document-text',
  [LessonType.Flashcard]: 'saf-cards',
  [LessonType.Quiz]: 'saf-message-question',
};

export const getIconClassForLessonType = (contentType: LessonType) => {
  return (
    lessonTypeIconClassMap[contentType] ??
    lessonTypeIconClassMap[LessonType.Article]
  );
};
export const sortLessonGroups = (
  lessonGroups: LessonGroupView[]
): LessonGroupView[] => {
  if (!lessonGroups || lessonGroups.length === 0) {
    return [];
  }

  const mutableLessonGroups: LessonGroupView[] = lessonGroups.map((group) => {
    return {
      ...group,
      lessons: group.lessons?.map((lesson) => ({
        ...lesson,
        lessonItems: lesson.lessonItems?.map((item) => ({ ...item })),
      })),
    };
  });

  mutableLessonGroups.forEach((group) => {
    group.lessons?.sort((a, b) => {
      const numA = a.lessonNumber ?? 0;
      const numB = b.lessonNumber ?? 0;
      return numA - numB;
    });

    group.lessons?.forEach((lesson) => {
      lesson.lessonItems?.sort((a, b) => {
        const itemNumA = a.itemNumber ?? 0;
        const itemNumB = b.itemNumber ?? 0;
        return itemNumA - itemNumB;
      });
    });
  });

  mutableLessonGroups.sort((a, b) => {
    const numA = a.groupNumber ?? 0;
    const numB = b.groupNumber ?? 0;
    return numA - numB;
  });

  return mutableLessonGroups;
};

export const processArticleContent = (content: string) => {
  const parsed = safeJsonParse<string>(content);
  return parsed ?? 'Unable to render article...';
};

function simpleHash(str: string): string {
  let hash = 0,
    i,
    chr;
  if (str.length === 0) return '0';
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

export function parseFlashcardWithId(content: string): FlashcardView {
  let cards: CardView[] = [];
  try {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      cards = parsed;
    }
  } catch {
    cards = [];
  }

  const cardsWithIds = cards.map((card) => {
    if (card.id) return card;
    let generatedId = '';
    try {
      generatedId = 'card_' + simpleHash(JSON.stringify(card));
    } catch {
      generatedId = uniqueId('card_');
    }
    return { ...card, id: generatedId };
  });

  return { cards: cardsWithIds };
}

export type CompletionTracker = {
  lessonGroups: { id: string; isCompleted: boolean }[];
  lessons: { id: string; isCompleted: boolean }[];
  completedLessonGroupsCount: number;
  completedLessonsCount: number;
  lessonGroupMap: Record<string, { id: string; isCompleted: boolean }>;
  lessonMap: Record<string, { id: string; isCompleted: boolean }>;
};

export interface StudyTimeItem {
  id: string;
  studyTime: number; // time in seconds
}

export interface StudyTime {
  lessonGroups: StudyTimeItem[];
  lessons: StudyTimeItem[];
  lessonItems: StudyTimeItem[];
  totalStudyTime: number; // total time in seconds
}
