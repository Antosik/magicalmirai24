<!-- @component Help page -->

<script lang="ts">
  import Slider from '$lib/components/Slider.svelte';
  import { getLocale } from '$lib/contexts/locale';
  import { Page, getPage } from '$lib/contexts/page';

  const page = getPage();
  const { i18n } = getLocale();

  $: helpItems = [
    {
      image: 'navigate',
      text: $i18n('Navigate Miku-san with mouse or arrow keys'),
    },
    {
      image: 'area',
      text: $i18n('Miku-san effective area'),
    },
    {
      image: 'lyrics',
      text: $i18n('Help Miku-san to collect all the lyrics'),
    },
    {
      image: 'moon',
      text: $i18n('Position of the moon reflects the progress of the song'),
    },
    {
      image: 'results',
      text: $i18n('Behold your result and have fun together with Miku-san!'),
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

<section>
  <button type="button" on:click={openMainMenu}>
    {$i18n('Main menu')}
  </button>

  <h1>{$i18n('Help')}</h1>

  <div class="content">
    <Slider items={helpItems} let:item>
      <article>
        <picture>
          <source srcset="./images/help/{item.image}.avif" type="image/avif" />
          <source srcset="./images/help/{item.image}.webp" type="image/webp" />
          <img src="./images/help/{item.image}.png" alt="" />
        </picture>
        <p>{item.text}</p>
      </article>
    </Slider>
  </div>
</section>

<style lang="scss">
  section {
    display: flex;
    max-width: calc(100dvw + grid(4));
    max-height: calc(100dvh + grid(4));
    flex-direction: column;
    padding: grid(8) grid(8) 20%;
    aspect-ratio: 1;
    gap: grid(4);
    text-align: center;
  }

  h1 {
    font-size: 28px;
    text-transform: uppercase;
    margin-top: grid(3.75);

    @include breakpoint(md) {
      font-size: 32px;
      margin-top: grid(7.5);
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
    margin: 0 auto;
    background: none;
    font-size: 14px;
    text-transform: uppercase;
    transition: transform 200ms ease-in-out;

    &:hover {
      transform: scale(1.3);
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

  picture {
    min-width: 100px;
    max-width: 50%;
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }

  p {
    font-size: 16px;

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
</style>
