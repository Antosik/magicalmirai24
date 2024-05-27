<script lang="ts">
  import { getLocale } from '$lib/contexts/locale';
  import { Page, getPage } from '$lib/contexts/page';

  const page = getPage();
  const { i18n } = getLocale();
</script>

<button type="button" on:click={() => ($page = Page.MAIN_PAGE)}>
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

    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: grid(8);
    text-align: center;
    gap: grid(4);
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
  }

  button {
    @include flex_center;

    width: 100%;
    padding: grid(1) grid(4);
    border: none;
    background: none;
    text-transform: uppercase;
    font-size: 14px;

    @include breakpoint(md) {
      font-size: 18px;
    }

    @include breakpoint(xl) {
      font-size: 20px;
    }
  }

  div {
    width: 100%;
    flex: 1;
    padding: grid(2) grid(4);
    overflow-y: auto;
  }
</style>
