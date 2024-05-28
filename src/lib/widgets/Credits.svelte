<script lang="ts">
  import { getLocale } from '$lib/contexts/locale';
  import { Page, getPage } from '$lib/contexts/page';

  const page = getPage();
  const { i18n } = getLocale();

  function openMainMenu() {
    $page = Page.MAIN_PAGE;
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      openMainMenu();
    }
  }
</script>

<svelte:document on:keydown={handleKeyDown} />

<button type="button" on:click={openMainMenu}>
  {$i18n('Back to Main menu')}
</button>

<section>
  <h1>{$i18n('Credits')}</h1>

  <div class="content">
    <p>Credits goes here</p>
  </div>
</section>

<style lang="scss">
  section {
    @include flex_center;

    width: 100%;
    height: 100%;
    flex-direction: column;
    padding: grid(8);
    gap: grid(4);
    text-align: center;
  }

  h1 {
    font-size: 28px;
    text-transform: uppercase;

    @include breakpoint(md) {
      font-size: 32px;
    }

    @include breakpoint(xl) {
      font-size: 36px;
    }

    @include breakpoint(xl) {
      font-size: 44px;
    }
  }

  button {
    @include flex_center;

    width: 100%;
    padding: grid(1) grid(4);
    border: none;
    background: none;
    font-size: 14px;
    text-transform: uppercase;

    @include breakpoint(md) {
      font-size: 18px;
    }

    @include breakpoint(xl) {
      font-size: 20px;
    }

    @include breakpoint(xxl) {
      font-size: 24px;
    }
  }

  div {
    width: 100%;
    flex: 1;
    padding: grid(2) grid(4);
    overflow-y: auto;
  }
</style>
