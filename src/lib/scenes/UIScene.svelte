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
  let transitionLive = false;

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
      transitionLive = true;
    }
  }

  function handleTransitionEnd(e: TransitionEvent & { currentTarget: HTMLDivElement }) {
    if (e.target === e.currentTarget) {
      transitionLive = false;
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
  <div class="paper-background" />

  <Stars {animationDuration} />

  <div
    class="content content--{$page.toLowerCase()}"
    on:transitionstart={handleTransitionStart}
    on:transitionrun={handleTransitionStart}
    on:transitioncancel={handleTransitionEnd}
    on:transitionend={handleTransitionEnd}
  >
    <div class="moon" class:transitionLive>
      <img class="blend img-moon" src="./images/moon.svg" alt="" />
      <img class="blend img-paper" src="./images/texture.png" alt="" />
    </div>
    <div class="content-wrapper" class:transitionLive>
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
  .paper-background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url('../images/texture02.png');
    background-repeat: repeat;
    filter: opacity(25%);
  }

  .content {
    position: absolute;
    z-index: $z-index-scene;
    top: 50%;
    left: 50%;
    width: fit-content;
    max-width: calc(100dvw + grid(4));
    max-height: calc(100dvh + grid(4));
    filter: drop-shadow(0 0 50px var(--moon-shine-color));
    transform: translate(-50%, -50%);
    transition:
      width 1s,
      top 1s,
      left 1s;
    will-change: width, top, left, transform;

    &--start {
      @media (min-height: 768px) {
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
      background: radial-gradient(rgb(219 200 97 / 10%), rgb(145 139 105 / 0%));
      content: '';
      transform: translate(-50%, -50%);
    }
  }

  .moon {
    @include flex_center;
    @include absolute_full;

    z-index: -1;

    &.transitionLive {
      z-index: $z-index-game;
    }

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

  .blend {
    mix-blend-mode: normal;
  }

  .content-wrapper {
    display: contents;

    &.transitionLive {
      visibility: hidden;
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
