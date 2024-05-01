<script lang="ts">
  import { beforeNavigate } from '$app/navigation';
  import { songs } from '$lib/songs';

  import { getPlayer } from '$lib/contexts/player';
  import { getSettings } from '$lib/contexts/settings';
  import Scene from '$lib/game/Scene.svelte';
  import Game from '$lib/widgets/Game.svelte';

  const settings = getSettings();
  const player = getPlayer();
  const START_SONG_DELAY = 3e3; // 3s

  let songReady = false;
  let timer = START_SONG_DELAY / 1e3;

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

  const startTimer = (i: number) => {
    if (i === 0) {
      $player.requestPlay();
      return;
    }

    const a = setTimeout(() => {
      timer = i - 1;
      startTimer(timer);
      clearTimeout(a);
    }, 1e3);
  };

  beforeNavigate(() => {
    $player.requestStop();
  });
</script>

<Scene>
  {#if songReady}
    <Game />

    {#if timer}
      <div>
        {timer}
      </div>
    {/if}
  {:else}
    <div>Loading song...</div>
  {/if}
</Scene>

<style lang="scss">
  div {
    @include flex_center;

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
