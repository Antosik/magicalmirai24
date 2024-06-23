/**
 * Creates Screen Wake Lock
 * Used to prevent devices from dimming or locking the screen when a game is playing
 */
export function createWakeLock() {
  let wakeLock: WakeLockSentinel | null = null;

  /** Call to request a wake lock */
  async function acquire() {
    try {
      wakeLock = await navigator.wakeLock.request('screen');
    } catch {}
  }

  /** Release the previously acquired wake lock */
  async function release() {
    await wakeLock?.release().then(() => {
      wakeLock = null;
    });
  }

  return {
    acquire,
    release,
  };
}
