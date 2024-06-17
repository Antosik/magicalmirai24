<h2>Team</h2>
<ul>
  <li><span>Anton Grigorev</span> - Programming</li>
  <li><span>Valentina Klepnikova</span> - Design</li>
  <li><span>???</span> - Translation</li>
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
