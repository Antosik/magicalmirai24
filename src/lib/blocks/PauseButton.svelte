<script>
  import FeatherIcon from '$lib/components/FeatherIcon.svelte';
</script>

<button type="button" on:click>
  <FeatherIcon name="pause" size="24" fill="var(--blue-color)" />
</button>

<style lang="scss">
  button {
    position: fixed;
    top: grid(4);
    right: grid(4);
    border: 0;
    background: none;
    color: var(--blue-color);
  }
</style>
