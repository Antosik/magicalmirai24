<script lang="ts">
  import { linear } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  import Stars from '$lib/components/Stars.svelte';
  import BigCloud from '$lib/components/clouds/BigCloud.svelte';
  import LongCloud from '$lib/components/clouds/LongCloud.svelte';
  import SmallCloud from '$lib/components/clouds/SmallCloud.svelte';
  import { DEFAULT_CLOUD_ANIMATION_DURATION } from '$lib/game/constants';

  let animationDuration = DEFAULT_CLOUD_ANIMATION_DURATION;
</script>

<section
  transition:fly={{
    delay: 200,
    duration: 500,
    x: -window.innerWidth,
    opacity: 1,
    easing: linear,
  }}
>
  <Stars {animationDuration} pause />

  <div class="content">
    <div class="moon">
      <img src="./images/moon.svg" alt="" />
    </div>
    <slot />
  </div>

  <SmallCloud {animationDuration} pause />
  <BigCloud {animationDuration} pause />
  <LongCloud {animationDuration} pause />
</section>

<style lang="scss">
  section {
    @include absolute_full;

    background: linear-gradient(to bottom, #020111 10%, #3a3a52 100%);
  }

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
    min-width: 40%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
