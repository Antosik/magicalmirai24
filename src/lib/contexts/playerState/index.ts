import type { IPlayerApp, Player } from 'textalive-app-api';

import { getContext } from 'svelte';
import { writable } from 'svelte/store';

import { SongId } from '$lib/songs/types';

import {
  SongState,
  Manageability,
  type PlayerStateContext,
  type Readiness,
  type SongInfo,
} from './types';
import { calculateManageability } from './utils';

export const PLAYER_STATE_CONTEXT_KEY = 'playerState';

export function createPlayerStateStore(player: Player): PlayerStateContext {
  const songInfo = writable<SongInfo>({ artist: '', title: '' });
  const readiness = writable<Readiness>({ app: false, video: false, timer: false });
  const manageability = writable<Manageability>(Manageability.FULL);
  const songState = writable<SongState>(SongState.NONE);
  const song = writable<SongId>(SongId.SUPERHERO);

  player.addListener({
    // Set app readiness
    onAppReady(app: IPlayerApp) {
      readiness.set({ app: true, video: false, timer: false });
      manageability.update(($state) => {
        const newState = calculateManageability(app);
        return $state === newState ? $state : newState;
      });
    },
    // If video loading - reset readiness for video & timer, reset song info
    onVideoLoad() {
      songInfo.set({ title: '', artist: '' });
      readiness.update(($state) => {
        $state.video = false;
        $state.timer = false;
        return $state;
      });
    },
    // Set song info & video readiness when video loaded
    onVideoReady() {
      songInfo.set({ title: player.data.song.name, artist: player.data.song.artist.name });
      readiness.update(($state) => {
        $state.video = true;
        $state.timer = false;
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
      songState.set(SongState.NONE);
    },
    onPlay() {
      songState.set(SongState.PLAYING);
    },
    onPause() {
      songState.set(SongState.PAUSED);
    },
    onStop() {
      songState.set(SongState.STOPPED);
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

export const getPlayerState = () => getContext<PlayerStateContext>(PLAYER_STATE_CONTEXT_KEY);

export { Manageability, SongState };
