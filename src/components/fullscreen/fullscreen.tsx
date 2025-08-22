import React, { useState, useEffect, HTMLAttributes } from 'react';
import { renderThemedPortal } from 'utils/renderThemedPortal';
import { useKey } from 'react-use';

interface FullscreenProps extends HTMLAttributes<HTMLDivElement> {
  isFullscreen?: boolean;
  setFullscreen?: (value: boolean) => void;
}

export function Fullscreen({
  isFullscreen,
  setFullscreen,
  children,
  className,
  ...props
}: FullscreenProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isRendered, setIsRendered] = useState(isFullscreen);

  useKey(
    (e: KeyboardEvent) => e.key === 'Escape',
    () => {
      if (isFullscreen && setFullscreen) setFullscreen(false);
    },
    {},
    [isFullscreen, setFullscreen]
  );

  useEffect(() => {
    if (isFullscreen) {
      setIsRendered(true);
      setTimeout(() => setIsTransitioning(true), 10);
    } else {
      setIsTransitioning(false);
      const timer = setTimeout(() => setIsRendered(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isFullscreen]);

  if (!isRendered && !isTransitioning) {
    return null;
  }

  const baseClasses = `
    fixed inset-0 bg-white transition-all duration-500 ease-in-out
    ${
      isFullscreen && isTransitioning
        ? 'z-[9999]'
        : 'z-auto opacity-0 pointer-events-none'
    }
    ${isTransitioning ? 'opacity-100 pointer-events-auto' : ''}
    ${
      !isFullscreen && isTransitioning
        ? 'translate-y-full translate-x-full scale-0'
        : ''
    }
    ${className || ''}
  `
    .replace(/\s+/g, ' ')
    .trim();

  return renderThemedPortal(
    <div className={baseClasses} {...props}>
      {children}
    </div>
  );
}
