import type { Player } from 'textalive-app-api';

import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

export const PLAYER_CONTEXT_KEY = 'player';

export const initPlayerContext = (player: Player) =>
  setContext(PLAYER_CONTEXT_KEY, writable(player));
export const getPlayer = () => getContext<Writable<Player>>(PLAYER_CONTEXT_KEY);
