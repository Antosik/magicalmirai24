<script lang="ts">
  import { initSettings } from '$lib/contexts/settings';
  import Player from '$lib/textalive/TextAlivePlayer.svelte';
  import '../app.scss';

  initSettings();
</script>

<Player let:ready>
  {#if ready}
    <slot />
  {:else}
    Initializing...
  {/if}
</Player>
