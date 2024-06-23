import type { Settings } from './types';

import { convertDurationToSpeed } from '$lib/utils/settings';

/** Default app settings */
export const DEFAULT_SETTINGS: Settings = {
  volume: 100,
  speed: convertDurationToSpeed(2000),
  autoplay: false,
};

/**
 * Converters for each type of setting - parses query param string and returns parsed value
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any -- We need to pass because can't infer type
const QUERY_SETTING_CONVERTERS: Record<keyof Settings, (value: string) => any> = {
  autoplay: (value: string) => value === 'on',
  speed: (value: string) => {
    const numericValue = Number(value);
    if (Number.isNaN(numericValue)) {
      return DEFAULT_SETTINGS.speed;
    }

    return Math.max(Math.min(numericValue, 100), 1);
  },
  volume: (value: string) => {
    const numericValue = Number(value);
    if (Number.isNaN(numericValue)) {
      return DEFAULT_SETTINGS.volume;
    }

    return Math.max(Math.min(numericValue, 100), 0);
  },
};

/** List of available query settings */
const AVAILABLE_QUERIES = Object.keys(QUERY_SETTING_CONVERTERS);

/**
 * Checks if there is corresponding app setting available
 * @param key Setting key
 * @returns Is corresponding app setting available
 */
function isSettingsKey(key: string): key is keyof Settings {
  return AVAILABLE_QUERIES.includes(key);
}

/**
 * Parses page query parameters and creates settings object
 * @returns Object with settings
 */
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
