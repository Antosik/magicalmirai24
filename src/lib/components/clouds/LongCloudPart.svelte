<script lang="ts">
</script>

<div class="cloud cloud--long-part"></div>

<style lang="scss">
  div {
    z-index: $z-index-long-cloud;
    height: 100%;
    aspect-ratio: 4795 / 220;
    background-image: url('../images/texture02.png');
    background-position: left center;
    background-repeat: repeat-x;
    mask-image: url('../images/cloud_long.svg');
    mask-size: cover;
    mask-position: left center;
    mask-repeat: no-repeat;
    filter: drop-shadow(rgb(0 0 0 / 25%) 15px -13px 4px);
    will-change: transform;

    &::after {
      @include absolute_full;

      content: '';
      background-image: url('../images/cloud_long.svg');
      background-size: cover;
      background-position: left center;
      background-repeat: no-repeat;
      mix-blend-mode: overlay;
    }
  }
</style>
