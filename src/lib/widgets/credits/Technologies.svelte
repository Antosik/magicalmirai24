<!-- @component Technologies tab on Credits page -->

<script lang="ts">
  import { getLocale } from '$lib/contexts/locale';
  import { packages } from '$lib/utils/packages';

  const { i18n } = getLocale();
</script>

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

<style lang="scss">
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

  ul {
    height: min-content;
    align-items: flex-start;
    overflow-y: auto;
  }

  li {
    margin-bottom: grid(1);
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

  span {
    font-weight: bold;
  }
</style>
