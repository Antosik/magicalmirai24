import type { Writable } from 'svelte/store';

import type { ValueOf } from '$lib/utils/types';

export const Page = {
  START: 'START',
  MAIN_PAGE: 'MAIN_PAGE',
  GAME: 'GAME',
  CREDITS: 'CREDITS',
  HELP: 'HELP',
} as const;
export type Page = ValueOf<typeof Page>;

export type PageContext = Writable<Page>;
