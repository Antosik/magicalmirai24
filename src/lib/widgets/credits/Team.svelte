<!-- @component Team tab on Credits page -->

<script lang="ts">
  import { getLocale } from '$lib/contexts/locale';

  const { i18n } = getLocale();
</script>

<h2>{$i18n('Team')}</h2>
<ul>
  <li><span>Anton Grigorev</span> - {$i18n('Programming')}</li>
  <li><span>Valentina Klepnikova</span> - {$i18n('Design')}</li>
  <li><span>???</span> - {$i18n('Translation')}</li>
  <li>
    <span>
      <a
        href="https://www.youtube.com/@wintergatan"
        target="_blank"
        rel="nofollow norefferer noopener"
      >
        Wintergatan
      </a>
    </span>
    - {$i18n('Background music')}
  </li>
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
