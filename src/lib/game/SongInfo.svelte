<!-- @component Song info block on game page -->

<script lang="ts">
  import { getPlayerState } from '$lib/contexts/playerState';

  const { songInfo } = getPlayerState();
</script>

{#if $songInfo.artist && $songInfo.title}
  <div>
    {$songInfo.artist} - {$songInfo.title}
  </div>
{/if}

<style lang="scss">
  div {
    position: absolute;
    z-index: $z-index-menu;
    right: grid(4);
    bottom: grid(4);
    padding: grid(2) grid(2) grid(2) grid(6);
    background-color: var(--moon-color);
    font-size: 12px;
    text-align: right;
  }
</style>
