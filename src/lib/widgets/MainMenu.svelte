<!-- @component Main menu page -->

<script lang="ts">
  import { songs } from '$lib/songs';

  import Volume from '$lib/blocks/Volume.svelte';
  import Slider from '$lib/components/Slider.svelte';
  import { getLocale } from '$lib/contexts/locale';
  import { Page, getPage } from '$lib/contexts/page';
  import { Manageability, getPlayerState } from '$lib/contexts/playerState';
  import { getSettings } from '$lib/contexts/settings';
  import type { Song } from '$lib/songs/types';

  const settings = getSettings();
  const page = getPage();
  const { song, manageability } = getPlayerState();
  const { i18n } = getLocale();

  const songItems = Object.values(songs);

  function handleSongChange(e: CustomEvent<Song>) {
    $song = e.detail.id;
  }
</script>

<section>
  <h1>{$i18n('Choose song')}</h1>

  <Slider items={songItems} let:item={songItem} on:change={handleSongChange}>
    <p>{songItem.artist}<br />{songItem.title}</p>
  </Slider>

  <ul>
    <li>
      <button type="button" on:click={() => ($page = Page.GAME)}>{$i18n('Play')}</button>
    </li>
    <li>
      <button type="button" on:click={() => ($page = Page.HELP)}>{$i18n('Help')}</button>
    </li>
    <li>
      <button type="button" on:click={() => ($page = Page.CREDITS)}>{$i18n('Credits')}</button>
    </li>
  </ul>

  {#if $manageability === Manageability.FULL}
    <div class="buttons">
      <Volume bind:value={$settings.volume} />
    </div>
  {/if}
</section>

<style lang="scss">
  section {
    @include flex_center;

    max-width: calc(100dvw + grid(4));
    max-height: calc(100dvh + grid(4));
    flex-direction: column;
    padding: grid(4);
    aspect-ratio: 1;
    gap: grid(2);
    text-align: center;

    @include breakpoint(lg) {
      padding: grid(8);
      gap: grid(4);
    }

    @include breakpoint(xxl) {
      padding: grid(16);
    }
  }

  h1 {
    font-size: 28px;
    text-transform: uppercase;

    @include breakpoint(md) {
      font-size: 32px;
    }

    @include breakpoint(xl) {
      font-size: 36px;
    }

    @include breakpoint(xxl) {
      font-size: 44px;
    }
  }

  button {
    @include flex_center;

    width: 100%;
    padding: grid(1) grid(4);
    border: none;
    border-bottom: 1px solid transparent;
    background: none;
    font-size: 14px;
    text-transform: uppercase;
    transition: border-bottom 200ms ease-in-out;

    &:hover {
      border-bottom: 1px solid var(--text-color);
    }

    @include breakpoint(md) {
      font-size: 18px;
    }

    @include breakpoint(xl) {
      font-size: 20px;
    }

    @include breakpoint(xxl) {
      font-size: 28px;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: grid(2);
  }

  .buttons {
    @include flex_center;

    gap: grid(1);
  }
</style>
