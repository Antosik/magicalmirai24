<section>
  <a href="/">Back to Main menu</a>

  <h1>Help</h1>

  <div class="content">
    <p>Help goes here</p>
  </div>
</section>

<style lang="scss">
  section {
    position: absolute;
    z-index: 1;
    padding: grid(4);
    inset: 20% 10%;
    text-align: center;
    background-color: rgb(255 255 255 / 70%);
  }

  a {
    position: fixed;
    top: grid(4);
    left: grid(4);
    padding: grid(1) grid(2);
    border: 1px solid black;
  }

  h1 {
    margin-bottom: grid(4);
  }

  div {
    padding: grid(2) grid(4);
    border: 1px solid black;
  }
</style>
