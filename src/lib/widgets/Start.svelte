<!-- @component Start page -->

<script lang="ts">
  import { getLocale } from '$lib/contexts/locale';
  import { Page, getPage } from '$lib/contexts/page';

  const page = getPage();
  const { locale } = getLocale();

  function openMainPage() {
    $page = Page.MAIN_PAGE;
  }
</script>

<svelte:document on:click={openMainPage} on:keydown={openMainPage} />

<div>
  <h1>Miku-san kamishibai</h1>
  <ul>
    <li>
      <button type="button" class:active={$locale === 'EN'} on:click={() => ($locale = 'EN')}>
        English
      </button>
    </li>
    |
    <li>
      <button type="button" class:active={$locale === 'JA'} on:click={() => ($locale = 'JA')}>
        日本語
      </button>
    </li>
  </ul>
</div>

<style lang="scss">
  div {
    @include flex_center;

    max-width: calc(100dvw + grid(4) - var(--frame-size));
    max-height: calc(100dvh + grid(4) - var(--frame-size));
    flex-direction: column;
    padding: grid(10);
    aspect-ratio: 1;
    color: var(--text-color);
    gap: grid(4);
    text-align: center;
  }

  h1 {
    font-size: 28px;
    text-transform: uppercase;

    @include breakpoint(md) {
      font-size: 36px;
    }

    @include breakpoint(xl) {
      font-size: 42px;
    }

    @include breakpoint(xxl) {
      font-size: 50px;
    }
  }

  ul {
    @include flex_center;

    font-size: 14px;
    gap: grid(2);

    @include breakpoint(md) {
      font-size: 20px;
      gap: grid(3);
    }

    @include breakpoint(xl) {
      font-size: 24px;
      gap: grid(4);
    }

    @include breakpoint(xxl) {
      font-size: 32px;
    }
  }

  li {
    align-self: flex-end;
    padding: grid(1) grid(2);
  }

  button {
    border: 0;
    background: 0;
    text-transform: uppercase;
    transition: transform 200ms ease-in-out;

    &:hover {
      transform: scale(1.2);
    }
  }
</style>
