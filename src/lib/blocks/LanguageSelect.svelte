<script lang="ts">
  import { Locale, localesList } from '$lib/contexts/locale/types';

  export let value: Locale;

  const localeToEmojiMap: Record<Locale, string> = {
    [Locale.EN]: '🇺🇸',
  };
</script>

<label for="language">
  <select name="language" id="language" bind:value>
    {#each localesList as locale}
      <option value={locale}>{localeToEmojiMap[locale]}</option>
    {/each}
  </select>
</label>

<style lang="scss">
  label {
    @include flex_center;

    width: 32px;
    height: 32px;
    padding: grid(1);
    background: var(--transparent-white-color);
    gap: grid(1);

    &:focus-within {
      background: var(--less-transparent-white-color);
    }
  }

  select {
    z-index: 1;
    padding: 0;
    border: none;
    margin: 0;
    appearance: none;
    background-color: transparent;
    cursor: inherit;
    font-family: inherit;
    font-size: inherit;
    font-size: 20px;
    line-height: inherit;
    outline: none;

    // Remove dropdown arrow in IE10 & IE11
    // @link https://www.filamentgroup.com/lab/select-css.html
    &::-ms-expand {
      display: none;
    }
  }
</style>
