import { useCallback } from 'react';

import ContentViewer from 'components/content-viewer/content-viewer';
import ActiveFlashCardView from 'pages/myLibrary/components/activeFlashCardView';
import { Quiz } from 'components/quiz/quiz';
import { VideoPlayer } from 'components/video-player/video-player';
import {
  QuizQuestion,
  LessonType,
  LessonItem,
  processArticleContent,
} from 'utils/content-utils';
import { safeJsonParse } from 'utils/helpers';
import EmptyState from 'components/emptyState/emptyState';
import { CardView } from 'generated/index';

const RENDERER_HEIGHT = '573px';

interface LessonRendererProps {
  lesson?: LessonItem;
}

export const LessonRenderer = ({ lesson }: LessonRendererProps) => {
  const renderLesson = useCallback(() => {
    if (!lesson) {
      return (
        <EmptyState
          title="No Lesson selected"
          description="You have not selected a lessons"
        />
      );
    }

    const { type, content } = lesson;

    const componentMap = {
      [LessonType.Video]: (
        <VideoPlayer
          src={content as string}
          type="video"
          height={RENDERER_HEIGHT}
        />
      ),
      [LessonType.Article]: (
        <div
          className="py-8 px-4 bg-white overflow-y-scroll   "
          style={{ maxHeight: RENDERER_HEIGHT }}
        >
          <ContentViewer
            botResponse={processArticleContent(content as string)}
          />
        </div>
      ),
      [LessonType.Flashcard]: (
        <ActiveFlashCardView
          flashcard={{
            cards: safeJsonParse<CardView[]>(content),
          }}
        />
      ),
      [LessonType.Quiz]: (
        <Quiz questions={safeJsonParse<QuizQuestion[]>(content) ?? []} />
      ),
    };

    return componentMap[type] ?? null;
  }, [lesson]);

  return (
    <div
      style={{ height: RENDERER_HEIGHT }}
      className="shadow-md  rounded-md bg-white"
    >
      {renderLesson()}
    </div>
  );
};
