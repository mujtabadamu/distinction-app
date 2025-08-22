import { useState, useEffect } from 'react';

interface Props {
  limit: number;
  onVisibilityChange: (isVisible: boolean) => void;
}

const TabVisibilityTracker = ({ limit, onVisibilityChange }: Props) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastActivity, setLastActivity] = useState(Date.now());

  useEffect(() => {
    const handleVisibilityChange = () => {
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivity;

      if (document.hidden) {
        setIsVisible(false);
        onVisibilityChange(false);
      } else {
        setIsVisible(true);
        onVisibilityChange(true);
      }

      setLastActivity(now);
    };

    const handleUserActivity = () => {
      setLastActivity(Date.now());
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('mousemove', handleUserActivity);
    document.addEventListener('keydown', handleUserActivity);
    document.addEventListener('click', handleUserActivity);
    document.addEventListener('scroll', handleUserActivity);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('keydown', handleUserActivity);
      document.removeEventListener('click', handleUserActivity);
      document.removeEventListener('scroll', handleUserActivity);
    };
  }, [lastActivity, onVisibilityChange]);

  return null;
};

export default TabVisibilityTracker;
