<!-- @component Results screen on game page -->

<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { getGame } from '$lib/contexts/game';
  import { getLocale } from '$lib/contexts/locale';
  import GameStateScene from '$lib/scenes/GameStateScene.svelte';

  const { chars, catched } = getGame();
  const { i18n } = getLocale();

  const dispatch = createEventDispatcher<{
    resume: void;
    restart: void;
    back: void;
  }>();
</script>

<GameStateScene>
  <div class="results">
    <h2>{$i18n('Results')}</h2>

    {#if $chars.size}
      <div class="results__numbers">
        <div class="results__percentage">
          {Math.floor(($catched.length / ($chars.size ?? 1)) * 100)}%
        </div>
        <div class="results__count">
          <p class="results__count_user">{$catched.length}</p>
          <p class="results__count_total">{$chars.size}</p>
        </div>
      </div>
    {/if}

    <ul>
      <li>
        <button type="button" on:click={() => dispatch('restart')}>{$i18n('Retry')}</button>
      </li>
      <li>
        <button type="button" on:click={() => dispatch('back')}>{$i18n('Main menu')}</button>
      </li>
    </ul>
  </div>
</GameStateScene>

<style lang="scss">
  h2 {
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

  .results {
    @include flex_center;

    max-width: calc(100dvw + grid(4) - var(--frame-size));
    max-height: calc(100dvh + grid(4) - var(--frame-size));
    flex-direction: column;
    padding: grid(17.5);
    aspect-ratio: 1;
    gap: grid(5);

    @include breakpoint(xxl) {
      padding: grid(16);
    }

    &__numbers {
      @include flex_center;

      gap: grid(5);
      padding: grid(10);
    }

    &__percentage {
      font-size: 70px;
      text-transform: uppercase;

      @include breakpoint(md) {
        font-size: 104px;
      }
    }

    &__count {
      font-size: 29px;
      text-transform: uppercase;
      margin-top: grid(-1.75);

      &_user {
        padding: 0 grid(2);
      }

      &_total {
        display: inline-block;
        border-top: 3px solid $color-text;
        padding: grid(0.5) grid(2) 0 grid(2);
      }

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
    text-wrap: nowrap;
    transition: transform 200ms ease-in-out;

    &:hover {
      transform: scale(1.2);
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
</style>
