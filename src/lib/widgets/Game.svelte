<script lang="ts">
  import { songs } from '$lib/songs';

  import PauseButton from '$lib/blocks/PauseButton.svelte';
  import { getGame } from '$lib/contexts/game';
  import { getLocale } from '$lib/contexts/locale';
  import { Page, getPage } from '$lib/contexts/page';
  import { getPlayerInstance } from '$lib/contexts/player';
  import { getPlayerPosition } from '$lib/contexts/playerPosition';
  import { Manageability, SongState, getPlayerState } from '$lib/contexts/playerState';
  import { getSettings } from '$lib/contexts/settings';
  import Game from '$lib/game/Game.svelte';
  import Pause from '$lib/game/Pause.svelte';
  import SongInfo from '$lib/game/SongInfo.svelte';
  import { START_SONG_DELAY } from '$lib/game/constants';
  import { calculateKeyboardPositioningStep, isRealPause } from '$lib/game/utils';
  import Results from '../game/Results.svelte';

  export let playerNode: HTMLElement;
  export let errorNode: HTMLElement;

  const { song: songId, manageability, readiness, songState } = getPlayerState();
  const page = getPage();
  const { chars } = getGame();
  const player = getPlayerInstance();
  const playerPosition = getPlayerPosition();
  const settings = getSettings();
  const { i18n } = getLocale();

  let timer = START_SONG_DELAY / 1e3;
  let timeout: ReturnType<typeof setTimeout>;
  let restart = 0;
  let visibilityState: DocumentVisibilityState;
  let windowHeight = window.innerHeight;
  let done = false;

  $: pause = $songState === SongState.PAUSED && isRealPause(player);
  $: song = songs[$songId];
  $: $manageability !== Manageability.NONE &&
    player.createFromSongUrl(song.url, {
      video: song.video,
    });
  $: $readiness.timer && resumeGame();

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
    timer = 0;
    done = false;
    player?.requestPause();
    clearTimeout(timeout);
  }

  function resumeGame() {
    timer = START_SONG_DELAY / 1e3;
    done = false;
    startTimer(timer);
  }

  function stopGame() {
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
    songState.set(SongState.NONE);
    page.set(Page.MAIN_PAGE);
  }

  async function handleSongEnded() {
    pauseGame();
    done = true;
  }

  /** If user is alt+tab'ed during the game - pause it */
  const handleVisibilityChange = (e: Event & { currentTarget: Document }) => {
    if (e.currentTarget.hidden && $manageability === Manageability.FULL && !done) {
      pauseGame();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    // Skip controls in automode
    if ($settings.autoplay && $songState === SongState.PLAYING) {
      return;
    }

    const pxStep = calculateKeyboardPositioningStep(windowHeight);
    switch (e.key) {
      case 'Escape': {
        if (pause) {
          resumeGame();
        } else {
          pauseGame();
        }
        break;
      }
      case 'ArrowUp':
      case 'w': {
        if (pause) {
          return;
        }
        playerPosition.update((y) => y - pxStep);
        break;
      }
      case 'ArrowDown':
      case 's': {
        if (pause) {
          return;
        }
        playerPosition.update((y) => y + pxStep);
        break;
      }
    }
  };
</script>

<svelte:window bind:innerHeight={windowHeight} />

<svelte:document
  bind:visibilityState
  on:keydown={handleKeyDown}
  on:visibilitychange={handleVisibilityChange}
/>

{#if $readiness.timer}
  {#key restart}
    <Game
      {errorNode}
      {playerNode}
      {done}
      pause={Boolean(pause || timer || done)}
      on:ended={handleSongEnded}
    />
  {/key}

  {#if $manageability === Manageability.FULL}
    <Pause
      open={pause && !done}
      on:resume={resumeGame}
      on:restart={restartGame}
      on:back={backToMenu}
    />

    {#if !pause && !timer}
      <PauseButton on:click={pauseGame} />
    {/if}

    <Results open={done} on:restart={restartGame} on:back={backToMenu} />

    {#if timer}
      <div>
        {timer}
      </div>
    {/if}
  {/if}
{:else}
  <div>{$i18n('Loading song...')}</div>
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
    color: var(--blue-color);
    font-size: 28px;
  }
</style>
