<script lang="ts">
  import { songs } from '$lib/songs';

  import Volume from '$lib/blocks/Volume.svelte';
  import { getPage } from '$lib/contexts/page';
  import { getPlayerState } from '$lib/contexts/playerState';
  import { getSettings } from '$lib/contexts/settings';

  const settings = getSettings();
  const page = getPage();
  const { song, manageability } = getPlayerState();
</script>

<section>
  <h1>Main Menu</h1>

  <select bind:value={$song}>
    {#each Object.entries(songs) as [songId, song] (songId)}
      <option value={songId}>{song.artist} - {song.title}</option>
    {/each}
  </select>

  <ul>
    <li>
      <button type="button" on:click={() => ($page = 'game')}>Play</button>
    </li>
    <li>
      <button type="button" on:click={() => ($page = 'help')}>Help</button>
    </li>
    <li>
      <button type="button" on:click={() => ($page = 'credits')}>Credits</button>
    </li>
  </ul>
</section>

{#if $manageability === 'full'}
  <div class="volume">
    <Volume bind:value={$settings.volume} />
  </div>
{/if}

<style lang="scss">
  section {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    width: 300px;
    padding: grid(8);
    background-color: rgb(255 255 255 / 50%);
    text-align: center;
    transform: translate(-50%, -50%);
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

  button {
    @include flex_center;

    width: 100%;
    padding: grid(2) grid(4);
    border: 1px solid black;
  }

  .volume {
    position: fixed;
    top: grid(4);
    right: grid(4);
  }
</style>
