import type { Writable } from 'svelte/store';

export type Settings = {
  /** Audio volume */
  volume: number;
  /** Game speed */
  speed: number;
  /** Is autoplay mode enabled */
  autoplay: boolean;
};

export type SettingsContext = Writable<Settings>;
