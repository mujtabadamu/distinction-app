import { Button } from '@flexisaf/flexibull2';
import ReactDOM from 'react-dom';

// -----Item Container (WIP Component)-----
interface ItemContainerProps extends React.HTMLProps<HTMLDivElement> {
  bottomContainerProps?: React.HTMLProps<HTMLDivElement>;
  isFullScreen: boolean;
  onToggleFullScreen: () => void;
}

const ItemContainer: React.FC<ItemContainerProps> = ({
  children,
  bottomContainerProps,
  isFullScreen,
  onToggleFullScreen,
  ...itemProps
}) => {
  const baseContainerClasses =
    'relative rounded-lg shadow-md transition-all duration-300';

  const fullScreenClasses = 'fixed inset-0 z-[100] h-screen w-screen';

  const combinedContainerClasses = isFullScreen
    ? `${baseContainerClasses} ${fullScreenClasses} bg-white p-4`
    : `${baseContainerClasses} p-4 border`;

  const itemContent = (
    <div {...itemProps} className={combinedContainerClasses}>
      <div className={`relative ${isFullScreen ? 'h-full w-full' : ''}`}>
        {children}
      </div>

      <BottomContainer
        {...{ ...bottomContainerProps, setFullscreen: onToggleFullScreen }}
        isFullScreen={isFullScreen}
      />
    </div>
  );

  if (isFullScreen) {
    return ReactDOM.createPortal(itemContent, document.body);
  }

  return itemContent;
};

// -----Botton Container-----

interface BottomContainerProps extends React.HTMLProps<HTMLDivElement> {
  height?: React.CSSProperties['height'];
  setFullscreen?: () => void;
  isFullScreen?: boolean;
}

const BottomContainer: React.FC<BottomContainerProps> = ({
  height = '100px',
  className,
  children,
  setFullscreen,
  isFullScreen,
  ...props
}) => {
  const barGradient =
    'linear-gradient(180deg, rgba(27, 27, 27, 0) 8.88%, rgba(117, 117, 117, 0.37) 69.62%)';

  return (
    <div
      className={`flex items-center justify-end px-4 ${className} relative ${
        isFullScreen ? 'absolute bottom-0 left-0 right-0' : ''
      }`}
      style={{
        background: barGradient,
        height,
      }}
      {...props}
    >
      {children}
      {setFullscreen && (
        <Button
          onClick={setFullscreen}
          title={isFullScreen ? 'Exit Fullscreen (Esc)' : 'Enter Fullscreen'}
        ></Button>
      )}
    </div>
  );
};

export default ItemContainer;
