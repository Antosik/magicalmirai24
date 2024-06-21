<script lang="ts">
  import FeatherIcon from '$lib/components/FeatherIcon.svelte';
  import { getLocale } from '$lib/contexts/locale';

  const { i18n } = getLocale();
</script>

<button type="button" title={$i18n('Pause')} on:click>
  <FeatherIcon name="pause" size="24" fill="var(--moon-color)" />
</button>

<style lang="scss">
  button {
    @include flex_center;

    padding: grid(1);
    border: 0;
    background: none;
    color: var(--moon-color);
  }
</style>
