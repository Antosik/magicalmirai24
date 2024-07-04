<!-- @component Long animated cloud component -->

<script lang="ts">
  import LongCloudPart from './LongCloudPart.svelte';

  /** Animation duration (speed) */
  export let animationDuration: number;
  /** Is the animation paused */
  export let pause = false;
</script>

<div class="cloud cloud--long" class:pause style:--duration="{animationDuration * 20}ms">
  <LongCloudPart />
  <LongCloudPart />
  <LongCloudPart />
</div>

<style lang="scss">
  div {
    @include flex_center;

    position: absolute;
    z-index: $z-index-long-cloud;
    bottom: 0;
    left: 0;
    height: var(--long-cloud-height, 16dvh);
    animation-duration: var(--duration);
    animation-iteration-count: infinite;
    animation-name: movingcloud;
    animation-play-state: running;
    animation-timing-function: linear;
    filter: drop-shadow(20px -17px 3px rgba(0, 0, 0, 0.4));
    gap: 0;
    will-change: transform;

    &.pause {
      animation-play-state: paused;
    }

    @include breakpoint(md) {
      height: var(--long-cloud-height, 16dvh);
    }

    @include breakpoint(xl) {
      height: var(--long-cloud-height, 16dvh);
    }
  }

  @keyframes movingcloud {
    0% {
      transform: translateX(-33%);
    }

    100% {
      transform: translateX(-66%);
    }
  }
</style>
