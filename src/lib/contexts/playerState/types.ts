import type { Readable, Writable } from 'svelte/store';

import type { SongId } from '$lib/songs/types';
import type { ValueOf } from '$lib/utils/types';

/** Song info */
export type SongInfo = {
  /** Author's name */
  artist: string;
  /** Song title */
  title: string;
};

/** Flags of textalive player's readiness */
export type Readiness = {
  /** Updates with 'onAppReady' */
  app: boolean;
  /** Updates with 'onVideoReady' */
  video: boolean;
  /** Updates with 'onTimerReady' */
  timer: boolean;
};

/** Provides knowledge of game manageability by user  */
export const Manageability = {
  /** User can select audio and control playback */
  FULL: 'FULL',
  /** User can select audio, playback is controlled by host */
  PARTIAL: 'FULL',
  /** Playback and song are controlled by host */
  NONE: 'NONE',
} as const;
export type Manageability = ValueOf<typeof Manageability>;

/** Different state for player */
export const SongState = {
  NONE: 'NONE',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  STOPPED: 'STOPPED',
} as const;
export type SongState = ValueOf<typeof SongState>;

export type PlayerStateContext = {
  /** Song info */
  songInfo: Readable<SongInfo>;
  /** Flags of textalive player's readiness */
  readiness: Readable<Readiness>;
  /** Provides knowledge of game manageability by user  */
  manageability: Readable<Manageability>;
  /** Different state for player */
  songState: Writable<SongState>;
  /** Selected song */
  song: Writable<SongId>;
};
