<!-- @component Help page -->

<script lang="ts">
  import Slider from '$lib/components/Slider.svelte';
  import { getLocale } from '$lib/contexts/locale';
  import { Page, getPage } from '$lib/contexts/page';

  const page = getPage();
  const { i18n } = getLocale();

  const helpItems = [
    {
      image: 'miku',
      text: 'Navigate Miku-san with mouse move or keys',
    },
    {
      image: 'miku',
      text: 'Navigate Miku-san with mouse move or keys',
    },
    {
      image: 'miku',
      text: 'Navigate Miku-san with mouse move or keys',
    },
    {
      image: 'miku',
      text: 'Navigate Miku-san with mouse move or keys',
    },
    {
      image: 'miku',
      text: 'Navigate Miku-san with mouse move or keys',
    },
  ];

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
  <h1>{$i18n('Help')}</h1>

  <div class="content">
    <Slider items={helpItems}>
      <article>
        <img src="../images/miku.png" alt="" />
        <p>Navigate Miku-san with mouse move or keys</p>
      </article>
    </Slider>
  </div>
</section>

<style lang="scss">
  section {
    display: flex;
    flex-direction: column;
    padding: grid(8) grid(8) 20%;
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

    @include breakpoint(xxl) {
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
      font-size: 28px;
    }
  }

  div {
    @include flex_vcenter;

    width: 100%;
    flex: 1;
    padding: grid(2) grid(4);
  }

  article {
    @include flex_center;

    width: 100%;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 0;
    gap: grid(2);
  }

  img {
    min-width: 100px;
    max-width: 50%;
  }
</style>
