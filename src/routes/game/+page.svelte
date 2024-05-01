<script lang="ts">
  import { beforeNavigate } from '$app/navigation';
  import { songs } from '$lib/songs';

  import { initGameContext } from '$lib/contexts/game';
  import { getPlayer } from '$lib/contexts/player';
  import { getSettings } from '$lib/contexts/settings';
  import Scene from '$lib/game/Scene.svelte';
  import SongInfo from '$lib/textalive/SongInfo.svelte';
  import Game from '$lib/widgets/Game.svelte';

  initGameContext();

  const settings = getSettings();
  const player = getPlayer();
  const START_SONG_DELAY = 3e3; // 3s

  let songReady = false;
  let timer = START_SONG_DELAY / 1e3;
  let timeout: ReturnType<typeof setTimeout>;

  const song = songs[$settings.song];
  $player.createFromSongUrl(song.url, {
    video: song.video,
  });
  $player.addListener({
    onTimerReady: () => {
      songReady = true;
      startTimer(timer);
    },
  });

  function startTimer(i: number) {
    if (i === 0) {
      $player.requestPlay();
      return;
    }

    timeout = setTimeout(() => {
      timer = i - 1;
      clearTimeout(timeout);
      startTimer(timer);
    }, 1e3);
  }

  beforeNavigate(() => {
    $player.requestStop();
    clearTimeout(timeout);
  });

  const handleVisibilityChange = (e: Event & { currentTarget: HTMLDocument }) => {
    if (e.currentTarget.hidden) {
      $player.requestPause();
      clearTimeout(timeout);
    } else {
      timer = START_SONG_DELAY / 1e3;
      startTimer(timer);
    }
  };
</script>

<svelte:document on:visibilitychange={handleVisibilityChange} />

<Scene let:ready={sceneReady} let:errorNode let:playerNode>
  {#if sceneReady && songReady}
    <Game {errorNode} {playerNode} />

    {#if timer}
      <div>
        {timer}
      </div>
    {/if}
  {:else}
    <div>Loading song...</div>
  {/if}

  <SongInfo />
</Scene>

<style lang="scss">
  div {
    @include flex_center;

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    font-size: 24px;
  }
</style>
