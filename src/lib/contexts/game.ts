import type { Readable, Writable } from 'svelte/store';
import type { Player } from 'textalive-app-api';

import { getContext } from 'svelte';
import { derived, writable } from 'svelte/store';

export type Char = {
  id: string;
  text: string;
  amplitude: number;
  color: 1 | 2 | 3; // 1 dark, 2 red, 3 white
  state?: -1 | 0 | 1; // -1 (missed), 0 (on game), 1 (catched)
};

type Chars = Map<Char['id'], Char>;

type Game = {
  chars: Writable<Chars>;
  catched: Readable<Char[]>;
  missed: Readable<Char[]>;
};

export const GAME_CONTEXT_KEY = 'game';

export function createGameStore(player: Player): Game {
  const chars = writable<Map<Char['id'], Char>>(new Map());
  const catched = derived(
    chars,
    ($charsStore) => Array.from($charsStore.values()).filter((char) => char.state === 1),
    [],
  );
  const missed = derived(
    chars,
    ($charsStore) => Array.from($charsStore.values()).filter((char) => char.state === -1),
    [],
  );

  player.addListener({
    // reset chars on audio stop
    onVideoReady() {
      chars.set(new Map());
    },
    // reset chars on audio stop
    onStop() {
      chars.set(new Map());
    },
    // reset chars on audio change
    onAppMediaChange() {
      chars.set(new Map());
    },
  });

  return {
    chars,
    catched,
    missed,
  };
}

export const getGame = () => getContext<Game>(GAME_CONTEXT_KEY);
