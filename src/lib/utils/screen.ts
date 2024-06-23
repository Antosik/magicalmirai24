export function createWakeLock() {
  let wakeLock: WakeLockSentinel | null = null;

  async function acquire() {
    try {
      wakeLock = await navigator.wakeLock.request('screen');
    } catch {}
  }

  async function release() {
    await wakeLock?.release().then(() => {
      wakeLock = null;
    });
  }

  return {
    wakeLock,
    acquire,
    release,
  };
}
