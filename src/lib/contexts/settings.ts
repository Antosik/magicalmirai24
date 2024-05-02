import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

import { SongId } from '$lib/songs/types';

export type Settings = {
  song: SongId;
  volume: number;
};

const DEFAULT_SETTINGS = { song: SongId.SUPERHERO, volume: 100 };
const SETTINGS_LOCALSTORAGE_KEY = 'mm24_settings';

const loadSavedSettings = () => {
  try {
    const savedSettingsStr = localStorage.getItem(SETTINGS_LOCALSTORAGE_KEY);
    if (!savedSettingsStr) {
      return DEFAULT_SETTINGS;
    }

    const savedSettings = JSON.parse(savedSettingsStr) as Settings;
    return {
      ...DEFAULT_SETTINGS,
      song: savedSettings.song ?? DEFAULT_SETTINGS.song,
      volume: savedSettings.volume ?? DEFAULT_SETTINGS.volume,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const SETTINGS_CONTEXT_KEY = 'settings';

export const initSettingsContext = () => {
  const settingsStore = writable(loadSavedSettings());
  settingsStore.subscribe(($settings) => {
    localStorage.setItem(SETTINGS_LOCALSTORAGE_KEY, JSON.stringify($settings));
  });

  setContext(SETTINGS_CONTEXT_KEY, settingsStore);
};
export const getSettings = () => getContext<Writable<Settings>>(SETTINGS_CONTEXT_KEY);
