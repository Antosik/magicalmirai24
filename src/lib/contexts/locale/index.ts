import type { LocaleContext, LocaleDictionary, LocaleDictionaryKeys } from './types';

import { getContext } from 'svelte';
import { derived, writable } from 'svelte/store';

import enLocale from './locales/en.json';
import jaLocale from './locales/ja.json';
import { Locale } from './types';
import { detectUserLocale } from './utils';

export const LOCALE_CONTEXT_KEY = 'locale';

const LOCALES_DICTIONARY: Record<Locale, LocaleDictionary> = {
  [Locale.EN]: enLocale,
  [Locale.JA]: jaLocale,
};

export function createLocaleStore(): LocaleContext {
  /** App locale */
  const locale = writable<Locale>(detectUserLocale());

  /** Translator function */
  const i18n = derived(locale, ($locale) => {
    const dictionary = LOCALES_DICTIONARY[$locale];
    return (key: LocaleDictionaryKeys) => dictionary[key];
  });

  locale.subscribe(($locale) => {
    const html = document.querySelector('html');
    if (html) {
      html.lang = $locale.toLowerCase();
    }
  });

  return {
    locale,
    i18n,
  };
}

export const getLocale = () => getContext<LocaleContext>(LOCALE_CONTEXT_KEY);
export type { LocaleDictionaryKeys };
