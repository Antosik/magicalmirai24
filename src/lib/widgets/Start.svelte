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

    flex-direction: column;
    aspect-ratio: 1;
    color: var(--text-color);
    gap: grid(4);
    text-align: center;
    padding: grid(10);
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

    @include breakpoint(md) {
      font-size: 20px;
    }

    @include breakpoint(xl) {
      font-size: 24px;
    }

    @include breakpoint(xxl) {
      font-size: 32px;
    }
  }

  li {
    padding: grid(1) grid(2);
  }

  button {
    border: 0;
    border-bottom: 1px solid transparent;
    background: 0;
    text-transform: uppercase;
    transition: border-bottom 200ms ease-in-out;

    &.active,
    &:hover {
      border-bottom: 1px solid var(--text-color);
    }
  }
</style>
