import type { Settings } from './types';

import { convertDurationToSpeed } from '$lib/utils/settings';

export const DEFAULT_SETTINGS: Settings = {
  volume: 100,
  speed: convertDurationToSpeed(2000),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- We need to pass because can't infer type
const QUERY_SETTING_CONVERTERS: Record<keyof Settings, (value: string) => any> = {
  speed: (value: string) => Math.max(Math.min(Number(value) || DEFAULT_SETTINGS.speed, 100), 1),
  volume: (value: string) => Math.max(Math.min(Number(value) || DEFAULT_SETTINGS.volume, 100), 0),
};
const AVAILABLE_QUERIES = Object.keys(QUERY_SETTING_CONVERTERS);

const isSettingsKey = (key: string): key is keyof Settings => AVAILABLE_QUERIES.includes(key);

export function getSettingsFromQuery(): Partial<Settings> {
  const params = new URLSearchParams(window.location.search);
  const settings: Partial<Settings> = {};

  for (const [key, value] of params) {
    if (key && isSettingsKey(key)) {
      settings[key] = QUERY_SETTING_CONVERTERS[key](value);
    }
  }

  return settings;
}
