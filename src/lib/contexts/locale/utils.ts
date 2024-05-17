import { Locale } from './types';

const DEFAULT_LOCALE = Locale.EN;

function isSupportedLocale(locale?: string): locale is Locale {
  if (!locale) {
    return false;
  }

  return locale in Locale;
}

/**
 * Detects the locale from user's browser or fallbacks to default one
 */
export function detectUserLocale(): Locale {
  const browserLocale = navigator.language?.split('-')?.[0]?.toUpperCase();
  return isSupportedLocale(browserLocale) ? browserLocale : DEFAULT_LOCALE;
}
