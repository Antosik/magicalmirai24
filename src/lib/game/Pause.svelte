<!-- @component Pause screen on game page -->

<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import Volume from '$lib/blocks/Volume.svelte';
  import { getLocale } from '$lib/contexts/locale';
  import { getSettings } from '$lib/contexts/settings';
  import GameStateScene from '$lib/scenes/GameStateScene.svelte';

  const settings = getSettings();
  const { i18n } = getLocale();

  const dispatch = createEventDispatcher<{
    resume: void;
    restart: void;
    back: void;
  }>();
</script>

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
      <Volume bind:value={$settings.volume} />
    </div>
  </div>
</GameStateScene>

<style lang="scss">
  .pause {
    @include flex_center;

    max-width: calc(100dvw + grid(4));
    max-height: calc(100dvh + grid(4));
    flex-direction: column;
    padding: grid(10);
    aspect-ratio: 1;
    gap: grid(5);

    @include breakpoint(xxl) {
      padding: grid(16);
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
    border: 0;
    background: none;
    font-size: 28px;
    text-transform: uppercase;
    transition: transform 200ms ease-in-out;

    &:hover {
      transform: scale(1.3);
    }

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

    max-width: 90%;
    gap: grid(1);
  }
</style>
