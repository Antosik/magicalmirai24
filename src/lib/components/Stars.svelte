<script lang="ts">
  export let animationDuration: number;
  export let pause = false;
</script>

<div style:--duration="{animationDuration}ms">
  <span class="stars stars--small" class:pause></span>
  <span class="stars stars--medium" class:pause></span>
  <span class="stars stars--big" class:pause></span>
</div>

<style lang="scss">
  div {
    @include absolute_full;

    width: 100%;
    height: 100%;
    z-index: $z-index-scene;
    overflow: hidden;
    position: relative;
  }

  @function multiple-box-shadow($count) {
    $value: '#{random(2000)}px #{random(2000)}px var(--stars-color, rgb(255 255 255 / 50%))';
    @for $i from 2 through $count {
      $value: '#{$value}, #{random(2000)}px #{random(2000)}px var(--stars-color, rgb(255 255 255 / 50%))';
    }
    @return unquote($value);
  }

  $shadows-small: multiple-box-shadow(500);
  $shadows-medium: multiple-box-shadow(200);
  $shadows-big: multiple-box-shadow(50);

  .stars {
    position: absolute;
    background: transparent;
    animation-iteration-count: infinite;
    animation-name: starsflow;
    animation-play-state: running;
    animation-timing-function: linear;

    &.pause {
      animation-play-state: paused;
    }

    &--small {
      animation-duration: calc(var(--duration) * 20);
      box-shadow: $shadows-small;
      width: 1px;
      height: 1px;

      &::after {
        content: '';
        position: absolute;
        left: 2000px;
        width: 1px;
        height: 1px;
        box-shadow: $shadows-small;
      }
    }

    &--medium {
      animation-duration: calc(var(--duration) * 40);
      box-shadow: $shadows-medium;
      width: 2px;
      height: 2px;

      &::after {
        content: '';
        position: absolute;
        left: 2000px;
        width: 2px;
        height: 2px;
        box-shadow: $shadows-medium;
      }
    }

    &--big {
      animation-duration: calc(var(--duration) * 60);
      box-shadow: $shadows-big;
      width: 3px;
      height: 3px;

      &::after {
        content: '';
        position: absolute;
        left: 2000px;
        width: 3px;
        height: 3px;
        box-shadow: $shadows-big;
      }
    }
  }

  @keyframes starsflow {
    from {
      transform: translateX(0px);
    }

    to {
      transform: translateX(-2000px);
    }
  }
</style>
