<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { getGame } from '$lib/contexts/game';
  import { getLocale } from '$lib/contexts/locale';
  import GameStateScene from '$lib/scenes/GameStateScene.svelte';

  export let open = false;

  const { chars, catched } = getGame();
  const { i18n } = getLocale();

  const dispatch = createEventDispatcher<{
    resume: void;
    restart: void;
    back: void;
  }>();
</script>

{#if open}
  <GameStateScene>
    <div class="results">
      <h2 class="visually-hidden">{$i18n('Results')}</h2>

      <div class="results__percentage">
        {Math.floor(($catched.length / ($chars.size ?? 1)) * 100)}%
      </div>
      <div class="results__count">{$catched.length} / {$chars.size}</div>

      <ul>
        <li>
          <button type="button" on:click={() => dispatch('restart')}>{$i18n('Retry')}</button>
        </li>
        <li>
          <button type="button" on:click={() => dispatch('back')}>{$i18n('Back')}</button>
        </li>
      </ul>
    </div>
  </GameStateScene>
{/if}

<style lang="scss">
  .results {
    @include flex_center;

    flex-direction: column;
    padding: grid(6);
    gap: grid(8);

    &__percentage {
      font-size: 44px;
      text-transform: uppercase;

      @include breakpoint(md) {
        font-size: 48px;
      }

      @include breakpoint(xl) {
        font-size: 52px;
      }

      @include breakpoint(xxl) {
        font-size: 60px;
      }
    }

    &__count {
      font-size: 36px;
      text-transform: uppercase;

      @include breakpoint(md) {
        font-size: 40px;
      }

      @include breakpoint(xl) {
        font-size: 44px;
      }

      @include breakpoint(xxl) {
        font-size: 52px;
      }
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
</style>
