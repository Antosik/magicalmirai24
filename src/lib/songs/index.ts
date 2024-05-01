import { SongId, type Song } from './types';

// SUPERHERO / めろくる
export const superhero: Song = {
  id: SongId.SUPERHERO,
  title: 'SUPERHERO',
  artist: 'めろくる',
  url: 'https://piapro.jp/t/hZ35/20240130103028',
  video: {
    // 音楽地図訂正履歴
    beatId: 4592293,
    chordId: 2727635,
    repetitiveSegmentId: 2824326,
    // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FhZ35%2F20240130103028
    lyricId: 59415,
    lyricDiffId: 13962,
  },
};

// いつか君と話したミライは / タケノコ少年
export const someday: Song = {
  id: SongId.SOMEDAY,
  title: 'いつか君と話したミライは',
  artist: 'タケノコ少年',
  url: 'https://piapro.jp/t/--OD/20240202150903',
  video: {
    // 音楽地図訂正履歴
    beatId: 4592296,
    chordId: 2727636,
    repetitiveSegmentId: 2824327,
    // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2F--OD%2F20240202150903
    lyricId: 59416,
    lyricDiffId: 13963,
  },
};

// フューチャーノーツ / shikisai
export const future: Song = {
  id: SongId.FUTURE,
  title: 'フューチャーノーツ',
  artist: 'shikisai',
  url: 'https://piapro.jp/t/XiaI/20240201203346',
  video: {
    // 音楽地図訂正履歴
    beatId: 4592297,
    chordId: 2727637,
    repetitiveSegmentId: 2824328,
    // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FXiaI%2F20240201203346
    lyricId: 59417,
    lyricDiffId: 13964,
  },
};

// 未来交響曲 / ヤマギシコージ
export const symphony: Song = {
  id: SongId.SYMPHONY,
  title: '未来交響曲',
  artist: 'ヤマギシコージ',
  url: 'https://piapro.jp/t/Rejk/20240202164429',
  video: {
    // 音楽地図訂正履歴
    beatId: 4592298,
    chordId: 2727638,
    repetitiveSegmentId: 2824329,
    // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FRejk%2F20240202164429
    lyricId: 59418,
    lyricDiffId: 13965,
  },
};

// リアリティ / 歩く人
export const reality: Song = {
  id: SongId.REALITY,
  title: 'リアリティ',
  artist: '歩く人',
  url: 'https://piapro.jp/t/ELIC/20240130010349',
  video: {
    // 音楽地図訂正履歴
    beatId: 4592299,
    chordId: 2727639,
    repetitiveSegmentId: 2824330,
    // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FELIC%2F20240130010349
    lyricId: 59419,
    lyricDiffId: 13966,
  },
};

// The Marks / 2ouDNS
export const marks: Song = {
  id: SongId.MARKS,
  title: 'The Marks',
  artist: '2ouDNS',
  url: 'https://piapro.jp/t/xEA7/20240202002556',
  video: {
    // 音楽地図訂正履歴
    beatId: 4592300,
    chordId: 2727640,
    repetitiveSegmentId: 2824331,
    // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FxEA7%2F20240202002556
    lyricId: 59420,
    lyricDiffId: 13967,
  },
};

export const songs: Record<SongId, Song> = {
  [SongId.SUPERHERO]: superhero,
  [SongId.SOMEDAY]: someday,
  [SongId.FUTURE]: future,
  [SongId.SYMPHONY]: symphony,
  [SongId.REALITY]: reality,
  [SongId.MARKS]: marks,
} as const;
