import type { ValueOf } from '$lib/utils/types';

/** Available song ids */
export const SongId = {
  SUPERHERO: 'SUPERHERO',
  SOMEDAY: 'SOMEDAY',
  FUTURE: 'FUTURE',
  SYMPHONY: 'SYMPHONY',
  REALITY: 'REALITY',
  MARKS: 'MARKS',
} as const;
export type SongId = ValueOf<typeof SongId>;

/** Available song ids */
export type Song = {
  id: SongId;
  /** 楽曲タイトル / Song title */
  title: string;
  /** アーティスト名 / Artist name */
  artist: string;
  /** 楽曲URL / Song URL */
  url: string;
  video: {
    /** ビート情報のリビジョンID / Beat info revision ID */
    beatId: number;
    /** コード進行の情報のリビジョンID / Chord info revision ID */
    chordId: number;
    /** サビなどの繰り返し区間のリビジョンID / Repetitive segment revision ID */
    repetitiveSegmentId: number;
    /** 歌詞ID / Lyrics ID */
    lyricId: number;
    /** 歌詞訂正ID / Lyrics diff ID */
    lyricDiffId: number;
  };
};
