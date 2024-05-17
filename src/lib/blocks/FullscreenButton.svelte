<script lang="ts">
  import FeatherIcon from '$lib/components/FeatherIcon.svelte';
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
  <div>
    <button
      type="button"
      title={fullscreenElement ? $i18n('Minimize') : $i18n('Maximize')}
      on:click={toggleFullScreen}
    >
      <FeatherIcon name={fullscreenElement ? 'minimize' : 'maximize'} size="24" />
    </button>
  </div>
{/if}

<style lang="scss">
  div {
    padding: grid(1);
    background: var(--transparent-white-color);
    gap: grid(1);

    &:focus-within {
      background: var(--less-transparent-white-color);
    }
  }

  button {
    @include flex_center;

    border: 0;
    background: none;
    color: var(--blue-color);
    outline: none;
    transform: rotate(90deg);
  }
</style>
