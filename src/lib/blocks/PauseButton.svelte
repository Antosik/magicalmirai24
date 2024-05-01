<script>
  import FeatherIcon from '$lib/components/FeatherIcon.svelte';
</script>

<button type="button" on:click>
  <FeatherIcon name="pause" size="24" fill="#1e5b64" />
</button>

<style lang="scss">
  button {
    position: fixed;
    top: grid(4);
    right: grid(4);
    border: 0;
    background: none;
    color: #1e5b64;
  }
</style>
