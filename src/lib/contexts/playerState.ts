import type { Readable, Writable } from 'svelte/store';
import type { Player } from 'textalive-app-api';

import { getContext } from 'svelte';
import { writable } from 'svelte/store';

import { SongId } from '$lib/songs/types';

type SongInfo = {
  artist: string;
  title: string;
};

type Readiness = {
  app: boolean;
  video: boolean;
  timer: boolean;
};

type Manageability = {
  managed: boolean;
  songUrl: boolean;
};

type SongState = 'none' | 'playing' | 'paused' | 'stopped';

type PlayerState = {
  songInfo: Readable<SongInfo>;
  readiness: Readable<Readiness>;
  manageability: Readable<Manageability>;
  songState: Readable<SongState>;
  song: Writable<SongId>;
};

export const PLAYER_STATE_CONTEXT_KEY = 'playerState';

export function createPlayerStateStore(player: Player): PlayerState {
  const songInfo = writable<SongInfo>({ artist: '', title: '' });
  const readiness = writable<Readiness>({ app: false, video: false, timer: false });
  const manageability = writable<Manageability>({ managed: false, songUrl: false });
  const songState = writable<SongState>('none');
  const song = writable<SongId>(SongId.SUPERHERO);

  player.addListener({
    // Set app readiness
    onAppReady(app) {
      readiness.update(($state) => {
        $state.app = true;
        return $state;
      });
      manageability.set({
        managed: app.managed,
        songUrl: Boolean(app.songUrl),
      });
    },
    // Set song info on video loaded & video readiness
    onVideoReady() {
      songInfo.set({ title: player.data.song.name, artist: player.data.song.artist.name });
      readiness.update(($state) => {
        $state.video = true;
        return $state;
      });
    },
    // Set timer readiness
    onTimerReady() {
      readiness.update(($state) => {
        $state.timer = true;
        return $state;
      });
    },
    // Reset song data & readiness on media change
    onAppMediaChange() {
      songInfo.set({ title: '', artist: '' });
      readiness.update(($state) => {
        $state.video = false;
        $state.timer = false;
        return $state;
      });
      songState.set('none');
    },
    onPlay() {
      songState.set('playing');
    },
    onPause() {
      songState.set('paused');
    },
    onStop() {
      songState.set('stopped');
    },
  });

  return {
    songInfo,
    readiness,
    manageability,
    songState,
    song,
  };
}

export const getPlayerState = () => getContext<PlayerState>(PLAYER_STATE_CONTEXT_KEY);
