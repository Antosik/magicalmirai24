<script lang="ts">
  import type { Char } from './types';
  import type { IChar, IChord, PlayerEventListener } from 'textalive-app-api';

  import { createEventDispatcher, onDestroy } from 'svelte';

  import { getGame } from '$lib/contexts/game';
  import { getPlayerInstance } from '$lib/contexts/player';
  import { getPlayerPosition } from '$lib/contexts/playerPosition';
  import { getSettings } from '$lib/contexts/settings';
  import { calculateActiveColor, calculateCharYPosition, isIntersecting } from '$lib/game/utils';
  import { convertSpeedToDuration } from '$lib/utils/settings';

  import { CharState } from './constants';

  export let playerNode: HTMLElement;
  export let errorNode: HTMLElement;
  export let pause: boolean = false;
  export let done: boolean = false;

  const dispatch = createEventDispatcher();

  const player = getPlayerInstance();
  const playerPosition = getPlayerPosition();
  const settings = getSettings();
  const { chars, ingame } = getGame();

  const maxAmplitude = player.getMaxVocalAmplitude();

  $: animationDuration = convertSpeedToDuration($settings.speed);

  // In autoplay, we need to set the position of a player to the first available catchable character
  // If there is none - fallback to the center of the window
  $: if ($settings.autoplay) {
    const catchable = $ingame[0];
    if (catchable) {
      const positionInPx = (catchable?.positionY / 100) * window.innerHeight;
      playerPosition.set(positionInPx, { soft: true });
    } else {
      playerPosition.set(window.innerHeight / 2, { soft: true });
    }
  }

  let c: IChar;
  let chord: IChord;
  let charNodes: Record<string, HTMLElement> = {};
  let activeColor: Char['color'];

  const listener: PlayerEventListener = {
    onTimeUpdate(position) {
      if (!player.video.firstChar) {
        return;
      }

      if (position === player.video.duration) {
        return;
      }

      if (position > player.video.duration + animationDuration) {
        dispatch('ended');
        return;
      }

      const amplitude = player.getVocalAmplitude(position);
      const currentChord = player.findChord(position);

      activeColor = calculateActiveColor(activeColor, chord, currentChord);
      chord = currentChord;

      let current = c || player.video.firstChar;
      while (current && current.startTime < position + 500) {
        if (c !== current) {
          createChar({
            id: `${position}.${current.text}`,
            amplitude,
            positionY: calculateCharYPosition(amplitude, maxAmplitude),
            color: activeColor,
            text: current.text,
            state: CharState.IN_PROGRESS,
          });
          c = current;
        }
        current = current.next;
      }
    },
  };
  player.addListener(listener);

  function createChar(char: Char) {
    chars.update(($chars) => {
      $chars.set(char.id, char);
      return $chars;
    });
  }

  function setCharState(charId: Char['id'], state: Char['state']) {
    chars.update(($chars) => {
      const char = $chars.get(charId);
      if (char) {
        char.state = state;
      }
      return $chars;
    });
  }

  let frame: number;
  frame = requestAnimationFrame(checkIntersections);
  function checkIntersections() {
    if (done) {
      return;
    }

    if (!pause) {
      for (const [id, charNode] of Object.entries(charNodes)) {
        if (!charNode) {
          delete charNodes[id];
          continue;
        }
        if (isIntersecting(playerNode, charNode)) {
          setCharState(id, CharState.CATCHED);
          delete charNodes[id];
          continue;
        }
        if (isIntersecting(errorNode, charNode)) {
          setCharState(id, CharState.MISSED);
          delete charNodes[id];
          continue;
        }
      }
    }

    frame = requestAnimationFrame(checkIntersections);
  }

  onDestroy(() => {
    player.removeListener(listener);
    if (frame) {
      cancelAnimationFrame(frame);
    }
  });
</script>

{#each $chars as [id, char] (id)}
  {#if char.state === CharState.IN_PROGRESS}
    <div
      class="char char--color-{char.color}"
      class:playing={!pause}
      id={char.id}
      bind:this={charNodes[char.id]}
      style:top="{char.positionY}%"
      style:--duration="{animationDuration}ms"
    >
      {char.text}
    </div>
  {/if}
{/each}

<style lang="scss">
  .char {
    @include flex_center;

    font-family: 'Mochiy Pop One', sans-serif;
    position: absolute;
    right: -100%;
    width: 100%;
    justify-content: left;
    animation-delay: 100ms;
    animation-duration: var(--duration);
    animation-iteration-count: 1;
    animation-name: flyingchar;
    animation-play-state: paused;
    animation-timing-function: linear;
    font-size: 48px;
    text-align: left;
    user-select: none;
    will-change: transform;

    &--color-dark {
      color: var(--blue-color);
    }

    &--color-red {
      color: var(--red-color);
    }

    &--color-white {
      color: var(--white-color);
    }

    &.playing {
      animation-play-state: running;
    }
  }

  @keyframes flyingchar {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(calc(-500px - 100%));
    }
  }
</style>
