<script lang="ts">
  export let animationDuration: number;
  export let pause = false;
</script>

<div class="cloud cloud--big" class:pause style:--duration="{animationDuration}ms"></div>

<style lang="scss">
  div {
    --base-height: 80px;

    position: absolute;
    z-index: $z-index-scene;
    top: 20%;
    right: -500px;
    width: 100%;
    height: calc(var(--base-height) * 1.2);
    animation-duration: calc(var(--duration) * 1.2);
    animation-iteration-count: infinite;
    animation-name: flyingcloud;
    animation-play-state: running;
    animation-timing-function: linear;
    aspect-ratio: 800 / 450;
    background-image: url('../images/cloud_big.svg');
    background-position: right center;
    background-repeat: no-repeat;
    background-size: contain;
    filter: drop-shadow(rgb(0 0 0 / 25%) 5px 15px 3px);
    will-change: transform;

    &.pause {
      animation-play-state: paused;
    }

    @include breakpoint(md) {
      --base-height: 100px;
    }

    @include breakpoint(lg) {
      --base-height: 120px;
    }

    @include breakpoint(xl) {
      --base-height: 140px;
    }
  }

  @keyframes flyingcloud {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(calc(-500px - 100%));
    }
  }
</style>
