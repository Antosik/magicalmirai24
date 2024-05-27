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
    color: #020111;
    text-align: center;
    gap: grid(2);
  }
</style>
