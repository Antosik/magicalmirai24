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

  <div class="moon moon--{$page.toLowerCase()}">
    <div class="content">
      <slot />
    </div>
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
    font-family: 'Live Savers';
  }

  .moon {
    @include absolute_full;

    z-index: $z-index-scene;
    aspect-ratio: 1/1;

    background-image: url('../images/moon.svg');
    background-position: top center;
    background-repeat: no-repeat;
    background-size: cover;
    max-width: calc(100% - grid(4));
    width: fit-content;
    will-change: width, top, left, transform;
    transition:
      width 600ms,
      top 600ms,
      left 600ms;

    &--start {
      min-width: 50%;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(0);

      .content {
        width: 80%;
        height: 25%;
        padding: grid(10);
        margin: 10% auto 20%;
      }
    }

    &--main_page {
      min-width: 30%;
      top: 50%;
      left: 5%;
      transform: translateX(0) translateY(-50%);

      .content {
        width: 100%;
        height: 100%;
        padding: grid(5);
      }
    }

    &--help,
    &--credits {
      min-width: 70%;
      top: 15%;
      left: 15%;

      .content {
        width: 100%;
        height: 70%;
        padding: grid(10);
      }
    }
  }
</style>
