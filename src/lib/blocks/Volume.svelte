<script lang="ts">
  export let value: number = 100;

  const handleButtonClick = () => {
    value = value > 0 ? 0 : 100;
  };
</script>

<div>
  <button type="button" on:click={handleButtonClick}>
    {value}%
  </button>
  <input type="range" min="0" max="100" bind:value />
</div>

<style lang="scss">
  div {
    @include flex_center;

    flex-direction: row;
    padding: grid(1);
    gap: grid(1);
  }

  button {
    @include flex_center;

    border: 0;
    background: none;
  }

  input[type='range'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 200px;
    background-color: transparent;

    &:focus {
      outline-color: var(--text-color);
    }
  }

  input[type='range']::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    appearance: none;
    height: 3px;
    background: var(--text-color);
  }

  input[type='range']::-moz-range-track {
    -moz-appearance: none;
    appearance: none;
    height: 3px;
    background: var(--text-color);
  }

  input[type='range']::-ms-track {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    height: 3px;
    background: var(--text-color);
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    border-radius: 50%;
    height: 28px;
    width: 28px;
    position: relative;
    bottom: 14px;
    background: var(--text-color) url('../images/volume.svg') center no-repeat;
    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.4);
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }

  input[type='range']::-moz-range-thumb {
    -moz-appearance: none;
    appearance: none;
    border-radius: 50%;
    height: 28px;
    width: 28px;
    position: relative;
    bottom: 14px;
    background: var(--text-color) url('../images/volume.svg') center no-repeat;
    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.4);
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }

  input[type='range']::-ms-thumb {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 50%;
    height: 28px;
    width: 28px;
    position: relative;
    bottom: 14px;
    background: var(--text-color) url('../images/volume.svg') center no-repeat;
    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.4);
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }
</style>
