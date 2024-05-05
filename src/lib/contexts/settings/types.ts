import type { Writable } from 'svelte/store';

export type Settings = {
  /** Audio volume */
  volume: number;
  /** Game speed */
  speed: number;
};

export type SettingsContext = Writable<Settings>;
