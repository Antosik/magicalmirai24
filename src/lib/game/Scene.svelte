<script lang="ts">
  import { spring, tweened } from 'svelte/motion';

  import { getPlayerInstance } from '$lib/contexts/player';
  import { SongState, getPlayerState } from '$lib/contexts/playerState';

  import {
    CLOUD_ANIMATION_DURATION_MULTIPLIER,
    MAX_CLOUD_ANIMATION_DURATION,
    MIN_CLOUD_ANIMATION_DURATION,
  } from './constants';

  let errorNode: HTMLElement;
  let playerNode: HTMLElement;
  let playerY = spring(window.innerHeight / 2, { stiffness: 0.1 });
  let animationDuration = tweened(6000);

  const { songState } = getPlayerState();
  const player = getPlayerInstance();
  player.addListener({
    onThrottledTimeUpdate(position: number) {
      const beat = player.findBeat(position, { loose: true });
      const duration = beat?.duration;
      if (duration) {
        // Don't want to be animation too fast or too slow - pick maximum or minimum if needed
        animationDuration.set(
          Math.max(
            MIN_CLOUD_ANIMATION_DURATION,
            Math.min(duration * CLOUD_ANIMATION_DURATION_MULTIPLIER, MAX_CLOUD_ANIMATION_DURATION),
          ),
        );
      }
    },
  });

  $: pause = $songState === SongState.PAUSED;

  const handleMouseMove = (e: MouseEvent & { currentTarget: HTMLElement }) => {
    $playerY = e.clientY;
  };
  const handleTouchMove = (e: TouchEvent & { currentTarget: HTMLElement }) => {
    $playerY = e.changedTouches[0].clientY;
  };
</script>

<main on:mousemove={handleMouseMove} on:touchmove={handleTouchMove}>
  <div bind:this={errorNode} class="error"></div>
  <div bind:this={playerNode} class="player" style:top="{$playerY}px"></div>

  <div
    class="cloud cloud--scene cloud--scene-first"
    class:pause
    style:--duration="{$animationDuration}ms"
  ></div>
  <div
    class="cloud cloud--scene cloud--scene-second"
    class:pause
    style:--duration="{$animationDuration}ms"
  ></div>
  <div class="cloud cloud--big-front" class:pause style:--duration="{$animationDuration}ms"></div>

  <slot {errorNode} {playerNode} />
</main>

<style lang="scss">
  main {
    width: 100%;
    height: 100%;
    background-color: #00cfc3;
  }

  .error,
  .player {
    user-select: none;
  }

  .error {
    position: fixed;
    top: 0;
    left: -1px;
    width: 2px;
    height: 100%;
    background: transparent;
  }

  .player {
    position: absolute;
    left: 20px;
    width: 100px;
    height: 50px;
    background: #f3d9a8;
    transform: translateY(-50%);
    z-index: 2;
  }

  .cloud {
    position: absolute;
    z-index: 0;
    animation-iteration-count: infinite;
    animation-play-state: running;
    animation-timing-function: linear;

    &.pause {
      animation-play-state: paused;
    }

    &--scene {
      background: rgb(255 255 255 / 50%);
      animation-name: flyingcloud;
      will-change: right;

      &-first {
        animation-duration: calc(var(--duration) * 1.1);
        width: 200px;
        height: 100px;
        top: 20%;
      }

      &-second {
        animation-duration: calc(var(--duration) * 0.9);
        width: 150px;
        height: 80px;
        top: 60%;
      }
    }

    &--big-front {
      background-image: linear-gradient(
        to right,
        rgb(255 255 255 / 50%) 0%,
        white,
        rgb(255 255 255 / 50%) 100%
      );
      background-size: 200% 200%;
      width: 100%;
      height: 20%;
      left: 0;
      bottom: 0;
      animation-name: movingcloud;
      animation-duration: var(--duration);
      will-change: background-position;
    }
  }

  @keyframes flyingcloud {
    0% {
      right: -50%;
    }

    100% {
      right: 150%;
    }
  }

  @keyframes movingcloud {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 100% 0%;
    }
    100% {
      background-position: 200% 0%;
    }
  }
</style>
