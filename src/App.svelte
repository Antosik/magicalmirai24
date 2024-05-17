<script lang="ts">
  import { getLocale } from '$lib/contexts/locale';
  import { Page, getPage } from '$lib/contexts/page';
  import { Manageability, getPlayerState } from '$lib/contexts/playerState';
  import Credits from '$lib/widgets/Credits.svelte';
  import Game from '$lib/widgets/Game.svelte';
  import Help from '$lib/widgets/Help.svelte';

  import Scene from './lib/game/Scene.svelte';
  import MainMenu from './lib/widgets/MainMenu.svelte';

  const page = getPage();
  const { i18n } = getLocale();
  const { manageability, readiness } = getPlayerState();
</script>

<Scene let:errorNode let:playerNode>
  {#if !$readiness.app}
    {$i18n('App loading...')}
  {:else if $manageability === Manageability.NONE || $page === Page.GAME}
    <Game {errorNode} {playerNode} />
  {:else if $page === Page.MAIN_PAGE}
    <MainMenu />
  {:else if $page === Page.CREDITS}
    <Credits />
  {:else if $page === Page.HELP}
    <Help />
  {/if}
</Scene>
