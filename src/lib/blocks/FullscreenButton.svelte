<script lang="ts">
  import FeatherIcon from '$lib/components/FeatherIcon.svelte';

  const isFullscreenEnabled =
    document.fullscreenEnabled ||
    document.mozFullscreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.msFullscreenEnabled;

  let fullscreenElement: Element;

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
</script>

<svelte:document bind:fullscreenElement />

{#if isFullscreenEnabled}
  <div>
    <button type="button" on:click={toggleFullScreen}>
      <FeatherIcon name={fullscreenElement ? 'minimize' : 'maximize'} size="24" />
    </button>
  </div>
{/if}

<style lang="scss">
  div {
    padding: grid(1);
    background: var(--transparent-white-color);
    gap: grid(1);
  }

  button {
    @include flex_center;

    border: 0;
    background: none;
    color: var(--blue-color);
    transform: rotate(90deg);
  }
</style>
