import type { IPlayerApp, Player } from 'textalive-app-api';

import { Manageability } from './types';

/**
 * Calculates manageability for app
 * @param app
 * @returns
 */
export function calculateManageability(app: IPlayerApp): Manageability {
  // If not managed app - user can fully control it
  if (!app.managed) {
    return Manageability.FULL;
  }

  // If app managed and song is provided - no control at all, else we can partially control (select song)
  return app.songUrl ? Manageability.NONE : Manageability.PARTIAL;
}

/** Time to wait before a pause will be counted as triggered by the user */
export const REAL_ENDING_DELAY = 100; // 100ms

/**
 * Sometimes browser pause the song on launch,
 * so we need to find the real pause that was triggered by the use
 * @param player TextAlive player instance
 * @returns Is pause triggered by user
 */
export function isEnded(player: Player): boolean {
  return player.videoPosition + REAL_ENDING_DELAY >= player.video.duration;
}
