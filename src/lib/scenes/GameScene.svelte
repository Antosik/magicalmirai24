<script lang="ts">
  import type { PlayerAppListener, PlayerEventListener } from 'textalive-app-api';

  import { interpolateLab } from 'd3-interpolate';
  import { onDestroy } from 'svelte';
  import { linear } from 'svelte/easing';
  import { tweened } from 'svelte/motion';
  import { fly } from 'svelte/transition';

  import BigCloud from '$lib/components/clouds/BigCloud.svelte';
  import LongCloud from '$lib/components/clouds/LongCloud.svelte';
  import SmallCloud from '$lib/components/clouds/SmallCloud.svelte';
  import { PLAYER_THROTTLE_INTERVAL, getPlayerInstance } from '$lib/contexts/player';
  import { getPlayerPosition } from '$lib/contexts/playerPosition';
  import { SongState, getPlayerState } from '$lib/contexts/playerState';
  import { getSettings } from '$lib/contexts/settings';
  import { DEFAULT_CLOUD_ANIMATION_DURATION } from '$lib/game/constants';
  import { calculateVAColor, calculateCloudAnimationDuration } from '$lib/game/utils';

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
  <div class="va-background" style:--va-color={$vaColor}></div>

  <SmallCloud {animationDuration} {pause} />
  <BigCloud {animationDuration} {pause} />
  <LongCloud {animationDuration} {pause} />

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

  .va-background {
    @include absolute_full;

    background: linear-gradient(to bottom, var(--va-color), transparent);
    will-change: background;
  }
</style>
