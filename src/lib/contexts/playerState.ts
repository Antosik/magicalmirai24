import type { Readable, Writable } from 'svelte/store';
import type { IPlayerApp, Player } from 'textalive-app-api';

import { getContext } from 'svelte';
import { writable } from 'svelte/store';

import { SongId } from '$lib/songs/types';

/** Contains song info */
type SongInfo = {
  /** Author's name */
  artist: string;
  /** Song title */
  title: string;
};

/** Contains flags for player's readiness */
type Readiness = {
  /** Updates with 'onAppReady' */
  app: boolean;
  /** Updates with 'onVideoReady' */
  video: boolean;
  /** Updates with 'onTimerReady' */
  timer: boolean;
};

/** Provides knowledge of game manageability by user  */
type Manageability = 'full' | 'partial' | 'none';

/** Different state for player */
type SongState = 'none' | 'playing' | 'paused' | 'stopped';

type PlayerState = {
  songInfo: Readable<SongInfo>;
  readiness: Readable<Readiness>;
  manageability: Readable<Manageability>;
  songState: Readable<SongState>;
  song: Writable<SongId>;
};

export const PLAYER_STATE_CONTEXT_KEY = 'playerState';

function calculateManageability(app: IPlayerApp): Manageability {
  // If not managed app - user can fully control it
  if (!app.managed) {
    return 'full';
  }

  // If app managed and song is provided - no control at all, else we can partially control (select song)
  return app.songUrl ? 'none' : 'partial';
}

export function createPlayerStateStore(player: Player): PlayerState {
  const songInfo = writable<SongInfo>({ artist: '', title: '' });
  const readiness = writable<Readiness>({ app: false, video: false, timer: false });
  const manageability = writable<Manageability>('full');
  const songState = writable<SongState>('none');
  const song = writable<SongId>(SongId.SUPERHERO);

  player.addListener({
    // Set app readiness
    onAppReady(app) {
      readiness.update(($state) => {
        $state.app = true;
        return $state;
      });

      manageability.update(($state) => {
        const newState = calculateManageability(app);
        return $state === newState ? $state : newState;
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
