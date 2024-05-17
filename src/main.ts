import { createLocaleStore, LOCALE_CONTEXT_KEY } from '$lib/contexts/locale';
import {
  createPlayerPositionStore,
  PLAYER_POSITION_CONTEXT_KEY,
} from '$lib/contexts/playerPosition';

import './app.scss';
import App from './App.svelte';
import { createGameStore, GAME_CONTEXT_KEY } from './lib/contexts/game';
import { createPageStore, PAGE_CONTEXT_KEY } from './lib/contexts/page';
import { createPlayerInstance, PLAYER_CONTEXT_KEY } from './lib/contexts/player';
import { createPlayerStateStore, PLAYER_STATE_CONTEXT_KEY } from './lib/contexts/playerState';
import { createSettingsStore, SETTINGS_CONTEXT_KEY } from './lib/contexts/settings';

// Create player & stores
const playerInstance = createPlayerInstance();
const playerStateStore = createPlayerStateStore(playerInstance);
const settingsStore = createSettingsStore(playerInstance);
const gameStore = createGameStore(playerInstance);
const pageStore = createPageStore();
const playerPositionStore = createPlayerPositionStore();
const localeStore = createLocaleStore();

// Map player & stores to contexts
const context = new Map<string, unknown>([
  [PLAYER_CONTEXT_KEY, playerInstance],
  [PLAYER_STATE_CONTEXT_KEY, playerStateStore],
  [SETTINGS_CONTEXT_KEY, settingsStore],
  [GAME_CONTEXT_KEY, gameStore],
  [PAGE_CONTEXT_KEY, pageStore],
  [PLAYER_POSITION_CONTEXT_KEY, playerPositionStore],
  [LOCALE_CONTEXT_KEY, localeStore],
]);

// Pass context to app and mount it
const app = new App({
  target: document.getElementById('app')!,
  context,
});

export default app;
