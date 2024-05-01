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
  const handleTouchMove = (e: TouchEvent & { currentTarget: HTMLElement }) => {
    $playerY = e.changedTouches[0].clientY;
  };

  onMount(() => {
    sceneReady = true;
  });
</script>

<main on:mousemove={handleMouseMove} on:touchmove={handleTouchMove}>
  <div bind:this={errorNode} class="error"></div>
  <div bind:this={playerNode} class="player" style:top="{$playerY}px"></div>

  <slot ready={sceneReady} />
</main>

<style>
  .error {
    position: fixed;
    top: 0;
    left: -2px;
    width: 2px;
    height: 100%;
    background: red;
  }

  .player {
    position: absolute;
    left: 20px;
    width: 100px;
    height: 50px;
    background: lightskyblue;
  }
</style>
