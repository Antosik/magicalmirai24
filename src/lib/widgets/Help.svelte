<script lang="ts">
  import { onMount } from 'svelte';

  import FeatherIcon from '$lib/components/FeatherIcon.svelte';
  import { getLocale } from '$lib/contexts/locale';
  import { Page, getPage } from '$lib/contexts/page';

  const page = getPage();
  const { i18n } = getLocale();

  let slider: HTMLUListElement;
  let activeElement: HTMLLIElement;

  function openMainMenu() {
    $page = Page.MAIN_PAGE;
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      openMainMenu();
    }
  }

  function toPrevious() {
    const previous = activeElement.previousElementSibling as HTMLLIElement;
    if (previous) {
      activeElement = previous;
      activeElement.scrollIntoView();
    }
  }

  function toNext() {
    const next = activeElement.nextElementSibling as HTMLLIElement;
    if (next) {
      activeElement = next;
      activeElement.scrollIntoView();
    }
  }

  onMount(() => {
    activeElement = slider.firstChild as HTMLLIElement;
  });
</script>

<svelte:document on:keydown={handleKeyDown} />

<button type="button" on:click={openMainMenu}>
  {$i18n('Back to Main menu')}
</button>

<section>
  <h1>{$i18n('Help')}</h1>

  <div class="content">
    <button type="button" on:click={toPrevious}>
      <FeatherIcon name="chevron-left" size="24" />
    </button>
    <ul bind:this={slider}>
      <li>
        <img src="../images/miku.png" alt="" />
        <p>Navigate Miku-san with mouse move or keys</p>
      </li>
      <li>
        <img src="../images/miku.png" alt="" />
        <p>Navigate Miku-san with mouse move or keys</p>
      </li>
      <li>
        <img src="../images/miku.png" alt="" />
        <p>Navigate Miku-san with mouse move or keys</p>
      </li>
      <li>
        <img src="../images/miku.png" alt="" />
        <p>Navigate Miku-san with mouse move or keys</p>
      </li>
      <li>
        <img src="../images/miku.png" alt="" />
        <p>Navigate Miku-san with mouse move or keys</p>
      </li>
    </ul>
    <button type="button" on:click={toNext}>
      <FeatherIcon name="chevron-right" size="24" />
    </button>
  </div>
</section>

<style lang="scss">
  section {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    padding: grid(8) grid(8) 20%;
    gap: grid(4);
    text-align: center;
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
    background: none;
    font-size: 14px;
    text-transform: uppercase;

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

  div {
    @include flex_vcenter;

    width: 100%;
    flex: 1;
    padding: grid(2) grid(4);
  }

  ul {
    @include flex_vcenter;

    padding: grid(4) 0;
    gap: grid(5);
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  li {
    @include flex_center;

    width: 100%;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 0;
    gap: grid(2);
    scroll-snap-align: center;
    scroll-snap-stop: always;
  }

  img {
    min-width: 100px;
    max-width: 50%;
  }
</style>
