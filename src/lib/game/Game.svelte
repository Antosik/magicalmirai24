<script lang="ts">
  import type { Char } from './types';
  import type { IChar, IChord } from 'textalive-app-api';

  import { createEventDispatcher } from 'svelte';

  import { getGame } from '$lib/contexts/game';
  import { getPlayerInstance } from '$lib/contexts/player';
  import { calculateActiveColor, calculateCharYPosition, isIntersecting } from '$lib/game/utils';

  import { CharState } from './constants';

  export let playerNode: HTMLElement;
  export let errorNode: HTMLElement;
  export let pause: boolean = false;
  export let done: boolean = false;

  const dispatch = createEventDispatcher();

  const player = getPlayerInstance();
  const { chars } = getGame();

  const maxAmplitude = player.getMaxVocalAmplitude();

  let c: IChar;
  let chord: IChord;
  let charNodes: Record<string, HTMLElement> = {};
  let activeColor: Char['color'];

  player.addListener({
    onTimeUpdate(position) {
      if (!player.video.firstChar) {
        return;
      }

      if (position > player.video.endTime) {
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
            color: activeColor,
            text: current.text,
            state: CharState.IN_PROGRESS,
          });
          c = current;
        }
        current = current.next;
      }
    },
  });

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

  requestAnimationFrame(checkIntersections);
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

    requestAnimationFrame(checkIntersections);
  }
</script>

{#each $chars as [id, char] (id)}
  {#if char.state === CharState.IN_PROGRESS}
    <div
      class="char char--color-{char.color}"
      class:playing={!pause}
      id={char.id}
      bind:this={charNodes[char.id]}
      style:top="{calculateCharYPosition(char.amplitude, maxAmplitude)}%"
    >
      {char.text}
    </div>
  {/if}
{/each}

<style lang="scss">
  .char {
    @include flex_center;

    position: absolute;
    right: 0%;
    animation-delay: 100ms;
    animation-duration: 2s;
    animation-iteration-count: 1;
    animation-name: flyingchar;
    animation-play-state: paused;
    animation-timing-function: linear;
    font-size: 48px;
    transform: translateY(-50%) translateZ(0);
    user-select: none;
    will-change: right;

    &--color-dark {
      color: #1e5b64;
    }

    &--color-red {
      color: #dc2b4d;
    }

    &--color-white {
      color: #fff;
    }

    &.playing {
      animation-play-state: running;
    }
  }

  @keyframes flyingchar {
    0% {
      right: 0%;
    }

    100% {
      right: 110%;
    }
  }
</style>
