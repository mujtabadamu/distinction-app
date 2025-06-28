import { LessonGroupView } from 'generated/index';
import { safeJsonParse } from './helpers';

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
