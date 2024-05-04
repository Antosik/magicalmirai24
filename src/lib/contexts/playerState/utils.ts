import type { IPlayerApp } from 'textalive-app-api';

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
