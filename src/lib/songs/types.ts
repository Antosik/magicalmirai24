export type Song = {
  url: string;
  video: {
    beatId: number;
    chordId: number;
    repetitiveSegmentId: number;
    lyricId: number;
    lyricDiffId: number;
  };
};
