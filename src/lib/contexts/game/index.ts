import type { Chars, GameContext } from './types';
import type { Player } from 'textalive-app-api';

import { getContext } from 'svelte';
import { derived, writable } from 'svelte/store';

import { CharState } from '$lib/game/constants';

export const GAME_CONTEXT_KEY = 'game';

export function createGameStore(player: Player): GameContext {
  /** All characters that were visible in game */
  const chars = writable<Chars>(new Map());

  /** List of catched characters */
  const catched = derived(
    chars,
    ($charsStore) =>
      Array.from($charsStore.values()).filter((char) => char.state === CharState.CATCHED),
    [],
  );

  /** List of missed characters */
  const missed = derived(
    chars,
    ($charsStore) =>
      Array.from($charsStore.values()).filter((char) => char.state === CharState.MISSED),
    [],
  );

  /** Chars that currently on a game scene */
  const ingame = derived(
    chars,
    ($charsStore) =>
      Array.from($charsStore.values()).filter((char) => char.state === CharState.IN_PROGRESS),
    [],
  );

  player.addListener({
    // Reset chars on video readiness
    onVideoReady() {
      chars.set(new Map());
    },
    // Reset chars on audio stop
    onStop() {
      chars.set(new Map());
    },
    // Reset chars on audio change
    onAppMediaChange() {
      chars.set(new Map());
    },
  });

  return {
    chars,
    catched,
    ingame,
    missed,
  };
}

export const getGame = () => getContext<GameContext>(GAME_CONTEXT_KEY);
