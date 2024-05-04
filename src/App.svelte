<script lang="ts">
  import { getPage } from '$lib/contexts/page';
  import { getPlayerState } from '$lib/contexts/playerState';
  import Credits from '$lib/widgets/Credits.svelte';
  import Game from '$lib/widgets/Game.svelte';
  import Help from '$lib/widgets/Help.svelte';

  import Scene from './lib/game/Scene.svelte';
  import MainMenu from './lib/widgets/MainMenu.svelte';

  const page = getPage();
  const { manageability, readiness } = getPlayerState();
</script>

<Scene let:errorNode let:playerNode>
  {#if !$readiness.app}
    App loading...
  {:else if $manageability === 'none' || $page === 'game'}
    <Game {errorNode} {playerNode} />
  {:else if $page === 'main_page'}
    <MainMenu />
  {:else if $page === 'credits'}
    <Credits />
  {:else if $page === 'help'}
    <Help />
  {/if}
</Scene>
