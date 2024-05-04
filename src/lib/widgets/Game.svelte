<script lang="ts">
  import { songs } from '$lib/songs';

  import PauseButton from '$lib/blocks/PauseButton.svelte';
  import { getGame } from '$lib/contexts/game';
  import { getPage } from '$lib/contexts/page';
  import { getPlayerInstance } from '$lib/contexts/player';
  import { getPlayerState } from '$lib/contexts/playerState';
  import { getSettings } from '$lib/contexts/settings';
  import Game from '$lib/game/Game.svelte';
  import Pause from '$lib/game/Pause.svelte';
  import SongInfo from '$lib/textalive/SongInfo.svelte';

  export let playerNode: HTMLElement;
  export let errorNode: HTMLElement;

  const { song: songId } = getPlayerState();
  const settings = getSettings();
  const page = getPage();
  const { chars } = getGame();
  const player = getPlayerInstance();
  const START_SONG_DELAY = 3e3; // 3s

  let pause = false;
  let songReady = false;
  let timer = START_SONG_DELAY / 1e3;
  let timeout: ReturnType<typeof setTimeout>;
  let restart = 0;
  let visibilityState: DocumentVisibilityState;

  $: player.volume = $settings.volume;

  const song = songs[$songId];
  player.createFromSongUrl(song.url, {
    video: song.video,
  });
  player.addListener({
    onTimerReady: () => {
      songReady = true;
      resumeGame();
    },
  });

  function startTimer(i: number) {
    if (i === 0) {
      if (visibilityState === 'visible') {
        player?.requestPlay();
      } else {
        pauseGame();
      }
      return;
    }

    timeout = setTimeout(() => {
      timer = i - 1;
      clearTimeout(timeout);
      startTimer(timer);
    }, 1e3);
  }

  function pauseGame() {
    pause = true;
    timer = 0;
    player?.requestPause();
    clearTimeout(timeout);
  }

  function resumeGame() {
    pause = false;
    timer = START_SONG_DELAY / 1e3;
    startTimer(timer);
  }

  function stopGame() {
    pause = false;
    timer = 0;
    player?.requestStop();
    clearTimeout(timeout);
    chars.set(new Map());
    restart++;
  }

  function restartGame() {
    stopGame();
    resumeGame();
  }

  async function backToMenu() {
    stopGame();
    page.set('main_page');
  }

  const handleVisibilityChange = (e: Event & { currentTarget: Document }) => {
    if (e.currentTarget.hidden) {
      pauseGame();
    }
  };
</script>

<svelte:document bind:visibilityState on:visibilitychange={handleVisibilityChange} />

{#if songReady}
  {#key restart}
    <Game {errorNode} {playerNode} pause={Boolean(pause || timer)} />
  {/key}

  <Pause open={pause} on:resume={resumeGame} on:restart={restartGame} on:back={backToMenu} />

  {#if !pause && !timer}
    <PauseButton on:click={pauseGame} />
  {/if}

  {#if timer}
    <div>
      {timer}
    </div>
  {/if}
{:else}
  <div>Loading song...</div>
{/if}

<SongInfo />

<style lang="scss">
  div {
    @include flex_center;

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #1e5b64;
    font-size: 28px;
  }
</style>
