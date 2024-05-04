import { getContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

type Page = 'main_page' | 'game' | 'credits' | 'help';

export const PAGE_CONTEXT_KEY = 'page';

export function createPageStore(): Writable<Page> {
  return writable<Page>('main_page');
}

export const getPage = () => getContext<Writable<Page>>(PAGE_CONTEXT_KEY);
