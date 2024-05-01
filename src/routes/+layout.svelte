<script lang="ts">
  import { initSettingsContext } from '$lib/contexts/settings';
  import Player from '$lib/textalive/TextAlivePlayer.svelte';
  import '../app.scss';

  initSettingsContext();
</script>

<Player let:ready>
  {#if ready}
    <slot />
  {:else}
    Initializing...
  {/if}
</Player>
