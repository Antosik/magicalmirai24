<script lang="ts">
  import { Page, getPage } from '$lib/contexts/page';

  const page = getPage();
</script>

<button type="button" on:click={() => ($page = Page.MAIN_PAGE)}>Back to Main menu</button>

<section>
  <h1>Credits</h1>

  <div class="content">
    <p>Credits goes here</p>
  </div>
</section>

<style lang="scss">
  section {
    position: absolute;
    z-index: 3;
    display: flex;
    flex-direction: column;
    padding: grid(4);
    border: 1px solid #1e5b64;
    background-color: rgb(255 255 255 / 50%);
    inset: 20% 10%;
    text-align: center;
  }

  button {
    position: fixed;
    top: grid(4);
    left: grid(4);
    padding: grid(1) grid(2);
    border: 1px solid #1e5b64;
    background-color: rgb(255 255 255 / 50%);
  }

  h1 {
    margin-bottom: grid(4);
  }

  div {
    flex: 1;
    padding: grid(2) grid(4);
    border: 1px solid #1e5b64;
    overflow-y: auto;
  }
</style>
