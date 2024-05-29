<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import FullscreenButton from '$lib/blocks/FullscreenButton.svelte';
  import Volume from '$lib/blocks/Volume.svelte';
  import { getLocale } from '$lib/contexts/locale';
  import { getSettings } from '$lib/contexts/settings';
  import GameStateScene from '$lib/scenes/GameStateScene.svelte';

  export let open = false;

  const settings = getSettings();
  const { i18n } = getLocale();

  const dispatch = createEventDispatcher<{
    resume: void;
    restart: void;
    back: void;
  }>();
</script>

{#if open}
  <GameStateScene>
    <div class="pause">
      <h2 class="visually-hidden">{$i18n('Pause')}</h2>

      <ul>
        <li>
          <button type="button" on:click={() => dispatch('resume')}>{$i18n('Resume')}</button>
        </li>
        <li>
          <button type="button" on:click={() => dispatch('restart')}>{$i18n('Retry')}</button>
        </li>
        <li>
          <button type="button" on:click={() => dispatch('back')}>{$i18n('Back')}</button>
        </li>
      </ul>

      <div class="buttons">
        <FullscreenButton />
        <Volume bind:value={$settings.volume} />
      </div>
    </div>
  </GameStateScene>
{/if}

<style lang="scss">
  .pause {
    @include flex_center;

    flex-direction: column;
    padding: grid(6);
    gap: grid(10);
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
    border: 0;
    background: none;
    font-size: 28px;
    text-transform: uppercase;

    @include breakpoint(md) {
      font-size: 32px;
    }

    @include breakpoint(xl) {
      font-size: 36px;
    }

    @include breakpoint(xxl) {
      font-size: 44px;
    }
  }

  .buttons {
    @include flex_center;

    gap: grid(1);
  }
</style>
