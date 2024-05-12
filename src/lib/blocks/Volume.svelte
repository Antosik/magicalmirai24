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
  $unfilled-track-color: #48b8ad;
  $filled-track-color: #1e5b64;
  $thumb-color: #fbdfaf;

  div {
    @include flex_center;

    background: var(--transparent-white-color);
    flex-direction: row-reverse;
    gap: grid(1);
    padding: grid(1);
    transform: rotate(-90deg) translate(0, -100%);
    transform-origin: top right;
  }

  button {
    @include flex_center;

    border: 0;
    background: none;
    color: var(--blue-color);
    transform: rotate(90deg);
  }

  input[type='range'] {
    overflow: hidden;
    appearance: none;
    background-color: $unfilled-track-color;

    &::-webkit-slider-runnable-track {
      height: 10px;
      appearance: none;
      color: $unfilled-track-color;
      margin-top: -1px;
    }

    &::-webkit-slider-thumb {
      width: 10px;
      -webkit-appearance: none;
      height: 10px;
      cursor: ew-resize;
      background: $thumb-color;
      box-shadow: -80px 0 0 80px $filled-track-color;
    }

    &::-moz-range-progress {
      background-color: $filled-track-color;
    }

    &::-moz-range-track {
      background-color: $unfilled-track-color;
    }
  }
</style>
