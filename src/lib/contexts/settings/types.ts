import type { Writable } from 'svelte/store';

export type Settings = {
  /** Audio volume */
  volume: number;
  /** Game speed */
  speed: number;
  /** Autoplay mode */
  autoplay: boolean;
};

export type SettingsContext = Writable<Settings>;
