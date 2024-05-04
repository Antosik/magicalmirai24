import type { Chars, GameContext } from './types';
import type { Player } from 'textalive-app-api';

import { getContext } from 'svelte';
import { derived, writable } from 'svelte/store';

import { CharState } from '$lib/game/constants';

export const GAME_CONTEXT_KEY = 'game';

export function createGameStore(player: Player): GameContext {
  const chars = writable<Chars>(new Map());
  const catched = derived(
    chars,
    ($charsStore) =>
      Array.from($charsStore.values()).filter((char) => char.state === CharState.CATCHED),
    [],
  );
  const missed = derived(
    chars,
    ($charsStore) =>
      Array.from($charsStore.values()).filter((char) => char.state === CharState.MISSED),
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
    missed,
  };
}

export const getGame = () => getContext<GameContext>(GAME_CONTEXT_KEY);
