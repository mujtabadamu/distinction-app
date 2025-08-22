import { useEffect, useState, useRef, useCallback } from 'react';

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const controllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();

    try {
      const response = await fetch(url, {
        signal: controllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error, Status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();

    return () => controllerRef.current?.abort();
  }, [url]);

  return { data, error, loading, refetch: fetchData };
};

export default useFetch;
