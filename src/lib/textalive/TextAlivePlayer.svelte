<script lang="ts">
  import type { PlayerBannerPosition } from 'textalive-app-api';

  import { onMount } from 'svelte';
  import * as TextAliveApp from 'textalive-app-api';

  import { initPlayerContext } from '$lib/contexts/player';

  export let mediaBannerPosition: PlayerBannerPosition = 'bottom right';

  let appReady = false;
  let mediaElementHtml: HTMLDivElement;

  const player = new TextAliveApp.Player({
    // TODO update token
    app: { token: 'test' },

    mediaBannerPosition,
    valenceArousalEnabled: true,
    vocalAmplitudeEnabled: true,
  });

  player.addListener({
    onAppReady() {
      appReady = true;
    },
  });

  initPlayerContext(player);

  onMount(() => {
    player.mediaElement = mediaElementHtml;
  });
</script>

<div id="media" bind:this={mediaElementHtml}></div>

<slot ready={appReady} />
