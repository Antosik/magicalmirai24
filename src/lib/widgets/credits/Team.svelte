<!-- @component Team tab on Credits page -->

<script lang="ts">
  import { getLocale } from '$lib/contexts/locale';

  const { i18n } = getLocale();
</script>

<div class="wrapper">
  <h2>{$i18n('Team')}</h2>
  <div class="content-wrapper">
    <ul>
      <li>Anton Grigorev</li>
      <li>Valentina Klepikova</li>
      <li>Translator Translator</li>
      <li>
          <a
            href="https://wintergatan.net/"
            target="_blank"
            rel="nofollow norefferer noopener"
          >
            Wintergatan
          </a>
      </li>
    </ul>
    <picture>
      <source srcset="./images/credits.avif" type="image/avif" />
      <source srcset="./images/credits.webp" type="image/webp" />
      <img src="./images/credits.png" alt="" />
    </picture>
  </div>
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: grid(5);
    width: 100%;
    height: 100%;

    @include breakpoint(sm) {
      gap: 50px;
    }
  }

  .content-wrapper {
    display: flex;
    justify-content: center;
    gap: grid(7);
    align-items: center;
  }
  
  h2 {
    margin-top: grid(4);
    margin-bottom: grid(1);
    font-size: 18px;
    align-self: center;


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

  li {
    margin-bottom: grid(2);
    font-size: 14px;
    text-align: center;

    @include breakpoint(sm) {
      text-align: start;
      font-size: 16px;
    }

    @include breakpoint(md) {
      font-size: 18px;
      margin-bottom: grid(3);
    }

    @include breakpoint(xl) {
      font-size: 20px;
    }

    @include breakpoint(xxl) {
      font-size: 24px;
    }
  }

  picture {
    display: none;
    min-width: 100px;
    max-width: 35%;

    @include breakpoint(sm) {
      display: block;
    }
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }
</style>
