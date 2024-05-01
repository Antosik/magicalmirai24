<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  import Volume from '$lib/blocks/Volume.svelte';
  import { getSettings } from '$lib/contexts/settings';

  export let open = false;

  const settings = getSettings();

  const dispatch = createEventDispatcher<{
    resume: void;
    restart: void;
    back: void;
  }>();
</script>

{#if open}
  <dialog open transition:fade={{ duration: 200 }}>
    <h2>Pause</h2>

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
    text-align: center;
    transform: translate(-50%, -50%);
    background-color: rgb(255 255 255 / 70%);
    border: 1px solid #1e5b64;
  }

  h2 {
    margin-bottom: grid(4);
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
    background: none;
    border: 1px solid black;
  }

  .volume {
    position: fixed;
    top: grid(4);
    right: grid(4);
  }
</style>
