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
  Pause: string;
  total: string;
  ok: string;
  miss: string;
  Resume: string;
  Retry: string;
  Back: string;
  Minimize: string;
  Maximize: string;
  Results: string;
  'Back to Main menu': string;
  Credits: string;
  Help: string;
  'Choose Song': string;
  Play: string;
}
