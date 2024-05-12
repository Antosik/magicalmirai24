<script lang="ts">
  import type { PlayerListener } from 'textalive-app-api';

  import { onDestroy } from 'svelte';

  import { getPlayerInstance } from '$lib/contexts/player';
  import { getPlayerPosition } from '$lib/contexts/playerPosition';
  import { SongState, getPlayerState } from '$lib/contexts/playerState';

  import { DEFAULT_CLOUD_ANIMATION_DURATION } from './constants';
  import { calculateCloudAnimationDuration } from './utils';

  let errorNode: HTMLElement;
  let playerNode: HTMLElement;
  let animationDuration = DEFAULT_CLOUD_ANIMATION_DURATION;

  const { songState } = getPlayerState();
  const player = getPlayerInstance();
  const playerPosition = getPlayerPosition();
  const listener: PlayerListener = {
    onVideoReady() {
      const duration = calculateCloudAnimationDuration(player.data.songMap.beats);
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
    playerPosition.update(() => e.clientY);
  };
  const handleTouchMove = (e: TouchEvent & { currentTarget: HTMLElement }) => {
    playerPosition.update(() => e.changedTouches[0].clientY);
  };

  onDestroy(() => player.removeListener(listener));
</script>

<main on:mousemove={handleMouseMove} on:touchmove={handleTouchMove}>
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

      content: '';
      // Border
      border-style: solid;
      border-width: var(--frame-size);
      border-top-color: lighten(#4d2600, 20%);
      border-right-color: lighten(#4d2600, 0%);
      border-bottom-color: lighten(#4d2600, 20%);
      border-left-color: lighten(#4d2600, 0%);
      box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.6);
      z-index: $z-index-frame;
      user-select: none;
      touch-action: none;
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
    width: 100%;
    height: 100%;
    padding: var(--frame-size);
    z-index: $z-index-game;
  }

  .player {
    position: absolute;
    left: 5%;
    height: 80px;
    transform: translateY(-50%) translateZ(0);
    aspect-ratio: 1303 / 582;
    filter: drop-shadow(rgb(0 0 0 / 60%) 4px 4px 4px);
    will-change: top;

    &::before {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      aspect-ratio: 1300 / 1200;
      content: '';
      background-image: url('../images/miku_draft_2.png');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: bottom center;
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
    animation-iteration-count: infinite;
    animation-play-state: running;
    animation-timing-function: linear;
    width: 100%;

    &.pause {
      animation-play-state: paused;
    }

    &--scene {
      --base-height: 80px;
      --base-drop: 2px;

      animation-name: flyingcloud;
      aspect-ratio: 800 / 450;
      background-image: url('../images/base_cloud_draft.png');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: right center;
      will-change: transform;
      right: -500px;
      filter: drop-shadow(rgb(0 0 0 / 60%) var(--shadow-drop) var(--shadow-drop) 2px);

      &-first {
        --shadow-drop: calc(var(--base-drop) * 1.2);
        top: 20%;
        height: calc(var(--base-height) * 1.2);
        animation-duration: calc(var(--duration) * 1.2);
      }

      &-second {
        --shadow-drop: calc(var(--base-drop) * 0.8);
        top: 60%;
        height: calc(var(--base-height) * 0.8);
        animation-duration: calc(var(--duration) * 0.8);
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
      bottom: grid(4);
      left: 0;
      width: 400%;
      height: 16%;
      animation-duration: var(--duration);
      animation-name: movingcloud;
      background-image: url('../images/base_cloud_draft.png');
      background-size: contain;
      will-change: transform;

      @include breakpoint(md) {
        height: 18%;
      }

      @include breakpoint(xl) {
        height: 20%;
      }
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

  @keyframes movingcloud {
    0% {
      transform: translateX(0%);
    }

    100% {
      transform: translateX(-75%);
    }
  }
</style>
