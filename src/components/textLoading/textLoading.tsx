import React, { useState, useEffect } from 'react';

interface LoadingTextProps {
  text?: string;
  dotCount?: number;
  intervalMs?: number;
  className?: string;
}

interface TextMaskingLoaderProps {
  text?: string;
  duration?: number;
  className?: string;
  maskColor?: string;
  textColor?: string;
  maskWidthPercent?: number;
  backgroundColor?: string;
  preIcon?: React.ReactNode;
}

export const TextMaskingLoader: React.FC<TextMaskingLoaderProps> = ({
  text = 'Generating',
  duration = 2000,
  className = '',
  maskColor = '#ffffff',
  textColor,
  maskWidthPercent = 30,
  backgroundColor = 'transparent',
  preIcon,
}) => {
  const [maskPosition, setMaskPosition] = useState(0);
  const [maskOpacity, setMaskOpacity] = useState(1);

  useEffect(() => {
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % duration) / duration;

      // Use cubic easing for smooth movement
      const easedProgress = easeInOutCubic(progress);

      // Make mask invisible during the last 10% of the animation (reset phase)
      if (progress > 0.9) {
        setMaskOpacity(0);
      } else if (progress < 0.1) {
        setMaskOpacity(1);
      }

      setMaskPosition(easedProgress);

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [duration]);

  // Easing function for smoother animation
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  return (
    <div
      className={`relative inline-block overflow-hidden ${className}`}
      style={{
        color: textColor,
        backgroundColor: backgroundColor,
      }}
    >
      <div className="relative z-10 flex items-center gap-2">
        {preIcon && <span className="flex-shrink-0">{preIcon}</span>}
        <span>{text}</span>
      </div>
      <div
        className="absolute inset-0 z-20"
        style={{
          background: `linear-gradient(90deg, 
            ${backgroundColor} 0%, 
            ${maskColor} ${50 - maskWidthPercent / 2}%, 
            ${maskColor} ${50 + maskWidthPercent / 2}%, 
            ${backgroundColor} 100%)`,
          transform: `translateX(${(maskPosition - 0.5) * 200}%)`,
          opacity: maskOpacity,
          transition: 'transform 0.05s ease-out, opacity 0.1s ease-out',
        }}
      />
    </div>
  );
};

export const TextLoading: React.FC<LoadingTextProps> = ({
  text = 'Loading',
  dotCount = 3,
  intervalMs = 300,
  className = '',
}) => {
  const [ellipsis, setEllipsis] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setEllipsis((prevEllipsis) => {
        if (prevEllipsis.length === dotCount) {
          return '';
        }
        return prevEllipsis + '.';
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [dotCount, intervalMs]);

  return (
    <div className={`flex items-center justify-center font-sans  ${className}`}>
      <span className="whitespace-pre">
        {text}
        {ellipsis}
      </span>
    </div>
  );
};
