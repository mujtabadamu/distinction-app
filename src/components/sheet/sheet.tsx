import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { renderThemedPortal } from 'utils/renderThemedPortal';

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  direction?: 'left' | 'right';
  width?: string | number;
  title?: string;
  subtitle?: string;
  withCloseButton?: boolean;
  renderFooter?: React.ReactNode;
  children: React.ReactNode;
}

const getSheetWidth = (width?: string | number) => {
  if (width) return typeof width === 'number' ? `${width}px` : width;
  return '40vw';
};

const getMobileWidth = (width?: string | number) => {
  if (width) return typeof width === 'number' ? `${width}px` : width;
  return '95vw';
};

const Sheet: React.FC<SheetProps> = ({
  isOpen,
  onClose,
  direction = 'right',
  width,
  title,
  subtitle,
  withCloseButton = true,
  renderFooter,
  children,
}) => {
  // Animation variants for framer-motion
  const variants = {
    hidden: {
      x: direction === 'right' ? '100%' : '-100%',
      transition: { type: 'tween', duration: 0.3 },
    },
    visible: {
      x: 0,
      transition: { type: 'tween', duration: 0.3 },
    },
    exit: {
      x: direction === 'right' ? '100%' : '-100%',
      transition: { type: 'tween', duration: 0.3 },
    },
  };

  // Prevent background scroll when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const sheetContent = (
    <div>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Sheet */}
            <motion.aside
              className="fixed z-[4000] top-0 h-full flex flex-col bg-white shadow-xl"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              style={{
                [direction]: 0,
                width: getSheetWidth(width),
                maxWidth: '100vw',
                height: '100vh',
                boxSizing: 'border-box',
              }}
            >
              {/* Responsive width for mobile */}
              <style>{`
              @media (max-width: 768px) {
                .sheet-responsive-width {
                  width: ${getMobileWidth(width)} !important;
                }
              }
            `}</style>
              <div className="sheet-responsive-width flex flex-col h-full">
                {/* Header */}
                {(title || withCloseButton) && (
                  <div className="flex items-start justify-between p-5 ">
                    <div>
                      {title && (
                        <div
                          style={{
                            fontWeight: 500,
                            fontSize: 18,
                            lineHeight: '24px',
                          }}
                          className="mb-1"
                        >
                          {title}
                        </div>
                      )}
                      {subtitle && (
                        <div className="text-gray-500 text-sm">{subtitle}</div>
                      )}
                    </div>
                    {withCloseButton && (
                      <button
                        onClick={onClose}
                        className="ml-4 text-2xl text-gray-400 hover:text-gray-700 focus:outline-none"
                        aria-label="Close"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                )}
                {/* Content */}
                <div className="flex-1 overflow-y-auto p-5">{children}</div>
                {/* Footer */}
                {renderFooter && (
                  <div className="border-t border-gray-200 p-5">
                    {renderFooter}
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );

  return renderThemedPortal(sheetContent);
};

export default Sheet;
