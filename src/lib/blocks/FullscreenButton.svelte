<script lang="ts">
  import { getLocale } from '$lib/contexts/locale';

  const { i18n } = getLocale();

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
  <button
    type="button"
    title={fullscreenElement ? $i18n('Minimize') : $i18n('Maximize')}
    on:click={toggleFullScreen}
  >
    <img
      src="../images/{fullscreenElement ? 'minimize' : 'maximize'}.svg"
      alt={fullscreenElement ? $i18n('Minimize') : $i18n('Maximize')}
      width="24"
      height="24"
    />
  </button>
{/if}

<style lang="scss">
  button {
    @include flex_center;

    border: 0;
    background: none;
    outline: none;
    transition: transform 200ms ease-in-out;
    will-change: transform;

    &:hover {
      transform: scale(1.2);
    }

    &:focus {
      filter: drop-shadow(0 0 50px var(--moon-shine-color));
    }
  }
</style>
