<script lang="ts">
  import { getLocale } from '$lib/contexts/locale';
  import { Page, getPage } from '$lib/contexts/page';
  import { packages } from '$lib/utils/packages';

  const page = getPage();
  const { i18n } = getLocale();

  function openMainMenu() {
    $page = Page.MAIN_PAGE;
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      openMainMenu();
    }
  }
</script>

<svelte:document on:keydown={handleKeyDown} />

<button type="button" on:click={openMainMenu}>
  {$i18n('Back to Main menu')}
</button>

<section>
  <h1>{$i18n('Credits')}</h1>
  <div class="content">
    <img src="../images/credits.png" alt="" />
    <h2>Team</h2>
    <ul>
      <li><span>Anton Grigorev</span> - Programming</li>
      <li><span>Valentina Klepnikova</span> - Design</li>
      <li><span>???</span> - Translation</li>
    </ul>
    <h2>Technologies</h2>
    <ul>
      {#each packages as item (item.name)}
        <li>
          <span>
            <a href={item.link} target="_blank" rel="noopener nofollow noreferrer">{item.name}</a>
          </span>
          {#if item.licenseType}
            (License - {item.licenseType})
          {:else if item.licenseLink}
            (<a href={item.link} target="_blank" rel="noopener nofollow noreferrer">License</a>)
          {/if}
        </li>
      {/each}
    </ul>
  </div>
</section>

<style lang="scss">
  section {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    padding: grid(8) grid(8) 10%;
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

    @include breakpoint(xl) {
      font-size: 44px;
    }
  }

  li,
  p,
  button {
    font-size: 14px;

    @include breakpoint(md) {
      font-size: 18px;
    }

    @include breakpoint(xl) {
      font-size: 20px;
    }

    @include breakpoint(xxl) {
      font-size: 24px;
    }
  }

  button {
    @include flex_center;

    width: 100%;
    padding: grid(1) grid(4);
    border: none;
    background: none;
    text-transform: uppercase;
  }

  div {
    width: 100%;
    flex: 1;
    padding: grid(2) grid(4);
    overflow-y: auto;
  }

  h2 {
    margin-top: grid(4);
    margin-bottom: grid(1);
    font-size: 18px;

    @include breakpoint(md) {
      font-size: 20px;
    }

    @include breakpoint(xl) {
      font-size: 24px;
    }

    @include breakpoint(xxl) {
      font-size: 28px;
    }
  }

  li,
  p {
    margin-bottom: grid(1);
  }

  span {
    font-weight: bold;
  }

  img {
    min-width: 100px;
    max-width: 30%;
  }
</style>
