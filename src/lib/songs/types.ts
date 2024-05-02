import type { ValueOf } from '$lib/utils/types';

export const SongId = {
  SUPERHERO: 'SUPERHERO',
  SOMEDAY: 'SOMEDAY',
  FUTURE: 'FUTURE',
  SYMPHONY: 'SYMPHONY',
  REALITY: 'REALITY',
  MARKS: 'MARKS',
} as const;
export type SongId = ValueOf<typeof SongId>;

export type Song = {
  id: SongId;
  title: string;
  artist: string;
  url: string;
  video: {
    beatId: number;
    chordId: number;
    repetitiveSegmentId: number;
    lyricId: number;
    lyricDiffId: number;
  };
};
