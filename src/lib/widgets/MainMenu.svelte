<section>
  <h1>Main Menu</h1>

  <ul>
    <li>
      <a href="/game">Play</a>
    </li>
    <li>
      <a href="/help">Help</a>
    </li>
    <li>
      <a href="/credits">Credits</a>
    </li>
  </ul>
</section>

<style lang="scss">
  section {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    width: 200px;
    padding: grid(4);
    text-align: center;
    transform: translate(-50%, -50%);

    &::before {
      position: fixed;
      z-index: -1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgb(255 255 255 / 50%);
      content: '';
      filter: blur(20px);
    }
  }

  h1 {
    margin-bottom: grid(4);
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: grid(2);
  }

  a {
    @include flex_center;

    padding: grid(2) grid(4);
    border: 1px solid black;
  }
</style>
