export interface RatingDisplayProps {
  average: number;
  count: number;
}

const RATING_GOLDEN_COLOR = '#FFBA16';

export const Rating = ({ average, count }: RatingDisplayProps) => {
  return (
    <div className="flex items-center">
      <div
        className="inline-flex font-bold  items-center text"
        style={{ color: RATING_GOLDEN_COLOR }}
      >
        <span>{average.toFixed(1)}</span>
        <span className="mr-2">
          <i className="saf-star " style={{ fill: RATING_GOLDEN_COLOR }} />
        </span>
      </div>
      <span className="text-gray-400">
        {count} {count > 1 ? 'ratings' : 'rating'}
      </span>
    </div>
  );
};
