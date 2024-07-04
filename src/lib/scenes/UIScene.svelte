<script lang="ts">
  import { linear } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  import FullscreenButton from '$lib/blocks/FullscreenButton.svelte';
  import Stars from '$lib/components/Stars.svelte';
  import BigCloud from '$lib/components/clouds/BigCloud.svelte';
  import LongCloud from '$lib/components/clouds/LongCloud.svelte';
  import SmallCloud from '$lib/components/clouds/SmallCloud.svelte';
  import { Page, getPage } from '$lib/contexts/page';
  import { DEFAULT_CLOUD_ANIMATION_DURATION } from '$lib/game/constants';

  const page = getPage();

  let animationDuration = DEFAULT_CLOUD_ANIMATION_DURATION;

  let contentWrapper: HTMLDivElement;

  page.subscribe(() => {
    contentWrapper?.classList.add('transitionLive');
    const timer = setTimeout(() => contentWrapper?.classList.remove('transitionLive'), 1e3);
    return () => timer && clearTimeout(timer);
  });

  $: smallPosition = getSmallCloudPosition($page);
  $: bigPosition = getBigCloudPosition($page);

  const getSmallCloudPosition = (page: Page) => {
    switch (page) {
      case Page.MAIN_PAGE:
        return { top: '50%', left: '70%' };
      case Page.HELP:
        return { top: '60%', left: '5%' };
      default:
        return null;
    }
  };

  const getBigCloudPosition = (page: Page) => {
    switch (page) {
      case Page.START:
        return { top: '20%', left: '55%' };
      case Page.MAIN_PAGE:
        return { top: '15%', left: '65%' };
      case Page.HELP:
      case Page.CREDITS:
        return { top: '10%', left: '60%' };
      default:
        return null;
    }
  };

  function handleTransitionStart(e: TransitionEvent & { currentTarget: HTMLDivElement }) {
    if (e.target === e.currentTarget) {
      contentWrapper?.classList.add('transitionLive');
    }
  }

  function handleTransitionEnd(e: TransitionEvent & { currentTarget: HTMLDivElement }) {
    if (e.target === e.currentTarget) {
      contentWrapper?.classList.remove('transitionLive');
    }
  }
</script>

<main
  in:fly={{
    delay: 200,
    duration: 500,
    x: -window.innerWidth,
    opacity: 0.5,
    easing: linear,
  }}
>
  <Stars {animationDuration} pause />

  <div
    class="content content--{$page.toLowerCase()}"
    on:transitionstart={handleTransitionStart}
    on:transitionrun={handleTransitionStart}
    on:transitioncancel={handleTransitionEnd}
    on:transitionend={handleTransitionEnd}
  >
    <div class="moon">
      <img class="blend img-moon" src="./images/moon.svg" alt="" />
      <picture class="img-paper">
        <source srcset="./images/moon_texture.avif" type="image/avif" />
        <source srcset="./images/moon_texture.webp" type="image/webp" />
        <img class="blend img-paper" src="./images/moon_texture.png" alt="" />
      </picture>
    </div>
    <div class="content-wrapper" bind:this={contentWrapper}>
      <slot />
    </div>
  </div>

  <div class="buttons">
    <FullscreenButton />
  </div>

  {#if smallPosition}
    <SmallCloud {animationDuration} placed --top={smallPosition.top} --left={smallPosition.left} />
  {/if}

  {#if bigPosition}
    <BigCloud {animationDuration} placed --top={bigPosition.top} --left={bigPosition.left} />
  {/if}

  <LongCloud {animationDuration} />
</main>

<style lang="scss">
  .content {
    position: absolute;
    z-index: $z-index-scene;
    top: 50%;
    left: 50%;
    width: fit-content;
    max-width: calc(100dvw + grid(4));
    max-height: calc(100dvh + grid(4));
    transform: translate(-50%, -50%);
    transition:
      width 1s,
      top 1s,
      left 1s;
    will-change: width, top, left, transform;

    &--start {
      @media (height >= 768px) {
        top: 70%;
      }
    }

    &--main_page {
      @include breakpoint(lg) {
        left: 25%;
      }
    }

    &::before {
      position: absolute;
      z-index: -1;
      top: 50%;
      left: 50%;
      width: 200dvw;
      height: 200dvh;
      background: radial-gradient(
        circle at 50% 50%,
        rgb(255 193 0) -100%,
        rgb(212 190 0 / 5%) 35%,
        rgb(238 130 238 / 0%) 100%
      );
      content: '';
      transform: translate(-50%, -50%);
    }
  }

  .moon {
    @include flex_center;
    @include absolute_full;

    z-index: -1;

    .img-moon {
      overflow: visible;
      height: 100%;
      aspect-ratio: 1 / 1;
    }

    .img-paper {
      position: absolute;
      height: 100%;
      border-radius: 50%;
      aspect-ratio: 1 / 1;
      object-fit: fill;
    }
  }

  // moon blend
  .blend {
    mix-blend-mode: luminosity;
  }

  .content-wrapper {
    &.transitionLive {
      opacity: 0;
    }
  }

  .buttons {
    @include flex_center;

    position: absolute;
    top: grid(4);
    right: grid(4);
    gap: grid(1);
  }
</style>
