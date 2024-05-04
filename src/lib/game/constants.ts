import type { ValueOf } from '$lib/utils/types';

/** Time to wait before a song start */
export const START_SONG_DELAY = 3e3; // 3s

/** Time to wait before a pause will be counted as triggered by the user */
export const REAL_PAUSE_DELAY = 200; // 200ms

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
