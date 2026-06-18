import { useEffect, useState } from 'react';

type Setter<T> = T | ((current: T) => T);

function readStoredValue<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
}

export function useLocalStorage<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => readStoredValue(key, fallback));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore storage quota or privacy-mode failures.
    }
  }, [key, value]);

  const update = (next: Setter<T>) => {
    setValue((current) => typeof next === 'function' ? (next as (current: T) => T)(current) : next);
  };

  return [value, update] as const;
}
