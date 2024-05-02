<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  import Volume from '$lib/blocks/Volume.svelte';
  import { getGame } from '$lib/contexts/game';
  import { getSettings } from '$lib/contexts/settings';

  export let open = false;

  const settings = getSettings();
  const game = getGame();

  const dispatch = createEventDispatcher<{
    resume: void;
    restart: void;
    back: void;
  }>();

  $: total = $game.chars.size;
  $: catched = Array.from($game.chars.values()).filter((el) => el.state === 1).length;
  $: missed = Array.from($game.chars.values()).filter((el) => el.state === -1).length;
</script>

{#if open}
  <dialog open transition:fade={{ duration: 200 }}>
    <h2>Pause</h2>

    <div>
      <span class="total">total: {total}</span> /
      <span class="catched">ok: {catched}</span> /
      <span class="missed">miss: {missed}</span>
    </div>

    <ul>
      <li>
        <button type="button" on:click={() => dispatch('resume')}>Resume</button>
      </li>
      <li>
        <button type="button" on:click={() => dispatch('restart')}>Restart</button>
      </li>
      <li>
        <button type="button" on:click={() => dispatch('back')}>Back</button>
      </li>
    </ul>
  </dialog>

  <div class="volume" transition:fade={{ duration: 200 }}>
    <Volume bind:value={$settings.volume} />
  </div>
{/if}

<style lang="scss">
  dialog {
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    width: 300px;
    padding: grid(8);
    border: 1px solid #1e5b64;
    background-color: rgb(255 255 255 / 50%);
    text-align: center;
    transform: translate(-50%, -50%);
  }

  h2,
  div {
    margin-bottom: grid(4);
  }

  div {
    @include flex_center;

    gap: grid(1);
  }

  span {
    &.total {
      color: #1e5b64;
    }

    &.catched {
      color: #fff;
    }

    &.missed {
      color: #dc2b4d;
    }
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
    background: none;
  }

  .volume {
    position: fixed;
    top: grid(4);
    right: grid(4);
  }
</style>
