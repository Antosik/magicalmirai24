<!-- @component Volume range component -->

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
    width: 100%;
    appearance: none;
    background-color: transparent;

    &:focus {
      outline-color: var(--text-color);
    }

    @include breakpoint(sm) {
      width: 200px;
    }
  }

  input[type='range']::-webkit-slider-runnable-track {
    height: 3px;
    appearance: none;
    background: var(--text-color);
  }

  input[type='range']::-moz-range-track {
    height: 3px;
    appearance: none;
    background: var(--text-color);
  }

  input[type='range']::-ms-track {
    height: 3px;
    appearance: none;
    background: var(--text-color);
  }

  input[type='range']::-webkit-slider-thumb {
    position: relative;
    bottom: 14px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    appearance: none;
    background: var(--text-color) url('../images/volume.svg') center no-repeat;
    box-shadow: 0 3px 5px 0 rgb(0 0 0 / 40%);
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }

  input[type='range']::-moz-range-thumb {
    position: relative;
    bottom: 14px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    appearance: none;
    background: var(--text-color) url('../images/volume.svg') center no-repeat;
    box-shadow: 0 3px 5px 0 rgb(0 0 0 / 40%);
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }

  input[type='range']::-ms-thumb {
    position: relative;
    bottom: 14px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    appearance: none;
    background: var(--text-color) url('../images/volume.svg') center no-repeat;
    box-shadow: 0 3px 5px 0 rgb(0 0 0 / 40%);
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }
</style>
