<script lang="ts">
  import type { PlayerAppListener, PlayerEventListener } from 'textalive-app-api';

  import { interpolateLab } from 'd3-interpolate';
  import { onDestroy } from 'svelte';
  import { linear } from 'svelte/easing';
  import { tweened } from 'svelte/motion';
  import { fade, fly } from 'svelte/transition';

  import Stars from '$lib/components/Stars.svelte';
  import BigCloud from '$lib/components/clouds/BigCloud.svelte';
  import LongCloud from '$lib/components/clouds/LongCloud.svelte';
  import SmallCloud from '$lib/components/clouds/SmallCloud.svelte';
  import { PLAYER_THROTTLE_INTERVAL, getPlayerInstance } from '$lib/contexts/player';
  import { getPlayerPosition } from '$lib/contexts/playerPosition';
  import { SongState, getPlayerState } from '$lib/contexts/playerState';
  import { getSettings } from '$lib/contexts/settings';
  import SongInfo from '$lib/game/SongInfo.svelte';
  import { DEFAULT_CLOUD_ANIMATION_DURATION } from '$lib/game/constants';
  import { calculateVAColor, calculateCloudAnimationDuration } from '$lib/game/utils';

  let errorNode: HTMLElement;
  let playerNode: HTMLElement;
  let animationDuration = DEFAULT_CLOUD_ANIMATION_DURATION;
  let songProgress = 0;

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

      songProgress = 0;
    },
    onThrottledTimeUpdate(position) {
      const va = player.getValenceArousal(position);
      vaColor.set(calculateVAColor(va));
      songProgress = (position / player.video.duration) * 100;
    },
    onAppMediaChange() {
      animationDuration = DEFAULT_CLOUD_ANIMATION_DURATION;
      songProgress = 0;
      vaColor.set(calculateVAColor(emptyVa));
    },
    onStop() {
      animationDuration = DEFAULT_CLOUD_ANIMATION_DURATION;
      songProgress = 0;
      vaColor.set(calculateVAColor(emptyVa));
    },
  };
  player.addListener(listener);

  $: pause =
    $songState === SongState.PAUSED ||
    $songState === SongState.STOPPED ||
    $songState === SongState.ENDED;
  $: if ($songState === SongState.STOPPED) {
    songProgress = 0;
  }

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

<main
  on:mousemove={handleMouseMove}
  on:touchmove={handleTouchMove}
  transition:fly={{
    delay: 200,
    duration: 500,
    x: -window.innerWidth,
    opacity: 0.5,
    easing: linear,
  }}
>
  <Stars {animationDuration} pause --stars-color={$vaColor} />

  {#if songProgress}
    <div transition:fade class="moon" style:--progress="{songProgress}%"></div>
  {/if}

  <SmallCloud {animationDuration} {pause} />
  <BigCloud {animationDuration} {pause} />
  <LongCloud {animationDuration} {pause} />
  <SongInfo />

  <div bind:this={errorNode} class="error"></div>
  <div bind:this={playerNode} class="player" style:--position="{$playerPosition}px"></div>

  <div class="content">
    <slot {errorNode} {playerNode} />
  </div>
</main>

<style lang="scss">
  :root {
    --long-cloud-height: 16dvh;

    @include breakpoint(md) {
      --long-cloud-height: 18dvh;
    }

    @include breakpoint(xl) {
      --long-cloud-height: 20dvh;
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
    @include absolute_full;

    z-index: $z-index-game;
    width: 100%;
    height: 100%;
    padding-bottom: var(--long-cloud-height);
    transform: translateZ(0);
  }

  .player {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 5%;
    height: 80px;
    aspect-ratio: 1303 / 582;
    filter: drop-shadow(rgb(0 0 0 / 60%) 4px 4px 4px);
    transform: translateY(var(--position, 50%)) translateZ(0);
    will-change: top;

    &::before {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      aspect-ratio: 1339 / 1194;
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

  :global(.webp .player::before) {
    background-image: url('../images/miku.webp');
  }

  :global(.avif .player::before) {
    background-image: url('../images/miku.avif');
  }

  .moon {
    --base-height: 60px;

    position: absolute;
    z-index: $z-index-scene;
    top: calc(var(--height) / 4);
    right: calc(var(--height) / 4);
    width: calc(100% - var(--height) * 6 / 4);
    height: var(--height);
    background-image: url('../images/moon.svg');
    background-position: right center;
    background-repeat: no-repeat;
    background-size: contain;
    filter: drop-shadow(0 0 50px var(--moon-shine-color));
    transform: translateX(calc(var(--progress) * -1));
    transition: transform 1s linear;
    will-change: transform;

    &::before {
      position: absolute;
      z-index: -1;
      top: -100dvh;
      right: -100dvw;
      width: 200dvw;
      height: 200dvh;
      background: radial-gradient(rgb(219 200 97 / 8%), rgb(145 139 105 / 0%));
      content: '';
    }

    @include breakpoint(xs) {
      --height: calc(var(--base-height) * 1.2);
    }

    @include breakpoint(md) {
      --height: calc(var(--base-height) * 1.25);
    }

    @include breakpoint(lg) {
      --height: calc(var(--base-height) * 1.5);
    }

    @include breakpoint(xl) {
      --height: calc(var(--base-height) * 1.75);
    }

    @include breakpoint(xxxl) {
      --height: calc(var(--base-height) * 2);
    }
  }
</style>
