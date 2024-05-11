<script lang="ts">
  import type { PlayerListener } from 'textalive-app-api';

  import { onDestroy } from 'svelte';
  import { spring } from 'svelte/motion';

  import { getPlayerInstance } from '$lib/contexts/player';
  import { SongState, getPlayerState } from '$lib/contexts/playerState';

  import { DEFAULT_CLOUD_ANIMATION_DURATION } from './constants';
  import { calculateCloudAnimationDuration } from './utils';

  let errorNode: HTMLElement;
  let playerNode: HTMLElement;
  let playerY = spring(window.innerHeight / 2, { stiffness: 0.1 });
  let animationDuration = DEFAULT_CLOUD_ANIMATION_DURATION;

  const { songState } = getPlayerState();
  const player = getPlayerInstance();
  const listener: PlayerListener = {
    onThrottledTimeUpdate(position: number) {
      const beat = player.findBeat(position, { loose: true });
      const duration = calculateCloudAnimationDuration(beat);
      if (duration) {
        animationDuration = duration;
      }
    },
    onAppMediaChange() {
      animationDuration = DEFAULT_CLOUD_ANIMATION_DURATION;
    },
    onStop() {
      animationDuration = DEFAULT_CLOUD_ANIMATION_DURATION;
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
    style:--duration="{animationDuration}ms"
  ></div>
  <div
    class="cloud cloud--scene cloud--scene-second"
    class:pause
    style:--duration="{animationDuration}ms"
  ></div>
  <div class="cloud cloud--big-front" class:pause style:--duration="{animationDuration}ms"></div>

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

      content: '';
      // Border
      border-style: solid;
      border-width: 12px;
      border-top-color: lighten(#4d2600, 20%);
      border-right-color: lighten(#4d2600, 0%);
      border-bottom-color: lighten(#4d2600, 20%);
      border-left-color: lighten(#4d2600, 0%);
      box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.6);
      z-index: 1;
      user-select: none;
      touch-action: none;

      @include breakpoint(md) {
        border-width: 16px;
      }

      @include breakpoint(xl) {
        border-width: 20px;
      }
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

  .player {
    position: absolute;
    z-index: 2;
    left: 100px;
    width: 285px;
    height: 261px;
    background-image: url('../images/miku_draft_2.png');
    background-repeat: no-repeat;
    background-size: cover;
    transform: translateY(-50%) translateZ(0);
  }

  .cloud {
    position: absolute;
    z-index: 0;
    animation-iteration-count: infinite;
    animation-play-state: running;
    animation-timing-function: linear;
    transform: translateZ(0);

    &.pause {
      animation-play-state: paused;
    }

    &--scene {
      animation-name: flyingcloud;
      aspect-ratio: 800 / 450;
      background-image: url('../images/base_cloud_draft.png');
      background-repeat: no-repeat;
      background-size: contain;
      will-change: right;

      &-first {
        top: 20%;
        height: 150px;
        animation-duration: calc(var(--duration) * 1.1);
      }

      &-second {
        top: 60%;
        height: 100px;
        animation-duration: calc(var(--duration) * 0.9);
      }
    }

    &--big-front {
      bottom: grid(4);
      left: 0;
      width: 100%;
      height: 20%;
      animation-duration: var(--duration);
      animation-name: movingcloud;
      background-image: url('../images/base_cloud_draft.png');
      background-size: contain;
      will-change: background-position-x;
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
      background-position-x: 0%;
    }

    100% {
      background-position-x: 200%;
    }
  }
</style>
