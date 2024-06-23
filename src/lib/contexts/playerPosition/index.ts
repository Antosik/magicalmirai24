import type { PlayerPositionContext } from './types';

import { getContext } from 'svelte';
import { spring } from 'svelte/motion';

export const PLAYER_POSITION_CONTEXT_KEY = 'playerPosition';

const STIFFNESS = 0.1; // Default svelte stiffness = 0.15
const DAMPING = 0.8; // Default svelte stiffness = 0.8

export function createPlayerPositionStore(): PlayerPositionContext {
  const store = spring(window.innerHeight / 2, { stiffness: STIFFNESS, damping: DAMPING });

  store.subscribe((y) => {
    const windowHeight = window.innerHeight;

    if (y < 0) {
      store.set(windowHeight * 0.1);
    } else if (y >= windowHeight) {
      store.set(windowHeight * 0.9);
    }
  });

  return store;
}

export const getPlayerPosition = () =>
  getContext<PlayerPositionContext>(PLAYER_POSITION_CONTEXT_KEY);
