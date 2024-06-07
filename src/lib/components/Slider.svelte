<script lang="ts" generics="T">
  import { onMount } from 'svelte';

  import FeatherIcon from './FeatherIcon.svelte';

  export let items: T[] = [];
  export let loop = false;

  let slider: HTMLUListElement;
  let activeElement: HTMLLIElement;

  function toPrevious() {
    const previous = (activeElement.previousElementSibling ??
      (loop ? slider.lastChild : null)) as HTMLLIElement;
    if (previous) {
      activeElement = previous;
      activeElement.scrollIntoView();
    }
  }

  function toNext() {
    const next = (activeElement.nextElementSibling ??
      (loop ? slider.firstChild : null)) as HTMLLIElement;
    if (next) {
      activeElement = next;
      activeElement.scrollIntoView();
    }
  }

  onMount(() => {
    activeElement = slider.firstChild as HTMLLIElement;

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries.find((el) => el.isIntersecting);
        if (activeEntry && activeEntry.target) {
          activeElement = activeEntry.target as HTMLLIElement;
        }
      },
      {
        root: slider,
        threshold: 1,
      },
    );
    Array.from(slider.children).forEach((node) => {
      observer.observe(node);
    });
  });
</script>

<div>
  <button type="button" on:click={toPrevious}>
    <FeatherIcon name="chevron-left" size="24" />
  </button>
  <ul bind:this={slider}>
    {#each items as item, index}
      <li data-index={index}>
        <slot {item} {index} active={activeElement?.dataset?.index === index.toString()} />
      </li>
    {/each}
  </ul>
  <button type="button" on:click={toNext}>
    <FeatherIcon name="chevron-right" size="24" />
  </button>
</div>

<style lang="scss">
  div {
    @include flex_vcenter;

    width: 100%;
    flex: 1;
  }

  button {
    @include flex_center;

    padding: grid(1);
    border: none;
    background: none;
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
    flex-grow: 1;
    flex-shrink: 0;
    scroll-snap-align: center;
    scroll-snap-stop: always;
  }
</style>
