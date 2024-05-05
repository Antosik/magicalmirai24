<script lang="ts">
  import type { PlayerListener } from 'textalive-app-api';

  import { onDestroy } from 'svelte';
  import { spring, tweened } from 'svelte/motion';

  import { getPlayerInstance } from '$lib/contexts/player';
  import { SongState, getPlayerState } from '$lib/contexts/playerState';

  import { DEFAULT_CLOUD_ANIMATION_DURATION } from './constants';
  import { calculateCloudAnimationDuration } from './utils';

  let errorNode: HTMLElement;
  let playerNode: HTMLElement;
  let playerY = spring(window.innerHeight / 2, { stiffness: 0.1 });
  let animationDuration = tweened(DEFAULT_CLOUD_ANIMATION_DURATION);

  const { songState } = getPlayerState();
  const player = getPlayerInstance();
  const listener: PlayerListener = {
    onThrottledTimeUpdate(position: number) {
      const beat = player.findBeat(position, { loose: true });
      const duration = calculateCloudAnimationDuration(beat);
      if (duration) {
        animationDuration.set(duration);
      }
    },
    onAppMediaChange() {
      animationDuration.set(DEFAULT_CLOUD_ANIMATION_DURATION);
    },
    onStop() {
      animationDuration.set(DEFAULT_CLOUD_ANIMATION_DURATION);
    },
  };
  player.addListener(listener);

  $: pause = $songState === SongState.PAUSED;

  const handleMouseMove = (e: MouseEvent & { currentTarget: HTMLElement }) => {
    $playerY = e.clientY;
  };
  const handleTouchMove = (e: TouchEvent & { currentTarget: HTMLElement }) => {
    $playerY = e.changedTouches[0].clientY;
  };

  onDestroy(() => player.removeListener(listener));
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
    z-index: 2;
    left: 20px;
    width: 100px;
    height: 50px;
    background: #f3d9a8;
    transform: translateY(-50%);
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
      animation-name: flyingcloud;
      background: rgb(255 255 255 / 50%);
      will-change: right;

      &-first {
        top: 20%;
        width: 200px;
        height: 100px;
        animation-duration: calc(var(--duration) * 1.1);
      }

      &-second {
        top: 60%;
        width: 150px;
        height: 80px;
        animation-duration: calc(var(--duration) * 0.9);
      }
    }

    &--big-front {
      bottom: 0;
      left: 0;
      width: 100%;
      height: 20%;
      animation-duration: var(--duration);
      animation-name: movingcloud;
      background-image: linear-gradient(
        to right,
        rgb(255 255 255 / 50%) 0%,
        white,
        rgb(255 255 255 / 50%) 100%
      );
      background-size: 200% 200%;
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
