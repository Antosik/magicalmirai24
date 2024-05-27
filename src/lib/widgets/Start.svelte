<script lang="ts">
  import { Page, getPage } from '$lib/contexts/page';

  const page = getPage();

  const openMainPage = () => {
    $page = Page.MAIN_PAGE;
  };
</script>

<svelte:document on:click={openMainPage} on:keydown={openMainPage} />

<div>
  <h1>Miku-san kamishibai</h1>
  <p>Press to start</p>
</div>

<style lang="scss">
  div {
    @include flex_center;

    flex-direction: column;
    color: var(--text-color);
    text-align: center;
    gap: grid(4);
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
  }

  p {
    font-size: 14px;

    @include breakpoint(md) {
      font-size: 20px;
    }

    @include breakpoint(xl) {
      font-size: 26px;
    }
  }
</style>
