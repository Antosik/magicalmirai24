<script lang="ts">
  import LongCloudPart from './LongCloudPart.svelte';

  export let animationDuration: number;
  export let pause = false;
</script>

<div class="cloud cloud--long" class:pause style:--duration="{animationDuration * 20}ms">
  <LongCloudPart />
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
    height: var(--long-cloud-height, 16%);
    animation-duration: var(--duration);
    animation-iteration-count: infinite;
    animation-name: movingcloud;
    animation-play-state: running;
    animation-timing-function: linear;
    will-change: transform;

    &.pause {
      animation-play-state: paused;
    }

    @include breakpoint(md) {
      height: var(--long-cloud-height, 18%);
    }

    @include breakpoint(xl) {
      height: var(--long-cloud-height, 20%);
    }
  }

  @keyframes movingcloud {
    0% {
      transform: translateX(-25%);
    }

    100% {
      transform: translateX(-75%);
    }
  }
</style>
