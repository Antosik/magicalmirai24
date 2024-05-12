<script>
  import FeatherIcon from '$lib/components/FeatherIcon.svelte';
</script>

<button type="button" on:click>
  <FeatherIcon name="pause" size="24" fill="var(--blue-color)" />
</button>

<style lang="scss">
  button {
    position: fixed;
    top: calc(var(--frame-size) + grid(1));
    right: calc(var(--frame-size) + grid(1));
    padding: grid(1);
    border: 0;
    background: none;
    color: var(--blue-color);
  }
</style>
