import type { Settings, SettingsContext } from './types';
import type { Player } from 'textalive-app-api';

import { getContext } from 'svelte';

import { saveable } from '$lib/utils/saveable';
import { convertDurationToSpeed } from '$lib/utils/settings';

export const SETTINGS_CONTEXT_KEY = 'settings';

const SETTINGS_LOCALSTORAGE_KEY = 'mm24_settings';
export const DEFAULT_SETTINGS = { volume: 100, speed: convertDurationToSpeed(2000) };

export function createSettingsStore(player: Player): SettingsContext {
  const store = saveable<Settings>(SETTINGS_LOCALSTORAGE_KEY, DEFAULT_SETTINGS);

  // Update settings on host update
  player.addListener({
    onAppParameterUpdate<T extends keyof Settings>(name: T, value: Settings[T]) {
      store.update(($store) => {
        $store[name] = value ?? DEFAULT_SETTINGS[name];
        return $store;
      });
    },
  });

  // Update player volume on volume in store update
  store.subscribe(($store) => {
    player.volume = $store.volume;
  });

  return store;
}

export const getSettings = () => getContext<SettingsContext>(SETTINGS_CONTEXT_KEY);
