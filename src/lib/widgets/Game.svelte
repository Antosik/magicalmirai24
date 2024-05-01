<script lang="ts">
  import type { TransitionConfig } from 'svelte/transition';
  import type { IChar } from 'textalive-app-api';

  import { getGame, type Char } from '$lib/contexts/game';
  import { getPlayer } from '$lib/contexts/player';
  import { isIntersecting } from '$lib/utils/game';

  export let playerNode: HTMLElement;
  export let errorNode: HTMLElement;

  const player = getPlayer();
  const game = getGame();

  let c: IChar;

  $: console.log(
    'Total',
    $game.chars.size,
    'Catched',
    Array.from($game.chars.values()).filter((a) => a.state === 1).length,
    'Missed',
    Array.from($game.chars.values()).filter((a) => a.state === -1).length,
  );

  $player.addListener({
    onTimeUpdate(position) {
      if (!$player.video.firstChar) {
        return;
      }

      let current = c || $player.video.firstChar;
      while (current && current.startTime < position + 500) {
        if (c !== current) {
          c = current;
          createChar({ id: position.toString(), text: c.text, state: 0 });
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

  function flying(charNode: HTMLElement, { duration = 200 } = {}): TransitionConfig {
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
    <div class="char" id={char.id} in:flying>{char.text}</div>
  {/if}
{/each}

<style lang="scss">
  .char {
    @include flex_center;

    position: absolute;
    top: 50%;
    right: 0%;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    background: lightskyblue;
    border-radius: 50%;
    transition: right 200ms ease-in-out;
  }
</style>
