import { useRef, useEffect, useCallback, useState } from 'react';

type Callback = (timeoutId: number | null) => void;

interface UseTimeoutResult {
  timeoutId: number | null;
  start: () => void;
  stop: () => void;
}

/**
 * A custom React hook to manage a timeout.
 *
 * @param cb The callback function to be executed after the delay. It receives the timeoutId as an argument.
 * @param delay The delay in milliseconds before the callback is executed.
 * @param autoStart If true, the timeout will start automatically when the component mounts. Defaults to false.
 * @returns An object containing the timeoutId, and functions to start and stop the timeout.
 */
export const useTimeout = (
  cb: Callback,
  delay: number,
  autoStart = false
): UseTimeoutResult => {
  const timeoutIdRef = useRef<number | null>(null);
  const savedCallback = useRef<Callback>(cb);
  const [currentTimeoutId, setCurrentTimeoutId] = useState<number | null>(null);

  useEffect(() => {
    savedCallback.current = cb;
  }, [cb]);

  const stop = useCallback(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
      setCurrentTimeoutId(null);
    }
  }, []);

  const start = useCallback(() => {
    stop();
    const id = window.setTimeout(() => {
      savedCallback.current(timeoutIdRef.current);
      timeoutIdRef.current = null;
      setCurrentTimeoutId(null);
    }, delay);
    timeoutIdRef.current = id;
    setCurrentTimeoutId(id);
  }, [delay, stop]);

  useEffect(() => {
    if (autoStart) {
      start();
    }

    return () => {
      stop();
    };
  }, [autoStart, start, stop]);

  return { timeoutId: currentTimeoutId, start, stop };
};
