<script lang="ts">
  import { getLocale } from '$lib/contexts/locale';
  import { Page, getPage } from '$lib/contexts/page';
  import { Manageability, getPlayerState } from '$lib/contexts/playerState';
  import UIScene from '$lib/scenes/UIScene.svelte';
  import Credits from '$lib/widgets/Credits.svelte';
  import Game from '$lib/widgets/Game.svelte';
  import Help from '$lib/widgets/Help.svelte';
  import Start from '$lib/widgets/Start.svelte';

  import GameScene from './lib/scenes/GameScene.svelte';
  import MainMenu from './lib/widgets/MainMenu.svelte';

  const page = getPage();
  const { i18n } = getLocale();
  const { manageability, readiness } = getPlayerState();
</script>

{#if $manageability === Manageability.NONE || $page === Page.GAME}
  <GameScene let:errorNode let:playerNode>
    <Game {errorNode} {playerNode} />
  </GameScene>
{:else}
  <UIScene>
    {#if !$readiness.app}
      {$i18n('App loading...')}
    {:else if $page === Page.START}
      <Start />
    {:else if $page === Page.MAIN_PAGE}
      <MainMenu />
    {:else if $page === Page.CREDITS}
      <Credits />
    {:else if $page === Page.HELP}
      <Help />
    {/if}
  </UIScene>
{/if}
