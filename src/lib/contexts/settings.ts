import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

import { SongId } from '$lib/songs/types';

export type Settings = {
  song: SongId;
};

export const SETTINGS_CONTEXT_KEY = 'settings';

export const initSettings = () =>
  setContext(SETTINGS_CONTEXT_KEY, writable({ song: SongId.SUPERHERO }));
export const getSettings = () => getContext<Writable<Settings>>(SETTINGS_CONTEXT_KEY);
