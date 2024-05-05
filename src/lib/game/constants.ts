import type { ValueOf } from '$lib/utils/types';

/** Time to wait before a song start */
export const START_SONG_DELAY = 3e3; // 3s

/** Time to wait before a pause will be counted as triggered by the user */
export const REAL_PAUSE_DELAY = 100; // 10ms

/** Char colors */
export const CharColor = {
  RED: 'red',
  WHITE: 'white',
  DARK: 'dark',
} as const;
export type CharColor = ValueOf<typeof CharColor>;

/** Char state */
export const CharState = {
  CATCHED: 1,
  IN_PROGRESS: 0,
  MISSED: -1,
} as const;
export type CharState = ValueOf<typeof CharState>;

/** Need to calculate an clouds animation duration */
export const CLOUD_ANIMATION_DURATION_MULTIPLIER = 7;

/** Default animation duration for clouds */
export const DEFAULT_CLOUD_ANIMATION_DURATION = 6e3; // 6s

/** Maximum animation duration for clouds */
export const MAX_CLOUD_ANIMATION_DURATION = 10e3; // 10s

/** Maximum animation duration for clouds */
export const MIN_CLOUD_ANIMATION_DURATION = 3e3; // 3s
