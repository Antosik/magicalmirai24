<!-- @component Background stars component -->

<script lang="ts">
  /** Animation duration (speed) */
  export let animationDuration: number;
  /** Is the animation paused */
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

    position: relative;
    z-index: $z-index-scene;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  @function multiple-box-shadow($count) {
    $value: '#{random(2000)}px #{random(2000)}px var(--stars-color, rgb(255 255 255 / 50%))';
    @for $i from 2 through $count {
      $value: '#{$value}, #{random(2000)}px #{random(2000)}px var(--stars-color, rgb(255 255 255 / 50%))';
    }
    @return string_unquote($value);
  }

  $shadows-small: multiple-box-shadow(375);
  $shadows-medium: multiple-box-shadow(150);
  $shadows-big: multiple-box-shadow(35);

  .stars {
    position: absolute;
    animation-iteration-count: infinite;
    animation-name: starsflow;
    animation-play-state: running;
    animation-timing-function: linear;
    background: transparent;

    &.pause {
      animation-play-state: paused;
    }

    &--small {
      width: 1px;
      height: 1px;
      animation-duration: calc(var(--duration) * 20);
      box-shadow: $shadows-small;

      &::after {
        position: absolute;
        left: 2000px;
        width: 1px;
        height: 1px;
        box-shadow: $shadows-small;
        content: '';
      }
    }

    &--medium {
      width: 2px;
      height: 2px;
      animation-duration: calc(var(--duration) * 40);
      box-shadow: $shadows-medium;

      &::after {
        position: absolute;
        left: 2000px;
        width: 2px;
        height: 2px;
        box-shadow: $shadows-medium;
        content: '';
      }
    }

    &--big {
      width: 3px;
      height: 3px;
      animation-duration: calc(var(--duration) * 60);
      box-shadow: $shadows-big;

      &::after {
        position: absolute;
        left: 2000px;
        width: 3px;
        height: 3px;
        box-shadow: $shadows-big;
        content: '';
      }
    }
  }

  @keyframes starsflow {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(-2000px);
    }
  }
</style>
