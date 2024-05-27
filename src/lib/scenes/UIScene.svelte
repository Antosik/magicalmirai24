<script lang="ts">
  import { linear } from 'svelte/easing';
  import { fly } from 'svelte/transition';

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
  {#if smallPosition}
    <SmallCloud {animationDuration} placed --top={smallPosition.top} --left={smallPosition.left} />
  {/if}

  {#if bigPosition}
    <BigCloud {animationDuration} placed --top={bigPosition.top} --left={bigPosition.left} />
  {/if}

  <LongCloud {animationDuration} />

  <div class="content">
    <slot />
  </div>
</main>

<style lang="scss">
  main {
    position: relative;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      $background-gradient-upper 0%,
      $background-gradient-center 20%,
      $background-gradient-lower 100%
    );
  }
</style>
