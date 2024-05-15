import type { Settings, SettingsContext } from './types';
import type { Player } from 'textalive-app-api';

import { getContext } from 'svelte';
import { writable } from 'svelte/store';

import { DEFAULT_SETTINGS, getSettingsFromQuery } from './utils';

export const SETTINGS_CONTEXT_KEY = 'settings';

export function createSettingsStore(player: Player): SettingsContext {
  const store = writable<Settings>({
    ...DEFAULT_SETTINGS,
    ...getSettingsFromQuery(),
  });

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

export { DEFAULT_SETTINGS };
