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
  <div class="paper-background" />

  <Stars {animationDuration} pause />

  <div class="content">
    <div class="moon">
      <img class="blend img-moon" src="./images/moon.svg" alt="" />
      <img class="blend img-paper" src="./images/texture.png" alt="" />
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
    min-width: 40%;
    max-width: calc(100% - grid(4));
    padding: grid(10);
    transform: translate(-50%, -50%);
    transition:
      width 600ms,
      top 600ms,
      left 600ms;
    will-change: width, top, left, transform;
  }

  .moon {
    @include flex_center;
    @include absolute_full;

    position: absolute;
    z-index: -1;
    filter: drop-shadow(0 0 50px var(--moon-shine-color));

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
</style>
