import type { Readable, Writable } from 'svelte/store';

import type { ValueOf } from '$lib/utils/types';

/** Available locales */
export const Locale = {
  EN: 'EN',
} as const;
export type Locale = ValueOf<typeof Locale>;

export type LocaleContext = {
  locale: Writable<Locale>;
  i18n: Readable<(key: LocaleDictionaryKeys) => string>;
};

/** Available dictionary keys */
export type LocaleDictionaryKeys = keyof LocaleDictionary;
export interface LocaleDictionary {}
