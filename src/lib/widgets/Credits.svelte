<!-- @component Credits page -->

<script lang="ts">
  import Slider from '$lib/components/Slider.svelte';
  import { getLocale } from '$lib/contexts/locale';
  import { Page, getPage } from '$lib/contexts/page';

  import Team from './credits/Team.svelte';
  import Technologies from './credits/Technologies.svelte';

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

<section>
  <button type="button" on:click={openMainMenu}>
    {$i18n('Main menu')}
  </button>

  <h1>{$i18n('Credits')}</h1>

  <div class="content">
    <picture>
      <source srcset="./images/credits.avif" type="image/avif" />
      <source srcset="./images/credits.webp" type="image/webp" />
      <img src="./images/credits.png" alt="" />
    </picture>
    <Slider>
      <svelte:fragment slot="raw">
        <li>
          <Team />
        </li>
        <li>
          <Technologies />
        </li>
      </svelte:fragment>
    </Slider>
  </div>
</section>

<style lang="scss">
  section {
    display: flex;
    max-width: calc(100dvw + grid(4));
    max-height: calc(100dvh + grid(4));
    flex-direction: column;
    padding: grid(8);
    aspect-ratio: 1;
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

    padding: grid(1) grid(4);
    border: none;
    border-bottom: 1px solid transparent;
    margin: 0 auto;
    background: none;
    font-size: 14px;
    text-transform: uppercase;
    transition: border-bottom 200ms ease-in-out;

    &:hover {
      border-bottom: 1px solid var(--text-color);
    }

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
    @include flex_center;

    width: 100%;
    height: calc(100% - 15%);
    padding-bottom: 15%;
    gap: grid(2);
  }

  li {
    display: flex;
    overflow: auto;
    width: 100%;
    height: 100%;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 0;
    align-items: center;
    scroll-snap-align: center;
    scroll-snap-stop: always;

    @include breakpoint(lg) {
      justify-content: center;
    }
  }

  picture {
    display: none;
    min-width: 100px;
    max-width: 30%;

    @include breakpoint(lg) {
      display: block;
    }
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }
</style>
