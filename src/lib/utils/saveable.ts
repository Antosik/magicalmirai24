import { writable, type Writable } from 'svelte/store';

function getLocalStorageValue<T>(key: string): T | undefined {
  try {
    const savedValueStr = localStorage.getItem(key);
    if (!savedValueStr) {
      return undefined;
    }

    return JSON.parse(savedValueStr) as T;
  } catch {
    return undefined;
  }
}

export function saveable<T>(key: string, defaultValue: T): Writable<T> {
  const value = getLocalStorageValue<T>(key) || defaultValue;

  const store = writable<T>(value);
  store.subscribe(($value) => {
    localStorage.setItem(key, JSON.stringify($value));
  });

  return store;
}
