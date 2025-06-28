export enum ViewMode {
  List = 'list',

  Carousel = 'carousel',
}

const viewModeIcons = {
  [ViewMode.List]: <i className="text-[18px] saf-row-vertical" />,
  [ViewMode.Carousel]: <i className=" text-[18px] saf-slider-horizontal" />,
};
type ViewTogglerProps = {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
};

const selectedClasses = 'bg-blue-50 border border-blue-300 text-blue-800';

export const ViewToggler = ({ viewMode, setViewMode }: ViewTogglerProps) => {
  const handleViewChange = (newViewMode: ViewMode) => {
    setViewMode(newViewMode);
  };

  return (
    <div className="inline-flex gap-2">
      {Object.values(ViewMode).map((mode) => (
        <button
          key={mode}
          className={`
          rounded-md p-2 cursor-pointer
          ${
            viewMode === mode
              ? selectedClasses
              : 'bg-transparent border border-transparent'
          }
        `}
          onClick={() => handleViewChange(mode)}
        >
          {viewModeIcons[mode]}
        </button>
      ))}
    </div>
  );
};
