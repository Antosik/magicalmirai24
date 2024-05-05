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

/**
 * Creates a store instance, that synchronized with localStorage
 * @param key unique key for localstorage
 * @param defaultValue default value
 * @returns Store instance
 */
export function saveable<T>(key: string, defaultValue: T): Writable<T> {
  const value = getLocalStorageValue<T>(key) || defaultValue;

  const store = writable<T>({ ...defaultValue, ...value });
  store.subscribe(($value) => {
    localStorage.setItem(key, JSON.stringify($value));
  });

  return store;
}
