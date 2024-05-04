import './app.scss';
import App from './App.svelte';
import { createGameStore, GAME_CONTEXT_KEY } from './lib/contexts/game';
import { createPageStore, PAGE_CONTEXT_KEY } from './lib/contexts/page';
import { createPlayerInstance, PLAYER_CONTEXT_KEY } from './lib/contexts/player';
import { createPlayerStateStore, PLAYER_STATE_CONTEXT_KEY } from './lib/contexts/playerState';
import { createSettingsStore, SETTINGS_CONTEXT_KEY } from './lib/contexts/settings';

const playerInstance = createPlayerInstance();
const playerStateStore = createPlayerStateStore(playerInstance);
const settingsStore = createSettingsStore(playerInstance);
const gameStore = createGameStore(playerInstance);
const pageStore = createPageStore();

const context = new Map<string, unknown>([
  [PLAYER_CONTEXT_KEY, playerInstance],
  [PLAYER_STATE_CONTEXT_KEY, playerStateStore],
  [SETTINGS_CONTEXT_KEY, settingsStore],
  [GAME_CONTEXT_KEY, gameStore],
  [PAGE_CONTEXT_KEY, pageStore],
]);

const app = new App({
  target: document.getElementById('app')!,
  context,
});

export default app;
