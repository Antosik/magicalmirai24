<script lang="ts">
  import { getPage } from '$lib/contexts/page';
  import Credits from '$lib/widgets/Credits.svelte';
  //import Game from '$lib/widgets/Game.svelte';
  import Help from '$lib/widgets/Help.svelte';

  import Scene from './lib/game/Scene.svelte';
  import MainMenu from './lib/widgets/MainMenu.svelte';

  const page = getPage();
</script>

<Scene let:errorNode let:playerNode>
  {#if $page === 'main_page'}
    <MainMenu />
  {:else if $page === 'game'}
    <!-- <Game {errorNode} {playerNode} />-->
  {:else if $page === 'credits'}
    <Credits />
  {:else if $page === 'help'}
    <Help />
  {/if}
</Scene>
