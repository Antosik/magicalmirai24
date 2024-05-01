<script lang="ts">
  import { getPlayer } from '$lib/contexts/player';

  const player = getPlayer();

  let title = '';
  let artist = '';

  $player.addListener({
    onVideoReady() {
      title = $player.data.song.name;
      artist = $player.data.song.artist.name;
    },
  });
</script>

<div>
  {artist} - {title}
</div>

<style lang="scss">
  div {
    position: absolute;
    right: grid(4);
    bottom: grid(4);
    padding: grid(2) grid(2) grid(2) grid(6);
    text-align: right;
    font-size: 12px;
    background-color: #fff;
  }
</style>
