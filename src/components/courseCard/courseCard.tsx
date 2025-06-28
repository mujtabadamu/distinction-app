import React, { useState } from 'react';
import { Button } from '@flexisaf/flexibull2';
import coursePlaceholder from 'assets/placeholder-images/course-placeholder.jpg';

interface CourseCardProps {
  coverImageUrl?: string;
  title: string;
  tag?: string;
  isInProgress?: boolean;
  onActionClick: () => void;
}

export const CourseCard = (props: CourseCardProps) => {
  const { coverImageUrl, title, tag, isInProgress, onActionClick } = props;
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="rounded-lg bg-white flex flex-col shadow-sm overflow-hidden border">
      <img
        src={coverImageUrl ?? coursePlaceholder}
        alt={title}
        className={`w-full h-48 object-cover ${
          imageLoaded ? 'blur-0' : 'blur-lg'
        } transition-all duration-500 ease-in-out`}
        onLoad={() => setImageLoaded(true)}
      />
      <div className="p-4 flex flex-col mt-auto">
        <div className="font-bold text-[14px] mb-2">{title}</div>
        <p className="text-label-grey text-[12px] flex items-center">
          <i className="saf-clipboard" />
          {tag ?? 'N/A'}
        </p>
        <div className="mt-auto">
          <Button
            color="black"
            fontColor={isInProgress ? 'black' : undefined}
            pale={isInProgress}
            onClick={onActionClick}
            style={{ width: '100%' }}
          >
            View Course
          </Button>
        </div>
      </div>
    </div>
  );
};
