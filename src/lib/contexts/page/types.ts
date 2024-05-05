import type { Writable } from 'svelte/store';

import type { ValueOf } from '$lib/utils/types';

export const Page = {
  MAIN_PAGE: 'MAIN_PAGE',
  GAME: 'game',
  CREDITS: 'credits',
  HELP: 'help',
} as const;
export type Page = ValueOf<typeof Page>;

export type PageContext = Writable<Page>;
