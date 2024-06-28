import type { Readable, Writable } from 'svelte/store';

import type { ValueOf } from '$lib/utils/types';

/** Available locales */
export const Locale = {
  EN: 'EN',
  JA: 'JA',
} as const;
export type Locale = ValueOf<typeof Locale>;

export type LocaleContext = {
  /** App locale */
  locale: Writable<Locale>;
  /** Translator function */
  i18n: Readable<(key: LocaleDictionaryKeys) => string>;
};

/** Available dictionary keys */
export type LocaleDictionaryKeys = keyof LocaleDictionary;
export interface LocaleDictionary {
  'App loading...': string;
  'Loading song...': string;

  'Miku-san Kamishibai': string;

  'Choose song': string;
  Play: string;
  Help: string;
  Credits: string;

  'Main menu': string;

  'Click me': string;

  Pause: string;
  Resume: string;
  Retry: string;
  Back: string;

  Results: string;

  'Navigate Miku-san with mouse or arrow keys': string;
  'Miku-san effective area': string;
  'Help Miku-san to collect all the lyrics': string;
  'Position of the moon reflects the progress of the song': string;
  'Behold your result and have fun together with Miku-san!': string;

  Team: string;
  Programming: string;
  Design: string;
  Translation: string;
  Technologies: string;

  Volume: string;
  Minimize: string;
  Maximize: string;
  Previous: string;
  Next: string;
}
