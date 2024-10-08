import { getContext } from 'svelte';
import * as TextAliveApp from 'textalive-app-api';

import { DEFAULT_SETTINGS } from '../settings';

export const PLAYER_CONTEXT_KEY = 'player';
export const PLAYER_THROTTLE_INTERVAL = 1000;

export function createPlayerInstance(): TextAliveApp.Player {
  return new TextAliveApp.Player({
    app: {
      token: import.meta.env.VITE_TEXTALIVE_TOKEN,
      parameters: [
        {
          title: 'Volume',
          name: 'volume',
          className: 'Slider',
          params: [0, 100],
          initialValue: DEFAULT_SETTINGS.volume,
        },
        {
          title: 'Speed',
          name: 'speed',
          className: 'Slider',
          params: [0, 25],
          initialValue: DEFAULT_SETTINGS.speed,
        },
        {
          title: 'Autoplay',
          name: 'autoplay',
          className: 'Check',
          initialValue: DEFAULT_SETTINGS.autoplay,
        },
      ],
    },

    throttleInterval: PLAYER_THROTTLE_INTERVAL,
    mediaElement: document.getElementById('media')!,
    mediaBannerPosition: 'bottom right',
    valenceArousalEnabled: true,
    vocalAmplitudeEnabled: true,
  });
}

export const getPlayerInstance = () => getContext<TextAliveApp.Player>(PLAYER_CONTEXT_KEY);
