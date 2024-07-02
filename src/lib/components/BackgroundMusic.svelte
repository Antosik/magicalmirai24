<script lang="ts">
  import { onMount } from 'svelte';

  import { getPage, Page } from '$lib/contexts/page';
  import { getSettings } from '$lib/contexts/settings';
  import { createBackgroundAudioVolumeControl } from '$lib/utils/background-audio';

  let audioPlayer: HTMLAudioElement;

  const page = getPage();
  const settings = getSettings();

  const VOLUME_COEFFICIENT = 0.1;

  onMount(async () => {
    const setVolume = await createBackgroundAudioVolumeControl(audioPlayer);

    // Set background music volume
    settings.subscribe(({ volume }) => {
      setVolume((volume / 100) * VOLUME_COEFFICIENT);
    });

    // Stop when moving to game page and resume when navigating to other
    page.subscribe(($page) => {
      switch ($page) {
        case Page.MAIN_PAGE:
        case Page.HELP:
        case Page.CREDITS:
          if (audioPlayer.paused) {
            setVolume(($settings.volume / 100) * VOLUME_COEFFICIENT);
            audioPlayer.play();
          }
          return;

        case Page.GAME:
          if (!audioPlayer.paused) {
            audioPlayer.pause();
          }
          return;
      }
    });
  });
</script>

<audio class="visually-hidden" loop bind:this={audioPlayer}>
  <source src="./audio/background_music.ogg" type="audio/ogg; codecs=vorbis" />
  <source src="./audio/background_music.mp3" type="audio/mpeg" />
</audio>
