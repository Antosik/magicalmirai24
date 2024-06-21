<script lang="ts">
  export let animationDuration: number;
  export let pause = false;
</script>

<div class="cloud cloud--long" class:pause style:--duration="{animationDuration * 20}ms"></div>

<style lang="scss">
  div {
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
    aspect-ratio: 4795 / 220;
    background-image: url('../images/cloud_long.svg');
    background-size: cover;
    filter: drop-shadow(rgb(0 0 0 / 25%) 15px -13px 4px);
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

    // To make animation more stable we need to add pseudoelements before & after the cloud
    &::before,
    &::after {
      position: absolute;
      top: 0;
      display: block;
      width: 100%;
      height: 100%;
      background-image: url('../images/cloud_long.svg');
      background-size: cover;
      content: '';
      will-change: transform;
    }

    &::before {
      transform: translateX(-100%);
    }

    &::after {
      transform: translateX(100%);
    }
  }

  @keyframes movingcloud {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(-100%);
    }
  }
</style>
