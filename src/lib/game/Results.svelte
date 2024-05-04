<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  import { getGame } from '$lib/contexts/game';

  export let open = false;

  const { chars, catched, missed } = getGame();

  const dispatch = createEventDispatcher<{
    resume: void;
    restart: void;
    back: void;
  }>();
</script>

{#if open}
  <dialog open transition:fade={{ duration: 200 }}>
    <h2>Results</h2>

    <div>
      <span class="total">total: {$chars.size}</span> /
      <span class="catched">ok: {$catched.length}</span> /
      <span class="missed">miss: {$missed.length}</span>
    </div>

    <ul>
      <li>
        <button type="button" on:click={() => dispatch('restart')}>Restart</button>
      </li>
      <li>
        <button type="button" on:click={() => dispatch('back')}>Back</button>
      </li>
    </ul>
  </dialog>
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
    font-size: 20px;
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
</style>
