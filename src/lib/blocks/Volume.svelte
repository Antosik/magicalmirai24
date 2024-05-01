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

  const handleButtonClick = () => {
    value = value > 0 ? 0 : 100;
  };
</script>

<div>
  <button type="button" on:click={handleButtonClick}>
    <FeatherIcon name={calculateIcon(value)} size="24" />
  </button>
  <input type="range" min="0" max="100" bind:value />
</div>

<style lang="scss">
  div {
    @include flex_center;

    width: 24px;
    flex-direction: column;
    gap: grid(1);
  }

  button {
    @include flex_center;

    background: none;
    border: 0;
    color: #1e5b64;
  }

  input {
    transform: rotate(-90deg) translate(-50%);
  }
</style>
