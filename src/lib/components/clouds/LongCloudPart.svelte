<!-- @component Part of long animated cloud -->

<script lang="ts">
</script>

<div class="cloud cloud--long-part"></div>

<style lang="scss">
  .cloud--long-part {
    height: 100%;
    aspect-ratio: 4795 / 220;
    background-image: url('../images/paper_texture.png');
    background-position: left center;
    background-repeat: repeat-x;
    background-size: contain;
    mask-image: url('../images/cloud_long.svg');
    mask-position: left center;
    mask-repeat: no-repeat;
    mask-size: cover;
    will-change: transform;

    &::after {
      @include absolute_full;

      background-image: url('../images/cloud_long.svg');
      background-position: left center;
      background-repeat: no-repeat;
      background-size: cover;
      content: '';
      mix-blend-mode: overlay;
    }
  }

  :global(.webp .cloud--long-part) {
    background-image: url('../images/paper_texture.webp');
  }

  :global(.avif .cloud--long-part) {
    background-image: url('../images/paper_texture.avif');
  }
</style>
