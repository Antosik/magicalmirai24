<script lang="ts">
  import { linear } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  import Stars from '$lib/components/Stars.svelte';
  import BigCloud from '$lib/components/clouds/BigCloud.svelte';
  import LongCloud from '$lib/components/clouds/LongCloud.svelte';
  import SmallCloud from '$lib/components/clouds/SmallCloud.svelte';
  import { Page, getPage } from '$lib/contexts/page';
  import { DEFAULT_CLOUD_ANIMATION_DURATION } from '$lib/game/constants';

  const page = getPage();

  let animationDuration = DEFAULT_CLOUD_ANIMATION_DURATION;

  $: smallPosition = getSmallCloudPosition($page);
  $: bigPosition = getBigCloudPosition($page);

  const getSmallCloudPosition = (page: Page) => {
    switch (page) {
      case Page.MAIN_PAGE:
        return { top: '45%', left: '70%' };
      case Page.HELP:
        return { top: '60%', left: '5%' };
      default:
        return null;
    }
  };

  const getBigCloudPosition = (page: Page) => {
    switch (page) {
      case Page.START:
        return { top: '30%', left: '55%' };
      case Page.MAIN_PAGE:
        return { top: '15%', left: '65%' };
      case Page.HELP:
      case Page.CREDITS:
        return { top: '10%', left: '60%' };
      default:
        return null;
    }
  };
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
  <Stars {animationDuration} />

  <div class="content content--{$page.toLowerCase()}">
    <div class="moon">
      <img src="./images/moon.svg" alt="" />
    </div>
    <slot />
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
    width: fit-content;
    max-width: calc(100% - grid(4));
    padding: grid(10);
    transition:
      width 600ms,
      top 600ms,
      left 600ms;
    will-change: width, top, left, transform;

    &--start {
      top: 50%;
      left: 50%;
      transform: translate(-50%, 0);
    }

    &--main_page {
      top: 50%;
      left: 5%;
      transform: translateX(0) translateY(-50%);
    }

    &--help,
    &--credits {
      top: 50%;
      left: 50%;
      width: calc(100% + grid(10));
      max-width: none;
      max-height: 100%;
      aspect-ratio: 1;
      transform: translateX(-50%) translateY(-50%);

      @include breakpoint(md) {
        width: fit-content;
        width: 70%;
      }
    }
  }

  .moon {
    @include flex_center;
    @include absolute_full;

    position: absolute;
    z-index: -1;
    filter: drop-shadow(0 0 20px var(--moon-color));

    img {
      overflow: visible;
      width: 100%;
      aspect-ratio: 1 / 1;
    }
  }
</style>
