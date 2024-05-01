<script lang="ts">
  import { initSettings } from '$lib/contexts/settings';
  import '../app.scss';

  initSettings();
</script>

<slot />
