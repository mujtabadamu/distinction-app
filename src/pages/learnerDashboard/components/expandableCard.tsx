import { useState } from 'react';
import { BsChevronDown, BsChevronRight } from 'react-icons/bs';
import { Text, Spacer } from '@flexisaf/flexibull2';

export const ExpandableCard = ({
  title,
  value,
  description,
  onClick,
}: {
  title: string;
  value: string;
  description: string;
  onClick: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling up to the card
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`bg-[#F9FAFB] my-3 rounded-md cursor-pointer   shadow-sm max-w-2xl transition-all duration-300 ${
        isExpanded ? 'h-fit border-gray-200 border' : 'h-[85px]'
      }`}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 h-full">
        <div className="flex-1 min-w-0">
          <Text size="1rem" bold>
            {title}
          </Text>
          <Spacer space="10" />
          <Text block>{value}</Text>
        </div>

        <button
          onClick={handleExpandClick}
          className="p-2 rounded-sm hover:bg-blue-100 bg-[#1D4ED80A] transition-colors text-blue-500 flex-shrink-0"
        >
          {isExpanded ? (
            <BsChevronDown className="font-bold" size={16} />
          ) : (
            <BsChevronRight className="font-bold" size={16} />
          )}
        </button>
      </div>

      {/* Expandable Description */}
      {isExpanded && (
        <div className="px-4 flex items-center justify-between py-2 border-t border-gray-100">
          <Text block>{description}</Text>
          {/* <Text block>{description}</Text> */}
          <Text block className="text-blue-500  underline">
            View more
          </Text>
        </div>
      )}
    </div>
  );
};
