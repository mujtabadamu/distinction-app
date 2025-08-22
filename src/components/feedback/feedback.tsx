import { useState } from 'react';
import Theme from 'utils/theme';

export type FormPosition =
  | 'bottom-right'
  | 'bottom-left'
  | 'top-right'
  | 'top-left'
  | 'bottom-center'
  | 'top-center';

interface FeedbackFormEmbedProps {
  formUrl: string;
  title?: string;
  position?: FormPosition;
  initiallyVisible?: boolean;
  openButtonText?: string;
  className?: string;
  loadingMessage?: string;
}

const getPositionClasses = (position: FormPosition) => {
  switch (position) {
    case 'bottom-right':
      return {
        form: 'bottom-4 right-6',
        button: 'bottom-4 right-6',
      };
    case 'bottom-left':
      return {
        form: 'bottom-4 left-6',
        button: 'bottom-4 left-4',
      };
    case 'top-right':
      return {
        form: 'top-4 right-6',
        button: 'top-4 right-4',
      };
    case 'top-left':
      return {
        form: 'top-4 left-6',
        button: 'top-4 left-4',
      };
    case 'bottom-center':
      return {
        form: 'bottom-4 left-1/2 -translate-x-1/2',
        button: 'bottom-4 left-1/2 -translate-x-1/2',
      };
    case 'top-center':
      return {
        form: 'top-4 left-1/2 -translate-x-1/2',
        button: 'top-4 left-1/2 -translate-x-1/2',
      };
    default:
      return {
        form: 'bottom-4 right-6',
        button: 'bottom-4 right-4',
      };
  }
};

const CloseIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export const FeedbackFormEmbed = ({
  formUrl,
  title = 'Feedback Survey',
  position = 'bottom-right',
  initiallyVisible = false,
  openButtonText = 'Give Feedback',
  className = '',
  loadingMessage = 'Loading...',
}: FeedbackFormEmbedProps) => {
  const [isVisible, setIsVisible] = useState(initiallyVisible);
  const [isLoading, setIsLoading] = useState(true);
  const positionClasses = getPositionClasses(position);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleOpen = () => {
    setIsVisible(true);
  };

  if (!isVisible) {
    return (
      <button
        onClick={handleOpen}
        className={`
          fixed ${positionClasses.button}
          z-40
          bg-[${Theme.PrimaryColor}]
          hover:bg-[${Theme.PrimaryDark}]
          text-white
          p-3
          hover:px-4
          
          rounded-md
          shadow-lg
          transition-all
          duration-300
          ease-in-out
          transform
          focus:outline-none
          focus:ring-2
          focus:ring-[${Theme.PrimaryColor}]
          focus:ring-opacity-50
          font-medium
          text-sm
          inline-flex
          items-center
          justify-center
          group
          overflow-hidden
          min-w-[40px]
          ${className}
        `}
        aria-label={openButtonText}
        style={{
          transform: position.includes('center')
            ? 'translateX(-50%)'
            : undefined,
        }}
      >
        <i className="saf-message-notif font-[900] text-[18px] flex-shrink-0"></i>
        <span className="button-text w-0  opacity-0 group-hover:w-auto group-hover:opacity-100 group-hover:ml-2 transition-all duration-300 whitespace-nowrap overflow-hidden">
          {openButtonText}
        </span>
      </button>
    );
  }

  return (
    <div
      className={`
        fixed ${positionClasses.form}
        z-50
        w-11/12
        max-w-2xl
        bg-white
        rounded-xl
        shadow-2xl
        border
        border-gray-200
        transition-all
        duration-300
        ease-in-out
        transform
        animate-in
        slide-in-from-bottom-2

        sm:w-8/12
        md:w-6/12
        lg:w-5/12
        xl:w-4/12
        max-h-[90vh]
        overflow-hidden
         ${className}
      `}
      style={{
        transform: position.includes('center') ? 'translateX(-50%)' : undefined,
      }}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {title}
        </h2>
        <button
          onClick={handleClose}
          className={`
            p-2
            rounded-full
            text-gray-500
            hover:text-[${Theme.PrimaryColor}]
            hover:bg-gray-100
            transition-all
            duration-200
            focus:outline-none
            focus:ring-2
            focus:ring-[${Theme.PrimaryColor}]
            focus:ring-opacity-50
          `}
          aria-label="Close feedback form"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Enhanced form frame container */}
      <div className="p-4 min-h-[120px] flex flex-col items-center justify-center">
        {isLoading && (
          <div className="flex items-center justify-center w-full h-full min-h-[100px] text-gray-500 animate-pulse">
            {loadingMessage}
          </div>
        )}
        <iframe
          src={formUrl}
          className={`w-full h-[600px] border-0 rounded-lg ${
            isLoading ? 'hidden' : ''
          }`}
          title={title}
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
};

export default FeedbackFormEmbed;
