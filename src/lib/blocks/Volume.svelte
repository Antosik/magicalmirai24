<script lang="ts">
  import type { FeatherIconNames } from 'feather-icons';

  import FeatherIcon from '$lib/components/FeatherIcon.svelte';

  export let value: number = 100;

  const calculateIcon = (volume: number): FeatherIconNames => {
    if (volume >= 66) {
      return 'volume-2';
    } else if (volume >= 33) {
      return 'volume-1';
    } else if (volume > 0) {
      return 'volume';
    } else {
      return 'volume-x';
    }
  };
</script>

<div>
  <FeatherIcon name={calculateIcon(value)} size="24" />
  <input type="range" min="0" max="100" bind:value />
</div>

<style lang="scss">
  div {
    @include flex_center;

    flex-direction: column;
  }

  input {
    transform: rotate(-90deg) translate(-50%);
  }
</style>
