import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

export type Char = {
  id: string;
  text: string;
  state?: -1 | 0 | 1; // -1 (missed), 0 (on game), 1 (catched)
};

type Game = {
  chars: Map<Char['id'], Char>;
};

export const GAME_CONTEXT_KEY = 'game';

export const initGameContext = () => {
  setContext(GAME_CONTEXT_KEY, writable<Game>({ chars: new Map() }));
};
export const getGame = () => getContext<Writable<Game>>(GAME_CONTEXT_KEY);
