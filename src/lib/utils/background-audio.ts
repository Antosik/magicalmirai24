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

type VolumeControl = (volume: number) => void;

/**
 * Returns the function that updates the background audio volume level.
 * @param audioElement HTML Audio Element
 */
export async function createBackgroundAudioVolumeControl(
  audioElement: HTMLAudioElement,
): Promise<VolumeControl> {
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

type VolumeSmoothChangeParameters = {
  /** Start volume */
  startVolume: number;
  /** End volume */
  endVolume: number;
  /** Interval to update from start volume to end volume (in ms) */
  interval?: number;
  /** Steps count */
  steps?: number;
};

/**
 * Smoothly updates volume
 * Used to get the music fade-in and fade-out effect
 * @param volumeControl Function to update volume
 * @param args Options
 */
export async function changeVolumeSmoothly(
  volumeControl: VolumeControl,
  { startVolume, endVolume, steps = 10, interval = 500 }: VolumeSmoothChangeParameters,
) {
  const stepVolume = ((endVolume - startVolume) / interval) * steps;

  return new Promise<void>((res) => {
    let currentVolume = startVolume;

    const timer = setInterval(function () {
      if (
        (endVolume > startVolume && currentVolume >= endVolume) ||
        (endVolume < startVolume && currentVolume <= endVolume)
      ) {
        clearInterval(timer);
        res();
        return;
      }

      volumeControl(currentVolume);
      currentVolume += stepVolume;
    }, interval / steps);
  });
}
