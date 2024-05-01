<script lang="ts">
  import { songs } from '$lib/songs';

  import Volume from '$lib/blocks/Volume.svelte';
  import { getPlayer } from '$lib/contexts/player';
  import { getSettings } from '$lib/contexts/settings';

  const settings = getSettings();
  const player = getPlayer();

  $: $player.volume = $settings.volume;
</script>

<section>
  <h1>Main Menu</h1>

  <select bind:value={$settings.song}>
    {#each Object.entries(songs) as [songId, song] (songId)}
      <option value={songId}>{song.artist} - {song.title}</option>
    {/each}
  </select>

  <ul>
    <li>
      <a href="/game">Play</a>
    </li>
    <li>
      <a href="/help">Help</a>
    </li>
    <li>
      <a href="/credits">Credits</a>
    </li>
  </ul>
</section>

<div class="volume">
  <Volume bind:value={$settings.volume} />
</div>

<style lang="scss">
  section {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    width: 300px;
    padding: grid(8);
    text-align: center;
    transform: translate(-50%, -50%);

    &::before {
      position: fixed;
      z-index: -1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgb(255 255 255 / 80%);
      content: '';
    }
  }

  h1,
  select {
    margin-bottom: grid(4);
  }

  select {
    width: 100%;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: grid(2);
  }

  a {
    @include flex_center;

    padding: grid(2) grid(4);
    border: 1px solid black;
  }

  .volume {
    position: fixed;
    top: grid(4);
    right: grid(4);
  }
</style>
