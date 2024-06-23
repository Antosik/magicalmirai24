<!-- @component Pause button component -->

<script lang="ts">
  import { getLocale } from '$lib/contexts/locale';

  const { i18n } = getLocale();
</script>

<button type="button" title={$i18n('Pause')} on:click>
  <img src="../images/pause.svg" alt={$i18n('Pause')} width="24" height="24" />
</button>

<style lang="scss">
  button {
    @include flex_center;

    padding: grid(1);
    border: 0;
    background: none;
    transition: transform 200ms ease-in-out;

    &:hover {
      transform: scale(1.2);
    }
  }
</style>
