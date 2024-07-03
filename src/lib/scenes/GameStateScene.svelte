<script lang="ts">
  import { linear } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  import FullscreenButton from '$lib/blocks/FullscreenButton.svelte';
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
  class="combine"
>
  <div class="paper-background combine" />

  <Stars {animationDuration} pause />

  <div class="content">
    <div class="moon">
      <img class="blend img-moon" src="./images/moon.svg" alt="" />
      <picture class="img-paper">
        <source srcset="./images/moon_texture.avif" type="image/avif" />
        <source srcset="./images/moon_texture.webp" type="image/webp" />
        <img class="blend img-paper" src="./images/moon_texture.png" alt="" />
      </picture>
    </div>
    <slot />
  </div>

  <div class="buttons">
    <FullscreenButton />
  </div>

  <SmallCloud {animationDuration} pause />
  <BigCloud {animationDuration} pause />
  <LongCloud {animationDuration} pause />
</section>

<style lang="scss">
  section {
    @include absolute_full;

    overflow: hidden;
    background-color: $color-bg;
  }

  .content {
    position: absolute;
    z-index: $z-index-scene;
    top: 50%;
    left: 50%;
    width: fit-content;
    max-width: calc(100dvw + grid(4));
    max-height: calc(100dvh + grid(4));
    transform: translate(-50%, -50%);

    &::before {
      position: absolute;
      z-index: -1;
      top: 50%;
      left: 50%;
      width: 200dvw;
      height: 200dvh;
      background: radial-gradient(
        circle at 50% 50%,
        rgb(255, 193, 0) -100%,
        rgba(212, 190, 0, 0.05) 35%,
        rgba(238, 130, 238, 0) 100%
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

  // moon texture
  .blend {
    mix-blend-mode: luminosity;
  }

  .buttons {
    @include flex_center;

    position: absolute;
    top: grid(4);
    right: grid(4);
    gap: grid(1);
  }
</style>
