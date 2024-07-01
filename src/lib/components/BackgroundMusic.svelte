<script lang="ts">
  import { onMount } from 'svelte';

  import { getPage, Page } from '$lib/contexts/page';
  import { getPlayerState, SongState } from '$lib/contexts/playerState';
  import { getSettings } from '$lib/contexts/settings';

  let audioPlayer: HTMLAudioElement;

  const page = getPage();
  const settings = getSettings();
  const { songState } = getPlayerState();

  const VOLUME_COEFFICIENT = 0.1;

  onMount(() => {
    // Set background music volume
    settings.subscribe(({ volume }) => {
      audioPlayer.volume = (volume / 100) * VOLUME_COEFFICIENT;
    });

    // Start background music when not in-game and stop when in-game
    songState.subscribe(($songState) => {
      switch ($songState) {
        case SongState.NONE:
        case SongState.STOPPED:
        case SongState.ENDED:
          if (audioPlayer.paused) {
            audioPlayer.play();
          }
          return;

        case SongState.PLAYING:
        case SongState.PAUSED:
          if (!audioPlayer.paused) {
            audioPlayer.pause();
          }
          return;
      }
    });

    // Start background music when navigating to main menu and stop when navigating on game
    page.subscribe(($page) => {
      switch ($page) {
        case Page.START:
        case Page.MAIN_PAGE:
        case Page.HELP:
        case Page.CREDITS:
          if (audioPlayer.paused) {
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

<audio class="visually-hidden" autoplay loop bind:this={audioPlayer}>
  <source src="./audio/background_music.mp3" type="audio/mpeg" />
</audio>
