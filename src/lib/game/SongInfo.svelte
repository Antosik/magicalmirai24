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
    right: calc(var(--frame-size) + grid(1));
    bottom: calc(var(--frame-size) + grid(1));
    padding: grid(2) grid(2) grid(2) grid(6);
    background-color: var(--white-color);
    font-size: 12px;
    text-align: right;
  }
</style>
