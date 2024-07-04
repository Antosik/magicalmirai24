<!-- @component Small animated cloud component -->

<script lang="ts">
  import { fade } from 'svelte/transition';

  /** Animation duration (speed) */
  export let animationDuration: number;
  /** Is the animation paused */
  export let pause = false;
  /** Is the cloud specifically placed */
  export let placed = false;
</script>

<div
  transition:fade
  class="cloud cloud--small"
  class:pause
  class:placed
  style:--duration="{animationDuration * 2}ms"
>
  <div class="cloud--small__image"></div>
</div>

<style lang="scss">
  .cloud--small {
    --base-height: 60px;

    position: absolute;
    z-index: $z-index-scene;
    top: var(--top, 60%);
    left: var(--left, calc(100% + 500px));
    width: 100%;
    height: calc(var(--base-height) * 0.8);
    animation-duration: calc(var(--duration) * 0.8);
    animation-iteration-count: infinite;
    animation-name: flyingcloud;
    animation-play-state: running;
    animation-timing-function: linear;
    aspect-ratio: 461 / 297;
    filter: drop-shadow(20px -17px 3px rgb(0 0 0 / 40%));
    transition:
      top 400ms,
      left 400ms;
    will-change: transform, top, left;

    &.pause,
    &.placed {
      animation-play-state: paused;
    }

    &.placed {
      --base-height: 75px;

      width: auto;
    }

    @include breakpoint(md) {
      height: calc(var(--base-height) * 1.25);
    }

    @include breakpoint(lg) {
      height: calc(var(--base-height) * 1.5);
    }

    @include breakpoint(xl) {
      height: calc(var(--base-height) * 1.75);
    }

    @include breakpoint(xxxl) {
      height: calc(var(--base-height) * 2);
    }

    &__image {
      width: 100%;
      height: 100%;
      background-image: url('../images/paper_texture.png');
      background-position: left center;
      background-repeat: repeat-x;
      background-size: contain;
      filter: drop-shadow(20px -17px 3px rgb(0 0 0 / 40%));
      mask-image: url('../images/cloud_small.svg');
      mask-position: left center;
      mask-repeat: no-repeat;
      mask-size: contain;
      transform: translateZ(0);

      &::after {
        @include absolute_full;

        background-image: url('../images/cloud_small.svg');
        background-position: left center;
        background-repeat: no-repeat;
        background-size: contain;
        content: '';
        mix-blend-mode: overlay;
      }
    }
  }

  :global(.webp .cloud--small__image) {
    background-image: url('../images/paper_texture.webp');
  }

  :global(.avif .cloud--small__image) {
    background-image: url('../images/paper_texture.avif');
  }

  @keyframes flyingcloud {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(calc(-1000px - 100%));
    }
  }
</style>
