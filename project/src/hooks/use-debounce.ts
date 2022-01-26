import { useState, useEffect } from 'react';

export default function useDebounce(value: () => void, delay: number): () => void {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
  return () => debouncedValue;
}
