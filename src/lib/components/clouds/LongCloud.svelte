<script lang="ts">
  export let animationDuration: number;
  export let pause = false;
</script>

<div class="cloud cloud--long" class:pause style:--duration="{animationDuration}ms"></div>

<style lang="scss">
  div {
    position: absolute;
    z-index: $z-index-scene;
    bottom: 0;
    left: 0;
    width: 1600px;
    height: 16%;
    animation-duration: var(--duration);
    animation-iteration-count: infinite;
    animation-name: movingcloud;
    animation-play-state: running;
    animation-timing-function: linear;
    background-image: url('../images/cloud_long.svg');
    background-size: cover;
    filter: drop-shadow(rgb(0 0 0 / 25%) 5px -1px 3px);
    will-change: transform;

    &.pause {
      animation-play-state: paused;
    }

    @include breakpoint(md) {
      height: 18%;
    }

    @include breakpoint(xl) {
      height: 20%;
    }

    // To make animation more stable we need to add pseudoelements before & after the cloud
    &::before,
    &::after {
      position: absolute;
      top: 0;
      display: block;
      width: 1600px;
      height: 100%;
      background-image: url('../images/cloud_long.svg');
      background-size: cover;
      content: '';
      will-change: transform;
    }

    &::before {
      left: -1600px;
    }

    &::after {
      right: -1600px;
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
