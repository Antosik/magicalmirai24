/**
 * Checks is audio volume change available on the browser
 * (it's unuavailable generally on iOS)
 */
async function isAudioVolumeChangeAvailable() {
  const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 200, false));

  const promise = new Promise((resolve) => {
    const audio = document.createElement('audio');
    const handler = () => {
      audio.removeEventListener('volumechange', handler);
      audio.remove();
      resolve(true);
    };

    audio.addEventListener('volumechange', handler);

    audio.volume = 0.5;
  });

  return Promise.race([promise, timeoutPromise]);
}

/**
 * Returns the function that updates the background audio volume level.
 * @param audioElement HTML Audio Element
 */
export async function createBackgroundAudioVolumeControl(audioElement: HTMLAudioElement) {
  const isVolumeChangeAvailable = await isAudioVolumeChangeAvailable();

  // If there is native volume change available - use it
  if (isVolumeChangeAvailable) {
    return function updateVolume(volume: number) {
      audioElement.volume = volume;
    };
  }

  // Otherwise use workaround via Web Audio API
  const audioContext = new AudioContext();

  const source = audioContext.createMediaElementSource(audioElement);
  const gainNode = audioContext.createGain();

  function updateVolume(volume: number) {
    gainNode.gain.value = volume;
  }

  source.connect(gainNode);
  gainNode.connect(audioContext.destination);

  return updateVolume;
}
