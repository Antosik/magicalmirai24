import { getContext } from 'svelte';
import { writable } from 'svelte/store';

import { Page, type PageContext } from './types';

export const PAGE_CONTEXT_KEY = 'page';

export function createPageStore(): PageContext {
  return writable<Page>(Page.START);
}

export const getPage = () => getContext<PageContext>(PAGE_CONTEXT_KEY);

export { Page };
