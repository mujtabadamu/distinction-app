import React from 'react';
import { LessonType } from 'utils/content-utils';

import HugeiconsFile01 from 'assets/icons/hugeicons-file-01.svg?react';
import HugeiconsBookEdit from 'assets/icons/hugeicons-book-edit.svg?react';
import HugeiconsNote from 'assets/icons/hugeicons-note.svg?react';
import HugeiconsPlayCircle from 'assets/icons/hugeicons-play-circle.svg?react';

interface LessonTypeIconProps {
  lessonType: LessonType;
  className?: string;
  size?: number;
  color?: string;
}

const LessonTypeIcon: React.FC<LessonTypeIconProps> = ({
  lessonType,
  className = '',
  color = 'black',
  size = 16,
}) => {
  const iconMap = {
    [LessonType.Article]: HugeiconsFile01,
    [LessonType.Flashcard]: HugeiconsNote,
    [LessonType.Quiz]: HugeiconsBookEdit,
    [LessonType.Video]: HugeiconsPlayCircle,
  };

  const IconComponent =
    iconMap[lessonType as keyof typeof iconMap] || HugeiconsFile01;

  return (
    <IconComponent
      className={className}
      style={{ width: size, height: size, color }}
    />
  );
};

export default LessonTypeIcon;
