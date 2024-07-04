<!-- @component Technologies tab on Credits page -->

<script lang="ts">
  import { getLocale } from '$lib/contexts/locale';
  import { packages } from '$lib/utils/packages';

  const { i18n } = getLocale();
</script>

<div>
  <h2>{$i18n('Technologies')}</h2>
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

<style lang="scss">
  div {
    @include flex_center;

    height: 100%;
    width: 100%;
    flex-direction: column;
    gap: grid(5);    
  }

  h2 {
    margin-top: grid(4);
    margin-bottom: grid(1);
    font-size: 18px;

    @include breakpoint(sm) {
      font-size: 20px;
    }

    @include breakpoint(xl) {
      font-size: 24px;
    }

    @include breakpoint(xxl) {
      font-size: 28px;
    }
  }

  ul {
    height: min-content;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow-y: auto;
    padding-left: grid(6);
  }

  li {
    margin-bottom: grid(1);
    font-size: 14px;
    text-align: start;

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

  span {
    font-weight: bold;
  }
</style>
