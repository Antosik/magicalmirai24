<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  import Volume from '$lib/blocks/Volume.svelte';
  import { getGame } from '$lib/contexts/game';
  import { getSettings } from '$lib/contexts/settings';

  export let open = false;

  const settings = getSettings();
  const { chars, catched, missed } = getGame();

  const dispatch = createEventDispatcher<{
    resume: void;
    restart: void;
    back: void;
  }>();
</script>

{#if open}
  <dialog open transition:fade={{ duration: 200 }}>
    <h2>Pause</h2>

    <div>
      <span class="total">total: {$chars.size}</span> /
      <span class="catched">ok: {$catched.length}</span> /
      <span class="missed">miss: {$missed.length}</span>
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
    z-index: $z-index-menu;
    top: 50%;
    left: 50%;
    width: 300px;
    padding: grid(8);
    border: 1px solid var(--blue-color);
    background-color: var(--transparent-white-color);
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
      color: var(--blue-color);
    }

    &.catched {
      color: var(--white-color);
    }

    &.missed {
      color: var(--red-color);
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
    position: absolute;
    top: calc(var(--frame-size) + grid(1));
    right: calc(var(--frame-size) + grid(1));
  }
</style>
