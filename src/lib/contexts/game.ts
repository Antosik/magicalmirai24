import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

export type Char = {
  id: string;
  text: string;
  amplitude: number;
  color: 1 | 2 | 3; // 1 dark, 2 red, 3 white
  state?: -1 | 0 | 1; // -1 (missed), 0 (on game), 1 (catched)
};

type Game = {
  chars: Map<Char['id'], Char>;
};

export const GAME_CONTEXT_KEY = 'game';

export const createGameStore = () => writable<Game>({ chars: new Map() });
export const resetGameStore = (store: Writable<Game>) => store.set({ chars: new Map() });
export const initGameContext = (store: Writable<Game>) => setContext(GAME_CONTEXT_KEY, store);
export const getGame = () => getContext<Writable<Game>>(GAME_CONTEXT_KEY);
