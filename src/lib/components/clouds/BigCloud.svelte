<script lang="ts">
  import { fade } from 'svelte/transition';

  export let animationDuration: number;
  export let pause = false;
  export let placed = false;
</script>

<div
  transition:fade
  class="cloud cloud--big"
  class:pause
  class:placed
  style:--duration="{animationDuration * 2}ms"
></div>

<style lang="scss">
  div {
    --base-height: 60px;

    position: absolute;
    z-index: $z-index-scene;
    top: var(--top, 20%);
    left: var(--left, calc(100% + 500px));
    width: 100%;
    height: calc(var(--base-height) * 1.2);
    animation-duration: calc(var(--duration) * 1.2);
    animation-iteration-count: infinite;
    animation-name: flyingcloud;
    animation-play-state: running;
    animation-timing-function: linear;
    aspect-ratio: 814 / 226;
    background-image: url('../images/cloud_big.svg');
    background-position: left center;
    background-repeat: no-repeat;
    background-size: contain;
    filter: drop-shadow(rgb(0 0 0 / 25%) 5px 15px 3px);
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
