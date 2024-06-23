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
>
  <div class="paper-background" />

  <Stars {animationDuration} pause />

  <div class="content">
    <div class="moon">
      <img class="blend img-moon" src="./images/moon.svg" alt="" />
      <img class="blend img-paper" src="./images/texture.png" alt="" />
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

    background: linear-gradient(to bottom, #020111 10%, #3a3a52 100%);
    overflow: hidden;
  }

  .paper-background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url('../images/texture02.png');
    background-repeat: repeat;
    filter: opacity(35%);
  }

  .content {
    position: absolute;
    z-index: $z-index-scene;
    top: 50%;
    left: 50%;
    width: fit-content;
    min-width: 40vw;
    max-width: calc(100vw + grid(4));
    max-height: calc(100vh + grid(4));
    filter: drop-shadow(0 0 50px var(--moon-shine-color));
    transform: translate(-50%, -50%);

    &::before {
      position: absolute;
      z-index: -1;
      top: 50%;
      left: 50%;
      width: 200vw;
      height: 200vh;
      background: radial-gradient(rgb(219 200 97 / 10%), rgb(145 139 105 / 0%));
      content: '';
      transform: translate(-50%, -50%);
    }
  }

  .moon {
    @include flex_center;
    @include absolute_full;

    position: absolute;
    z-index: -1;

    .img-moon {
      overflow: visible;
      width: 100%;
      aspect-ratio: 1 / 1;
    }

    .img-paper {
      position: absolute;
      width: 100%;
      border-radius: 50%;
      aspect-ratio: 1 / 1;
      object-fit: fill;
    }
  }

  .blend {
    mix-blend-mode: normal;
  }

  .buttons {
    @include flex_center;

    position: absolute;
    top: grid(4);
    right: grid(4);
    gap: grid(1);
  }
</style>
