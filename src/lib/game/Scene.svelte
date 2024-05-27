<script lang="ts">
  import type { PlayerAppListener, PlayerEventListener } from 'textalive-app-api';

  import { interpolateLab } from 'd3-interpolate';
  import { onDestroy } from 'svelte';
  import { tweened } from 'svelte/motion';

  import { PLAYER_THROTTLE_INTERVAL, getPlayerInstance } from '$lib/contexts/player';
  import { getPlayerPosition } from '$lib/contexts/playerPosition';
  import { SongState, getPlayerState } from '$lib/contexts/playerState';
  import { getSettings } from '$lib/contexts/settings';

  import { DEFAULT_CLOUD_ANIMATION_DURATION } from './constants';
  import { calculateVAColor, calculateCloudAnimationDuration } from './utils';

  let errorNode: HTMLElement;
  let playerNode: HTMLElement;
  let animationDuration = DEFAULT_CLOUD_ANIMATION_DURATION;

  const { songState } = getPlayerState();
  const player = getPlayerInstance();
  const playerPosition = getPlayerPosition();
  const settings = getSettings();

  const emptyVa = { a: 0, v: 0 };
  const vaColor = tweened<string>(calculateVAColor({ a: 0, v: 0 }), {
    duration: PLAYER_THROTTLE_INTERVAL,
    interpolate: interpolateLab,
  });

  const listener: PlayerEventListener & PlayerAppListener = {
    onVideoReady() {
      const duration = calculateCloudAnimationDuration(player.data.songMap.beats);
      if (duration) {
        animationDuration = duration;
      }
    },
    onThrottledTimeUpdate(position) {
      const va = player.getValenceArousal(position);
      vaColor.set(calculateVAColor(va));
    },
    onAppMediaChange() {
      animationDuration = DEFAULT_CLOUD_ANIMATION_DURATION;
      vaColor.set(calculateVAColor(emptyVa));
    },
    onStop() {
      animationDuration = DEFAULT_CLOUD_ANIMATION_DURATION;
      vaColor.set(calculateVAColor(emptyVa));
    },
  };
  player.addListener(listener);

  $: pause = $songState === SongState.PAUSED;

  const handleMouseMove = (e: MouseEvent & { currentTarget: HTMLElement }) => {
    // Skip controls in automode
    if ($settings.autoplay && $songState === SongState.PLAYING) {
      return;
    }

    playerPosition.update(() => e.clientY);
  };
  const handleTouchMove = (e: TouchEvent & { currentTarget: HTMLElement }) => {
    // Skip controls in automode
    if ($settings.autoplay && $songState === SongState.PLAYING) {
      return;
    }

    playerPosition.update(() => e.changedTouches[0].clientY);
  };

  onDestroy(() => player.removeListener(listener));
</script>

<main on:mousemove={handleMouseMove} on:touchmove={handleTouchMove}>
  <div class="va-background" style:--va-color={$vaColor}></div>
  <div
    class="cloud cloud--scene cloud--scene-first"
    class:pause
    style:--duration="{animationDuration}ms"
  ></div>
  <div
    class="cloud cloud--scene cloud--scene-second"
    class:pause
    style:--duration="{animationDuration}ms"
  ></div>
  <div class="cloud cloud--big-front" class:pause style:--duration="{animationDuration}ms"></div>

  <div bind:this={errorNode} class="error"></div>
  <div bind:this={playerNode} class="player" style:top="{$playerPosition}px"></div>

  <div class="content">
    <slot {errorNode} {playerNode} />
  </div>
</main>

<style lang="scss">
  main {
    position: relative;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      $background-gradient-upper 0%,
      $background-gradient-center 20%,
      $background-gradient-lower 100%
    );

    &::before {
      @include absolute_full;

      z-index: $z-index-frame;
      border-width: var(--frame-size);

      // Border
      border-style: solid;
      border-color: color_adjust($frame-color, 20%) $frame-color;
      box-shadow: inset 2px 2px 4px rgb(0 0 0 / 60%);
      content: '';
      touch-action: none;
      user-select: none;
    }
  }

  .error,
  .player {
    user-select: none;
  }

  .error {
    position: absolute;
    top: 0;
    left: -1px;
    width: 2px;
    height: 100%;
    background: transparent;
  }

  .content {
    position: relative;
    z-index: $z-index-game;
    width: 100%;
    height: 100%;
    padding: var(--frame-size);
  }

  .player {
    position: absolute;
    left: 5%;
    height: 80px;
    aspect-ratio: 1303 / 582;
    filter: drop-shadow(rgb(0 0 0 / 60%) 4px 4px 4px);
    transform: translateY(-50%) translateZ(0);
    will-change: top;

    &::before {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      aspect-ratio: 1300 / 1200;
      background-image: url('../images/miku.png');
      background-position: bottom center;
      background-repeat: no-repeat;
      background-size: cover;
      content: '';
    }

    @include breakpoint(md) {
      height: 120px;
    }

    @include breakpoint(xl) {
      height: 160px;
    }
  }

  .cloud {
    position: absolute;
    z-index: $z-index-scene;
    width: 100%;
    animation-iteration-count: infinite;
    animation-play-state: running;
    animation-timing-function: linear;

    &.pause {
      animation-play-state: paused;
    }

    &--scene {
      --base-height: 80px;
      --base-drop: 2px;

      right: -500px;
      animation-name: flyingcloud;
      aspect-ratio: 800 / 450;
      background-position: right center;
      background-repeat: no-repeat;
      background-size: contain;
      filter: drop-shadow(rgb(0 0 0 / 60%) var(--shadow-drop) var(--shadow-drop) 2px);
      will-change: transform;

      &-first {
        --shadow-drop: calc(var(--base-drop) * 1.2);

        top: 20%;
        height: calc(var(--base-height) * 1.2);
        animation-duration: calc(var(--duration) * 1.2);
        background-image: url('../images/cloud_big.svg');
      }

      &-second {
        --shadow-drop: calc(var(--base-drop) * 0.8);

        top: 60%;
        height: calc(var(--base-height) * 0.8);
        animation-duration: calc(var(--duration) * 0.8);
        background-image: url('../images/cloud_small.svg');
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

    &--big-front {
      & {
        left: 0;
        height: 16%;
        bottom: grid(4);
        animation-duration: var(--duration);
        animation-name: movingcloud;

        @include breakpoint(md) {
          height: 18%;
        }

        @include breakpoint(xl) {
          height: 20%;
        }
      }

      &::before,
      &::after {
        position: absolute;
        content: '';
        display: block;
        top: 0;
        height: 100%;
      }

      &::before {
        left: -1600px;
      }

      &::after {
        right: -1600px;
      }

      &,
      &::after,
      &::before {
        width: 1600px;
        background-image: url('../images/cloud_long.svg');
        background-size: cover;
        will-change: transform;
      }
    }
  }

  .va-background {
    @include absolute_full;

    background: linear-gradient(to bottom, var(--va-color), transparent);
    will-change: background;
  }

  @keyframes flyingcloud {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(calc(-500px - 100%));
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
