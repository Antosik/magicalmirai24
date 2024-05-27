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
        return { top: '15%', left: '40%' };
      case Page.HELP:
      case Page.CREDITS:
        return { top: '20%', left: '60%' };
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
    z-index: $z-index-scene;
    position: absolute;
    width: fit-content;
    max-width: calc(100% - grid(4));
    will-change: width, top, left, transform;
    transition:
      width 600ms,
      top 600ms,
      left 600ms;
    padding: grid(10);

    &--start {
      min-width: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, 0);
    }

    &--main_page {
      min-width: 30%;
      top: 50%;
      left: 5%;
      transform: translateX(0) translateY(-50%);
    }

    &--help,
    &--credits {
      min-width: 70%;
      top: 15%;
      left: 15%;
    }
  }

  .moon {
    @include flex_center;
    @include absolute_full;

    z-index: -1;
    position: absolute;

    img {
      width: 100%;
      aspect-ratio: 1 / 1;
      overflow: visible;
    }
  }
</style>
