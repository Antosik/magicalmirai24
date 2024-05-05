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
    z-index: 5;
    right: grid(4);
    bottom: grid(4);
    padding: grid(2) grid(2) grid(2) grid(6);
    background-color: #fff;
    font-size: 12px;
    text-align: right;
  }
</style>
