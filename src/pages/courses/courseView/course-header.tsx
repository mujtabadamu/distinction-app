import { Button, Text } from '@flexisaf/flexibull2';
import { PropsWithChildren } from 'react';

import { Rating, RatingDisplayProps } from 'components/rating/rating';

type CourseHeaderProps = {
  title: string;
  tags: string[];
  onBookmark: () => void;
  backgroundUrl?: string;
  rating?: RatingDisplayProps;
  className?: string;
};
export const CourseHeader = (p: CourseHeaderProps) => {
  return (
    <div
      className={`rounded-lg flex flex-col px-[14px] py-[18px]  bg-[#1B133F] min-h-[200px] text-white  bg-[rgba(27, 19, 63, 1)] bg-contain bg-no-repeat bg-center${
        p.className ?? ''
      }`}
      style={{
        backgroundImage: p.backgroundUrl
          ? `url(${p.backgroundUrl})`
          : undefined,
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-[10px]">
          {p.tags.map((t) => (
            <CourseTag> {t}</CourseTag>
          ))}
        </div>

        <div>
          <Button
            title="Bookmark this "
            plain
            onClick={p.onBookmark}
            color="white"
            iconLeft={
              <i
                className="saf-archive-add"
                style={{ fontSize: '16px', fontWeight: 'bold' }}
              />
            }
          >
            <span className="hidden md:block">Bookmark this</span>
          </Button>
        </div>
      </div>

      <div className="mt-auto flex items-end justify-between  ">
        <div className="flex gap-4 flex-col">
          <Text> Course Learning Module</Text>
          <Text bold size="24px">
            {p.title}
          </Text>
        </div>
        <div className="hidden md:inline-flex  items-center gap-[20px]">
          {p.rating && <Rating {...p.rating} />}
          <StudentCount count={p.rating?.count ?? 0} />
        </div>
      </div>
    </div>
  );
};

const CourseTag = (p: PropsWithChildren) => {
  const TAG_BACKGROUND = 'rgba(236, 236, 236, 0.2)';
  return (
    <div
      className="rounded-md font-[600] text-smaller px-[10px] py-[4px]"
      style={{ background: TAG_BACKGROUND }}
    >
      {p.children}
    </div>
  );
};

const StudentCount = (p: { count: number }) => (
  <div className="inline-flex gap-2">
    <Text bold className="text-white">
      {p.count}
    </Text>
    <Text className="text-gray-400">
      {p.count > 1 ? 'Students' : 'Student'}
    </Text>
  </div>
);
