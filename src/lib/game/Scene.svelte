<script lang="ts">
  import { onMount } from 'svelte';
  import { spring } from 'svelte/motion';

  let sceneReady = false;

  let errorNode: HTMLElement;
  let playerNode: HTMLElement;
  let playerY = spring(0, { stiffness: 0.1 });

  const handleMouseMove = (e: MouseEvent & { currentTarget: HTMLElement }) => {
    $playerY = e.clientY;
  };

  onMount(() => {
    sceneReady = true;
  });
</script>

<main on:mousemove={handleMouseMove}>
  <div bind:this={errorNode} class="error"></div>
  <div bind:this={playerNode} class="player" style:top="{$playerY}px"></div>

  {#if sceneReady}
    <slot />
  {:else}
    Launching...
  {/if}
</main>

<style>
  .error {
    position: fixed;
    width: 2px;
    height: 100%;
    background: red;
    left: -2px;
    top: 0;
  }

  .player {
    position: absolute;
    width: 100px;
    height: 50px;
    background: lightskyblue;
    left: 20px;
  }
</style>
