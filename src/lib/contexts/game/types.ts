import type { Readable, Writable } from 'svelte/store';

import type { Char } from '$lib/game/types';

export type Chars = Map<Char['id'], Char>;

export type GameContext = {
  /** All characters that were visible in game */
  chars: Writable<Chars>;
  /** Chars that currently on a game scene */
  ingame: Readable<Char[]>;
  /** List of catched characters */
  catched: Readable<Char[]>;
  /** List of missed characters */
  missed: Readable<Char[]>;
};
