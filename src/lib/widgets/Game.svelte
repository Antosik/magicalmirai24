<script lang="ts">
  import type { TransitionConfig } from 'svelte/transition';
  import type { IChar, IChord } from 'textalive-app-api';

  import { getGame, type Char } from '$lib/contexts/game';
  import { getPlayer } from '$lib/contexts/player';
  import { calculateActiveColor, calculateCharYPosition, isIntersecting } from '$lib/utils/game';

  export let playerNode: HTMLElement;
  export let errorNode: HTMLElement;

  const player = getPlayer();
  const game = getGame();

  const maxAmplitude = $player.getMaxVocalAmplitude();

  let c: IChar;
  let chord: IChord;

  let activeColor: Char['color'];

  $player.addListener({
    onTimeUpdate(position) {
      if (!$player.video.firstChar) {
        return;
      }

      const amplitude = $player.getVocalAmplitude(position);
      const currentChord = $player.findChord(position);

      activeColor = calculateActiveColor(activeColor, chord, currentChord);
      chord = currentChord;

      let current = c || $player.video.firstChar;
      while (current && current.startTime < position + 500) {
        if (c !== current) {
          createChar({
            id: `${position}.${current.text}`,
            amplitude,
            color: activeColor,
            text: current.text,
            state: 0,
          });
          c = current;
        }
        current = current.next;
      }
    },
  });

  function createChar(char: Char) {
    game.update(($game) => {
      $game.chars.set(char.id, char);
      return $game;
    });
  }

  function setCharState(charId: Char['id'], state: Char['state']) {
    game.update(($game) => {
      const char = $game.chars.get(charId);
      if (char) {
        char.state = state;
      }
      return $game;
    });
  }

  function flying(charNode: HTMLElement, { duration = 2000 } = {}): TransitionConfig {
    return {
      duration,
      tick: () => {
        if (isIntersecting(playerNode, charNode)) {
          setCharState(charNode.id, 1);
          return;
        }
        if (isIntersecting(errorNode, charNode)) {
          setCharState(charNode.id, -1);
          return;
        }
      },
      css: (t: number) => `right: ${t * 100 * 1.1}%`,
    };
  }
</script>

{#each $game.chars as [id, char] (id)}
  {#if char.state === 0}
    <div
      class="char char--color-{char.color}"
      id={char.id}
      in:flying
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
    transform: translateY(-50%);
    transition: right 200ms ease-in-out;
    will-change: right;
    font-size: 48px;
    user-select: none;

    &--color-1 {
      color: #1e5b64;
    }
    &--color-2 {
      color: #dc2b4d;
    }
    &--color-3 {
      color: #fff;
    }
  }
</style>
