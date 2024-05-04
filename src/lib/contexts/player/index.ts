import { getContext } from 'svelte';
import * as TextAliveApp from 'textalive-app-api';

import { DEFAULT_SETTINGS } from '../settings';

export const PLAYER_CONTEXT_KEY = 'player';

export function createPlayerInstance(): TextAliveApp.Player {
  return new TextAliveApp.Player({
    // TODO update token
    app: {
      token: 'test',
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
      ],
    },

    mediaElement: document.getElementById('media')!,
    mediaBannerPosition: 'bottom right',
    valenceArousalEnabled: true,
    vocalAmplitudeEnabled: true,
  });
}

export const getPlayerInstance = () => getContext<TextAliveApp.Player>(PLAYER_CONTEXT_KEY);
